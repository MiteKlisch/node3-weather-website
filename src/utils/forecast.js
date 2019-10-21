const request = require('request');



const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9e7798a23023b395aef09a22ed063e6d/'+ encodeURIComponent(latitude)  +',' +encodeURIComponent(longitude) + '?units=si';


    request({ url, json:true}, (error, { body }) => {
        if (error) {
           callback('Unable to connect the weather service', undefined);
        } else if (body.error) {
            callback('Unable find location', undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently '+ body.currently.temperature + ' degrees out. '+ 
                   'This high today is ' + body.daily.data[0].temperatureHigh + ' with a low of ' + body.daily.data[0].temperatureLow + '.' +' There is ' + 
                    body.currently.precipProbability + '% chance of rain');
        }
    } )
}


module.exports = forecast;