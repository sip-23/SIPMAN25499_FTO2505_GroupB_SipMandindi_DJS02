const podcastsContainer = document.getElementById('podcasts-container');
const genreFilter = document.getElementById('genre-filter');
const sortBy = document.getElementById('sort-by');

// Looading podcast data 
/**
 * Dynamically imports the podcast and genre data from data.js.
 *
 * @async
 * @function loadPodcastData
 * @returns {Promise<{ podcasts: Object[], genres: Object[] }>} 
 * An object containing the podcasts array and genres array.
 */
async function loadPodcastData() {
    const module = await import("./data.js");
    return { podcasts: module.podcasts, genres: module.genres };
}

// Populating the genre filter dropdown options taken from the Genres array
/**
 * Populates the genre filter dropdown with options from the genres array.
 *
 * @function populateGenreFilter
 * @param {Object[]} genres - Array of genre objects.
 * @param {number} genres[].id - Unique identifier for the genre.
 * @param {string} genres[].title - Display title of the genre.
 * @returns {void}
 */
function populateGenreFilter(genres) {
    genres.forEach(genre => {
        const option = document.createElement('option');
        option.value = genre.id;
        option.textContent = genre.title;
        genreFilter.appendChild(option);
    });
}

// Displaying the podcasts
/**
 * Renders podcast preview components inside the podcasts container.
 *
 * @function displayPodcasts
 * @param {Object[]} podcasts - Array of podcast objects.
 * @param {Object[]} genres - Array of genre objects used to resolve genre IDs into names.
 * @returns {void}
 */
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
/**
 * Filters and sorts podcasts based on selected genre and sorting criteria.
 * Updates the display with the filtered and sorted results.
 *
 * @function filterAndSortPodcasts
 * @param {Object[]} podcasts - Array of podcast objects.
 * @param {Object[]} genres - Array of genre objects used to resolve genre IDs into names.
 * @returns {void}
 */
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
