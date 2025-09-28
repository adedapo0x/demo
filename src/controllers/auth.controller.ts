import type { Request, Response } from "express";
import app from "../app.js";
import bcrypt from "bcrypt"
import { User } from "../models/user.models.js"
import {catchAsync } from "../utils/catch-async.js"
import { generateAccessToken } from "../utils/generate-access.js";

export const userSignUp = catchAsync(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: "User already exists"})
    }

    const newUser = await User.create({
        firstName, lastName, email, hashedPassword
    })

    if (!newUser){
        return res.status(400).json({ message: "Invalid user credentials"})
    }

    const result = newUser.toJSON()

    result.token = generateAccessToken({ userID: result.id, role: result.role})

})

    