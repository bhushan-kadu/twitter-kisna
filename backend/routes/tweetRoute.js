import express from 'express'
import { createTweet, deleteTweet, getAllFollowingTweets, getAllTweets, likeOrDislike } from '../controllers/tweetController.js';
import isAuthenticated from '../config/auth.js';

const router=express.Router();

router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/getalltweets/:id").get(isAuthenticated, getAllTweets);
router.route("/getallfollowingtweets/:id").get(isAuthenticated, getAllFollowingTweets);




export default router