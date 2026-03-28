const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const titleEl = document.getElementById("title");
const imageEl = document.getElementById("image");
const ingredientsEl = document.getElementById("ingredients");
const instructionsEl = document.getElementById("instructions");

async function getRecipeDetails() {
    try {
        const response = await fetch(`/api/recipe/${id}`);
        const recipe = await response.json();

        titleEl.textContent = recipe.title;
        imageEl.src = recipe.image;

        // FAVORITES BUTTON
        const favoriteBtn = document.getElementById("favoriteBtn");

        favoriteBtn.textContent = isFavorite(recipe.id)
        ? "❤️ Saved"
        : "🤍 Save";

        favoriteBtn.addEventListener("click", () => {
            if (isFavorite(recipe.id)) {
            removeFavorite(recipe.id);
            favoriteBtn.textContent = "🤍 Save";
            } else {
            saveFavorite({
            id: recipe.id,
            title: recipe.title,
            image: recipe.image
            });
            favoriteBtn.textContent = "❤️ Saved";
            }
        });
        // INGREDIENTS
        ingredientsEl.innerHTML = "";
        recipe.extendedIngredients.forEach(ing => {
            const li = document.createElement("li");
            li.textContent = `${ing.amount} ${ing.unit} ${ing.name}`;
            ingredientsEl.appendChild(li);
        });

        // INSTRUCTIONS
        instructionsEl.innerHTML = recipe.instructions || "No instructions available.";

    } catch (error) {
    console.error("Error fetching recipe details:", error);
    instructionsEl.textContent = "Failed to load recipe.";
    }
}

getRecipeDetails();

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
