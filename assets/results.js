var watchList = document.querySelector("#watch-list");
var watchListButton = document.querySelector("#list-button");
var movieTitle = document.querySelector("#title");
var movielist = [];


// Cuando se abra la pagina, cargar la lista de watchlist desde el localstorage

// function init
// Obtener info de localstorage
//hacer render de lista
// POr cada elemento del local storage, crear un elemento li



function renderTodos() {
    watchList.innerHTML = ""
    for (var i = 0 ; i < movielist.length; i++) {

    var li = document.createElement("li");
    li.setAttribute("style","display:flex; justify-content: flex-start; align-items:center; background: #04293A; position: relative; padding:1px")
    li.classList = "box"

    var pos = document.createElement("img");
    pos.setAttribute("style","width:50px; height:auto")
    pos.setAttribute("src", movielist[i].moviePoster)

    var tex = document.createElement("a")
    tex.textContent = movielist[i].movieTitle;
    tex.setAttribute("href",movielist[i].movieUrl)
    tex.setAttribute("style", "color:white; font-weight: bold; padding-left: 5px")

    var button = document.createElement("button");
    button.textContent = "X";
    button.setAttribute("data-index", i)
    button.setAttribute("style", "padding: 13px 8px; background:#ECB365; color:black; font-weight: bold; position: absolute; top: 0; right: 0; border: none; height: 25px;")
    button.classList = "button is-small"

    li.append(pos,tex,button);
    watchList.appendChild(li);
    

    }
 
    console.log(movielist);

    storeWatchlist();

}
function pushMovie (){
    var movieInfo = {
        movieTitle:"",
        movieUrl:"",
        moviePoster:""
    }
    movieInfo.movieTitle = title
    movieInfo.movieUrl = "./results.html?q="+movieImdbId
    console.log(movieInfo.movieUrl)
    movieInfo.moviePoster = poster

    movielist.push(movieInfo);
   
    renderTodos();
}


function init() {
    var storedWatchList = JSON.parse(localStorage.getItem("watch-list"));
    if (storedWatchList !== null) {
        movielist = storedWatchList;
        console.log(watchList)

    renderTodos();

    
    
    }
}

function storeWatchlist() {
    console.log("storeWatchlist")
    window.localStorage.setItem("watch-list", JSON.stringify(movielist))
}


init();

watchListButton.addEventListener("click", pushMovie)

watchList.addEventListener("click", function(event) {
    var element = event.target;
    console.log(element);
    // Checks if element is a button
    if (element.matches("button") === true) {
      // Get its data-index value and remove the todo element from the list
      var index = element.parentElement.getAttribute("data-index");
      movielist.splice(index, 1);

  
      // Store updated todos in localStorage, re-render the list
      storeWatchlist();
      renderTodos();
    }
  });