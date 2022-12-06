const express = require("express");
const app = express();//
const port = 3030;
const connection = require("./db/db");//Uso de la connection configurada
const userController = require("./controllers/userController");
const postController = require("./controllers/postController");
const commentController = require("./controllers/commentController");


//Uso de bodyParser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Ruta de Hola Mundo
app.get("/", (req, res) => {
    res.send("Hello World");
})

//Ruta de Postear Usuario
app.post("/create-user",userController.createUser);
//ruta para consultar usuarios
app.get("/list-users",userController.getUserslist);
//Ruta para autentificar
app.post("/find-user",userController.signin);
//Ruta para cerrar sesion
app.post("/logoff",userController.logOff);

//Ruta para hacer una publicacion
app.post("/create-post",postController.newPost)
//Ruta para obtener las publicaciones
app.get("/get-posts",postController.getPosts)
//Ruta para crear un comentario
app.post("/create-comment",commentController.createComment);
//Ruta pata listar todos los comentarios
app.get("/get-comments",commentController.getListComments);
//Ruta para obetener posts de un usuario
app.get("/get-posts/:userId",postController.getPostsByAnUser);


console.log("Archivo ejecutado")


app.listen(port, () => {

    console.log(`Example app listening on port ${port}`)

    connection.connect(function (err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);
    });
})

