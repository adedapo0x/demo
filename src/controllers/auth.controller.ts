import type { NextFunction, Request, Response } from "express";
import app from "../app.js";
import bcrypt from "bcrypt"
import { User } from "../models/user.models.js"
import {catchAsync } from "../utils/catch-async.js"
import { generateAccessToken } from "../utils/generate-access.js";

export const userSignUp = catchAsync(async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, role } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await User.findOne({ email })
    if (existingUser) {
        return res.status(400).json({ message: "User already exists"})
    }

    const newUser = await User.create({
        firstName, lastName, email, hashedPassword, role
    })

    if (!newUser){
        return res.status(400).json({ message: "Invalid user credentials"})
    }

    const token = generateAccessToken({ id: newUser.id, role: newUser.role})

    const result = newUser.toJSON()

    return res.status(201).json({
        status: "success",
        message: "User created sucessfully",
        token,
        result
    })
})

export const userLogIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({message: "Please provide new email address"})
    }

    const result = await User.findOne({ email })
    if (!result || !await bcrypt.compare(password, result.hashedPassword)){
        return res.status(401).json({message: "Incorrect email or password"})
    }

    const token = generateAccessToken({ id: result.id, role: result.role })
    return res.json({
        status: "success", token
    })
})




    