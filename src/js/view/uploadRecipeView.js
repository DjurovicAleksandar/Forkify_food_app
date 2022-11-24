import View from './View.js';
import { INGREDIENT_LENGTH } from '../configuration';
import icons from 'url:../../img/icons.svg';

class UploadRecipe extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window ');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnAddIngredient = document.querySelector('.btn--add--ingridient');
  _message = 'Recipe uploaded succesfully';

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  addHandlerAddIngredient(handler) {
    this._btnAddIngredient.addEventListener('click', function (e) {
      handler();
    });
  }

  _ingredientHTML(num) {
    return `   
    <label>Ingredient</label>
    <input
      type="text"
      name="ingredient-quantity-${num}"
      placeholder="Quantity"
    />
    <input type="text" name="ingredient-unit-${num}" placeholder="Unit" />
    <input
      class="ingredient__description"
      type="text"
      name="ingredient-description-${num}"
      placeholder="Description"
    />`;
  }

  updateWindow(num) {
    const markup = this._ingredientHTML(num);

    this._parentElement
      .querySelector('.ingredient__tab')
      .insertAdjacentHTML('beforeend', markup);
  }

  renderWindow() {
    const markup = this._generateHTML();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  toogleWindow(e) {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toogleWindow.bind(this));
  }
  _addHandlerCloseWindow() {
    this._btnClose.addEventListener('click', this.toogleWindow.bind(this));
    this._overlay.addEventListener('click', this.toogleWindow.bind(this));
  }

  addHandlerUpload(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      const arrData = [...new FormData(this)];
      const data = Object.fromEntries(arrData);

      handler(data);
    });
  }

  _generateHTML() {
    return `
    <div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input required placeholder="Title" name="title" type="text" />
    <label>URL</label>
    <input required placeholder="URL" name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input required placeholder="Image URL" name="image" type="text" />
    <label>Publisher</label>
    <input
      required
      placeholder="Recipe publisher"
      name="publisher"
      type="text"
    />
    <label>Prep time</label>
    <input
      required
      placeholder="Preparation time"
      name="cookingTime"
      type="number"
    />
    <label>Servings</label>
    <input
      required
      placeholder="Number of servings"
      name="servings"
      type="number"
    />
  </div>

  <div class="upload__column __ingredients">
    <h3 class="upload__heading headingh3">
      Ingredients
      <span> <button class="addIngredientBtn">&plus;</button></span>
    </h3>

    <label>Ingredient</label>
    <input
      type="text"
      name="ingredient-quantity-1"
      placeholder="Quantity"
    />
    <input type="text" name="ingredient-unit-1" placeholder="Unit" />
    <input
      class="ingredient__description"
      type="text"
      name="ingredient-description-1"
      placeholder="Description"
      required
    />
    <label>Ingredient</label>
    <input
      type="text"
      name="ingredient-quantity-2"
      placeholder="Quantity"
    />
    <input type="text" name="ingredient-unit-2" placeholder="Unit" />
    <input
      class="ingredient__description"
      type="text"
      name="ingredient-description-2"
      placeholder="Description"
    />
    <label>Ingredient</label>
    <input
      type="text"
      name="ingredient-quantity-3"
      placeholder="Quantity"
    />
    <input type="text" name="ingredient-unit-3" placeholder="Unit" />
    <input
      class="ingredient__description"
      type="text"
      name="ingredient-description-3"
      placeholder="Description"
    />
    <label>Ingredient</label>
    <input
      type="text"
      name="ingredient-quantity-4"
      placeholder="Quantity"
    />
    <input type="text" name="ingredient-unit-4" placeholder="Unit" />
    <input
      class="ingredient__description"
      type="text"
      name="ingredient-description-4"
      placeholder="Description"
    />
    <label>Ingredient</label>
    <input
      type="text"
      name="ingredient-quantity-5"
      placeholder="Quantity"
    />
    <input type="text" name="ingredient-unit-5" placeholder="Unit" />
    <input
      class="ingredient__description"
      type="text"
      name="ingredient-description-5"
      placeholder="Description"
    />
    <label>Ingredient</label>
    <input
      type="text"
      name="ingredient-quantity-6"
      placeholder="Quantity"
    />
    <input type="text" name="ingredient-unit-6" placeholder="Unit" />
    <input
      class="ingredient__description"
      type="text"
      name="ingredient-description-6"
      placeholder="Description"
    />`;
  }
}

export default new UploadRecipe();
