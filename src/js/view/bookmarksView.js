import icons from 'url:../../img/icons.svg';
import View from './View.js';

import previewView from './previewView.js';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks found. Bookmark recipe, and try again!';
  _message = 'Save the recipe you love!';

  _generateHTML() {
    return this._data.map(previewView.generateMarkup).join('');
  }
}

export default new BookmarksView();
