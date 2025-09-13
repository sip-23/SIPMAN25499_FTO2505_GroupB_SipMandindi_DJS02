import { showAllPodcasts, setupEventListeners } from './Components/renderCard.js';
import { initModalHandlers } from './Components/modalHandlers.js';
import { createGrid } from './views/createGrid.js'

// Initialize the application
function init() {
    showAllPodcasts();
    setupEventListeners();
    initModalHandlers();
    createGrid();
}

// Start the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);