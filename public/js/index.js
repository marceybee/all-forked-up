// RANDOM RECIPE ----------------------------------
"use strict"

document.getElementById("getRecipe").addEventListener("click", getRecipe);

async function getRecipe() {
    const endpoint = "http://localhost:8080/api/recipe";
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        document.getElementById("recipe").innerHTML = `
        <h2>${data.title}</h2>
        <img src="${data.image}" width="300">
        <h3>Summary:</h3>
        <p>${data.summary}</p>
        <h3>Ingredients:</h3>
        <ul>
            ${data.ingredients.map(ing => `<li>${ing.amount} ${ing.unit} ${ing.name}</li>`).join('')}
        </ul>
        <h3>Instructions:</h3>
        <p>${data.instructions}</p>
        

    `;
  
    } catch (error) {
        console.error(error);
    }
}

// ----------------------------------------

// SEARCH BAR ------------------------------
const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const container = document.getElementById("recipes-container");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const query = input.value;
    container.innerHTML = "<p>Loading...</p>";

    try {
        const response = await fetch(`/api/search?query=${query}`);
        const data = await response.json();

        console.log(data);
        displayRecipes (data.results || []);
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
});


function displayRecipes(recipes) {
    container.innerHTML = "";

    if (!recipes || recipes.length === 0) {
        container.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const div = document.createElement("div");

        div.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        `;

        container.appendChild(div);
    });
}

// ------------------------------------

