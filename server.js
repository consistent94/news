require('dotenv').config();

const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const apiKey = process.env.API_KEY;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", async (req, res) => {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=keyword&apiKey=${apiKey}`
        );
        const data = response.data;

        res.render("index", { news: data.articles });
    } catch (error) {
        console.error("There was a problem...", error);
        res.status(500).send("There was a problem fetching news.");
    };
});

app.get("/search", async (req, res) => {
    try {
        const searchTerm = req.query.search;

        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${apiKey}`
        );
        const data = response.data.articles;
        const news = data.filter(item => 
            item.title?.toLowerCase().includes(searchTerm?.toLowerCase())
        );

        res.render("index", { news });
    } catch (error) {
        console.error("There was a problem: ", error);
        res.status(500).send("There was a problem fetching news. Try again later.")
    };
});

app.get("/sort-by-date", async (req, res) => {
    try {
        const response = await axios.get(
            `https://newsapi.org/v2/everything?q=keyword&apiKey=${apiKey}`
        );
        const data = response.data.articles;
        data.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));

        res.render("index", { news: data });
    } catch (error) {
        console.error("There was problem sorting by date: ", error);
        res.status(500).send("There was an issue sorting news by date. Try later.")
    };
});

app.listen(3000, () => {
    console.log("server listening on port 3000");
});