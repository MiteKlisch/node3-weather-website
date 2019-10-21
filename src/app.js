const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');


const app = express();
const port = process.env.PORT || 3000;


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to path
app.use(express.static(path.join(publicDirectoryPath)));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Volodymyr Klishchevskyi'
    });
});

//about
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Volodymyr Klishchevskyi'
    });
});

//help
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Some helpful text',
        title: 'Help',
        name: 'Volodymyr Klishchevskyi'
    })
})

//weather page
app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        res.send({
            error: 'You must provide adress term'
        })
    }
    geocode(req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
           
            res.send({
                forecast: forecastData, location,
                adress: req.query.adress
            })
        })
    })
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }

    console.log(req.query.search);
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Volodymyr Klishchevskyi',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Volodymyr Klishchevskyi',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log('Sever is up on port 3000');
});