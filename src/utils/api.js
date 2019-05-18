import r from './request'

// user
export const login = p => r.post('/api/user/login', p)
export const logout = id => r.post(`/api/user/logout/${id}`)

// post
export const newPost = p => r.post('/api/articles', p)
export const getPost = p => r.get('/api/articles', {params: p})
export const delPost = id => r.delete(`/api/articles/${id}`)
export const getPostById = id => r.get(`/api/articles/${id}`)
export const editPost = p => r.put(`/api/articles/${p.id}`, p)

// gather
export const newGather = p => r.post('/api/gathers', p)
export const getGather = p => r.get('/api/gathers', {params: p})
export const delGather = id => r.delete(`/api/gathers/${id}`)
export const getGatherById = id => r.get(`/api/gathers/${id}`)
export const editGather = p => r.put(`/api/gathers/${p.id}`, p)

// test
export const qn = p => r.get('/api/common/qn', {params: p})

// tags
export const getTags = _ => r.get('/api/tags')

// says
export const newSay = p => r.post('/api/says', p)
export const getSay = p => r.get('/api/says', {params: p})
export const getSayById = id => r.get(`/api/says/${id}`)
export const editSay = p => r.put(`/api/says/${p.id}`, p)
