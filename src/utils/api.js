import r from './request'

// user
export const login = p => r.post('/api/user/login', p)

// post
export const newPost = p => r.post('/api/post', p)
export const getPost = p => r.get('/api/post', {params: p})
export const delPost = p => r.delete('/api/post', {data: p})
export const getPostById = p => r.get('/api/post/id', {params: p})
