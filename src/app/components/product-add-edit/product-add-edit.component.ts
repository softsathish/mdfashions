import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';
import { categories } from 'src/app/utlis/categories';
import * as moment from 'moment';

@Component({
  selector: 'app-product-add-edit',
  templateUrl: './product-add-edit.component.html',
  styleUrls: ['./product-add-edit.component.scss']
})
export class ProductAddEditComponent implements OnInit {

  moment

  product: any = { product_images: [], product_categories: [], product_variants: [], variants: [] };
  categories: any = [];
  variants: any = [];
  terms: any = [];
  categoriesBkp: any = [];
  dropdownSettings: any = {
    singleSelection: false,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  newVariant: any = {variant: {}};

  constructor(private commonService: CommonService, private route: Router, private activatedRoute: ActivatedRoute) {   }

  ngOnInit(): void {
    this.getCategories();
  }

  getProduct(id) {
    this.commonService.get(links.products + '/' + id + '?join=product_variants&join=product_images&join=product_categories')
      .subscribe(data => {
      this.product = data;
      if (!this.product.variants) {
        this.product.variants = [];
      }
      this.product.title = decodeURIComponent(this.product.title);
      const categoriesObj = [];
      this.categoriesBkp = [...this.product.product_categories];
      this.product.product_categories.forEach(cat => {
        const catObj1 = this.categories.filter(catFilter => catFilter.id === cat.categoryID)[0];
        categoriesObj.push(catObj1);
      });
      this.product.product_categories = categoriesObj;
      if (this.product.offerStart) {
        this.product.offerStart = moment(this.product.offerStart).format('YYYY-MM-DDTHH:MM:SS');
      }
      if (this.product.offerEnd) {
        this.product.offerEnd = moment(this.product.offerEnd).format('YYYY-MM-DDTHH:MM:SS');
      }
      // this.product.short_description = decodeURIComponent(this.product.short_description);
      this.product.description = decodeURIComponent(this.product.description);
      this.getVariants();
    });
  }


  updatedImages(images) {
    this.product.product_images = [...this.product.product_images, ...images];
  }

  addEditProduct() {
    const product = {...this.product};
    if (!this.product.image && this.product.product_images.length > 0) {
      this.product.image = this.product.product_images[0];
    }
    product.description = encodeURIComponent(product.description);
    // product.short_description = encodeURIComponent(product.short_description);
    product.title = encodeURIComponent(product.title);
    if (!this.product.image && this.product.product_images.length > 0) {
      this.product.image = this.product.product_images[0].image;
    }
    if (this.product.id) {
      this.commonService.put(links.products + '/' + this.product.id, product).subscribe(data => {
        this.updateAllVariants();
        this.route.navigate(['/admin/products']);
      });
    } else {
      this.commonService.post(links.products, product).subscribe(data => {
        this.product.id = data;
        this.updateAllVariants();
        this.route.navigate(['/admin/products']);
      });
    }
  }

  updateAllVariants() {
    this.deleteExistingVariants([...this.product.product_variants]);
    this.deleteExistingCategories();
    this.product.product_variants = this.commonService.variantsUITODB(this.product.variants, this.product.id);
    this.updateInclude('product_variants');
    console.log('product_categories', this.product.product_categories);
    this.updateInclude('product_categories', 'categoryID');
    this.updateInclude('product_images', 'image');
  }

  updateInclude(value, key?) {
    this.product[value].forEach(element => {
      if (typeof(element) === 'string') {
        const str = element;
        element = {};
        element[key] = str;
      }
      element.productID = this.product.id;
      if (element.id) {
        if (element.delete) {
          this.commonService.delete(value + '/' + element.id).subscribe(data => {});
        } else {
          this.commonService.put(value + '/' + element.id, element).subscribe(data => {});
        }
      } else {
        this.commonService.post(value, element).subscribe(data => {
        });
      }
    });
  }

  deleteExistingVariants(variants) {
    variants.forEach(element => {
      if (element.id) {
        this.commonService.delete(links.product_variants + '/' + element.id).subscribe(data => {});
      }
    });
  }

  deleteExistingCategories() {
    this.product.product_categories.forEach(cat => {
      cat.categoryID = cat.id || cat.categoryID;
      delete cat.id;
    });
    this.categoriesBkp.forEach(element => {
      this.commonService.delete(links.product_categories + '/' + element.id).subscribe(data => {});
    });
  }

  getVariant(id) {
    return this.variants && id ? this.variants.filter(variant => variant.id === id)[0] : {};
  }

  addVariant() {
    this.product.product_variants.push({product_id: this.product.id, variant_term_id : {}, });
  }

  deleteVariant(variant) {
    this.commonService.delete(links.product_variants + '/' + variant.id).subscribe(data => {
      this.getProduct(this.product.id);
    });
  }

  getVariants() {
    this.commonService.get(links.variants + '?join=' + links.variant_terms).subscribe(data => {
      this.variants = data;
      this.retrieveVariants();
      this.product.variants = this.commonService.variantsDBTOUI(data, this.product.product_variants);
      this.commonService.variantsUITODB(this.product.variants, this.product.id);
    });
    this.commonService.get(links.variant_terms + '?order=variant_id').subscribe(data => {
      this.terms = data;
    });
  }

  getCategories() {
    let productID;
    this.commonService.get(links.categories + '?order=parent_id').subscribe(data => {
      this.activatedRoute.params.subscribe(param => {
        if (param.id) {
          this.getProduct(param.id);
          productID = param.id;
        }
      });
      if (!productID) {
        this.getVariants();
      }

      data.forEach(cat => {
        if (parseInt(cat.parent_id, 10) !== 0) {
          cat.parentCategory = data.filter(obj => parseInt(obj.id, 10) === parseInt(cat.parent_id, 10))[0].name;
          this.categories.push(cat);
        }
      });
    });
  }

  retrieveVariants() {
    this.product.product_variants.forEach(prodVariant => {
      const term = this.terms.filter(termObj => termObj.id === prodVariant.variant_term_id)[0];
    });
  }

  int(val) {
    return parseInt(val, 10);
  }

  categoryMatch(catID) {
    if (this.product.product_categories.filter(obj => parseInt(obj.categoryID, 10) === catID).length > 0) {
      console.log(catID);
    }
    return this.product.product_categories.filter(obj => parseInt(obj.categoryID, 10) === catID).length > 0;
  }

  selectImage(variant, image) {
    variant.images = image;
  }

  deleteImage(imageObj) {
    if (imageObj.id) {
      imageObj.delete = true;
    } else {
      const index = this.product.product_images.indexOf(imageObj);
      this.product.product_images.splice(index, 1);
    }
  }

  assignDefault(image) {
    this.product.image = image;
  }

}
