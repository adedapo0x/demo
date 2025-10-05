import type { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catch-async.js";
import jwt from "jsonwebtoken"
import type { DecodedToken } from "../types/express.js";

export const authenticateToken = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization
    if ( !authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({ message: "Unauthorized, Please log in to gain access"})
    }

    const token = authHeader.split(" ")[1]
    if (!token){
        return res.status(401).json({message: "Invalid format"})
    }

    if (!process.env.JWT_SECRET){
        throw new Error("JWT token not defined")
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (typeof decoded === "string"){
        throw new Error("Invalid token error")
    }

    req.user = decoded as DecodedToken
    next()
})