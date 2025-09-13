import { podcasts, genres } from "../data.js"
import { openPodcastModal } from './modalHandlers.js';

// DOM elements accessing
const podcastsContainer = document.getElementById('podcasts-container');

// Using the Single Responsibility principle, I can break this down into the following:
// 1. Creating the div element for the card
// 2. Styling the Card
// 3. Adding id for each card
// 4. Calculating days for last updated (used for filtering)

// 1. Creating the div element for the card

/**
 * Creates a card element with styling
 * @returns {HTMLElement} The created div element
 */
function createCardElement() {
    const element = document.createElement('div');
    element.className = 'min-w-[280px] max-h-[350px] flex flex-col hover:bg-[#65350F] p-5 gap-1 rounded-lg bg-[#282828] transition-colors cursor-pointer';
    return element;
}


// 2. Styling the Card

/**
 * Implements additional styling to a card element
 * @param {HTMLElement} element - The card element to style
 * @returns {}
 */
function applyCardStyling(element) {
    // This could be extended if you need more complex styling logic
    element.classList.add('podcast-card');
}

// 2. Styling the Card

/**
 * Builds the HTML content for a podcast card
 * @param {Object} podcast - The podcast object
 * @param {Array} podcastGenres - Array of genre names
 * @param {number} daysSinceUpdate - Number of days since last update
 * @returns {string} HTML string for the card content
 */
function buildCardHTML(podcast, podcastGenres, daysSinceUpdate) {
    return `
        <img src="${podcast.image}" alt="${podcast.title}" class="rounded-md mb-4 w-[240px] h-[190px] object-cover">
        <div class="flex items-center justify-between">
            <h3 class="font-semibold text-white truncate">${podcast.title}</h3>
            <div class="flex items-center gap-1">
                <!-- Love icon SVG -->
                <span class="font-medium text-white text-[13px]">75</span>  
            </div>
        </div>
        <div class="flex items-center justify-start gap-2">
            <!-- Calendar icon SVG -->
            <span class="text-sm text-[#b3b3b3] truncate">${podcast.seasons} seasons</span>
        </div>
        <div class="flex flex-wrap items-start gap-1">
            ${podcastGenres.map(genre => 
                `<button class="bg-[#F4F4F4] w-fit h-fit px-1 text-sm text-[#121212] truncate">${genre}</button>`
            ).join('')}
        </div>
        <p class="text-sm text-[#b3b3b3] truncate">Updated ${daysSinceUpdate} days ago</p>
    `;
}

// 3. mapping gnares to the podcast
function getPodcastGenres(podcast) {
    return genres.filter(genre => podcast.genres.includes(genre.id))
                 .map(genre => genre.title);
}


// 4. Calculating days for last updated (used for filtering later :))
function calculateDaysSinceUpdate(updatedDate) {
    const updated = new Date(updatedDate);
    const current = new Date();
    return Math.floor((current - updated) / (1000 * 60 * 60 * 24));
} 

// 5. Main: With this, I can then Then create the card using the above function:

/**
 * Creates a full podcast card element with content/information
 * @param {Object} podcast - The podcast object
 * @returns {HTMLElement} The complete podcast card element
 */
function createPodcastElement(podcast) {
    const podcastElement = createCardElement();
    applyCardStyling(podcastElement);
    podcastElement.setAttribute('data-id', podcast.id);
    
    const podcastGenres = getPodcastGenres(podcast);
    const daysSinceUpdate = calculateDaysSinceUpdate(podcast.updated);
    
    podcastElement.innerHTML = buildCardHTML(podcast, podcastGenres, daysSinceUpdate);
    
    // Add click event to open modal
    podcastElement.addEventListener('click', () => {
        openPodcastModal(podcast.id);
    });
    
    return podcastElement;
}

// Now rendering the Card can be broken into this:
// 1. First clear out the hardcoded card on the DOM
// 2. Function that adds the Cards

// 1. First clear out the hardcoded card on the DOM
function clearPodcastsContainer() {
    podcastsContainer.innerHTML = '';
}

// 2. Function that adds all the Cards
function showAllPodcasts() {
    clearPodcastsContainer();
    
    podcasts.forEach(podcast => {
        const podcastElement = createPodcastElement(podcast);
        podcastsContainer.appendChild(podcastElement);
    });
}


function setupEventListeners() {
    // Event delegation for podcast cards
    podcastsContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.podcast-card');
        if (card) {
            const podcastId = card.getAttribute('data-id');
            openPodcastModal(podcastId);
        }
    });
}

// Export functions
export { showAllPodcasts, createPodcastElement, clearPodcastsContainer, setupEventListeners };