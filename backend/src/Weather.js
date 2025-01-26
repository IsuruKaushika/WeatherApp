const request = require('request');

const Weather = (location) => {
    return new Promise((resolve,reject) => {
        const info = {
            url: `http://api.weatherapi.com/v1/current.json?key=15a8519154a540fab9831808242303&q=${location}`,
            json: true
        }

        request(info,(error,{body}) => {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        })
    })
}

module.exports = Weather;