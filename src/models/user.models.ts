import { model, Schema } from "mongoose"

interface IUser {
    _id: string
    firstName: string
    lastName: string
    email: string
    hashedPassword: string,
    role: number
}

const userSchema = new Schema<IUser>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    hashedPassword: { type: String, required: true },
    role: { type: Number, required: true, default: 0}
}, {
    timestamps: true
})

userSchema.set("toJSON", {
    transform: (doc, ret: any) => {
        delete ret.hashedPassword
        delete ret.__v
        return ret
    }
})


export const User = model<IUser>("User", userSchema)

