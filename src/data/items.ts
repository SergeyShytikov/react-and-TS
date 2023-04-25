export type Item = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export const services: Item[] = [
  {
    description: 'Professional dog walks for busy owners.',
    id: 1,
    name: 'Dog Walking Service',
    price: 30,
  },
  {
    description: ' Get your home spotless with our expert cleaners.',
    id: 2,
    name: 'House Cleaning Service',
    price: 120,
  },
];

export const products: Item[] = [
  {
    description: 'A collection of navigational components that compose declaratively with your app',
    id: 1,
    name: 'React Router',
    price: 8,
  },
  {
    description: 'A library that helps manage state across your app',
    id: 2,
    name: 'React Redux',
    price: 12,
  },
  {
    description: 'A library that helps you implement robust forms',
    id: 3,
    name: 'React Hook Form',
    price: 9,
  },
  {
    description: 'A library that helps you interact with a REST API',
    id: 4,
    name: 'React Apollo',
    price: 10,
  },
  {
    description: 'A library that provides utility CSS classes',
    id: 5,
    name: 'Tailwind CSS',
    price: 7,
  },
];
