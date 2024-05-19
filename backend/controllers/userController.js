import { User } from "../models/usersSchema.js";
import {Tweet} from "../models/tweetSchema.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
    path:'../config/.env'
}
);

export const Register = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        if (!firstName || !lastName || !email || !username || !password) {
            return res.status(401).json({
                msg: "All Feilds are rquired",
                success: false

            })
        }
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(401).json({
                msg: "User already exists",
                success: false
            })
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            username: username,
            password: hashedPassword
        })
        return res.status(201).json({
            msg: "Account created",
            success: true
        })
    }
    catch (error) {
        console.log(error);

    }
}

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({
                msg: "All Feilds are rquired",
                success: false
            })
        }
        const user=await User.findOne({email:req.body.email})
        if (!user) {
            res.status(401).json({
                msg: "User doen't exists",
                success: false
            })
        }
        const isMatch =await bcryptjs.compare(req.body.password, user.password)
        if(!isMatch){
            res.status(401).json({
                msg: "incorrect email or passowrd",
                success: false
            }) 
        }
        const userID=user._id;
        const token = jwt.sign({userID},process.env.TOKEN_SECRET,{expiresIn:"1d"});
        return res.status(200).cookie('token',token,{expiresIn:"1d",httpOnly:true}).json({
            success: true,
            msg: `Welcome back ${user.firstName}`,
            user,
            token: token
        })
    }

    catch (error) {
        console.log(error);
    }

}

export const Logout = async (req, res) => {
    return res.cookie("token","",{expiresIn:new Date(Date.now())}).json({
        msg:"Logout successfully",
        success:true
    })
}

export const bookmarks = async (req, res) => {
    try {
        const loggedInUserId=req.body.id;
        const tweetId=req.params.id
        const user=await User.findById(loggedInUserId)
        const tweet=await Tweet.findById(tweetId)
        if(user.bookmarks.includes(tweetId)){
            //remove
            await User.findByIdAndUpdate(loggedInUserId,{
                $pull:{bookmarks:tweetId}

            })
        return res.status(200).json({
            msg:"Bookmark removed"
        })
        }
        // add bookmark
        else{
            await User.findByIdAndUpdate(loggedInUserId,{
                $push:{bookmarks:tweetId}
            })
            return res.status(200).json({
                msg:"Bookmark added"
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const getMyProfile=async(req,res)=>{
    try{
        const id=req.params.id
        const user=await User.findById(id).select("-password")
        return res.status(200).json({
            user
        })
    }
    catch(error){
        console.log(error);

    }
}

export const getOtherUsers=async(req,res)=>{
    try{
        const id=req.params.id
        const otheruser=await User.find({_id:{$ne:id}}).select("-password")
        if(!otheruser){
            return res.status(401).json({
                msg:"Dont have any users"
            })
        }else{
            return res.status(200).json({
                otheruser
            })
        }
    }
    catch(error){
        console.log(error);

    }
}

export const follow=async(req,res)=>{
    try{
        const loggedInUserId=req.body.id
        const userId = req.params.id
        const loggedInUser= await User.findById(loggedInUserId)
        const user=await User.findById(userId)
        if(!user.followers.includes(loggedInUserId)){
            await user.updateOne({$push:{followers:loggedInUserId}})
            await loggedInUser.updateOne({$push:{following:userId}})
            return res.status(200).json({
                msg:`${loggedInUser.firstName} just followed to ${user.firstName}`,
                success: true
            })
        }else{
            return res.status(403).json({
                msg:`You are already following this ${user.firstName}`
            })
        }
    }
    catch(error){
        console.log(error);

    }
}
export const unfollow=async(req,res)=>{
    try {
        const loggedInUserId=req.body.id
        const userId = req.params.id
        const loggedInUser= await User.findById(loggedInUserId)
        const user=await User.findById(userId)
        if(loggedInUser.following.includes(userId)){
            await user.updateOne({$pull:{followers:loggedInUserId}})
            await loggedInUser.updateOne({$pull:{following:userId}})
            return res.status(200).json({
                msg:`${loggedInUser.firstName} just unfollowed to ${user.firstName}`,
                success: true
            })
        }else{
            return res.status(403).json({
                msg:`You are already unfollowing this ${user.firstName}`
            })
        }
        
    } catch (error) {
        console.log(error);
    }
}