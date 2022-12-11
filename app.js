const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const session = require("express-session");
const mongoDbConnect = require("connect-mongodb-session");
const mongoDbStore = mongoDbConnect(session);

const app = express();

const db = require("./data/database");

const imageStorage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,"profileimages");
    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }    
});

const upload = multer({storage: imageStorage});

const mongo = new mongoDbStore({
    uri: "mongodb://127.0.0.1:27017",
    databaseName: "astro",
    collection: "sessions"
})

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");

app.use(express.urlencoded({extended:false}));
app.use(express.static("public"));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: "super-secret",
    store: mongo
}));
app.use("/profileimages",express.static("profileimages"));

app.get("/",async (req,res)=>{

    const members = await db.getDb().collection("members").find();
    if(!members)
    {
        req.session.isAuthenticated=false;
        req.session.user=null;
    }

    const data = {
        isAuth: req.session.isAuthenticated
    } 

    if(data.isAuth)
    {
        const user = await db.getDb().collection("members").findOne({_id:req.session.user.id});
        return res.render("index",{data:data,user:user});
    }

    res.render("index",{data:data,user:null});
});

app.get("/signup",(req,res)=>{
    res.render("signup");
});

app.post("/signup",async (req,res)=>{

    const userName = req.body.username;
    const userEmail = req.body.email;
    const password = req.body.password;
    const imagePath = "/images/profile.png";

    const userPassword = await bcrypt.hash(password,12);

    const member = {
        userName:userName,
        userEmail:userEmail,
        userPassword:userPassword,
        userImage:imagePath
    }

    const data = await db.getDb().collection("members").insertOne(member);

    res.redirect("/login");
});

app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async(req,res)=>{

    const userEmail = req.body.email;
    const userPassword = req.body.password;

    const existingMember = await db.getDb().collection("members").findOne({userEmail:userEmail});

    if(!existingMember)
    {
        return res.redirect("/signup");
    }

    const passwordEqual = await bcrypt.compare(userPassword,existingMember.userPassword);

    if(!passwordEqual)
    {
        return res.redirect("/login");
    }

    req.session.user={
        id: existingMember._id,
        email: existingMember.userEmail
    }
    req.session.isAuthenticated = true;
    req.session.save(
        res.redirect("/")
    );
});

app.get("/logout",async (req,res)=>{
    req.session.isAuthenticated = false;
    req.session.user = null;

    res.redirect("/");
});

app.get("/profile",(req,res)=>{
    res.render("profile");
});

app.post("/profile",upload.single("userpic"),async (req,res)=>{

    const files = req.file;

    if(files)
    {
        const user = await db.getDb().collection("members").updateOne({_id:req.session.user.id},{$set:{userImage: files.path}});  
        return res.redirect("/");
    }

    await db.getDb().collection("members").updateOne({_id:req.session.user.id},{$set:{userImage: "/images/profile.png"}});

    res.redirect("/");
});

db.getConnection().then()
{
    app.listen(3000);
}