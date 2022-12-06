const con = require("../db/db");

let commentController={}



//Post Comment 
commentController.createComment=(req,res)=>{

    const data = req.body;
    const user ={
            id:data.id,
            email:data.email,
            idPost:data.idPost,
            content:data.Content
    }      

    const findUser = `SELECT * FROM USERS WHERE EMAIL='${user.email}'`
    //const findUser = `SELECT * FROM USERS WHERE EMAIL="carlos@rocha.com"`
    con.query(findUser,(err,result,fields)=>{

        if(err) return res.json({err:err});

        userFinded = result[0];
        console.log(userFinded.ID)
        // res.json({
        //     userID:result[0].ID,
        //     userEmail:result[0].EMAIL
        // })
        const queryCreateCommnent = `INSERT INTO COMMENTS (CONTENT,ID_USER,DATE_C,ID_POST) 
        VALUES ("${user.content}",${userFinded.ID},curdate(),${user.idPost})`

        con.query(queryCreateCommnent,(err,result,fields)=>{

            if(err) return res.json({errorMessage:"Error al insertar comentario",err:err})
            res.json({message:"Cometario Agregado"})

        })

    })


    //Listar Comentarios

    
    //return res.json(user);    
    
}

commentController.getListComments=(req,res)=>{
        const data = req.body;

        const getCommentsQuery="SELECT * FROM COMMENTS";

        con.query(getCommentsQuery,(err,result,fields)=>{
            
            //console.log(result);

            
            return res.json({result})
        

        })
}



//Exportar objeto
module.exports=commentController;