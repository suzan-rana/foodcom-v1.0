import { InputType, Int, Field, PickType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';

@InputType()
export class CreateCategoryInput extends PickType(
  Category,
  ['category_name'] as const,
  InputType,
) {}
