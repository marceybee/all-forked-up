"use strict"
// GET RECIPE ----------------------------------

document.getElementById("getRecipe").addEventListener("click", getRecipe);

async function getRecipe() {
    // const endpoint = "http://localhost:8080/api/recipe";
    const endpoint = "/api/recipe";
    try {
        const response = await fetch(endpoint);
        const data = await response.json();
        
        const recipeId = data.id;
        window.location.href = `/recipe.html?id=${recipeId}`;
    // RETURNING DATA ON SAME PAGE - NOT USING
    //     document.getElementById("recipe").innerHTML = `
    //     <h2>${data.title}</h2>
    //     <img src="${data.image}" width="300">
    //     <h3>Summary:</h3>
    //     <p>${data.summary}</p>
    //     <h3>Ingredients:</h3>
    //     <ul>
    //         ${data.ingredients.map(ing => `<li>${ing.amount} ${ing.unit} ${ing.name}</li>`).join('')}
    //     </ul>
    //     <h3>Instructions:</h3>
    //     <p>${data.instructions}</p>
        

    // `;
  
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

// ------------------------------------
// // GET FAVORITES ---------------------
// function getFavorites() {
//     return JSON.parse(localStorage.getItem("favorites")) || [];
// }
// // SAVE FAVORITES ---------------------
// function saveFavorite(recipe) {
//     let favorites = getFavorites();

//     if (!favorites.find(fav => fav.id === recipe.id)) {
//         favorites.push(recipe);
//         localStorage.setItem("favorites", JSON.stringify(favorites));
//     }
// }
// // REMOVE FAVORITES
// function removeFavorite(id) {
//     let favorites = getFavorites();
//     favorites = favorites.filter(fav => fav.id !== id);
//     localStorage.setItem("favorites", JSON.stringify(favorites));
// }
// // IS FAVORITE
// function isFavorite(id) {
//     return getFavorites().some(fav => fav.id === id);
// }