import { User } from "../models/usersSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Tweet } from "../models/tweetSchema.js";

export const createTweet = async (req, res) => {
    try {
        const { description, id } = req.body
        if (!description || !id) {
            return res.status(401).json({
                msg: "Feilds are required",
                success: false
            })

        }
        const user= await User.findById(id).select("-password")
        await Tweet.create({
            description: description,
            userId: id,
            userDetails: user
        })
        return res.status(201).json({
            msg: "tweet created ",
            success: true
        })

    } catch {

    }
}

export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params
        await Tweet.findByIdAndDelete(id)
        return res.status(200).json({
            msg: "tweet deleted",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}

export const likeOrDislike = async (req, res) => {
    try {
        const loggedInUserId = req.body.id
        const tweetId = req.params.id
        const tweet = await Tweet.findById(tweetId)
        //dislike
        if (tweet.like.includes(loggedInUserId)) {
            await Tweet.findByIdAndUpdate(tweetId, {
                $pull: { like: loggedInUserId }
            })
            return res.status(200).json({
                msg: "User dislikes your tweet",
            })
        } 
        //like
        else {
            await Tweet.findByIdAndUpdate(tweetId, {
                $push: { like: loggedInUserId }
            })
            return res.status(200).json({
                msg: "User likes your tweet",
            })
        }
    }
    catch (error) {
        console.log(error);
    }
}

export const getAllTweets = async (req, res) => {
    try {
        const id=req.params.id
        const loggedInUser=await User.findById(id)
        const loggedInUserTweets=await Tweet.find({userId:id});
        const followingUsersTweets = await Promise.all (loggedInUser.following.map((otherUsersID)=>{
            return Tweet.find({userId:otherUsersID})
        }))
        return res.status(200).json({
            tweets: loggedInUserTweets.concat(...followingUsersTweets)
        })

        
    } catch (error) {
        console.log(error);
    }
}

export const getAllFollowingTweets = async(req,res)=>{
    try {
        const id=req.params.id
        const loggedInUser=await User.findById(id)
        const followingUsersTweets = await Promise.all (loggedInUser.following.map((otherUsersID)=>{
            return Tweet.find({userId:otherUsersID})
        }))
        return res.status(200).json({
            tweets: [].concat(...followingUsersTweets)
        })
    } catch (error) {
        console.log(error);
    }
}
