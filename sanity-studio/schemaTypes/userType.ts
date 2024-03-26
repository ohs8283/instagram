import {defineField, defineType} from 'sanity'

export const userType = defineType({
  title: 'User',
  name: 'user',
  type: 'document',
  fields: [
    defineField({
      title: 'Username',
      name: 'username',
      type: 'string',
    }),
    defineField({
      title: 'Name',
      name: 'name',
      type: 'string',
    }),
    defineField({
      title: 'Email',
      name: 'email',
      type: 'string',
    }),
    defineField({
      title: 'Image',
      name: 'image',
      type: 'string',
    }),
    defineField({
      title: 'Following',
      name: 'following',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'user',
            },
          ],
        },
      ],

      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      title: 'Followers',
      name: 'followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'user',
            },
          ],
        },
      ],

      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {
              type: 'post',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.unique(),
    }),
  ],
})
