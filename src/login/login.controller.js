import Joi from "joi"
import { userModel } from "../../models/user.model.js"

const schema = Joi.object({ 
    email: Joi.string().email().required(),
    password: Joi.string().pattern(/^[A-Z][a-zA-Z0-9]{6,}$/).required(),
})

export const loginController = (req,res)=>{
    res.render('login.ejs',{error:req.query?.error, session: undefined, joiError: req.flash('joiError')  })
}

export const handleLogin = async(req,res)=>{
    let {error} =schema.validate(req.body, {abortEarly: false})  
    if (!error?.details) { 
        let user = await userModel.findOne({email: req.body.email})
        if (!user) return res.redirect('/login?error="Invalid Email or Password"')
        if(user.password !== req.body.password) return res.redirect('/login?error="Invalid Email or Password"') 
        req.session.isLoggedIn = true;
        req.session.userId = user._id;
        req.session.name = user.name; 
        res.redirect('/message')
    }else{
        req.flash('joiError', error?.details) 
        res.redirect('/login')
    }
} 