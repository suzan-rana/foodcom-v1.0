import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductInputPagination, ProductSort } from './dto/product-input.dto';

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

  async findAll(productInput: ProductInputPagination) {
    const qb = this.productRepository.createQueryBuilder('product');

    switch (productInput.sort) {
      case 'ID_ASC': {
        qb.orderBy('id', 'ASC');
        break;
      }
      case 'ID_DESC': {
        qb.orderBy('id', 'DESC');
        break;
      }
      case 'NAME_ASC': {
        qb.orderBy('name', 'ASC');
        break;
      }
      case 'NAME_DESC': {
        qb.orderBy('name', 'DESC');
        break;
      }
      case 'PRICE_ASC': {
        qb.orderBy('price', 'ASC');
        break;
      }
      case 'PRICE_DESC': {
        qb.orderBy('price', 'DESC');
        break;
      }
    }
    if (productInput.search_text) {
      qb.where('product.name LIKE :search_text', {
        search_text: `%${productInput.search_text}%`,
      });
    }
    return await qb.skip(productInput.skip).take(productInput.take).getMany();
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
