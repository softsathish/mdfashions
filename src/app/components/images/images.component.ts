import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit, OnChanges {

  @Input() product: any;
  @Input() classNames: string;
  @Input() defaultImg: string;
  @Output() selectedImage: EventEmitter<any> = new EventEmitter();
  additionalImages: any = [];

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.initFn();
  }

  ngOnChanges() {
    this.initFn();
  }

  initFn() {
    if (!this.product.product_images) {
      this.product.product_images = []
    }
    if ((this.product.product_images).length > 0) {
      this.defaultImg = this.defaultImg || this.product.image || this.product.product_images[0].image;
    }
    if (this.classNames === 'list' && this.product.additionalImages) {
      this.additionalImages = this.product.additionalImages.split(',');
      this.additionalImages = this.additionalImages.splice(0, 3);
    }
  }

  assignImage(img) {
    this.selectedImage.emit(img.image);
  }

  productURL(id, name, image) {
    return this.commonService.productURL(id, name, image);
  }

  int(num) {
    return parseInt(num, 10);
  }

}
