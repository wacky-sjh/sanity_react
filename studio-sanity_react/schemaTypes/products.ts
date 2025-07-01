import type {Rule} from 'sanity'

export const products = {
  name: 'product',
  title: '상품',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '상품명',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: '설명',
      type: 'text',
    },
    {
      name: 'price',
      title: '가격',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: 'image',
      title: '이미지',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
}
