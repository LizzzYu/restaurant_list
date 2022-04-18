const express = require('express')
const app = express()
const port = 3000

// require express-handlebars here
const exphbs = require('express-handlebars')

// require json file as raw data
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting the route and corresponding response
// localhost:3000  ==> This is my first Express Web App
app.get('/', (req, res) => {
  res.render('index', { restaurantList: restaurantList.results })
})

app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString() === req.params.id)
  res.render('show', { restaurant: restaurant })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  
  const name = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase())
  })

  const categories = restaurantList.results.filter(restaurant => {
    return restaurant.category.toLowerCase().includes(keyword.toLowerCase())
  })

  const restaurants = name.concat(categories.filter(c => name.indexOf(c) === -1))

  res.render('index', { restaurantList: restaurants, keyword: keyword })
})

// setting static files
app.use(express.static('public'));

// Listen the server when it started
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`)
})