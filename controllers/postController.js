const con = require("../db/db");

let postController={}


postController.newPost=async (req,res)=>{

    const data = await req.body
    const email = data.email;
    const post = data.post;

    const userQuery = `SELECT * FROM USERS WHERE EMAIL='${email}'`;
    con.query(userQuery,(err,result,fields)=>{

        const user = result[0];

        if(user==null)
            return res.json({code:401,message:"Crea una cuenta para poder hacer publicaciones"})

        if(!user.islogged==true){
            return res.json({code:401,message:"Debe estar loggeado"})
        }

        //Insert Into
        const insertPost =  `INSERT INTO 
        POSTS (ID_USER,DATE_TIME,CONTENT) 
        VALUES(${user.ID},curdate(),"${post}")`
        
            con.query(insertPost,(err,result,fields)=>{
                if(err) return console.log(err);

                return res.json({message:result});
            })        
    })
}


postController.getPosts=(req,res)=>{

    const getPostsQuery = "SELECT ID,ID_USER,DATE_TIME,CONVERT(content USING utf8) CONTENIDO FROM POSTS"
    
    try{
    con.query(getPostsQuery,(err,result,fields)=>{

        return res.json({Publicaciones:result})

        })
    }catch(err){
        return err;
    }

}

postController.getPostsByAnUser=(req,res)=>{

    const userId = req.params.userId;

    const postByUser= `SELECT EMAIL, CONVERT(content USING utf8) Contenido FROM POSTS 
    INNER JOIN USERS ON POSTS.ID_USER = USERS.ID 
    WHERE ID_USER=${userId}`


    con.query(postByUser,(err,result,fields)=>{
        

        let posts = Array();
        //Result loop
            // if there is no error, you have the result
            // iterate for all the rows in result
        Object.keys(result).forEach(function(key) {
            var row = result[key];            
            
            posts.push(row.Contenido)
            console.log(row.Contenido)
          });       


        const userEmail = result[0].EMAIL;

        return res.json({  
            user:userEmail,          
            Posts:posts            
        })


    })

}

module.exports=postController;