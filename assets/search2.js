var searchButton = document.getElementsByClassName("modal-button")
var modalResults = document.getElementsByClassName("modal")
var closeButton = document.getElementsByClassName("modal-close")
var userInput = document.getElementById("user-input")
var movieContainer = document.getElementById("movie-container")
var searchParameters = document.location.search.split("&")
var movieImdbId = searchParameters[0].split('=').pop();
console.log(movieImdbId)


searchButton[0].addEventListener("click", function(event) {
    event.preventDefault();
    modalResults[0].setAttribute("style","display:block")

    //get input value

    let movieInput = userInput.value
    console.log(movieInput)
    getMovies(movieInput)

})

closeButton[0].addEventListener("click", function(event) {
    event.preventDefault();
    movieContainer.innerHTML=""
    modalResults[0].setAttribute("style","display:none")

})

var movieButtonHandler = function (event) {
    event.preventDefault();
    console.log(event.target)
    let movieId = event.target.dataset.index
    let movieTitle = event.target.dataset.title
    document.location.assign("./results.html?q="+movieId+"&title="+movieTitle)
}

// get movie results

function getMovies(movie) {

    if (!movie) {
        movieContainer.textContent="Please enter a movie name"
        return
    }
    var imdbApi = ("https://imdb8.p.rapidapi.com/auto-complete?q="+movie)
    
    fetch(imdbApi, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": "93dfa5bd64msha086c3c4b0428c1p1d3059jsncc3f31a13c79"
        }
    })
    .then(response => {
        console.log(response);
        if(response.ok) {
            response.json()
            .then(function(data){
                console.log(data)
                let movieResultsArray = data.d
                renderResults(movieResultsArray)
            })
        }
    })
    .catch(err => {
        console.error(err);
    });
    }


// render movies in modal


function renderResults (movies) {
    movieContainer.innerHTML=""
    for (let i=0; i < 5 ; i++) {
        if (movies[i]) {
            var movieItemContainer = document.createElement("div")
            movieItemContainer.setAttribute("style", "display:flex")
            
            var movieImage = document.createElement("img")
            movieImage.setAttribute("src",movies[i].i.imageUrl)
            movieImage.setAttribute("style", "max-width: 50px; height:auto; display:inline-block")
            var movieItem = document.createElement("p")
            movieItem.textContent = movies[i].l+" Year: "+ movies[i].y
            movieItem.setAttribute("data-index", movies[i].id)
            movieItem.setAttribute("data-title", movies[i].l)
            movieItem.addEventListener("click", movieButtonHandler)
            movieItem.setAttribute("style", "display:block; cursor: pointer")
            movieItemContainer.append(movieImage, movieItem)
            movieContainer.append(movieItemContainer)
        
        }
        
    }
}

