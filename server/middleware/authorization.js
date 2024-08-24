import env from "dotenv";
import jwt from "jsonwebtoken";

env.config();

const secret = process.env.JWTSECRET;

export default async (req, res, next) => {
    try{
       const jwtToken = req.header("token");

       if(!jwtToken){
        return res.status(403).json("Not Authorised");
       }

       const payload = jwt.verify(jwtToken, secret);

       req.user = payload.user;

       next();

    }catch(err){
        console.error(err.message);
        return res.status(403).json("Not Authorized");
    }
}