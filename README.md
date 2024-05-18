
# Backend Artist/Hub 



### Tabla de contenidos:

- [Sobre el proyecto](#sobre-el-proyecto-)
- [Especificaciones](#especificaciones-)
- [Stack](#stack-)
- [Instalacion en local](#instalación-en-local-)
- [Endpoints](#endpoints-)
- [Autor](#autor-)

#### Sobre el proyecto
ArtistHub es una plataforma dedicada a los artistas de todo el mundo, ofreciendo un espacio donde pueden compartir su arte con otros artistas y encontrar inspiración en una comunidad creativa.
Enlace al frontend: https://github.com/almela09/FRONTEND_artisthub

#### Especificaciones
La Api rest para ArtistHub está diseñada para conectar una base de datos MongoDB gestionando tres colecciones principales: 'user', 'publication' y 'comment'.
#### Stack
Se han utilizado las siguientes tecnologías:

![JavaScript](https://img.shields.io/badge/JavaScript-%23F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

![MongoDB](https://img.shields.io/badge/MongoDB-%2347A248?style=for-the-badge&logo=mongodb&logoColor=white)

![Express](https://img.shields.io/badge/Express-%23000000?style=for-the-badge&logo=express&logoColor=white)

![Postman](https://img.shields.io/badge/Postman-%23FF6C37?style=for-the-badge&logo=postman&logoColor=white)

![Nodemon](https://img.shields.io/badge/Nodemon-%2766CC33?style=for-the-badge&logo=nodemon&logoColor=white)

![Cloudinary](https://img.shields.io/badge/Cloudinary-%2334314E?style=for-the-badge&logo=cloudinary&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-%23323330?style=for-the-badge&logo=multer&logoColor=white)


### Instalación en local:

1. Clonar repositorio.

2. Instalar dependencias: `$ npm install`.
3. Crear una conexión con MongoAtlas.
4. Conectar el repositorio en Mongo Compass.
5. Ejecutar seeders: `$ npm run seed`.
6. Poner en marcha el servidor `$ npm run dev`.

### Endpoints
    -Credenciales:

        {
            "email": "suepradmin@example.com",
            "password": "123456789"
        }

        
        {
            "email": "paula@paula.com",
            "password": "123456"
        }


 AUTH:
        
        Login:
            http://localhost:4000/api/auth/login

              {
                "email": "paula@paula.com",
                "password": "123456"
                }
        
        Register:
            {
                "name": "Leonor",
                "nick": "Leo",
                "email": "leo@leo.com",
                "password": "123456"
            }
USER:

        Superadmin only:

        GET: http://localhost:4000/api/user [Ver todos los usuarios]
        DELETE: http://localhost:4000/api/user/:userId [Borrar usuarios]

        GET: http://localhost:4000/api/user/profile [Ver perfil usuario]
        PUT: http://localhost:4000/api/user/users/:id [Editar perfil]

PUBLICATION:

        POST: http://localhost:4000/api/publication [Crear publicación]

                form-data
                    Key:                Value:
                    Title               tu titulo 
                    Text                tu texto
                    Image (seleccionar file)
<image src="./images/formdata.png" alt="formdata">

        PUT: http://localhost:4000/api/publication/:id [Editar publicación]

            {
                "title": "Nuevo título de la publicación",
                "text": "Nuevo texto de la publicación"
            }
        
        DELETE: http://localhost:4000/api/publication/:id [Eliminar publicación]

        PUT: http://localhost:4000/api/publication/:id/likes [Dar like]

        DELETE: http://localhost:4000/api/publication/:id/dislike [Quitar like]

        GET: http://localhost:4000/api/publication/publications/:userId [Obtener TODAS las publicacines de un usuario]

        GET: http://localhost:4000/api/publication/:id [Busca publicación específica por su id]

COMMENT:

    POST: http://localhost:4000/api/comment [Crear comentario]

            {
                "content": "Muy bonito!!!! me encanta",
                "publicationId": "6644df96575766b87193253d",
                "userId": "66439af3100c17d40e0c4eb0"
            }
    GET: http://localhost:4000/api/comment [ver todos los  comentarios]

    GET: http://localhost:4000/api/comment/:publicationId [ver comentarios asociados a una publicación]

    PUT: http://localhost:4000/api/comment/:id [editar comentario]  

            {
                "content": "Nuevo contenido del comentario"
            }
    DELETE:  http://localhost:4000/api/comment/:id [borrar comentario]

#### Autor:
Paula Almela.
