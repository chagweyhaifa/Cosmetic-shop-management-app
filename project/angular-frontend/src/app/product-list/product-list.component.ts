import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../products.service';
import { Product } from '../shared/models/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  placeholder: string =
    'https://mrsldna.org/wp-content/uploads/2019/03/product-placeholder.gif';
  products = this.productsService.getAll();
  constructor(private productsService: ProductsService) {
    this.productsService.dataDeleted.subscribe((st: string) => {
      this.products = this.productsService.getAll();
    });
  }

  ngOnInit(): void {}

  onDelete(_: Event, product: Product): void {
    console.log(product);
    this.productsService.delete(product.id).subscribe(
      (data) => {
        // this.router.navigate(['/']);
        this.productsService.dataDeleted.emit(data.toString());
        console.log(data);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
