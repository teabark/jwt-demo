import jwt from "jsonwebtoken";
import env from 'dotenv';

env.config();

const secret = process.env.JWTSECRET;

function jwtGenerator(user_id){
    const payload = {
        user: user_id
    }

   return jwt.sign(payload, secret, {expiresIn: "1hr"});
}

export default jwtGenerator;