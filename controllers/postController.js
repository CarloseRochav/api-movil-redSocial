const con = require("../db/db");

let postController={}


postController.newPost=(req,res)=>{

    const data =req.body
    const email = data.email;

    const userQuery = `SELECT * FROM USERS WHERE EMAIL='${email}'`;
    con.query(userQuery,(err,result,fields)=>{

        const user = result[0];
        if(!user.islogged==true){
            return console.log("Debe estar loggeado")
        }

        return console.log("Que desea publicar?");


    })

}

module.exports=postController;