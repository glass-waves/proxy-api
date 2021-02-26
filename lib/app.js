const express = require('express');
const cors = require('cors');
const app = express();
const morgan = require('morgan');
const request = require('superagent');
const {formatLocation, formatWeather, parseReviewData} = require('../data/dataUtils.js')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev')); // http logging


app.get('/location', async (req, res) => {
    try {
        const city = req.query.search;
        const geoData = await request.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.GEODATA_API_KEY}&q=${city}&format=json`);
        const data = formatLocation(geoData.body);
        res.json(data);
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

app.get('/weather', async (req, res) => {
    try {

        const lat = req.query.latitude;
        const lon = req.query.longitude;
        const key = process.env.WEATHERBIT_API_KEY;

        console.log('Lat:', lat, "Lon: ", lon, "key:", key)

        const weatherData = await request.get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&key=${key}`)

        const data = formatWeather(weatherData);

        res.json(data);

    } catch (e) {

        res.status(500).json({ error: e.message });
    }
});

app.get('/reviews', async (req, res) => {
    try {

        const lat = req.query.latitude;
        const lon = req.query.longitude;
        const key = process.env.YELP_API_KEY

        console.log('Lat:', lat, "Lon: ", lon, "key:", key)

        const reviewData = await request.get(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lon}`)
            .set('Authorization', `Bearer ${key}`)
            .set('Accept', 'application/json')

        const reviews = parseReviewData(reviewData);

        res.json(reviews);

    } catch (e) {

        res.status(500).json({ error: e.message });
    }
});



app.use(require('./middleware/error'));

module.exports = app;
