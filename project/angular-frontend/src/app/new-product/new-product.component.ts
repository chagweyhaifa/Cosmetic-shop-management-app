import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.css'],
})
export class NewProductComponent implements OnInit {
  selectedFile;
  addForm = this.formBuilder.group({
    name: '',
    category: '',
    description: '',
    price: 0,
  });

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.productsService.create(this.addForm.value).subscribe(
      (id) => {
        // console.log(data);
        // Update image
        const uploadData = new FormData();
        uploadData.append('image', this.selectedFile, this.selectedFile.name);
        // @ts-ignore
        uploadData.append('id', id);
        this.productsService.uploadPhoto(uploadData).subscribe(
          (data) => {
            console.log(data);
            this.router.navigate(['/']);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }
  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
}
