const container = document.getElementById("favorites-container");

function displayFavorites() {
    const favorites = getFavorites();

    container.innerHTML = "";

    if (favorites.length === 0) {
    container.innerHTML = "<p>No favorites saved yet.</p>";
    return;
    }

    favorites.forEach(recipe => {
    const div = document.createElement("div");
    div.classList.add("recipe-card");

    div.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" />
        <button class="remove-btn">Remove</button>
    `;

    // GO TO RECIPE
    div.addEventListener("click", () => {
        window.location.href = `/recipe.html?id=${recipe.id}`;
    });

    // REMOVE BUTTON
    const removeBtn = div.querySelector(".remove-btn");

    removeBtn.addEventListener("click", (e) => {
        e.stopPropagation();

        removeFavorite(recipe.id);
        displayFavorites();
    });

    container.appendChild(div);
    });
}

displayFavorites();