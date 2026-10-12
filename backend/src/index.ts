import express from "express";
const app = express();
app.use(express.json());

import cors from "cors";
app.use(cors());

import "dotenv/config";
import jwt from "jsonwebtoken";
import { contentModel, linkModel, UserModel } from "./db.js";
import { userMiddleware } from "./middleware.js";
import { random } from "./hash.js";
import { resourceLimits } from "node:worker_threads";

app.post("/api/v1/signup", async (req,res) => {
    const username=  req.body.username;
    const password=  req.body.password;

    await UserModel.create({
        username, password
    })

    res.json({
        message: "user signed up"
    })
})

app.post("/api/v1/signin", async (req,res) => {
    const username=  req.body.username;
    const password=  req.body.password;

    const existingUser = await UserModel.findOne({
        username, password
    })

    if(existingUser){
        const token = jwt.sign({
            id: existingUser._id
        }, process.env.JWT_PASS!)
        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }
})

app.post("/api/v1/content", userMiddleware, async (req,res) => {
    const title = req.body.title;
    const link = req.body.link;
    
    await contentModel.create({
        title, link,
        //@ts-ignore
        userId: req.userId
    })

    res.json({
        message: "content added"
    })
})

app.get("/api/v1/content", userMiddleware, async (req,res) => {
    //@ts-ignore
    const userId = req.userId;
    const content = await contentModel.find({
        userId
    }).populate("userId", "username")
    res.json({
        content
    })
})

app.delete("/api/v1/content",userMiddleware, async (req,res) => {
    const contentId = req.body._id;

    const result = await contentModel.deleteOne({
        _id: contentId,
        //@ts-ignore
        userId: req.userId
    })
    res.json({
        message: "Deleted"
    })
})

app.post("/api/v1/brain/share", userMiddleware, async (req,res) => {

    const share = req.body.share;
    if(share == true){
        const existlink = await linkModel.findOne({
            //@ts-ignore
            userId: req.userId
        })
        if (existlink){
            res.json({
                hash: existlink.hash
            })
        }
        const newLink = await linkModel.create({
            //@ts-ignore
            userId: req.userId,
            hash: random(10)
        })
        res.json({
            hash: newLink.hash 
        })
    }

    await linkModel.deleteOne({
            //@ts-ignore
            userId: req.userId
        })
        res.json({
            message: "removed link"
        })
    }
)

app.get("/api/v1/brain/:sharelink", async (req,res) => {
    const hash = req.params.sharelink;
    const link = await linkModel.findOne({ hash });

    if (!link){
        res.status(411).json({
            message: "sorry incorrect input"
        })
        return
    }
    
    const content = await contentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    if(!user){
        res.status(411).json({
            message: "user not found"
        })
        return
    }
    res.json({
        username: user.username,
        content: content
    })
})

app.listen(3000);
