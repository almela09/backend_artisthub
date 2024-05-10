import { Schema, model } from "mongoose";

const commentSchema = new Schema({

    content: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    publicationId: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    }
    ,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Comment = model('Comment', commentSchema)
export default Comment;