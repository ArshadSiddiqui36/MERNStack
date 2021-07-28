const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const authenticate = require("../middleware/authenticate");


require('../db/conn');
const User = require("../model/userSchema");

router.get('/', (req, res) => {
    res.send("Hello World from the server");
});



// Using Promises...
// router.post('/register', (req, res) => {

//     const { name, email, phone, work, password, cpassword } = req.body;

//     // console.log(name);
//     // console.log(email);

//     if(!name || !email || !phone || !work || !password || !cpassword) {
//         res.status(422).json({error: "All fields are required"});
//     }

//     User.findOne({ email : email })
//     .then((userExist) => {
//         if(userExist) {
//             return res.status(422).json({ error: "Email already Exist"});
//         }

//         const user = new User({ name, email, phone, work, password, cpassword })
//         user.save().then(() => {
//             res.status(201).json({ message: "user registerd successfuly"});
//         }).catch((err) => res.status(500).json({ err: "Failed to registered" }));
//     }).catch(err => { console.log(err); });


//     // ......................................
//     // console.log(req.body);
//     // console.log(req.body.name);
//     // console.log(req.body.email);
//     // res.json({ message: req.body });
//     // res.send("mera register page");
// });


// Using Async-Await...
router.post('/register', async(req, res) => {

    const { name, email, phone, work, password, cpassword } = req.body;

    // console.log(name);
    // console.log(email);

    if(!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422).json({error: "All fields are required"});
    }

    try{
        const userExist = await User.findOne({ email : email });

        if(userExist) {
            return res.status(422).json({ error: "Email already Exist"});
        }else if(password !== cpassword){
            res.status(422).json({ error: "Password are not matched" });
        }else{
            const user = new User({ name, email, phone, work, password, cpassword });
            // Secure Password...
            await user.save();
            res.status(201).json({ message: "user registerd successfuly" });
        }

        // const userRegister = await user.save();
        // if(userRegister) {
        //     res.status(201).json({ message: "user registerd successfuly" });
        // }else{
        //     res.status(500).json({ err: "Failed to registered" });
        // }

    }catch(err) {
        console.log(err);
    }

});


// Login Router...

router.post('/signin', async(req, res) => {
    // console.log(req.body);
    // res.json({message:"Awesome"});

    try{
        let token;
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({error: "All fields are required"});
        }

        // const userLogin = await User.findOne({email: email});
        const userLogin = await User.findOne({email});
        // console.log(userLogin);

        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);

            token = await userLogin.generateAuthToken();
            console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });

            if (!isMatch) {
                res.status(400).json({error: "Invalid Credentials "});
            } else{
                res.json({message: "User SignIn Successfully"});
            }
        } else {
            res.status(400).json({ error: "Invalid Credentials" });
        }


    } catch (err){
        console.log(err);
    }
})


// About Us Page...
router.get('/about', authenticate, (req, res) => {
    // res.send("Hello AboutUs from the server");
    // console.log("Hello AboutUs from the server");
    res.send(req.rootUser);
});

// Get User Date for Contact and Home...
router.get('/getdata', authenticate, (req, res) => {
    res.send(req.rootUser);
});

// Contact Us Page...
router.post('/contact', authenticate, async (req, res) => {
    try{

       const { name, email, phone, message } = req.body;

       if(!name || !email || !phone || !message) {
            console.log("Error in contact form");
            return res.json({error: "Please fill the contact form"});
       }

       const userContact = await User.findOne({ _id: req.userID });

       if(userContact) {
           const userMessage = await userContact.addMessage(name, email, phone, message);

           await userContact.save();

           res.status(201).json({message: "User Contact Successfully"});
        }

    } catch (error) {
        console.log(error);
    }
});


// Logout Page...
router.get('/logout', (req, res) => {
    console.log("User Logout Successfully");
    res.clearCookie('jwtoken', { path: '/' });
    res.status(200).send("User Logout");
});


module.exports = router;