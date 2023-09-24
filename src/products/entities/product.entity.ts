import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field(() => Float)
  price: number;

  @Column({
    type: 'boolean',
    default: true,
  })
  @Field(() => Boolean)
  is_veg: boolean;

  @Column()
  @Field()
  category_id: string;

  // relations
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  @Field(() => Category)
  category: Category;
}
