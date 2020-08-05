const express = require("express")
const path = require("path")
const hbs = require("hbs")
const cors = require("cors")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewPath = path.join(__dirname, "../templates/views")
const partialPath = path.join(__dirname, "../templates/partials")

const app = express()
app.use(cors())

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewPath)
hbs.registerPartials(partialPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "zillBoy"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        name: "zillBoy"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "zillBoy",
        helpText: "This is some helpful text"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide the address term"
        })
    }

    geocode(req.query.address, (error, geocodeData = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(req.query.address, (error, forecastData = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                geocode: geocodeData,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get("/products", (req, res) => {
    
    if (!req.query.search) {
        return res.send({
            error: "You must provide a search term"
        })
    }
    req.query
    res.send({
        products: []
    })
})

app.get("/help/*", (req, res) => {
    res.render("pagenotfound", {
        title: "404",
        name: "zillBoy",
        errorMessage: "help article not found.",
    })
})

app.get("*", (req, res) => {
    res.render("pagenotfound", {
        title: "404",
        name: "zillBoy",
        errorMessage: "Page Not Found"
    })
})

app.listen(3000, () => {
    console.log("Server is up on port 3000.")
})