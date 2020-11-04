import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product: any = {};
  defaultImg: string;
  colors: any = [];
  sizes: any = [];
  selectOptions: any = {};
  variants: any = [];
  user: any = {};
  cartExists = false;

  constructor(private commonService: CommonService, private route: ActivatedRoute, private title: Title, private meta: Meta) { }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.route.params.subscribe(params => {
      this.commonService.get(links.products + '/' + params.id + '?join=product_images&join=product_variants,variant_terms&join=product_categories,categories')
      .subscribe(data => {
        this.product = data;
        this.product.image = this.product.image || this.product.product_images[0].image;
        if (params.image) {
          this.product.image = params.image;
        }
        this.getVariants();
        this.title.setTitle(this.escapeChars(this.product.title));
        this.meta.updateTag({ name: 'description', content: this.escapeChars(this.product.description) });
        this.meta.updateTag({ property: 'og:image', itemprop: 'image', content: 'https://www.mdcart.in/upload/' + this.defaultImg});
        this.checkCart();
        this.updatePageView(data);
      });
    });
  }

  updatePageView(product) {
    product.views = parseInt(product.views, 10) + 1;
    this.commonService.put(links.products + '/' + product.id, product).subscribe(() => {});
  }

  checkCart() {
    this.commonService.getCart();
    const cart: any = this.commonService.cart;
    if (cart && cart.filter(car => car.id === this.product.id).length > 0) {
      this.cartExists = true;
    }
  }

  getVariants() {
    this.commonService.get(links.variants).subscribe(data => {
      this.variants = data;
      this.variants.forEach(variant => {
        variant.terms = this.product.product_variants.filter(obj => obj.variant_term_id.variant_id === variant.id);
      });
      this.getOptionsAsString();
    });
  }

  assignVariant(type, value, term) {
    this.selectOptions[type] = value;
    if (term.images) {
      this.defaultImg = term.images;
    }
  }

  getWhatsAppText() {
    const newLine = '%0D%0A';
    const message = '' +
      'Hi, I wanted to buy the below product. Kindly help.' +
      newLine + '*' + this.product.title + '*' +
      newLine + '*Price: ' + this.product.price + '*' +
      newLine + '*URL: ' + window.location.href + '*' +
      newLine + '*Options: ' + this.getOptionsAsString() + '*';
    return message;
  }

  getOptionsAsString() {
    const object = this.selectOptions;
    const str = [];
    for (const property in object) {
      if (object.hasOwnProperty(property)) {
        str.push(`${property}: ${object[property]}`);
      }
    }
    return str.join(' <br />');
  }

  getColorName(name) {
    return name.replace(' ', '');
  }

  escapeChars(text) {
    if (!text) {
      return '';
    }
    return decodeURIComponent(text);
  }

  addToCart(product) {
    this.commonService.updateCart(product);
    this.checkCart();
  }

  selectedImage(image) {
    this.product.image = image;
  }

  offerExpired(event, product) {
    product.offerPrice = product.offerStart = product.offerEnd = null;
    this.commonService.put(links.products + '/' + product.id, product).subscribe(() => {});
  }
}
