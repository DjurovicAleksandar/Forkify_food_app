import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
import { numberOfPages } from '../helper.js';
import View from './View.js';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';

  _generateHTML() {
    return this._data.map(previewView.generateMarkup).join('');
  }

  addPageNumber(pagesLength) {
    const element = this._parentElement
      .closest('.search-results')
      .querySelector('.pagenum');

    element.textContent = `Number of pages: ${numberOfPages(pagesLength)}`;
  }
}

export default new ResultsView();
