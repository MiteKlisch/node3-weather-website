const request = require('request');

const geoCode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(adress) + '.json?access_token=pk.eyJ1IjoibWl0ZWtpbGxldmljaDEiLCJhIjoiY2sxMTZydTdqMDFvcDNkcmk2YWJzazF3MyJ9.zxMlqIdYsdkiQkL3ezhk6A';
  
    request({ url, json: true}, (error, { body }) => {
      if (error) {
        callback('Unable to connect to location service', undefined);
      } else if (body.features.length === 0) {
        callback('Unable to find loaction . Try another search.' , undefined);
      } else {
        callback(undefined, {
          latitude: body.features[0].center[1],
          longitude: body.features[0].center[0],
          location: body.features[0].place_name,
        })
      }
    })
  };


  module.exports = geoCode;