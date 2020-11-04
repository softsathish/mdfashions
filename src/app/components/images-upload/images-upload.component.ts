import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { links } from 'src/app/links';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-images-upload',
  templateUrl: './images-upload.component.html',
  styleUrls: ['./images-upload.component.scss']
})
export class ImagesUploadComponent implements OnInit, OnChanges {

  myFiles: string[] = [];
  @Input() images: any = [];
  @Input() defaultImg: string;
  @Output() updatedImages: EventEmitter<any> = new EventEmitter();
  @Output() deleteImage: EventEmitter<any> = new EventEmitter();
  @Output() assignDefault: EventEmitter<any> = new EventEmitter();

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required])
  });

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(this.images)
  }

  get f() {
    return this.myForm.controls;
  }

  onFileChange(event) {
    for (var i = 0; i < event.target.files.length; i++) {
      this.myFiles.push(event.target.files[i]);
    }
  }

  upload() {
    const formData = new FormData();

    for (var i = 0; i < this.myFiles.length; i++) {
      formData.append('file[]', this.myFiles[i]);
    }

    this.commonService.upload(links.upload, formData).subscribe((res: any) => {
      const images  = [];
      res.forEach(img => {
        images.push({image: img});
      });
      this.images = [...this.images, ...images];
      this.updatedImages.emit(this.images);
    });
  }

  delete(img) {
    this.deleteImage.emit(img);
  }

  assignDefaultImg(image) {
    this.assignDefault.emit(image);
  }
}
