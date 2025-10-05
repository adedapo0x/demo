import {z} from "zod"


const userSignUpSchema = {
    body: z.object({
        firstName: z.string().trim().min(2, "First name must be at least 2 characters long"),
        lastName: z.string().trim().min(2, "Last name must be at least 2 characters long"),
        email: z.email(),
        password: z.string().trim().min(8, "Passwword must be at least 8 characters long"),
        role: z.number().int().min(0, "Invalid role value").max(2, "Invalid role value")
    })
}

const userLogInSchema = {
    body: z.object({
        email: z.email(),
        password: z.string().trim().nonempty("Password field cannot be empty")
    })
}

export type UserSignUpSchema = z.infer<typeof userSignUpSchema>