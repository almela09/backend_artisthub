
import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        default: "your_name"
    },
    nick: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    biography: {
        type: String,
        default: ""
    },
    avatar: {
        type: String,
        default: "default.png"
    },
    socialNetwork: [{
        name: {
            type: String,
            default: ""
        },
        url: {
            type: String,
            default: ""
        }
    }],
    role: {
        type: String,
        enum: ["user", "admin", "super_admin"],
        default: "user"
    }
});

const User = model('User', UserSchema);

export default User;