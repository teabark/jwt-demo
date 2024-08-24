import router from "./jwtAuth.js";
import pool from "../database.js";
import authorization from "../middleware/authorization.js";

router.get("/", authorization, async (req, res)=>{
    try{
        //req.user has the payload
        const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [req.user])
        res.json(user.rows[0])
    }catch(err){
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

export default router;