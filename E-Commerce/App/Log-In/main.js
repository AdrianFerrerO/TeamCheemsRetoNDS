/* 

endpoint: http://localhost:5000/api/auth

body: 
{
    "username": "username",
    "password": "password"
}

Retorna:
{
    "message": "True" or "False"
}

Si retorna True las credenciales enviadas hacen match con la db.
Se puede continuar con la logica de la app, despues de recibir True, 
se hace la peticion al endpoint de los usuarios. Se redirige a la vista Profile.
*/ 
const data = { username: 'example', password: 'password' };

fetch('http://localhost:5000/api/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})

.then((response) => response.json())
//Then with the data from the response in JSON...
.then((data) => {
  console.log('Success:', data);
})