import axios from 'axios'
import type { App, Screenshot } from '../types'

const api = axios.create({
    baseURL: '/api',
})

export async function getApps(): Promise<App[]> {
    const res = await api.get('/apps')
    return res.data
}

export async function getApp(id: string): Promise<App> {
    const res = await api.get(`/apps/${id}`)
    return res.data
}

export async function createApp(url: string, name?: string): Promise<App> {
    const res = await api.post('/apps', { url, name })
    return res.data
}

export async function updateApp(id: string, name: string): Promise<App> {
    const res = await api.put(`/apps/${id}`, { name })
    return res.data
}

export async function deleteApp(id: string): Promise<void> {
    await api.delete(`/apps/${id}`)
}

export async function getScreenshots(appId: string): Promise<Screenshot[]> {
    const res = await api.get(`/apps/${appId}/screenshots`)
    return res.data
}

export async function captureScreenshot(appId: string): Promise<Screenshot> {
    const res = await api.post(`/apps/${appId}/screenshots`)
    return res.data
}
