import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: '뉴스',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
    }),
    defineField({
      name: 'thumbnail',
      title: '썸네일',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'content',
      title: '내용',
      type: 'array',
      of: [{type: 'block'}, {type: 'image', options: {hotspot: true}}], // hotspot: true 이미지 클릭 시 확대 가능
    }),
    defineField({
      name: 'createdAt',
      title: '작성일',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    }),
  ],
})
