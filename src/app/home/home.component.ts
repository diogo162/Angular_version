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
  modalEdit = false;
  productForm = this.fb.nonNullable.group({
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
    const newProduct = this.productForm.getRawValue();
    this.ProductService.createProduct(newProduct)
      .subscribe(
        res => {
          console.log('Produto atualizado com sucesso');
          this.fetchAllProducts();
          this.productForm.reset();
        },
        error => console.log(error)
      )
  }

  updateProduct(produto: Product): void {
    if (!produto.id) {
      console.log('ID do produto não especificado');
      return;
    }
    this.ProductService.updateProduct(produto, produto.id)
      .subscribe(() => {
          console.log('Produto atualizado com sucesso');
          this.fetchAllProducts();
        },
        error => console.log(error)
      );
  }
}
