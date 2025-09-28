import { ZodType, ZodObject,  } from "zod"
import type { Request, Response, NextFunction } from "express"

type RequestSchema = {
    body ?: ZodType
    query ?: ZodType
    params ?: ZodType
}

const validateReq = <T extends RequestSchema>(schema: T) => 
    (req: Request, res: Response, next: NextFunction) => {

        const data: Record<string, unknown> = {}
        if (schema.body) data.body = req.body
        if (schema.params) data.params = req.params
        if (schema.query) data.query = req.query

        const result = (schema as unknown as ZodObject).safeParse(data)

        if (!result.success){
             return res.status(400).json({
                status: "error",
                errors: result.error.issues.map(e => ({
                    path: e.path.join("."),
                    message: e.message
                }))
             })
        }

        if (schema.body) req.body = result.data.body 
        if (schema.query) req.query = result.data.query as any
        if (schema.params) req.params = result.data.params as any

        next()
    }