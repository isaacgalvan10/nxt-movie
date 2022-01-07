var watchList = document.querySelector("#watch-list");
var watchListButton = document.querySelector("#list-button");
var movieTitle = document.querySelector("#title");
var movielist = [];


function renderTodos() {
    watchList.innerHTML = "";
    for (var i = 0 ; i < movielist.length; i++) {

    var li = document.createElement("li");
    li.setAttribute("style","display:flex; justify-content: flex-start; align-items:center; background: #04293A; position: relative; padding: 0; margin-top: 10px;");
    li.classList = "box";

    var pos = document.createElement("img");
    pos.setAttribute("style","width:60px; height:auto; border-radius: 6px 0 0 6px;")
    pos.setAttribute("src", movielist[i].moviePoster)

    var tex = document.createElement("a")
    tex.textContent = movielist[i].movieTitle;
    tex.setAttribute("href",movielist[i].movieUrl)
    tex.setAttribute("style", "color:white; font-weight: 600; padding-left: 10px; font-size: 18px;")

    var button = document.createElement("button");
    button.textContent = "X";
    button.setAttribute("data-index", i)
    button.setAttribute("style", "padding: 13px 8px; background:#ECB365; color:black; font-weight: bold; position: absolute; top: 0; right: 0; border: none; height: 25px; border-radius: 6px;")
    button.classList = "button is-small"

    li.append(pos,tex,button);
    watchList.appendChild(li);
    }

    storeWatchlist();

}

//add movie to the watchlist
function pushMovie (){
    let x = 0
    var movieInfo = {
        movieTitle:"",
        movieUrl:"",
        moviePoster:""
    }
    movieInfo.movieTitle = title
    movieInfo.movieUrl = "./results.html?q="+movieImdbId
    movieInfo.moviePoster = poster

    for (let  i= 0; i < movielist.length; i++) {
        if (movielist[i].movieTitle==title) {
            x = 1
        }
    }
    console.log(x)
    if (x == 0){
        console.log("working")
        movielist.push(movieInfo);
    }
   
    renderTodos();
}

//init function to get local storage and render watchlist at load

function init() {
    var storedWatchList = JSON.parse(localStorage.getItem("watch-list"));
    if (storedWatchList !== null) {
        movielist = storedWatchList;
    renderTodos();
    }
}

//save watchlist to locak storage

function storeWatchlist() {
    window.localStorage.setItem("watch-list", JSON.stringify(movielist))
}


init();

//button to add movie to watchlist
if (watchListButton) {
watchListButton.addEventListener("click", pushMovie)
}

//button to delete movie from watchlist

watchList.addEventListener("click", function(event) {
    var element = event.target;
    if (element.matches("button") === true) {
      var index = element.getAttribute("data-index");
      console.log(index)
      movielist.splice(index, 1);
      storeWatchlist();
      renderTodos();
    }
  });