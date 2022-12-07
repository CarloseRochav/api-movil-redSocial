const con = require("../db/db");

let commentController={}



//Post Comment 
commentController.createComment=(req,res)=>{

    const data = req.body;
    const user ={            
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


//Obtener los comentarios que tiene una publicacion 
commentController.getCommnetsByAPost=(req,res)=>{

    const postId = req.params.postId;

    // const commentsbyAPostQuery = `SELECT P.ID, CONVERT(p.content USING utf8) Publicacion, C.CONTENT FROM POSTS as p
    // INNER JOIN COMMENTS as c ON P.ID = C.ID_POST where p.id=${postId}`

    const commentsbyAPostQueryAndAuthor = `SELECT P.ID, CONVERT(p.content USING utf8) Publicacion, C.CONTENT, U.EMAIL por  FROM POSTS as p
    JOIN COMMENTS as c ON P.ID = C.ID_POST 
    JOIN USERS AS U ON C.ID_USER = U.ID WHERE p.id=${postId}`


    let comments =Array()//Arreglo de publicaciones

    con.query(commentsbyAPostQueryAndAuthor,(err,result,fields)=>{

        var author;

        //Iteras sobre arreglo,result
        Object.keys(result).forEach(function(key) {
            var row = result[key];   
            
            //console.log(row);
            author ={
                author:row.por,
                comentario:row.CONTENT
            }
            
            comments.push(author)
            console.log(author)
          });       


          return res.json({
            Publicacion:result[0].Publicacion,
            Comentarios:comments
          });
    })
    

}



//Exportar objeto
module.exports=commentController;