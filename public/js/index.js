// ----CODE LOUISVILLE
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

// getRandomImage();

// -----AA
// document.getElementById("getRecipe").addEventListener("click", getRecipe);

// async function getRecipe() {
//     const response = await fetch("/api/recipe");
//     const data = await response.json();

//     document.getElementById("recipe").innerHTML = `
//         <h2>${data.title}</h2>
//         <img src="${data.image}" width="300">
//     `;
// }
