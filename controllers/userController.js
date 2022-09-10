const bcrypt = require('bcryptjs')
const { generateAccessToken } = require('../jwt/jwt_operations')
const User = require("../models/user.model")
const jwt = require("jsonwebtoken");
exports.createUser = async (req, res) => {
    try {
        const passwordHash = bcrypt.hashSync(req.body.password, 10);
        const user = User.create({
            name: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            password: passwordHash
        })
        if (user) {
            res.json({
                message: 'User Created Sucessfully'
            })
        }
        else {
            res.json({
                message: "Required Field Missing"

            })
        }

    }
    catch (err) {
        res.json({
            message: "Something Went Wrong",
            error: err.message
        })
    }

}



exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return ('bad request')
        }
        const userData = await User.findOne({
            email: req.body.email.toLowerCase(),
        });
        if (!userData) {
            res.json({
                message: "Email not found in the database",
                success: false
            })
        }
        const match = bcrypt.compareSync(req.body.password, userData.password);
        if (!match) {
            res.json({
                message: "Wrong password",
                success: false
            });
        }
        const token = generateAccessToken({ _id: userData._id });
        res.json({
            error: false,
            success: true,
            message: "login user successfully",
            data: userData,
            token,
        });
    } catch (err) {
        res.json({
            message: err.message
        })
    }
};


