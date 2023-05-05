import Notiflix from 'notiflix';
import { markupPictureList } from './js/photo_card_markup';
import fetchPictures from './js/fetch_api';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const formEL = document.querySelector('#search-form');
const galerryEl = document.querySelector('.js-gallery');
const guard = document.querySelector('.js-guard');

  
const galerrySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});


formEL.addEventListener('submit', onFormSubmit);


function onFormSubmit(evt) {
 evt.preventDefault();
 galerryEl.innerHTML = '';
 let currentPage = 1;
const { searchQuery } = evt.currentTarget.elements;
  const onSearch = searchQuery.value.trim();
  if (!onSearch) {
    Notiflix.Notify.info(
          'Please enter your search query.'
    );
    return;
 }
   const observer = new IntersectionObserver(onPagination, {
    root: null,
    rootMargin: '300px',
    threshold: 0,
    });


fetchPictures(onSearch,currentPage)
    .then(data => {
      console.dir(2);
    galerryEl.innerHTML = ''


      if (data.totalHits === 0) {
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      };

      if (data.totalHits > 0) {
        galerryEl.insertAdjacentHTML('beforeend', markupPictureList(data.hits));
         Notiflix.Notify.info(
          `"Hooray! We found ${data.totalHits} images."`
        );
        observer.observe(guard);
        galerrySimpleLightbox.refresh();
        return;
      };
    })
    .catch(error => {
      console.log(error);
      Notiflix.Notify.failure('Oops, there is error');
    });
  
  
  function onPagination(entries,observer) {
  console.log(3);
   entries.forEach(entry => {
     console.dir(entries);
     console.log(onSearch);
    if (entry.isIntersecting === true & onSearch !== null) {
      currentPage += 1;
      fetchPictures(onSearch,currentPage)
        .then(data => {
          if (data.totalHits > 40) {
            galerryEl.insertAdjacentHTML('beforeend', markupPictureList(data.hits));
            galerrySimpleLightbox.refresh();
          }
});
    }
    });
 };   
};
    
       

