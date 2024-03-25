const apiKey = "bd3cd4d2";
let searchElement = document.getElementById("search");
let mainContainer = document.getElementById("main-container");
let detailsModal = document.getElementById("modal");
let loadingModal = document.getElementById("loading");

searchElement.addEventListener("input", (e) => {
    displayMoviemovieDetails(e.target.value);
})

async function getMoviemovieDetails(searchQuery) {
    let response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&page=1&apikey=${apiKey}`);
    let moviemovieDetails = await response.json();
    return moviemovieDetails;
}


//debounce implementation with 1.5s delay
function debounce(callback, delay = 1500) {
    let timeout;

    return (searchQuery) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            callback(searchQuery);
        }, delay)
    }
}

let displayMoviemovieDetails = debounce(async (searchQuery) => {
    try {
        loadingModal.showModal();
        let moviemovieDetails = await getMoviemovieDetails(searchQuery);
        loadingModal.close();
        let movieArray = moviemovieDetails.Search;
        loadMoviemovieDetails(movieArray);
    } catch (error) {
        console.log("Error fetching movie movieDetails:", error);
    }
})






function loadMoviemovieDetails(movieArray) {
    mainContainer.innerHTML = "";
    for (let movie of movieArray) {
        let movieContainer = document.createElement("div");
        movieContainer.classList = "movie-container";
        movieContainer.innerHTML = `
            <img src="${movie.Poster}" alt="poster">
            <p class="title">${movie.Title}</p>
            <p class="year">${movie.Year}</p>
            
        `
        mainContainer.appendChild(movieContainer);
    }
}


