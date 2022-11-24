import icons from 'url:../../img/icons.svg';
import { numberOfPages } from '../helper.js';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerBtn(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateHTML() {
    const currentPage = this._data.page;
    const nubmerOfPages = numberOfPages(this._data.results.length);
    //if we are on page 1, and there are other pages
    if (currentPage === 1 && nubmerOfPages > 1) {
      return this._generateMarkupBtn('next', currentPage + 1);
    }
    //if we are on the last page
    if (currentPage === nubmerOfPages && nubmerOfPages > 1) {
      return this._generateMarkupBtn('prev', nubmerOfPages - 1);
    }
    //if we are on the other page
    if (nubmerOfPages > 1) {
      return [
        this._generateMarkupBtn('next', currentPage + 1),
        this._generateMarkupBtn('prev', currentPage - 1),
      ].join('');
    }
    //if we are on the page 1, and there are not other pages
    // if(currentPage===1 && nubmerOfPages===1)
    return this._generateNumberOfPages(nubmerOfPages);
  }
  _generateNumberOfPages(pageNum) {
    const markup = `<div class='pagenum'>Num of pages${pageNum}</div>`;
    return markup;
  }

  _generateMarkupBtn(direction, page) {
    const prev = `<button data-goto="${page}" class="btn--inline pagination__btn--prev">
<svg class="search__icon">
  <use href="${icons}#icon-arrow-left"></use>
</svg>
<span>${page} Page</span>
</button>
`;
    const next = `<button data-goto="${page}" class="btn--inline pagination__btn--next">
<span>Page ${page}</span>
<svg class="search__icon">
  <use href="${icons}#icon-arrow-right"></use>
</svg>
</button>`;

    return direction === 'prev' ? prev : next;
  }
}

export default new PaginationView();

//prev ili next
