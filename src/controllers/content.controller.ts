import { catchAsync } from "../utils/catch-async.js";
import  type { Request, Response, NextFunction } from "express"

const createProject = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, projectImage, shortDescription,
     description, projectUrl, category, tags } = req.body
    
    const userID = req.user.userID

    c
})