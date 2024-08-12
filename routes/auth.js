const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser
} = require('../controllers/auth');
const {
    auth,
    isStudent,
    isAdmin
} = require('../middlewares/auth');

router.post("/signup", createUser);
router.get("/login", loginUser);

router.get("/test", auth, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
        message: "Authentication complete. Welcome to /test route"
    })
});


router.get("/student", auth, isStudent, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
        message: "Authentication complete. Welcom to /student route"
    });
});


router.get("/admin", auth, isAdmin , (req,res)=>{
    res.status(200).json({
        success:true,
        data:req.user,
        message: "Authentication complete. Welcome to /admin route"
    });
});

module.exports = router;