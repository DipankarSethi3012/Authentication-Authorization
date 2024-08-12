const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const cookieParser = require('cookie-parser');

// Creating a middleware for authentication
exports.auth = (req, res, next) => {
    try {
        const token = req.body.token || req.cookies.token || req.header("Authorization").replace("Bearer ","");
//fetching token by three methods header is best because of it's security measures
        if (!token) {
            console.log("Token not found in request");
            return res.status(401).json({
                success: false,
                message: "Token not found"
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.log("Token verification failed");
                console.error(err.message);
                return res.status(401).json({
                    success: false,
                    error: err.message,
                    message: "Token verification failed"
                });
            }

            console.log("Token decoded successfully:", decoded);
            req.user = decoded;

            next(); // calling the next middleware
        });

    } catch (err) {
        console.log("An error occurred while processing the token");
        console.error(err.message);
        res.status(500).json({
            success: false,
            error: err.message,
            message: "Authentication failed"
        });
    }
};


exports.isStudent = (req, res, next) => {

    try {
        if (req.user.role !== "Student") {
            console.log("user is not student");
            return res.status(403).json({
                success:false,
                message:"User is not student "
            })
        }

        console.log("welcome to student wala route");
        
        next();

    }catch(err){
        console.log("can't able to get the role from user");
        console.error(err.message);

        res.status(500).json({
            success: false,
            error:err.message,
            message:"can't even ablen to get the role of user"
        })
    }
}


exports.isAdmin= (req,res,next)=>{
    
    try{
        if(req.user.role !== "Admin"){
            console.log("User is not admin so can't access this page");

            return res.status(403).json({
                success:false,
                message:"Only admin can access this page"
            });
        }

        console.log("Welcom Admin ");

    }catch(err){
        console.log("Can't able to get the role of student");
        console.error(err.message);

        res.status(500).json({
            success:false,
            error:err.message,
            message:"User is not admin"
        })
    }
}