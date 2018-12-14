import r from './request'

// user
export const login = p => r.post('/api/user/login', p)

// post
export const newPost = p => r.post('/api/post', p)
export const getPost = p => r.get('/api/post', {params: p})
export const delPost = p => r.delete('/api/post', {data: p})
export const getPostById = p => r.get('/api/post/id', {params: p})
export const editPost = p => r.put('/api/post', p)

// gather
export const newGather = p => r.post('/api/gather', p)
export const getGather = p => r.get('/api/gather', {params: p})
export const delGather = p => r.delete('/api/gather', {data: p})
export const getGatherById = p => r.get('/api/gather/id', {params: p})
export const editGather = p => r.put('/api/gather', p)

// test
export const test = p => r.get('/api/common/test', {params: p})
