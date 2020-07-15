const url = 'https://superheroapi.com/api.php/2928355607286861';
const searchBox = document.getElementById('search');
const searchResultsContainer = document.getElementById('search-results-container');

loadEventListeners();
function loadEventListeners(){
  searchBox.addEventListener('keyup', handleSearch);
}

async function handleSearch(e){
  let name = e.target.value.trim();
  if(name.length == 0){
    await clearResults();
  }
  else{
    let data = await fetchAsync(`${url}/search/${name}`);
    if(data && data.response === 'success'){
      searchResultsContainer.innerHTML = "";
      for(let i = 0; i < data.results.length; i++){
        let item = document.createElement('div');
        item.className = "search-item";
        item.setAttribute('id', `${data.results[i].id}`);

        let label = document.createElement('div');
        label.innerHTML = data.results[i].name;
        label.addEventListener('click', viewHeroPage);
        item.appendChild(label);

        let option = document.createElement('div');
        option.innerHTML = "Add to favourites";
        option.addEventListener('click', addToFavourites);
        item.appendChild(option);

        searchResultsContainer.appendChild(item);
      }
    }
    else{
      await clearResults();
    }
  }
}

async function fetchAsync (url) {
  try{
    let response = await fetch(url);
    let data = await response.json();
    return data;  
  }catch(err){
    await clearResults();
  }
}

async function clearResults(){
  let i = searchResultsContainer.childNodes.length;
  while(i--){
    searchResultsContainer.removeChild(searchResultsContainer.lastChild);
  }
}

async function viewHeroPage(e){
  let path = `${window.location.pathname} + /../superhero.html#id=${e.target.parentElement.id}`;
  window.open(path);
}

async function addToFavourites(e){
  let id = e.target.parentElement.id;
  if(localStorage.getItem('favHeroList') == null){
    let data = [];
    localStorage.setItem('favHeroList', JSON.stringify(data));
  }
  let favHeros = JSON.parse(localStorage.getItem('favHeroList'));
  if(!favHeros.includes(id)){
    console.log(favHeros);
    favHeros.push(id);
    localStorage.setItem('favHeroList', JSON.stringify(favHeros));
  }
  console.log(localStorage.getItem('favHerosList'));
}
