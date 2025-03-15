`use strict`
const express = require(`express`);
const cors = require(`cors`);
const App = express();

//llamado a Routers

const alumnoRoutes = require('./routes/alumnoRoutes');
const claseRoutes = require('./routes/claseRoutes');
const docenteRoutes = require('./routes/docenteRoutes');



App.use(
    cors({
        origin: "*",
    })
);

App.use(cors())
App.use(express.json({limit: `10mb`}));
App.use(express.urlencoded({extended: false}));

//Creacion de end Points
App.use('/api/unicah', alumnoRoutes, claseRoutes, docenteRoutes)

module.exports = App;