const db = require("../db/db")
const con = require("../db/db");




let userController = {}

userController.createUser = async  (req,res)=>{

    const {name,lastname,email,password}= await req.body;

    console.log(`Bienvenido ${name} ${lastname} \n Correo: ${email}`);

    //sres.send(`Hola // :  ${name}`)
    //Query Statement
    const createUserSQL = "INSERT INTO USERS (email,password) VALUES (?,?)";
    
    try{

        //con.connect(function(err) {

            //if (err) throw err;
            //var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
            con.query(createUserSQL,[email,password], function (err, result) {
              if (err) throw err;
              console.log("1 record inserted, ID: " + result.insertId);
              
                res.json({
                    code:201,
                    msg :` Resultado ${result.affectedRows} `,           
        
                    })
            });

        // });       

    }catch(err){

        console.log(`Error from api :${err}`);
        res.json({
            code:501,
            msg:` Error from api : ${err}`
        })
    }finally {
        if (con) return con.end();
        }


    
}



module.exports=userController;
