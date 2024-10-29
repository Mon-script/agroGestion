const express = require('express')
const app = express()
const port = 3000
const routes = require('./api/endPoints')
const cors = require('cors');
const path = require('path');

app.use(express.json({ limit: '3gb' }));
app.use(express.static(path.join(__dirname,'dbImagenes')))
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:6969'
}));



app.use('/', routes);

app.listen(port, () => {
    console.log(`Estoy escuchando en el puerto ${port}`)
})

/*{
    origin: ["http://localhost:6969"],
    methods: ["GET", "POST","PUT","DELETE"]
}*/