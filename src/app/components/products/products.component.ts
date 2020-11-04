import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {

  products: any = [];
  total: number;
  url: string;
  @ViewChild('scrollframe', {static: false}) scrollFrame: ElementRef;
  @ViewChildren('item') itemElements: QueryList<any>;
  private scrollContainer: any;
  private items = [];
  @Input() options: any;
  @Input() order: any = {};
  @Input() filters: any = {};

  constructor(private commonService: CommonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.options = this.options || {page: 1, limit: 20, loadMore: true, linkTarget: '_blank'};
    this.pageInit();
  }

  pageInit() {
    this.products = [];
    this.options.page = 1;
    this.getProductsList();
  }

  ngAfterViewInit() {
    this.scrollContainer = this.scrollFrame.nativeElement;
    this.itemElements.changes.subscribe(_ => this.onItemElementsChanged());

    // Add a new item every 2 seconds
    setInterval(() => {
      this.items.push({});
    }, 2000);
  }

  getProductsList() {
    this.url = '';
    const page = '&page=' + this.options.page + ',' + this.options.limit;
    let order = '';
    if (Object.keys(this.order).length > 0) {
      order = '&order=' + Object.keys(this.order)[0] + ',' + this.order[Object.keys(this.order)[0]];
    } else {
      order = '&order=id,desc';
    }
    this.activatedRoute.params.subscribe(param => {
      this.filters.name = param.name;
      const urlFrmService = this.commonService.getProductURLForList(param);
      this.url = urlFrmService + this.url;
    });
    this.url += this.getFilterURL();

    this.url = this.url + page + order;
    const previousIndex = [...this.products].length;
    this.commonService.get(this.url).subscribe(data => {
      this.products = [...this.products, ...data];
      this.total = this.commonService.totalRecords[this.url] || 0;
      if (previousIndex > 0) {
        setTimeout(() => {
          // document.getElementById('product_' + (previousIndex - 1)).scrollIntoView();
        });
      }
    });
  }

  addToCart(product) {
    this.commonService.updateCart(product);
  }

  loadMore() {
    if (this.options.loadMore) {
      this.options.page = this.options.page + 1;
      this.getProductsList();
    }
  }

  getFilterURL() {
    let filterURL = '';
    Object.keys(this.filters).forEach(filter => {
      if (!this.filters[filter]) {
        return;
      }
      switch (filter) {
        case 'text': {
          filterURL += '&filter=title,cs,' + this.filters[filter];
          break;
        }
        case 'minPrice': {
          filterURL += '&filter=price,gt,' + this.filters.minPrice;
          break;
        }
        case 'maxPrice': {
          filterURL += '&filter=price,lt,' + this.filters.maxPrice;
          break;
        }
      }
    });
    return filterURL;
  }

  formatFilterName(txt) {
    return txt.replace('-', ' ');
  }

  filterProducts() {
    this.pageInit();
  }

  productURL(id, name) {
    return this.commonService.productURL(id, name);
  }

  escapeChars(text) {
    return decodeURIComponent(text);
  }

  openWhatsApp(product) {
    const newLine = '%0D%0A';
    const message = '' +
      'Hi, I wanted to buy the below product. Kindly help.' +
      newLine + '*' + product.title + '*' +
      newLine + '*Price: ' + product.price + '*' +
      newLine + '*URL: ' + window.location.href + '*';
    return message;
  }

  private onItemElementsChanged(): void {
  }

  @HostListener('window:scroll', ['$event']) // <- Add scroll listener to window
  scrolled(event: any): void {
    if (this.isUserNearBottom()) {
      if (this.total > this.products.length) {
        this.loadMore();
      }
    }
  }

  private isUserNearBottom(): boolean {
    const threshold = 150;
    const position = window.scrollY + window.innerHeight; // <- Measure position differently
    const height = document.body.scrollHeight; // <- Measure height differently
    return position > height - threshold;
  }

  scrollTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  offerExpired(event, product) {
    product.offerPrice = product.offerStart = product.offerEnd = null;
    this.commonService.put(links.products + '/' + product.id, product).subscribe(() => {});
  }

  formatVariants(variants) {
    if (!variants) {
      return ;
    }
    const variantsArr = {};
    const commaVariants = variants.split(',');
    commaVariants.forEach(vari => {
      const collanVariant = vari.split(':');
      if (!variantsArr[collanVariant[0]]) {
        variantsArr[collanVariant[0]] = [];
      }
      variantsArr[collanVariant[0]].push(collanVariant[1]);
    });
    return variantsArr;
  }

  sortProducts(type) {
    switch (type) {
      case 'latest': {
        this.order = {id: 'desc'};
        break;
      }
      case 'priceAsc': {
        this.order = {price: 'asc'};
        break;
      }
      case 'priceDesc': {
        this.order = {price: 'desc'};
        break;
      }
      case 'views': {
        this.order = {views: 'desc'};
        break;
      }
    }
    this.pageInit();
  }

}
