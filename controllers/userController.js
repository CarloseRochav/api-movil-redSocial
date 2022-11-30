const { json } = require("express");
const { emit } = require("../db/db");
//const db = require("../db/db")
const con = require("../db/db");


let userController = {}
//Custom error
// const customError = (code = 500, msg = "Error in the system") => {
//     const error = new Error();    
//     error.code=code;
//     error.msg =msg;
//     return error;
//   };
  


//Creater User
userController.createUser = async  (req,res)=>{

    const {name,lastname,email,password}= await req.body;

    console.log(`Bienvenido ${name} ${lastname} \n Correo: ${email}`);
    
    const createUserSQL = "INSERT INTO USERS (email,password) VALUES (?,?)";
    
    try{

        //con.connect(function(err) {

            //if (err) throw err;
            //var sql = "INSERT INTO customers (name, address) VALUES ('Michelle', 'Blue Village 1')";
            con.query(createUserSQL,[email,password], function (err, result) {
              if (err) throw err;
              console.log("1 record inserted, ID: " + result);
              
                res.json({
                    code:201,
                    msg :` Resultado ${result} `,           
        
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


//Listar Usuarios
userController.getUserslist= async (req,res)=>{
    
    const selectUsersSQL =await "SELECT * FROM  USERS";

    try{    
        
        con.query(selectUsersSQL, function (err, result, fields) {
              if (err) throw err;
              console.log(result);

              res.json(result)
        });         

    }catch(err){
        console.log(`Error from api :${err}`);
        res.json({
            code:501,
            msg:` Error from api : ${err}`
        })

    }
    // }finally {
    //     //if (con) return con.end();
    //     }    
}

//Autentificar 
userController.signin=async (req,res)=>{

    const email = req.body.email;
    const password = req.body.password;    
    
    const findUser = await `SELECT * FROM USERS WHERE EMAIL='${email}'`    

    try{

    con.query(findUser, function (err, result, fields) {
        //if (err) throw err;
        //console.log(`Usuario con email : ${result[0].EMAIL}`);        
        //Datos de la consulta              
        if(result.length==0){            
            console.log("Este correo no se encuentra registrado")
            return res.json({
                code:400,
                message:"Este Correo no esta registrado"
            })                        
        }

        const passwordResult =  result[0].PASSWORD;
        console.log("Password Result : "+passwordResult)

        if(password!=passwordResult){                        
            console.log(`La contraseña : ${password} es incorrecta`)            
            return res.json({
                code:400,
                message:"Contraseña Incorrecta"
            })               
            //Con return ya no deja avanzar el programa
            //return "Erro al ingresar la contraseña"                         
        }
        const emailResult =result[0].EMAIL;
        console.log("Usuario validado correctamente")


        // res.json({
        //     email:emailResult,
        //     message:"Inicio de sesion exitoso"  ,
        //     isValid:true
        // })      

        //actualizar a usuario a true logged
        const queryLoggedToTrue= "UPDATE USERS SET isLogged=true WHERE email='"+email+"'";

        con.query(queryLoggedToTrue, function (err, result, fields) {

            console.log(result.message);
                // return res.json({
                //     result:
                // })
        })

        //Regresar usuario 
        const returnUser ="SELECT * FROM USERS WHERE EMAIL='"+email+"'";
        con.query(returnUser, function (err, result, fields) {
            
            const user = result[0];
            console.log(user);
                return res.json({
                    code:200,
                    message:"iniciando sesion...",
                    email:user.EMAIL,
                    isLogged:user.islogged
                });
        })



    });

}catch(err){
    console.log("Error : "+err)
    res.json(err);
}

    

}



module.exports=userController;
