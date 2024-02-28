import { userModel } from "../../models/user.model.js"
import Joi from 'joi'
const schema = Joi.object({
    name: Joi.string().min(2).max(20).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-zA-Z0-9]{6,}$/).required(),
    rePassword: Joi.string().valid(Joi.ref('password')).required(),
})

export const registerController = (req,res)=>{
    res.render('register.ejs',{  
        session: req.session,
        error: req.flash('error'),
        joiError: req.flash('joiError') 
    })
}

export const handleRegister = async(req,res)=>{ 
    let {error} =schema.validate(req.body, {abortEarly: false}) 
    let user = await userModel.findOne({email: req.body.email})
    if(user) {
        req.flash('error', 'User already exists');
        return res.redirect('/register');
    }
    else if (!error?.details) { 
        await userModel.insertMany(req.body)
        return res.redirect('/login') 
    }    
    else{
        req.flash('joiError', error?.details) 
        res.redirect('/register')
    }
}