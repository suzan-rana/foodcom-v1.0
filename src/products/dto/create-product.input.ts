import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { Product } from '../entities/product.entity';

@InputType()
export class CreateProductInput extends PickType(
  Product,
  ['name', 'price', 'description'] as const,
  InputType,
) {}
