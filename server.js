// -------------------
"use strict";

const express = require("express");
const app = express();
const port = 8080;

require("dotenv").config();
const cors = require("cors");

const corsOptions = {
    origin: `http://localhost:${port}`
}

app.use(cors(corsOptions));

app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
//------------------------
//RANDOM RECIPE FUNCTION
async function getRecipe() {
    const endpoint = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.SPOONACULAR_KEY}`;
        try {
        const response = await fetch(endpoint);
        const data = await response.json(); 

        return data.recipes[0];
    } catch (error) {
        console.error(error);
            throw error;
    }
}
//------------------------
//API ROUTE
app.get("/api/recipe", async (request, response) => {
    try {
        const recipe = await getRecipe();

        response.status(200).json({
            title: recipe.title,
            image: recipe.image,
            summary: recipe.summary,
            instructions: recipe.instructions,
            ingredients: recipe.extendedIngredients.map(ing => ({
                name: ing.name,
                amount: ing.amount,
                unit: ing.unit
            }))
        });
    } catch (error) {
        console.error(error);
    }    
});

//--------------------------
app.listen(port, () => {
    console.log(`Server is running http://localhost:${port}`);
    console.log("Press Ctrl+C to end this process.");
});

// SEARCH BAR ------------------------------
app.get("/api/search", async (request, response) => {
    const query = request.query.query;

    try {
        const fetchResponse = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=2&apiKey=${process.env.SPOONACULAR_KEY}`);
        const data = await fetchResponse.json();
        response.json(data);
    } catch (error) {
        console.error(error);
    }
});
// ------------------------------------
// GET RECIPES BY ID
app.get("/api/recipe/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const response = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_KEY}`);
        const recipe = await response.json();
        res.json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch recipe details" });
    }
});
// ------------------------------