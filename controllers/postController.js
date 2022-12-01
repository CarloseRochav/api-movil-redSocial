const con = require("../db/db");

let postController={}


postController.newPost=async (req,res)=>{

    const data = await req.body
    const email = data.email;

    const userQuery = `SELECT * FROM USERS WHERE EMAIL='${email}'`;
    con.query(userQuery,(err,result,fields)=>{

        const user = result[0];

        if(user==null)
            return console.log("Asegurate de contar con una cuenta")

        if(!user.islogged==true){
            return console.log("Debe estar loggeado")
        }

        return console.log("Que desea publicar?");


    })

}

module.exports=postController;