# all-forked-up

Overview
A Code:Louisville capstone project using Spoonacular API, demonstrating the use of HTML, JavaScript and Node.js with Express.

Project Overview
All Forked Up provides an easy and interactive way for users to find new meals, view detailed cooking instructions, and save their favorite recipes for later - with no ads or unnecessary backstories (i.e., My kids used to hate vegetables until we tried this recipe and now we go to the broccoli farm every day and also my husband loves how easy it is to clean up afterwards and this is my special carrot peeler that my grandma gave me and the funny thing is…). The website focuses on simplicity, responsiveness, and a clean user interface.

## Project Organization

**Home Page:** Allows users to search for recipes and view a preview of the recipe(s), including name and picture, before clicking into full details. Also includes a button to generate a random recipe.

**Recipe Page:** View the details of a recipe, including image, ingredients and instructions. Users can opt to save the recipe on this page.

**Favorites Page:** Displays saved recipes in a responsive card layout using localStorage, with the option to delete recipes from the page.

## Capstone Requirements Fulfilled

| Requirement | Implementation |
|-------------|----------------|
| **Retrieve data from a third-party API** | Integrated the Spoonacular API to fetch recipe data |
| **Create a Node.js web server using Express.js** | Built an Express server with API routes to fetch recipe data |
| **Display information from data stored in arrays and objects** | Displayed recipes in styled cards with information pulled from the API |
| **Persist important data to local storage** | Created a page for users to save favorites, which stays available after a refresh |
| **Responsive Design** | Used Flexbox and Grid for layout and responsiveness, implemented media queries for smaller screens, and ensured cards collapse into a single column on mobile |

## How to Download

1. **Create an account** on https://spoonacular.com/food-api and copy your API key.
2. **Clone the Repository with GIT**
```bash
Git clone https://github.com/marceybee/all-forked-up.git
```
3. **Navigate to the Directory**
```bash
cd all-forked-up
```
4. **Install Dependencies**
```bash
npm install
```
5. **Set Up Environment Variables**
Create an `.env` file in the root directory and add:
```env
SPOONACULAR_KEY=your_api_key_here
```
6. **Start the Server**
```bash
npm run dev
```
7. **Open the Application**
Navigate to:
```bash
http://localhost:8080
```
