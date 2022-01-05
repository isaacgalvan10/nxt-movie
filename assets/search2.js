var searchButton = document.getElementsByClassName("modal-button")
var modalResults = document.getElementsByClassName("modal")
var closeButton = document.getElementsByClassName("modal-close")
var userInput = document.getElementById("user-input")
var movieContainer = document.getElementById("movie-container")
var searchParameters = document.location.search.split("&")
var movieImdbId = searchParameters[0].split('=').pop();
console.log(movieImdbId)
var navBar = document.getElementsByClassName("navbar");
var movieTitleEl = document.getElementById('title');
var yearEl = document.getElementById('year');
var overviewEl = document.getElementById('overview');
var trailerSrc = document.getElementById('trailer');
var netflixImg = document.getElementById('netflix');
var primeImg = document.getElementById('prime');
var disneyImg = document.getElementById('disney');
var hboImg = document.getElementById('hbo');
var appleImg = document.getElementById('apple');
var title = ""
var poster = ""
var netflixUrl = document.getElementById('netflix-url');
var primeUrl = document.getElementById('prime-url');
var disneyUrl = document.getElementById('disney-url');
var hboUrl = document.getElementById('hbo-url');
var appleUrl = document.getElementById('apple-url');



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
        movieContainer.setAttribute("style", "color:white")
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
		"x-rapidapi-key": '49a7225357msh5d97bdd7b42a7c0p1dafe7jsn0ed0d8594b5c'
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
        }else {
            let notice = document.createElement("div")
            notice.classList="box"
            notice.setAttribute("style", "position: absolute; top: 0; left: 0; display: flex; justify-content:space-between; background: red; width:100vw")
            let noticeText = document.createElement("p")
            noticeText.setAttribute("style", "text-align: center; padding: 5px; color: white")
            noticeText.textContent = "There is no streaming information for this movie yet. Search another one!"
            let noticeButton = document.createElement("button")
            noticeButton.setAttribute("style", "background: transparent; font-weight: bold; color: white")
            noticeButton.textContent = "X"
            noticeButton.classList="button is-small"
            noticeButton.addEventListener("click", function(event){
                event.preventDefault();
                notice.remove();
            })
            notice.append(noticeText,noticeButton)
            navBar[0].append(notice)
        }
    })
    .catch(err => {
        console.error(err);
    });
}

//variables for the results page
function renderMovie (movie) {
    title = movie.title
    movieTitleEl.innerText = title;
    let year = movie.year
    yearEl.innerText = year;
    poster = movie.posterURLs.original
    let overview = movie.overview
    overviewEl.innerText = overview;
    let trailer = "https://www.youtube.com/embed/"+movie.video;
    trailerSrc.setAttribute('src', trailer);
    let streamInfo = movie.streamingInfo
    if (streamInfo.hbo) {
        hboImg.dataset.active = 'true';
        hboImg.classList.add('active');
        hboUrl.href = streamInfo.hbo.us.link;
    }
    if (streamInfo.netflix) {
        netflixImg.dataset.active = 'true';
        netflixImg.classList.add('active');
        netflixUrl.href = streamInfo.netflix.us.link;
    }
    if (streamInfo.disney) {
        disneyImg.dataset.active = 'true';
        disneyImg.classList.add('active');
        disneyUrl.href = streamInfo.disney.us.link;
    }
    if (streamInfo.prime) {
        primeImg.dataset.active = 'true';
        primeImg.classList.add('active');
        primeUrl.href = streamInfo.prime.us.link;
    }
    if (streamInfo.apple) {
        appleImg.dataset.active = 'true';
        appleImg.classList.add('active');
        appleUrl.href = streamInfo.apple.us.link;
    }
}




function init () {
    getStreamInfo()
}

init();