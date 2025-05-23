import validator from 'validator';
import bcrypt, { hash } from 'bcrypt';
import UserModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';

//Api to register user

const registerUser = async (req , res)=>{
    try{
        const {name , email , password} = req.body 
        if(!name || !email || !password){
            return res.json({success : false , message : "missing details"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false , message : "enter a valid email"})
        }

        if(password.length < 8){
            return res.json({success:false , message : "enter a strong password"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password , salt)

        const userData = {
            name , email , password : hashedPassword
        }

        const newUser = await UserModel(userData)
        const user = await newUser.save() ;

        const token = jwt.sign({id : user._id} , process.env.JWT_SECRET_KEY)
        res.json({success:true , token})

    }catch(error){
        console.log(error)
        res.json({success:false , message : error.message})
    }
}

//Api for user login
const loginUSer = async (req,res)=>{

    try{
        const {email,password} = req.body
        const user = await UserModel.findOne({email})

        console.log(user)
        if(!user){
            return res.json({success:false , message : "user does not exist"} )
        }

        const isMatch = await bcrypt.compare(password , user.password)

        if(isMatch){
            const token = jwt.sign({id:user._id} , process.env.JWT_SECRET_KEY)
            res.json({success:true , token})
        }else{
            res.json({success:false , message : "invalid credentials"})
        }

    }catch(error){
        console.log(error)
        res.json({success:false , message : error.message})
    }
    
}

export {registerUser,loginUSer}