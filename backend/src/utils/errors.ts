import { Request, Response, NextFunction } from 'express'

export function handleAsync(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(next)
    }
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    console.error(err)

    if (err.code === '23505') {
        return res.status(409).json({ error: 'App already exists' })
    }

    const status = err.status || 500
    const message = err.message || 'Internal server error'
    res.status(status).json({ error: message })
}

export class AppError extends Error {
    constructor(public status: number, message: string) {
        super(message)
        this.name = 'AppError'
    }
}
