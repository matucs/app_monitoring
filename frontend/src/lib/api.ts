import axios from 'axios'
import type { App, Screenshot } from '../types'

const api = axios.create({ baseURL: '/api' })

export const getApps = () => api.get<App[]>('/apps').then(r => r.data)
export const getApp = (id: string) => api.get<App>(`/apps/${id}`).then(r => r.data)
export const createApp = (url: string, name?: string) => 
  api.post<App>('/apps', { url, name }).then(r => r.data)
export const updateApp = (id: string, name: string) => 
  api.put<App>(`/apps/${id}`, { name }).then(r => r.data)
export const deleteApp = (id: string) => api.delete(`/apps/${id}`)
export const getScreenshots = (appId: string) => 
  api.get<Screenshot[]>(`/apps/${appId}/screenshots`).then(r => r.data)
export const captureScreenshot = (appId: string) => 
  api.post<Screenshot>(`/apps/${appId}/screenshots`).then(r => r.data)
