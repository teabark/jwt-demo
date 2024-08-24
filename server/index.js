import Express, { Router } from "express";
import cors from "cors";
import authRouter from "./routes/jwtAuth.js"
import dashRouter  from "./routes/dashboard.js"

const app = Express();
const port = 5000;

//middleware
app.use(Express.json());
app.use(cors());

//ROUTES

//register and login routes
app.use("/auth", authRouter);

//dashboard routes
app.use("/dashboard", dashRouter)

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`)
})