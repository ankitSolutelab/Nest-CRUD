import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductService {
  private products: Product[] = [];

  private findProduct(prodId: number): [Product, number] {
    const productindex = this.products.findIndex((prod) => prod.id == prodId);
    const product = this.products[productindex];
    if (!product) throw new NotFoundException('Could not find a product');
    return [product, productindex];
  }

  insertProduct(title: string, desc: string, price: number): number {
    const prodId = this.products.length + 1;
    const newProduct = new Product(
      this.products.length + 1,
      title,
      desc,
      price,
    );
    this.products.push(newProduct);
    return prodId;
  }

  getAllproducts() {
    return [...this.products];
  }

  getSingleProduct(id: number) {
    const product = this.findProduct(id)[0];
    return { ...product };
  }

  updateProduct(id: number, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(id);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (desc) {
      updatedProduct.desc = desc;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;
  }

  deleteProduct(prodId: number) {
    const index = this.findProduct(prodId)[1];
    this.products.splice(index, 1);
  }
}
