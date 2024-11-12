import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { modelUser } from "../models/model.User.js";

const nameRegex = /^[a-zA-Z\s]+$/;

//Method for registering new users
export const registerUser = async (req, res) => {
    try {
        //Validate name
        if (!nameRegex.test(req.body.name)) {
            return res.status(400).json({ message: "Name must have only letters and spaces." });
        }

        //Create user
        const hash = await bcrypt.hash(req.body.password, 10);
        const user = {
            name: req.body.name,
            mail: req.body.mail,
            password: hash,
            curp: req.body.curp,
            role: req.body.role
        };
        await modelUser.create(user);
        return res.status(201).json({ message: "User created successfully." });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Error when creating user.", details: e.message });
    }
}

//Login with user
export const login = async (req, res) => {
    try {
        //Get mail and password
        const mail = req.body.mail;
        const password = req.body.password;

        //Validate that mail and password were sent
        if (!mail || !password) {
            return res.status(400).json({ message: "You must enter a password and mail account." });
        }

        //Check that user exists
        const user = await modelUser.findOne({ mail });
        if (!user) {
            return res.status(400).json({ message: "Invalid login." });
        }

        //Validate password
        if (!bcrypt.compare(password, user.password)) {
            return res.status(400).json({ message: "Invalid login." });
        }

        //Create login token
        const token = jwt.sign({ userID: user._id }, 'supersecretsauce', { expiresIn: '1h' });

        return res.status(202).json({ token });
    } catch (e) {
        //Error handling
        console.error(e);
        return res.status(500).json({ error: "Error while logging in.", details: e.message });
    }
}

//Update user
export const updateUser = async (req, res) => {
    try {
        //Search for user
        const user = await modelUser.findById(req.params._id);
        if (!user) {
            return res.status(404).json({ message: "No such user." });
        }

        //Update user information
        user.name = req.body.name ? req.body.name : user.name;
        user.mail = req.body.mail ? req.body.mail : user.mail;
        user.curp = req.body.curp ? req.body.curp : user.curp;
        user.role = req.body.role ? req.body.role : user.role;

        //Update password
        if (!bcrypt.compare(req.body.password, user.password)) {
            const newPass = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, newPass);
        }

        //Save user info
        await user.save();

        return res.status(200).json({ message: "User successfully updated." });

    } catch (e) {
        //Error handling
        console.error(e);
        return res.status(500).json({ error: "Error when updating user.", details: e.message });
    }
}