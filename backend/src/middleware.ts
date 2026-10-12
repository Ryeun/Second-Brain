import type { NextFunction, Request, Response } from "express"
import "dotenv/config";
import jwt from "jsonwebtoken";

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization;
    const decoded = jwt.verify(header!, process.env.JWT_PASS!);
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        next();
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
}