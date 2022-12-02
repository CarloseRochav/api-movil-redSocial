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

module.exports=postController;