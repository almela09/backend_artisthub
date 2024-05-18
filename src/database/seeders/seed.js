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

    const users = [
        {
            name: 'Pau',
            nick: 'Paulilla',
            email: 'paula@paula.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'leonor',
            nick: 'leo',
            email: 'leo@leo.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'carla',
            nick: 'kumistar',
            email: 'carla@carla.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'miguel angel',
            nick: 'almela',
            email: 'almela@almela.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'paco',
            nick: 'paco@paco.com',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'marco',
            nick: 'marco polo',
            email: 'marco@marco.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'Paula',
            nick: 'Kaola',
            email: 'paola@paola.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'pedro',
            nick: 'perosperos',
            email: 'pedro@pedro.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'Andreu',
            nick: 'Dru',
            email: 'andreu@andreu.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'Leonor',
            nick: 'Leo',
            email: 'leonor@leonor.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'Carmen',
            nick: 'Carmencilla',
            email: 'carmen@carmen.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: 'Mateo',
            nick: 'Teo',
            email: 'mateo@mateo.com',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        {
            name: '',
            nick: '',
            email: '',
            password: bcrypt.hashSync("123456", 12),
            biography: '',
            avatar:'',
            role: 'user'
        },
        
        
    ];

    try {
        await admin.save();
        await superAdmin.save();

        for (const userData of users) {
            const user = new User(userData);
            await user.save();
        }

        console.log('Admin, Super Admin, and Users seeded successfully');
    } catch (error) {
        console.error('Error seeding users: ', error);
    }
}

seed();