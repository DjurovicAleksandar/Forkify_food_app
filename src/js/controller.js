import 'core-js/stable';
import 'regenerator-runtime/runtime';

import * as model from '../js/model.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import resultsView from './view/resultsView.js';
import bookmarksView from './view/bookmarksView.js';
import paginationView from './view/paginationView.js';
import uploadRecipeView from './view/uploadRecipeView.js';
import { MODAL_TIME_SEC, STARTING_PAGE } from './configuration.js';
import { numberOfPages } from './helper.js';

///////////////////////////////////////
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //Render spinner
    recipeView.renderSpinner();

    // //updating view of results based on selected item in a list, read it marking it selected
    resultsView.update(model.getSearchResultPage());

    //Loading RECIPE
    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);

    //Updating bookmark class based on if we are on bookmarked recipe or not
    bookmarksView.update(model.state.bookmarks);

    //Render Recipe
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async () => {
  try {
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    //render a Spinner

    resultsView.renderSpinner();

    //render Results from search
    resultsView.render(model.getSearchResultPage(STARTING_PAGE));
    resultsView.addPageNumber(model.state.search.results.length);

    //Render pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPaginationBtns = number => {
  resultsView.render(model.getSearchResultPage(number));

  //Render pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = newServing => {
  //Update servings in state
  model.updateRecipeQuantity(newServing);

  //Render DOM
  recipeView.update(model.state.recipe);
};

const controlBookmarks = function () {
  //Adding page to bookmarks array and adding it new property BOOKMARKED = true
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
    //Saving bookmark to storage
  } else {
    model.deleteBookmark(model.state.recipe.id);

    //Deleting bookmark
  }

  //Loading bookmakrs from STORAGE

  //RENDERING IT ON THE PAGE WITH UPDATE
  recipeView.update(model.state.recipe);

  //Rendering bookmark to bookmark tab
  bookmarksView.render(model.state.bookmarks);
};

const controlUpload = async data => {
  try {
    //Cekamo Async datu, jer vraca promise
    uploadRecipeView.renderSpinner();
    await model.uploadRecipe(data);

    //render recipe
    recipeView.render(model.state.recipe);

    //Succes message
    uploadRecipeView.renderMessage();

    //Render bookmark, dodajemo novi pa renderujemo, ne update postojece
    bookmarksView.render(model.state.bookmarks);

    //ID change
    window.history.pushState(null, '', model.state.recipe.id);

    //Close window
    setTimeout(() => {
      uploadRecipeView.toogleWindow();
      uploadRecipeView.renderWindow();
    }, MODAL_TIME_SEC * 1000);
  } catch (err) {
    console.error(err);
    uploadRecipeView.renderError(err.message);
  }
};

const controlIngredientAdd = function () {
  uploadRecipeView.updateWindow(model.state.search.ingredientLength++);
};

const init = () => {
  model.loadBookmarkLocalStoarge();
  bookmarksView.renderMessage();
  bookmarksView.render(model.state.bookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmarkRecipe(controlBookmarks);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerBtn(controlPaginationBtns);
  uploadRecipeView.addHandlerUpload(controlUpload);
  uploadRecipeView.addHandlerAddIngredient(controlIngredientAdd);
};

init();
