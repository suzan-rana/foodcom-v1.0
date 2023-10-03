import { Field, InputType } from '@nestjs/graphql';

export enum ProductSort {
  ID_ASC = 'ID_ASC',
  ID_DESC = 'ID_DESC',
  NAME_ASC = 'NAME_ASC',
  NAME_DESC = 'NAME_DESC',
  PRICE_ASC = 'PRICE_ASC',
  PRICE_DESC = 'PRICE_DESC',
}

type MakeUnionType<TObject extends Object> = keyof TObject;
type TProductSort = MakeUnionType<typeof ProductSort>;
@InputType()
export class ProductInputPagination {
  @Field({
    defaultValue: 0,
  })
  skip: number;

  @Field({
    defaultValue: 10,
  })
  take: number;

  @Field()
  sort: TProductSort;

  @Field(() => String, {
    nullable: true,
  })
  search_text: string;
}
