import { compare } from "bcrypt";
import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "./../helper/authHelper.js";
import JWT from "jsonwebtoken";

export const registerController = async (req,res) => {
    try{
        const {name, email, password, repassword} = req.body;
        //validation
        if(!name){
            return res.send({message: "Name is required"});
        }
        if(!email){
            return res.send({message: "Email is required"});
        }
        if(!password){
            return res.send({message: "Password is required"});
        }
        if (!repassword) {
            return res.send({ message: "Re-Password is required" });
          }
        if (password !== repassword) {
            return res.send({ message: "Passwords do not match" });
          }
        //check user
        const exisitingUser = await userModel.findOne({ email });
        //exisiting user
        if(exisitingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Register please login'
            });
        }
        //rigister user
        const hashedPassword = await hashPassword(password);
        //save
        const user = await new userModel({
            name,
            email,
            password: hashedPassword,
            repassword: hashedPassword
            }).save();

        res.status(201).send({
            success: true,
            message: 'Registeration Success',
            user,
        }); 
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: "Error in Registeration",
            error
        });
    }
};

//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        //validation
        if (!email || !password) {
            return res.status(404).send({ 
                success: false,
                message: "Invalid email or password"
            });
        }
        //check user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Email is not register"
            });
        }
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            });
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        res.status(200).send({
            success: true,
            message: "Login Success",
            user:{
                name: user.name,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
};

//test Controller
export const testController = (req, res) => {
    res.send('Protected Route');
};
