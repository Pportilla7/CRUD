const Express=require('express')
const app=Express();

app.use(Express.json());

app.use(Express.urlencoded({ extended: true }));

let usuarios = [
    { id: 1, nombre: 'Ryu', edad: 32, lugarProcedencia: 'Japón' },
    { id: 2, nombre: 'Chun-Li', edad: 29, lugarProcedencia: 'China' },
    { id: 3, nombre: 'Guile', edad: 35, lugarProcedencia: 'Estados Unidos' },
    { id: 4, nombre: 'Dhalsim', edad: 45, lugarProcedencia: 'India' },
    { id: 5, nombre: 'Blanka', edad: 32, lugarProcedencia: 'Brasil' },
];

app.get('/usuarios', (req, res)=>{
    res.send(`<h1>Lista de usuarios</h1>
    <ul>
        ${usuarios.map(usuario=> `<li>ID: ${usuario.id} Nombre: ${usuario.nombre} Edad: ${usuario.edad} Lugar de procedencia: ${usuario.lugarProcedencia}</li>`).join('')}
    </ul>
    <form action="/usuarios" method="post">
    <label for="nombre">Nombre:</label>
    <input type="text" id="nombre" name="nombre">
    <br> 
    <label for="edad">Edad:</label>
    <input type="number" id="edad" name="edad">
    <br>
    <label for="lugarProcedencia">Lugar de procedencia</label>
    <input type="text" id="lugarProcedencia" name="lugarProcedencia">
    <br>
    <button type="submit">Enviar</button>
    </form>
    `)
})

app.get('/usuarios/:nombre', (req, res)=>{
    const usuarioBuscado = usuarios.find(usuario => usuario.nombre === req.params.nombre);

    res.send(`<h1>Usuario encontrado</h1>
    <p>ID: ${usuarioBuscado.id} Nombre: ${usuarioBuscado.nombre} Edad: ${usuarioBuscado.edad} Lugar de procedencia: ${usuarioBuscado.lugarProcedencia}</p>
    <a href="/usuarios">Volver a usuarios</a>
    `)
})

app.post('/usuarios', (req, res)=>{
    const nuevoUsuario={
        id: usuarios.length+1,
        nombre: req.body.nombre,
        edad: req.body.edad,
        lugarProcedencia: req.body.lugarProcedencia
    }
    usuarios.push(nuevoUsuario);
    res.redirect('/usuarios')
})

app.put('/usuarios/:nombre', (req, res)=>{
    const indiceUsuario = usuarios.findIndex(usuario => usuario.nombre === req.params.nombre);    
    

    usuarios[indiceUsuario]={
        id:req.body.id,
        nombre:req.body.nombre,
        edad:req.body.edad,
        lugarProcedencia:req.body.lugarProcedencia
    }

    res.json(usuarios[indiceUsuario]);

})

app.listen(3000, ()=>{
    console.log("Servidor escuchando...")
})