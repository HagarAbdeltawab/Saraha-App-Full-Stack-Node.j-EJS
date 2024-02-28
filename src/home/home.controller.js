export const homeController = (req,res)=>{
    res.render('index.ejs',{session: undefined})
}