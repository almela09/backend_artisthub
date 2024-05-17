import { dbConnection } from "../db.js";
import mongoose from "mongoose";
import "dotenv/config";
import bcrypt from "bcrypt"
import User from "../../models/User.js";


dbConnection();
const seed = async () => {
    const admin = new User({
        name: 'Admin',
        nick: 'admin',
        email: 'admin@example.com',
        password: bcrypt.hashSync("123456789", 12), 
        role: 'admin'
    });

    const superAdmin = new User({
        name: 'Super Admin',
        nick: 'superadmin',
        email: 'superadmin@example.com',
        password: bcrypt.hashSync("123456789", 12), 
        role: 'super_admin'
    });

    try {
        await admin.save();
        await superAdmin.save();
        console.log('Admin and Super Admin seeded successfully');
    } catch (error) {
        console.error('Error seeding admin and super admin: ', error);
    }
}
seed();   