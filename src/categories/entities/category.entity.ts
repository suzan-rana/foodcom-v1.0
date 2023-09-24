import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'Primary key field (placeholder)' })
  id: string;

  @Column({
    unique: true,
  })
  @Field()
  category_name: string;

  @OneToMany(() => Product, (product) => product.category)
  @Field(() => [Product])
  products: Product[];
}
