// DEPENDENCIES
const express = require('express')
const { Sequelize } = require('sequelize')
const app = express()

//Controllers
const bandsController = require('./controllers/band_controller');
const eventsController = require('./controllers/events_controller');
const stagesController = require('./controllers/stages_controller');
const { sequelize } = require('./models');


// CONFIGURATION / MIDDLEWARE
require('dotenv').config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// controller setup
app.use('/bands', bandsController);
app.use('/events', eventsController);
app.use('/events', stagesController);

// ROOT
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to the Tour API'
    })
})

// LISTEN
app.listen(process.env.PORT, () => {
    console.log(`🎸 Rockin' on port: ${process.env.PORT}`)
});

//sequelize.sync().then(() => {
   // console.log('Synchronized the db')
//})

/* SEQUELIZE CONNECTION
const sequelize = new Sequelize(process.env.PG_URI)

try {
    sequelize.authenticate() 
    console.log(`Connected with Sequelize at ${process.env.PG_URI}`) 
} catch(err) {
    console.log(`Unable to connect to PG: ${err}`) 
}
*/
