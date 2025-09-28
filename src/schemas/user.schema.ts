import {z} from "zod"


const userSignUpSchema = {
    body: z.object({
        firstName: z.string().trim().min(2, "First name must be at least 2 characters long"),
        lastName: z.string().trim().min(2, "Last name must be at least 2 characters long"),
        email: z.email(),
        password: z.string().trim().min(8, "Passwword must be at least 8 characters long")
    })
}


export type UserSignUpSchema = z.infer<typeof userSignUpSchema>