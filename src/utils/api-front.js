import r from './request'

export const getPostsFront = params => r('/api/post', {params})
