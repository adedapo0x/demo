import { Types, Schema, model, SchemaType } from "mongoose";
import { required } from "zod/mini";

interface IContent {
    _id: Types.ObjectId,
    title: string,
    contentImage?: string,
    summary: string,
    description?: string,
    contentUrl: string,
    category: string,
    premium: boolean,
    tags: string[],
    createdBy: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date
}

const ContentSchema = new Schema<IContent>({
    title: { type: String, required: true },
    contentImage: { type: String },
    summary: { type: String, required: true },
    description: { type: String },
    contentUrl: { type: String, required: true },
    category: { type: String, required: true },
    premium: {type: Boolean, default: false},
    tags: [{ type: String, required: true }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {
    timestamps: true
})


export const Content = model<IContent>("Content", ContentSchema)