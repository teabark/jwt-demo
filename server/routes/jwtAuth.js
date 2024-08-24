import {Router} from "express";
import pool from "../database.js";
import bcrypt from "bcrypt";
import jwtGenerator from "../utils/jwtGenerator.js";
import validInfo from "../middleware/validInfo.js";
import authorization from "../middleware/authorization.js";

const router = Router();


router.post("/register", validInfo, async (req, res)=>{
    try{
        //destructuring the req.body
        const {name, email, password} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [email]);

        //checking if user exists
        if(user.rows.length > 0){
            return res.status(401).json("User already exists")
        }

        //using bcrypt to generate a hashed password
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        const bcyptPassword = await bcrypt.hash(password, salt)

        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcyptPassword]
        )
        //generating our jwt token
        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({token});
    }catch(error){
        console.log(error.message);
        res.status(500).json("Server Error")
    }
});

router.post("/login", validInfo, async (req, res)=>{
    try{
        const {email, password} = req.body;

        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ])

        if(user.rows.length === 0){
            return res.status(401).json("Username does not exist");
        }

        const storedHashedPassword = user.rows[0].user_password;

        const ValidPassword = await bcrypt.compare(password, storedHashedPassword);

        if (!ValidPassword){
            return res.status(401).json("Password is incorrect");
        }

        const token = jwtGenerator(user.rows[0].user_id);
        res.json({token});
    }catch(err){
        console.log(err.message)
        res.status(500).json("Server Error");
    }
});

router.get("/is-verify", authorization, async (req, res)=> {
    try{
        res.json(true);
    }catch(err){
        console.log(err.message)
        res.status(500).json("Server Error");
    }
});

export default router;