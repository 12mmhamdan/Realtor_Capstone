import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserModel } from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config(); 


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

    const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token, userID: user._id });

});

export const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    console.log("Received token:", token);

    if (token) {
        jwt.verify(token.replace("Bearer ", ""), SECRET_KEY, (err, decodedToken) => {
            if (err) {
                console.error("Token verification failed:", err);
                return res.sendStatus(403);
            }
            
            console.log("Decoded token:", decodedToken);
            next();
        });
    } else {
        console.error("No token provided.");
        res.sendStatus(401);
    }
};




router.put("/users/:id", verifyToken, async (req, res) => {
    const id = req.params.id;
    const { username, password, newPassword } = req.body;

    try {
        const user = await UserModel.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const token = req.headers.authorization;
        const decodedToken = jwt.decode(token.replace("Bearer ", ""));
        if (!decodedToken || decodedToken.id !== user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized. You can only update your own information." });
        }

        if (password) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: "Current password is incorrect." });
            }

            if (newPassword) {
                const hashedNewPassword = await bcrypt.hash(newPassword, 10);
                user.password = hashedNewPassword;
            }
        }

        if (username && username !== user.username) {
            const existingUser = await UserModel.findOne({ username });

            if (existingUser) {
                return res.status(400).json({ message: "Username is already taken." });
            }

            user.username = username;
        }

        await user.save();

        res.json({ message: "User information updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});


router.get("/users", async (req, res) => {
    try {
        const users = await UserModel.find();

        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

router.get("/users/:id", async (req, res) => {
    try {
        const userID = req.params.id; 

        const user = await UserModel.findById(userID);

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});


router.post("/check-username", async (req, res) => {
    try {
        const { username } = req.body;

        const existingUser = await UserModel.findOne({ username });

        if (existingUser) {
            res.json({ message: "Username already exists" });
        } else {
            res.json({ message: "Username is available" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});

router.delete("/users/:id", verifyToken, async (req, res) => {
    try {
        const userID = req.params.id; 

        const deletedUser = await UserModel.findByIdAndRemove(userID);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        res.json({ message: "User deleted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error." });
    }
});






export { router as userRouter };

