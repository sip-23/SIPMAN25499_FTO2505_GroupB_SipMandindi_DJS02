import { showAllPodcasts, setupEventListeners } from './Components/renderCard.js';
import { initModalHandlers } from './Components/modalHandlers.js';

// Initialize the application
function init() {
    showAllPodcasts();
    setupEventListeners();
    initModalHandlers();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);