import type { Request, Response, NextFunction } from "express"

export const catchAsync = ( fnc: (req: Request, res: Response, next: NextFunction) => Promise<any> ) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fnc(req, res, next).catch(next)
    }
}

