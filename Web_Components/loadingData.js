const podcastsContainer = document.getElementById('podcasts-container');
const genreFilter = document.getElementById('genre-filter');
const sortBy = document.getElementById('sort-by');

// Looading podcast data 
async function loadPodcastData() {
    const module = await import("./data.js");
    return { podcasts: module.podcasts, genres: module.genres };
}

// Populating the genre filter dropdown options taken from the Genres array
function populateGenreFilter(genres) {
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.title;
        genreFilter.appendChild(option);
    });
}

// Displaying the podcasts
function displayPodcasts(podcasts, genres) {
    podcastsContainer.innerHTML = '';
    
    podcasts.forEach(podcast => {
        // First get genre names for this podcast under question
        const podcastGenres = genres
            .filter(genre => podcast.genres.includes(genre.id))
            .map(genre => genre.title);
        
        // Creating the custom element for each object in array
        const podcastElement = document.createElement('podcast-preview');
        podcastElement.id = podcast.id;
        podcastElement.setAttribute('image', podcast.image);
        podcastElement.setAttribute('title', podcast.title);
        podcastElement.setAttribute('genres', JSON.stringify(podcastGenres));
        podcastElement.setAttribute('seasons', podcast.seasons);
        podcastElement.setAttribute('updated', podcast.updated);
        
        podcastsContainer.appendChild(podcastElement);
    });
}

// Filtering and sorting podcasts
function filterAndSortPodcasts(podcasts, genres) {
    const selectedGenre = genreFilter.value;
    const sortCriteria = sortBy.value;
    
    // Filter podcasts by genre
    let filteredPodcasts = podcasts;
    if (selectedGenre !== 'all') {
        filteredPodcasts = podcasts.filter(podcast => 
            podcast.genres.includes(parseInt(selectedGenre))
        );
    }
    
    // Sort podcasts Alphabetically (A-Z), Most Recent (Ascending), Number of Seasons
    switch(sortCriteria) {
        case 'title':
            filteredPodcasts.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'recent':
            filteredPodcasts.sort((a, b) => new Date(b.updated) - new Date(a.updated));
            break;
        case 'seasons':
            filteredPodcasts.sort((a, b) => b.seasons - a.seasons);
            break;
    }
    
    // Displaying the filtered and sorted podcasts as per selection
    displayPodcasts(filteredPodcasts, genres);
}
