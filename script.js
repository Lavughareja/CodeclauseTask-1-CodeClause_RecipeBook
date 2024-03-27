
let recipes = JSON.parse(localStorage.getItem('recipes')) || [];


let editingIndex = -1;


function searchRecipes() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(searchTerm) ||
        recipe.ingredients.toLowerCase().includes(searchTerm) ||
        recipe.recipe.toLowerCase().includes(searchTerm)
    );
    displayRecipes(filteredRecipes);
}


function displayRecipes(recipesToDisplay) {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';

    (recipesToDisplay || recipes).forEach((recipe, index) => {
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe');
        recipeCard.innerHTML = `
            <h2>${recipe.name}</h2>
            <img src="${recipe.image}" alt="${recipe.name}">
            <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
            <p><strong>Recipe:</strong> ${recipe.recipe}</p>
            <button onclick="editRecipe(${index})">Edit</button>
            <button onclick="deleteRecipe(${index})">Delete</button>
        `;
        recipeList.appendChild(recipeCard);
    });
}



function editRecipe(index) {
    const recipe = recipes[index];
    document.getElementById('edit-recipe-name').value = recipe.name;
    document.getElementById('edit-recipe-ingredients').value = recipe.ingredients;
    document.getElementById('edit-recipe-image').value = recipe.image;
    document.getElementById('edit-recipe').value = recipe.recipe;
    editingIndex = index;
    openModal();
}


function deleteRecipe(index) {
    recipes.splice(index, 1);
    localStorage.setItem('recipes', JSON.stringify(recipes));
    displayRecipes();
}


function clearForm() {
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-image').value = '';
    document.getElementById('recipe').value = ''; 
}


function openModal() {
    document.getElementById('edit-modal').style.display = 'block';
}


function closeModal() {
    document.getElementById('edit-modal').style.display = 'none';
}





window.onload = displayRecipes;




function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const image = document.getElementById('recipe-image').value;
    const recipe = document.getElementById('recipe').value;

    if (name && ingredients && image && recipe) {
        recipes.push({ name, ingredients, image, recipe });
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        clearForm();
    } else {
        alert('Please fill in all fields!');
    }
}


function updateRecipe() {
    const name = document.getElementById('edit-recipe-name').value;
    const ingredients = document.getElementById('edit-recipe-ingredients').value;
    const image = document.getElementById('edit-recipe-image').value;
    const recipe = document.getElementById('edit-recipe').value;

    if (name && ingredients && image && recipe) {
        recipes[editingIndex] = { name, ingredients, image, recipe };
        localStorage.setItem('recipes', JSON.stringify(recipes));
        displayRecipes();
        closeModal();
    } else {
        alert('Please fill in all fields!');
    }
}
