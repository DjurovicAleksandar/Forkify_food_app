import { async } from 'regenerator-runtime';
import {
  API_URL,
  INGREDIENT_LENGTH,
  KEY,
  REC_PER_PAGE,
  STARTING_PAGE,
} from './configuration.js';
import { AJAX } from './helper.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: STARTING_PAGE,
    resultsPerPage: REC_PER_PAGE,
    ingredientLength: INGREDIENT_LENGTH,
  },
  bookmarks: [],
};
const createRecipeObject = data => {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    cookingTime: recipe.cooking_time,
    imageUrl: recipe.image_url,
    ingredients: recipe.ingredients,
    servings: recipe.servings,
    sourceUrl: recipe.source_url,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async id => {
  try {
    const data = await AJAX(`${API_URL}/${id}?key=${KEY}`);

    state.recipe = createRecipeObject(data);
    state.search.page = STARTING_PAGE;

    if (state.bookmarks.some(bookmarked => bookmarked.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async query => {
  try {
    const data = await AJAX(`${API_URL}?search=${query}&key=${KEY}`);

    state.search.results = data.data.recipes.map(e => {
      return {
        publisher: e.publisher,
        image: e.image_url,
        title: e.title,
        id: e.id,
        ...(e.key && { key: e.key }),
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateRecipeQuantity = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    const newQuantity = (ing.quantity * newServings) / state.recipe.servings;
    ing.quantity = newQuantity;
  });

  state.recipe.servings = newServings;
};

export const addBookmark = recipe => {
  state.bookmarks.push(recipe);

  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;

  //Saving bookmark to a local storage
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};
export const deleteBookmark = id => {
  const index = state.bookmarks.findIndex(element => element.id === id);
  state.bookmarks.splice(index, 1);

  if (id === state.recipe.id) state.recipe.bookmarked = false;

  //Uploading new bookmark array to local storage
  localStorage.setItem('bookmark', JSON.stringify(state.bookmarks));
};

export function loadBookmarkLocalStoarge() {
  //Loading bookmarks array from a local storage
  state.bookmarks = JSON.parse(localStorage.getItem('bookmark')) || [];
}

export const uploadRecipe = async function (data) {
  try {
    const ingredients = Object.entries(data)
      .filter(e => e[0].startsWith('ingredient'))
      .map((_, i, arr) => {
        //taking qu,unit and desc from out array, splicing first three
        const [quantity, unit, description] = arr
          .splice(0, 3)
          .map(e => e[1].trim());

        if (!quantity && !unit && !description) return '';
        return { quantity: quantity ? +quantity : null, unit, description };
      })
      .filter(e => e !== '');

    //   //Kada vracamo objekat APIJU, mora biti isti kao onaj koji primamo
    const recipe = {
      title: data.title,
      source_url: data.sourceUrl,
      image_url: data.image,
      publisher: data.publisher,
      cooking_time: +data.cookingTime,
      servings: +data.servings,
      ingredients,
    };

    const data1 = await AJAX(`${API_URL}?key=${KEY}`, recipe);
    state.recipe = createRecipeObject(data1);
    addBookmark(state.recipe);
  } catch (err) {
    console.error(err.message);
    //Bacamo gresku da mi je controler uhvatio
    throw err;
  }
};
