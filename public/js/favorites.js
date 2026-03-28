// GET FAVORITES ---------------------
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}
// SAVE FAVORITES ---------------------
function saveFavorite(recipe) {
    let favorites = getFavorites();

    if (!favorites.find(fav => fav.id === recipe.id)) {
        favorites.push(recipe);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }
}
// REMOVE FAVORITES
function removeFavorite(id) {
    let favorites = getFavorites();
    favorites = favorites.filter(fav => fav.id !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
}
// IS FAVORITE
function isFavorite(id) {
    return getFavorites().some(fav => fav.id === id);
}