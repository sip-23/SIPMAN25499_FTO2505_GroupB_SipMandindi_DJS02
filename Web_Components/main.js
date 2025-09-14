// Main application logic
document.addEventListener('DOMContentLoaded', async () => {
    let podcastsData = [];
    let genresData = [];
    
    try {
        // Load data
        const data = await loadPodcastData();
        podcastsData = data.podcasts;
        genresData = data.genres;
    
        
        // Populating genre filter dropdown with all the possible filters
        populateGenreFilter(genresData);
        
        // Displaying the podcasts
        displayPodcasts(podcastsData, genresData);
        
        // Set up event listeners for filtering and sorting
        genreFilter.addEventListener('change', () => {
            filterAndSortPodcasts(podcastsData, genresData);
        });
        
        sortBy.addEventListener('change', () => {
            filterAndSortPodcasts(podcastsData, genresData);
        });
        
    } catch (error) {
        console.error('Error loading podcast data:', error);
    }
});