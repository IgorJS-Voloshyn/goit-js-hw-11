import Notiflix from 'notiflix';
import { MarkupPictureList } from './partials/photo_card_markup';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const inputEL = document.querySelector('#search-form');
const galerryEl = document.querySelector('.js-gallery');
const guard = document.querySelector('.js-guard');

const galerrySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

inputEL.addEventListener('submit', onSearchHandler);


function onSearchHandler(evt) {
  galerryEl.innerHTML = '';
  evt.preventDefault();
const observer = new IntersectionObserver(onPagination, {
  root: null,
  rootMargin: '400px',
  threshold: 0,
});
  let currentPage = 1; 
  const galerrySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});
 
  const { searchQuery } = evt.currentTarget.elements;
  const onSearch = searchQuery.value;
  console.dir(onSearch);
 

  const BASE_URL = 'https://pixabay.com/api';
  async function fetchPictures(onSearch, currentPage) {
    const URL = `${BASE_URL}?key=35798505-4808c6159eed65087aecd98d1&q=${onSearch}&image_type=photo&orientation=horizontal&safesearch=true&page=${currentPage}&per_page=40`;
    const resp = await fetch(URL);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return await resp.json();

  }

  fetchPictures(onSearch,currentPage)
    .then(data => {
      console.dir(data);

      if (onSearch === '') {
        return;
      }

      if (data.total === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      if (data.total > 0) {
        galerryEl.insertAdjacentHTML('beforeend', MarkupPictureList(data.hits));
         Notiflix.Notify.info(
          `"Hooray! We found ${data.totalHits} images."`
        );
        observer.observe(guard);
        galerrySimpleLightbox.refresh();
      }
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is error');
    });
  
  
function onPagination(entries, observer) {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting = true) {
      currentPage += 1;
      fetchPictures(onSearch,currentPage)
        .then(data => {
          galerryEl.insertAdjacentHTML('beforeend', MarkupPictureList(data.hits));
           galerrySimpleLightbox.refresh();
       });
    }
    });
 };
};
        
       

