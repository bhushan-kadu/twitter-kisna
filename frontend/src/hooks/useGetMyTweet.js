import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyProfile } from "../redux/userSlice";
import Tweet from "../components/Tweet";
import { getAllTweets } from "../redux/tweetSlice";
const useGetMyTweet = (id) => {
    const dispatch = useDispatch()
    const { refresh, isActive } = useSelector(store => store.tweet)


    const fetchMyTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/getalltweets/${id}`, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getAllTweets(res.data.tweets))
        } catch (error) {
            console.log(error);
        }
    }

    const followingTweetHandler = async () => {
        try {
            const res = await axios.get(`${TWEET_API_ENDPOINT}/getallfollowingtweets/${id}`, {
                withCredentials: true
            })
            console.log(res);
            dispatch(getAllTweets(res.data.tweets))
            //dispatch(getRefresh())

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isActive) {
            fetchMyTweets();
        }else{
            followingTweetHandler()
        }
    }, [refresh,isActive])
}

export default useGetMyTweet