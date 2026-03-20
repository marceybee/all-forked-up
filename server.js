// -----CODE LOUISVILLE
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
//FUNCTION
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

// async function getRandomImage() {
//     const endpoint = `https://api.unsplash.com/photos/random/?client_id=${process.env.CLIENT_ID}`;
//     try {
//         const response = await fetch(endpoint);
//         const returnedData = await response.json();
//         const receivedPhotoUrl = returnedData.urls.regular;

//         return receivedPhotoUrl;
//     } catch (error) {
//         console.error(error);
//     }
// }

// getRandomImage();


// app.use("/api/v1/getRandomImage", async (request, response) => {
//     response.status(200).json({
//         status: 200,
//         data: await getRandomImage(),
//     });
// });



// -----AA
// const express = require("express");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// const PORT = 8080;

// app.use(cors());

// // Serve your "public" folder (HTML, CSS, JS)
// app.use(express.static("public"));


// ------------------------------
// Spoonacular Function
// ------------------------------
// async function getRandomRecipe() {
//     const endpoint = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${process.env.SPOONACULAR_KEY}`;

//     try {
//         const response = await fetch(endpoint);
//         const data = await response.json();

//         return data.recipes[0];
//     } catch (error) {
//         console.error("Recipe fetch error:", error);
//         throw error;
//     }
// }


// ------------------------------
// API Route
// ------------------------------
// app.get("/api/recipe", async (req, res) => {
//     try {
//         const recipe = await getRandomRecipe();

//         res.json({
//             title: recipe.title,
//             image: recipe.image,
//             instructions: recipe.instructions
//         });

//     } catch (error) {
//         console.error("Route error:", error);
//         res.status(500).json({ error: "Error fetching recipe" });
//     }
// });


// ------------------------------
// app.listen(PORT, () => {
//     console.log(`Server running on http://localhost:${PORT}`);
// });