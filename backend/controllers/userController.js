import { User } from "../models/userModel.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        console.log("register controller called...");
        const { fullName, username, password, confirmPassword, gender, email } = req.body;
        if (!fullName || !username || !password || !confirmPassword || !gender || !email) {
            return res.status(400).json({ message: "All fields are required!" });
        }
        if (password !== confirmPassword) {
            return res
                .status(400)
                .json({
                    message: "Password doesn't match!",
                    success: false
                });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res
                .status(400)
                .json({
                    message: "user already exists, try with another username!",
                    success: false
                });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //profile photo
        const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        await User.create({
            fullName,
            username,
            password: hashedPassword,
            gender,
            email,
            profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
        });
        return res
            .status(201)
            .json({
                message: "account created successfully!",
                success: true
            });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ message: "Error in register controller!" })
    }
};

export const Login = async (req, res) => {
    try {
        console.log("Login controller called...");
        const { username, password } = req.body;

        //validation of all fields
        if (!username || !password) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        //check user exists(user validation)
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({
                message: "Invalid username or password!",
                success: false
            });
        }

        //check password(password validation)
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Invalid username or password!",
                success: false
            });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
        return res
            .status(200)
            .cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' })
            .json({
                message: `Welcome back ${user.fullName}`,
                success: true,
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePhoto: user.profilePhoto
            });

    } catch (err) {
        console.log("error while login :-", err);
        return res
            .status(500)
            .json({ message: "Error in Login controller!" })
    }
}

export const Logout = async (req, res) => {
    try {
        return res
            .status(200)
            .cookie("token", "", { maxAge: 0 })
            .json({
                messageg: "Logged-out Successfully !",
                success: true
            })
    } catch (err) {
        console.log("error while logout :", err);
        return res
            .status(500)
            .json({ message: "Error in Logout!" })
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User
            .find({ _id: { $ne: loggedInUserId } })
            .select("-password");
        return res.status(200).json(otherUsers);
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ message: "Error while finding other users!" })
    }
}