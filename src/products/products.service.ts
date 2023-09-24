import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  create(createProductInput: CreateProductInput) {
    return this.productRepository.save({
      ...createProductInput,
    });
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: string, updateProductInput: UpdateProductInput) {
    return `This action updates a #${id} product`;
  }

  remove(id: string) {
    return `This action removes a #${id} product`;
  }
}
