import Notiflix from 'notiflix';
import axios from 'axios';

const inputEL = document.querySelector('#search-form');
const galerryEl = document.querySelector('.gallery');

inputEL.addEventListener('submit', onSearchHandler);

function onSearchHandler(evt) {
  evt.preventDefault();
  const { searchQuery } = evt.currentTarget.elements;

  const onSearch = searchQuery.value;
  console.dir(onSearch);

  const BASE_URL = 'https://pixabay.com/api';
  async function fetchPictures(onSearch) {
    const URL = `${BASE_URL}?key=35798505-4808c6159eed65087aecd98d1&q=${onSearch}&image_type=photo&orientation=horizontal&safesearch=true`;
    const resp = await fetch(URL);
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }
    return await resp.json();

  }

  fetchPictures(onSearch)
    .then(data => {
      console.dir(data.hits);

      if (data.total === 0) {
        // resetEl();
        Notiflix.Notify.info(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }
      if (data.total > 1) {
return galerryEl.insertAdjacentHTML('beforeend', MarkupPictureList(data.hits));
      }
    })
    .catch(error => {
      console.log(error);
      //resetEl();
      Notiflix.Notify.failure('Oops, there is error');
    });
};
        
        function MarkupPictureList(arr) {
          
          return arr
            .map(
              ({
                webformatURL,
                largeImageURL,
                tags,
                likes,
                views,
                comments,
                downloads,
              }) =>
                {
                   `<div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads${downloads}</b>
    </p>
  </div>
</div>`;
                }
            )
         .join("");
        }
