import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  groups: [
    {name: 'overview', title: 'Overview', default: true},
    {name: 'details', title: 'Property details'},
    {name: 'media', title: 'Photos'},
  ],
  fields: [
    defineField({name: 'title', title: 'Property title', type: 'string', group: 'overview', validation: (Rule) => Rule.required().min(5).max(90)}),
    defineField({name: 'slug', title: 'Page address', type: 'slug', group: 'overview', options: {source: 'title', maxLength: 90}, validation: (Rule) => Rule.required()}),
    defineField({name: 'listingType', title: 'Offer type', type: 'string', group: 'overview', options: {list: [{title: 'For sale', value: 'sale'}, {title: 'For rent', value: 'rent'}], layout: 'radio'}, initialValue: 'sale', validation: (Rule) => Rule.required()}),
    defineField({name: 'status', title: 'Listing status', type: 'string', group: 'overview', description: 'Only Available properties appear in public search.', options: {list: [{title: 'Available', value: 'available'}, {title: 'Reserved', value: 'reserved'}, {title: 'Sold', value: 'sold'}, {title: 'Rented', value: 'rented'}, {title: 'Hidden', value: 'hidden'}]}, initialValue: 'available', validation: (Rule) => Rule.required()}),
    defineField({name: 'featured', title: 'Feature on homepage', type: 'boolean', group: 'overview', initialValue: false}),
    defineField({name: 'shortDescription', title: 'Short introduction', type: 'text', rows: 3, group: 'overview', validation: (Rule) => Rule.required().max(240)}),
    defineField({name: 'description', title: 'Full description', type: 'text', rows: 8, group: 'overview', validation: (Rule) => Rule.required().max(5000)}),
    defineField({name: 'price', title: 'Price', type: 'number', group: 'overview', description: 'Use the listing currency. For rent, enter the monthly amount.', validation: (Rule) => Rule.required().positive()}),
    defineField({name: 'currency', title: 'Currency', type: 'string', group: 'overview', options: {list: [{title: 'Euro (€)', value: 'EUR'}, {title: 'US dollar ($)', value: 'USD'}, {title: 'Pound sterling (£)', value: 'GBP'}]}, initialValue: 'EUR', validation: (Rule) => Rule.required()}),
    defineField({name: 'city', title: 'City / region', type: 'string', group: 'details', validation: (Rule) => Rule.required()}),
    defineField({name: 'neighborhood', title: 'Neighbourhood', type: 'string', group: 'details'}),
    defineField({name: 'country', title: 'Country', type: 'string', group: 'details', initialValue: 'Greece', validation: (Rule) => Rule.required()}),
    defineField({name: 'propertyType', title: 'Property type', type: 'string', group: 'details', options: {list: ['Apartment', 'Villa', 'Townhouse', 'Land', 'Commercial', 'Other']}, validation: (Rule) => Rule.required()}),
    defineField({name: 'bedrooms', title: 'Bedrooms', type: 'number', group: 'details', validation: (Rule) => Rule.min(0).integer()}),
    defineField({name: 'bathrooms', title: 'Bathrooms', type: 'number', group: 'details', validation: (Rule) => Rule.min(0).integer()}),
    defineField({name: 'area', title: 'Interior area (m²)', type: 'number', group: 'details', validation: (Rule) => Rule.positive()}),
    defineField({name: 'features', title: 'Highlights', type: 'array', of: [{type: 'string'}], group: 'details', description: 'Add one short feature per line.'}),
    defineField({name: 'coverImage', title: 'Main property photo', type: 'image', group: 'media', options: {hotspot: true}, fields: [{name: 'alt', title: 'Photo description (alt text)', type: 'string', validation: (Rule) => Rule.required()}], validation: (Rule) => Rule.required()}),
    defineField({name: 'gallery', title: 'Additional photos', type: 'array', group: 'media', of: [{type: 'image', options: {hotspot: true}, fields: [{name: 'alt', title: 'Photo description (alt text)', type: 'string', validation: (Rule) => Rule.required()}]}]}),
  ],
  preview: {select: {title: 'title', subtitle: 'city', media: 'coverImage'}},
})
