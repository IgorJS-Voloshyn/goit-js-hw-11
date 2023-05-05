import axios from 'axios';

export default async function fetchPictures(onSearch = hfjhgjhgjhg, currentPage = 1) {
  
   const BASE_URL = 'https://pixabay.com/api/';
   const KEY = '35798505-4808c6159eed65087aecd98d1';
  const params = `?key=${KEY}&q=${onSearch}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${currentPage}`;
  const resp = await axios.get(`${BASE_URL}${params}`).then(response => response.data);
  console.log(resp)
   return resp;
}
 
