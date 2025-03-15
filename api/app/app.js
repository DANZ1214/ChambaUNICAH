`use strict`
const express = require(`express`);
const cors = require(`cors`);
const App = express();

//llamado a Routers

const alumnoRoutes = require('./routes/alumnoRoutes');
const claseRoutes = require('./routes/claseRoutes');
const docenteRoutes = require('./routes/docenteRoutes');
const userRoutes = require('./routes/userRoutes');


App.use(
    cors({
        origin: "*",
    })
);

App.use(cors())
App.use(express.json({limit: `10mb`}));
App.use(express.urlencoded({extended: false}));

//Creacion de end Points
App.use('/api/unicah/alumno', alumnoRoutes);
App.use('/api/unicah/clase', claseRoutes);
App.use('/api/unicah/docente', docenteRoutes);
App.use('/api/unicah/user', userRoutes);

module.exports = App;