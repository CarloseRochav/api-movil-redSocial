const db = require("../db/db")




let userController = {}

userController.createUser = async  (req,res)=>{

    const {name,lastname,email,password}= await req.body;

    console.log(`Bienvenido ${name} ${lastname} \n Correo: ${email}`);

    res.send(`Hola // :  ${name}`)
    
}



module.exports=userController;
