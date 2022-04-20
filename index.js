var exp = require('express')
var bp = require('body-parser')
var request = require('request')

var aaa = exp()
aaa.use(bp.urlencoded({ extended: true }))
aaa.set('view engine', 'ejs')
var city = 'Gwalior'
var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`

aaa.get('/', function (req, res) {
    request(url, function (err, response, body) {
        var weather = JSON.parse(body)
        console.log(weather)
        var cel = 5 / 9 * (weather.main.temp - 32)

        cel = Math.trunc(cel)
        var detail = {
            city: city,
            temperature: cel,
            icon: weather.weather[0].icon,
            description: weather.weather[0].description
        }
        res.render('home', { data: detail })
    })
})

aaa.post('/temp', function (req, res) {
    city = req.body.city_name

    var city = city
    var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=271d1234d3f497eed5b1d80a07b3fcd1`

    request(url, function (err, response, body) {
        var weather = JSON.parse(body)
        console.log(weather)
        var cel = 5 / 9 * (weather.main.temp - 32)

        cel = Math.trunc(cel)
        var detail = {
            city: city,
            temperature: cel,
            icon: weather.weather[0].icon,
            description: weather.weather[0].description
        }
        res.render('home', { data: detail })
    })
})

aaa.listen(3000, function (req, res) {
    console.log('server started')
})