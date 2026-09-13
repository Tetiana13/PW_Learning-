import { faker } from '@faker-js/faker';

export interface MockProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  co2_rating: string;
  in_stock: boolean;
  is_eco_friendly: boolean;
  product_image: {
    file_name: string;
    title: string;
  };
  category: {
    name: string;
    slug: string;
  };
  brand: {
    id: string;
    name: string;
  };
}

export const mockedProducts: MockProduct[] = Array.from({ length: 20 }, (_, index) => {
  const productName = `${faker.commerce.productName()} ${index + 1}`;
  const categoryName = faker.commerce.department();

  return {
    id: faker.string.uuid(),
    name: productName,
    description: faker.commerce.productDescription(),
    price: Number(faker.commerce.price({ min: 10, max: 100, dec: 2 })),
    co2_rating: faker.helpers.arrayElement(['A', 'B', 'C', 'D', 'E']),
    in_stock: faker.datatype.boolean(),
    is_eco_friendly: faker.datatype.boolean(),
    product_image: {
      file_name: `${faker.string.alphanumeric(10)}.avif`,
      title: productName,
    },
    category: {
      name: categoryName,
      //name: 'Hand Tools',
      slug: faker.helpers.slugify(categoryName).toLowerCase(),
      //slug: 'hand-tools'
    },
    brand: {
      id: faker.string.uuid(),
      name: faker.company.name(),
    },
  };
});
