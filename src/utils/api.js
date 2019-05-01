import r from './request'

// user
export const login = p => r.post('/api/user/login', p)

// post
export const newPost = p => r.post('/api/articles', p)
export const getPost = p => r.get('/api/articles', {params: p})
export const delPost = id => r.delete(`/api/articles/${id}`)
export const getPostById = id => r.get(`/api/articles/${id}`)
export const editPost = p => r.put(`/api/articles/${p.id}`, p)

// gather
export const newGather = p => r.post('/api/gather', p)
export const getGather = p => r.get('/api/gather', {params: p})
export const delGather = p => r.delete('/api/gather', {data: p})
export const getGatherById = p => r.get('/api/gather/id', {params: p})
export const editGather = p => r.put('/api/gather', p)

// test
export const qn = p => r.get('/api/common/qn', {params: p})

// tags
export const getTags = _ => r.get('/api/tags')
