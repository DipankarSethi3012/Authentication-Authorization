const User = require('../models/auth');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.createUser = async (req, res) => {
    try {
        const {
            name,
            age,
            email,
            password,
            role
        } = req.body;



        const user = await User.findOne({
            email
        });

        if (user) {

            console.log("User already exists");
            return res.status(403).json({
                success: false,
                error: "User already exists",
                message: "Please Login"
            })
        }
        try {
            const hashPassword = await bcrypt.hash(password, 10);
            //hash function is used to hash the password it takes 2 parameters simple password and no of cycles

            const user = await User.create({
                name,
                age,
                email,
                password: hashPassword,
                role
            });
            console.log("Password secured successfully");

            res.status(200).json({
                success: true,
                data: user,
                message: "user has been created successfully"
            });
            console.log("user has been created successfully");


        } catch (err) {
            console.log("An error has been occured while hashing the password");
            console.log(err.message);

            res.status(500).json({
                success: false,
                error: err.message,
                message: "An error has been occured while hashing the password"

            });
        }

    } catch (err) {
        console.log("An error has been occured while creating the user");
        console.error(err.message);

        res.status(500).json({
            success: false,
            error: err.message,
            message: "Unable to create the user"
        })
    }


}

exports.loginUser = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            console.error("Data absent for login details");
            console.log("Enter data carefully while loggon in");

            return res.status(404).json({
                success: false,
                error: "Data absent for login",
                message: "Enter data again"
            });
        };

        const user = await User.findOne({
            email
        });

        if (!user) {
            console.log("The user that is trying to login is not present in database");
            console.error("signup first before login");

            return res.status(401).json({
                success: false,
                error: "Sign up first before login",
                message: "Entry absent in database"
            })

        }
        //creating a paylod for displaying data

        const payload = {
            email: user.email,
            id: user._id,
            role: user.role
        }

        if (bcrypt.compare(password, user.password)) {
            console.log("User login Successs");
            //generatimg jwt token
            let token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            console.log(user);
            const userObj=user.toObject(); //when we fetch a document from mongosb using mongoose it ,it returns a mongosoe object which might have some restrictions on direct modoficaton
            userObj.token = token;
            console.log(userObj);
            user.password = undefined; //hiding original password so that it hackers can't see it
            console.log(userObj);
            // console.log(token);
            const options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            };

            res.cookie("AuthCookie", token, options).status(200).json({
                success: true,
                data: user,
                message: "Cookie created sucessfully"
            });
            console.log("user has been logged successfully");

        } else {
            console.log("Password don't match");
            console.error("Enter passowrd carefully");

            return res.status(401).json({
                success: false,
                error: err.message,
                message: "Unable to login"

            })

        }
    } catch (err) {
        console.log("An error has been occured while logging in the user");
        console.error(err.message);

        res.status(500).json({
            success: false,
            error: err.message,
            message: "An error has been createdv while logging in the user"
        })
    }
}