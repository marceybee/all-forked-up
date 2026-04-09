"use strict"
// GET RECIPE ----------------------------------

document.getElementById("getRecipe").addEventListener("click", getRecipe);

async function getRecipe() {
    const endpoint = "/api/recipe";
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        const recipeId = data.id;
        window.location.href = `/recipe.html?id=${recipeId}`;

  
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

// DISPLAY RECIPES -------------------------
function displayRecipes(recipes) {
    container.innerHTML = "";

    if (!recipes || recipes.length === 0) {
        container.innerHTML = "<p>No recipes found.</p>";
        return;
    }

    recipes.forEach(recipe => {
        const div = document.createElement("div");
        div.classList.add("recipe-card");

        div.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        `;

        div.addEventListener("click", () => {
            window.location.href = `/recipe.html?id=${recipe.id}`;
        });

        container.appendChild(div);
    });
}