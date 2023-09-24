import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  category_name;

  
}
