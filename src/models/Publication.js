import { Schema, model } from "mongoose";

const PublicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",

    },
    title: {

        type: String,
        required: false,

    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: ""
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    like: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false

        }
    ]
},
    {
        timestamps: true,
        versionKey: false,
    }

);
const Publication = model('Publication', PublicationSchema);
export default Publication;