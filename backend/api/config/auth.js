import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config({
    path:"../config/.env"
})
const isAuthenticated= async(req,res,next)=>{
    try{
        const{token}=req.cookies;
        console.log(token);
        if(!token){
            return res.status(401).json({
                msg:"User is not authenticated",
                success:false
            })
        }
        const decoded= await jwt.verify(token,process.env.TOKEN_SECRET);
        console.log(decoded)
        req.user=decoded.userID
        next();


    }catch (error){
        console.log(error);

    }
}

export default isAuthenticated