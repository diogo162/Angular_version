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
    id: [''],
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
          console.log('Produto adicionado com sucesso');
          this.fetchAllProducts();
          this.productForm.reset();
          this.modalActive = false;
          this.modalEdit = false;
        },
        error => console.log(error)
      )
  }

  editProduct(produto: Product) {
    this.productForm.patchValue({
      id: produto.id,
      tipo: produto.tipo,
      modelo: produto.modelo,
      preco: produto.preco,
      quantidade: produto.quantidade,
      imagem: produto.imagem
    });
    this.modalEdit = true;
  }

  updateProduct() {
    const updatedProduct = this.productForm.getRawValue();
    this.ProductService.updateProduct(updatedProduct, updatedProduct.id)
      .subscribe(
        res => {
          console.log('Produto editado com sucesso');
          this.fetchAllProducts();
          this.productForm.reset();
          this.modalEdit = false;
        },
        error => console.log(error)
      )
  }

  closeModalEdit(): void {
    this.modalEdit = false;
    this.productForm.reset();
  }

  closeModalAdd(): void {
    this.modalActive = false;
    this.productForm.reset();
}

}
  
