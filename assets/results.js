var watchList = document.querySelector("#watch-list");
var watchListButton = document.querySelector("#list-button");
var movieTitle = document.querySelector("#title").textContent;
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
    li.textContent = movielist[i];

    var button = document.createElement("button");
    button.textContent = "-";
    button.setAttribute("data-index", i)
    li.appendChild(button);
    watchList.appendChild(li);
    

    }
 
    console.log(movielist);

    storeWatchlist();

}
function pushMovie (){

    movielist.push(movieTitle);
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
  