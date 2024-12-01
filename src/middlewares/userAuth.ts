import jwt from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import { userModel } from "../models/user";
import * as dotenv from 'dotenv';
dotenv.config();

const userRouter = express.Router();

declare global {
    namespace Express {
        interface Request {
            user?: any; 
        }
    }
}

const userAuthentication = async (req: Request, res: Response, next: NextFunction):Promise<any> => {
    try {
        const cookie = req.cookies;
        const { token } = cookie;

        if (!token) {
            return res.status(401).json({
                message: "Token expired",
            });
        }

        const decodedToken = jwt.verify(token, process.env.USER_SECREAT as string) as { _id: string };

        if (!decodedToken || !decodedToken._id) {
            return res.status(403).json({
                message: "Invalid token credentials",
            });
        }

        const user = await userModel.findById(decodedToken._id);
        if (!user) {
            return res.status(404).json({
                message: "User does not exist",
            });
        }

        req.user = user;

        next();
    } catch (error: any) {
        res.status(500).json({
            message: error.message || "Internal server error",
        });
    }
};

export { userAuthentication };
