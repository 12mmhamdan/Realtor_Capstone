import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.js';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables from .env file


const router = express.Router();
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (user) {
        return res.json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new UserModel({username, password: hashedPassword});
    await newUser.save()

    res.json({ message: "User added successfuly!" });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });

    if (!user) {
        return res.json({ message: "User does not exist."});
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.json({ message: "Username or Password is incorrect."})
    }

    const token = jwt.sign({id: user._id}, SECRET_KEY);
    res.json({ token, userID: user._id });

});

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, SECRET_KEY, (err) => {
            if (err) return res.sendStatus(403);
            next();
        })
    } else {
        res.sendStatus(401);
    }
};



router.put("/user/:id", verifyToken, async (req, res) => {
    const { id } = req.params;
    const { username, password, newPassword } = req.body;

    try {
        // Find the user by ID
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Check if the user is updating their own information
        const token = req.headers.authorization;
        const decodedToken = jwt.decode(token.replace("Bearer ", ""));
        if (!decodedToken || decodedToken.id !== user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized. You can only update your own information." });
        }

        // If the user wants to update the password, check if the current password is correct
        if (password) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Current password is incorrect." });
            }

            // Hash and update the new password
            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedNewPassword;
        }

        // If the user wants to update the username, check if it's not already taken
        if (username && username !== user.username) {
            const existingUser = await UserModel.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: "Username is already taken." });
            }

            user.username = username;
        }

        // Save the updated user information
        await user.save();

        res.json({ message: "User information updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});




export { router as userRouter };

