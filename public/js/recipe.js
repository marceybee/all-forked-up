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