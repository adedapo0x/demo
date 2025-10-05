import { catchAsync } from "../utils/catch-async.js";
import type { Request, Response, NextFunction } from "express"
import { Content } from "../models/content.model.js";

export const createContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { title, projectImage, summary,
     description, projectUrl, category, tags } = req.body
    
    if (!req.user){
        return res.status(401).json({"message": "User is not authenticated"})
    }
    const userID = req.user.id

    const newContent = await Content.create({
        title, projectImage, summary, description, projectUrl, category, tags, createdBy: userID
    })

    return res.status(201).json({
        status: "success",
        data: newContent
    })
})


export const getUserContents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { userID } = req.params

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const contents = await Content.find({ createdBy: userID })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name");

    const total = await Content.countDocuments({ createdBy: userID });

    return res.status(200).json({
        status: "success",
        results: contents.length,
        pagination: {
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      },
        data: contents,
    });

})


export const getContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { contentID } = req.params

    const content = await Content.findById(contentID).populate("createdBy", "name role").exec()

    if (!content){
        return res.status(400).json({message: "Content not found"})
    }

    const userRole = req.user!.role

    if (content.premium && userRole === 2){
        return res.status(403)
        .json({ message: "Access denied. Upgrade to a premium plan to view this content." });

    }
    res.json({
        status: "success",
        data: content
    })
})


export const updateContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { contentID } = req.params
    const body = req.body

    const content = await Content.findById(contentID)
    if (!content){
        return res.status(400).json({message: "Invalid content ID. Content not found"})
    }

    if (!(req.user!.id === content.createdBy.toString())){
        return res.status(403).json({
            status: "Forbidden",
            message: "You do not have permission to perform this action!"
        })
    }

    content.title = body.title ?? content.title
    content.contentImage = body.contentImage ?? content.contentImage
    content.summary = body.summary ?? content.summary
    content.description = body.description ?? content.description
    content.contentUrl = body.contentUrl ??content.contentUrl
    content.category = body.cateegory ?? content.category
    content.tags = body.tags ?? content.tags

    const updatedContent = await content.save()
    return res.json({
        status: "success",
        message: "Content updated successfully",
        data: updatedContent
    })
})


export const deleteContent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { contentID } = req.params
    const body = req.body

    const content = await Content.findById(contentID)
    if (!content){
        return res.status(400).json({message: "Invalid content ID. Content not found"})
    }

    if (content.createdBy.toString() !== req.user!.id && req.user!.role !== 0){
        return res.status(403).json({
            status: "Forbidden",
            message: "You do not have permission to perform this action!"
        })
    }

    await content.deleteOne()

    return res.json({
        status: "success",
        message: "content deleted successfully"
    })
})