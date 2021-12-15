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

function getStreamInfo () {
    var streamInfoUrl ="https://streaming-availability.p.rapidapi.com/get/basic?country=us&imdb_id="+movieImdbId+"&output_language=en"
    fetch(streamInfoUrl, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "streaming-availability.p.rapidapi.com",
		"x-rapidapi-key": "93dfa5bd64msha086c3c4b0428c1p1d3059jsncc3f31a13c79"
        }
    })
    .then(response => {
        console.log(response);
        if(response.ok) {
            response.json()
            .then(function(data){
                console.log(data)
                let movieInfo = data
                renderMovie(movieInfo)
            })
        }
    })
    .catch(err => {
        console.error(err);
    });
}

//variables for the results page
function renderMovie (movie) {
    let title = movie.title
    console.log(title)
    let year = movie.year
    console.log(year)
    let poster = movie.posterURLs.original
    console.log(poster)
    let overview = movie.overview
    console.log(overview)
    let trailer = "https://www.youtube.com/embed/"+movie.video
    console.log(trailer)
    let streamInfo = movie.streamingInfo
    if (streamInfo.hbo) {
        let hbo = true
        let hboUrl = streamInfo.hbo.us.link
        console.log(hbo + " " + hboUrl)
    }
    if (streamInfo.netflix) {
        let netflix = true
        let netflixUrl = streamInfo.netflix.us.link
        console.log(netflix + " " + netflixUrl)
    }
    if (streamInfo.disney) {
        let disney = true
        let disneyUrl = streamInfo.disney.us.link
        console.log(disney + " " + disneyUrl)
    }
    if (streamInfo.prime) {
        let prime = true
        let hboUrl = streamInfo.prime.us.link
        console.log(prime + " " + primeUrl)
    }
    if (streamInfo.apple) {
        let apple = true
        let appleUrl = streamInfo.apple.us.link
        console.log(apple + " " + appleUrl)
    }
}




function init () {
    getStreamInfo()
}

init();