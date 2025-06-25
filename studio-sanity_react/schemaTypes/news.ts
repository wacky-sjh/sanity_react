import {defineField, defineType} from 'sanity'

export const news = defineType({
  name: 'news',
  title: '뉴스',
  type: 'document',
  fields: [
    defineField({
      name: 'language',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: '한국어', value: 'ko'},
          {title: 'English', value: 'en'},
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      validation: (Rule) => Rule.required().error('언어는 필수입니다.'),
    }),
    defineField({
      name: 'title',
      title: '제목',
      type: 'string',
      validation: (Rule) => Rule.required().error('제목은 필수입니다.'),
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
      validation: (Rule) => Rule.required().error('내용은 필수입니다.'),
    }),
    defineField({
      name: 'createdAt',
      title: '작성일',
      type: 'datetime',
      initialValue: new Date().toISOString(),
      hidden: true, // Studio에서 안 보이게
    }),
  ],
})
