import { Validators, FormBuilder } from '@angular/forms';
import { Product } from './../shared/models/products';
import { ProductService } from './../shared/services/product.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  modalActive = false;
  productForm = this.fb.group({
    tipo: ['', Validators.required],
    modelo: ['', Validators.required],
    preco: [0, Validators.required],
    quantidade: [0, Validators.required],
    imagem: ['', Validators.required]
  })
  produtos: Product[] = [];

  constructor(
    private ProductService: ProductService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.fetchAllProducts();
  }

  fetchAllProducts(): void {
    this.ProductService.getProducts()
      .subscribe(produtos => this.produtos = produtos);
  }

  deleteProduct(produto: Product): void {
    if (!produto.id) return;
    const confirmed = confirm("Você deseja deletar esse item permanentemente?");
    if (confirmed) {
      this.ProductService.deleteProduct(produto.id)
        .subscribe(
          () => {
            this.fetchAllProducts();
          },
          error => console.log(error)
        )
    }
  }

  addProduct(): void {
    const newProduct = this.productForm.value as Partial<Product>;
    this.ProductService.createProduct(newProduct as Product)
      .subscribe(
        res => {
          this.fetchAllProducts();
          this.productForm.reset();
        },
        error => console.log(error)
      )
  }
}
