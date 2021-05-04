import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  selectedFile;
  productIdFromRoute;
  updateForm = this.formBuilder.group({
    name: '',
    category: '',
    description: '',
    price: 0,
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productsService: ProductsService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.productIdFromRoute = Number(routeParams.get('productId'));

    // Find the product that correspond with the id provided in route.
    this.productsService.get(this.productIdFromRoute).subscribe(
      ({ id, ...data }) => {
        // this.product = data;
        // this.updateForm.patchValue({ name: 'Fdfd' });
        // this.updateForm.patchValue(data);
        this.updateForm.reset(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    // Update data
    this.productsService
      .update(
        {
          id: this.productIdFromRoute,
          ...this.updateForm.value,
        },
        this.selectedFile
      )
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.error(error);
        }
      );

    // Update image
    const uploadData = new FormData();
    uploadData.append('image', this.selectedFile, this.selectedFile.name);
    uploadData.append('id', this.productIdFromRoute);
    this.productsService.uploadPhoto(uploadData).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/']);
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
