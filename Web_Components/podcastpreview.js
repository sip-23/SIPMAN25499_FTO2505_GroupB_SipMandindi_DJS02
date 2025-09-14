class PodcastPreview extends HTMLElement {
    // this constructor makes sure we call our only html constructor
    constructor() {
        // calling the base class
        super();
        
        // Creating shadow DOM for encapsulation (encapsulated part of our web component)
        this.shadow = this.attachShadow({ mode: 'open' });
        
        // Default values
        this._image = '';
        this._title = '';
        this._genres = [];
        this._seasons = 0;
        this._updated = '';
    }
    
    // Defining the the attributes to observe
    static get observedAttributes() {
        return ['image', 'title', 'genres', 'seasons', 'updated'];
    }
    
    // Handle attribute changes
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        switch(name) {
            case 'image':
                this._image = newValue;
                break;
            case 'title':
                this._title = newValue;
                break;
            case 'genres':
                try {
                    this._genres = JSON.parse(newValue);
                } catch (e) {
                    this._genres = [newValue];
                }
                break;
            case 'seasons':
                this._seasons = parseInt(newValue) || 0;
                break;
            case 'updated':
                this._updated = newValue;
                break;
        }
        
        // If the component has been connected, update the rendering
        if (this.isConnected) {
            this.render();
        }
    }
    
    // Calculating the days since last update
    calculateDaysSinceUpdate() {
        if (!this._updated) return 0;
        
        const updatedDate = new Date(this._updated);
        const currentDate = new Date();
        const timeDiff = currentDate.getTime() - updatedDate.getTime();
        return Math.floor(timeDiff / (1000 * 3600 * 24));
    }
    
    // Handle click events
    handleClick() {
        // Creating and dispatching a custom event
        const podcastEvent = new CustomEvent('podcastSelected', {
            bubbles: true,
            detail: {
                id: this.id,
                title: this._title,
                image: this._image
            }
        });
        
        this.dispatchEvent(podcastEvent);
    }
    
    // Render the component
    // also added Tailwind css inside Web component shadow DOM as it it was only inject its styles onto the global document and not shadow roots
    render() {
        const daysSinceUpdate = this.calculateDaysSinceUpdate();
        
        this.shadowRoot.innerHTML = `
            <script src="https://cdn.tailwindcss.com"></script>
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet"/>
            <style>
                :host {
                    display: block;
                    min-width: 280px;
                    max-width: 285px;
                    max-height: 350px;
                    flex-direction: column;
                    padding: 1.25rem;
                    gap: 0.25rem;
                    border-radius: 0.5rem;
                    background-color: #282828;
                    transition: background-color 0.2s ease;
                    cursor: pointer;
                }
                
                :host(:hover) {
                    background-color: #65350F;
                }
                
                .podcast-image {
                    border-radius: 0.375rem;
                    margin-bottom: 8px;
                    width: 240px;
                    height: 190px;
                    object-fit: cover;
                }
                
                .title {
                    font-weight: 600;
                    color: white;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .season-info {
                    color: #b3b3b3;
                    font-size: 0.875rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .genre-tag {
                    background-color: #F4F4F4;
                    height: fit-content;
                    padding: 0 0.25rem;
                    font-size: 0.875rem;
                    color: #121212;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .update-info {
                    color: #b3b3b3;
                    font-size: 0.875rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                
                .flex-wrap {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 0.25rem;
                }
            </style>
            <div class="podcast-card min-w-[280px] max-w-[285px] max-h-[350px] flex flex-col hover:bg-[#65350F]  rounded-lg bg-[#282828] transition-colors cursor-pointer">
                <img src="${this._image}" alt="${this._title}" class="podcast-image rounded-md w-[240px] h-[190px] object-cover">
                <div class="flex items-center justify-between">
                    <h3 class="title font-semibold text-white truncate">${this._title}</h3>
                </div>
                <div class="flex items-center justify-start gap-2">
                    <svg class="fill-[#b3b3b3]" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12px" height="12px" viewBox="0 0 100.353 100.353" id="Layer_1" version="1.1" xml:space="preserve">
                        <g>
                            <path d="M32.286,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5   v-9.762C33.786,43.113,33.115,42.441,32.286,42.441z M30.786,52.203h-6.762v-6.762h6.762V52.203z"/>
                            <path d="M55.054,42.441h-9.762c-0.829,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5   v-9.762C56.554,43.113,55.882,42.441,55.054,42.441z M53.554,52.203h-6.762v-6.762h6.762V52.203z"/>
                            <path d="M77.12,42.441h-9.762c-0.828,0-1.5,0.671-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762   C78.62,43.113,77.948,42.441,77.12,42.441z M75.62,52.203h-6.762v-6.762h6.762V52.203z"/>
                            <path d="M32.286,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.829,0,1.5-0.672,1.5-1.5   v-9.762C33.786,65.349,33.115,64.677,32.286,64.677z M30.786,74.439h-6.762v-6.762h6.762V74.439z"/>
                            <path d="M55.054,64.677h-9.762c-0.829,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.671,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5   v-9.762C56.554,65.349,55.882,64.677,55.054,64.677z M53.554,74.439h-6.762v-6.762h6.762V74.439z"/>
                            <path d="M77.12,64.677h-9.762c-0.828,0-1.5,0.672-1.5,1.5v9.762c0,0.828,0.672,1.5,1.5,1.5h9.762c0.828,0,1.5-0.672,1.5-1.5v-9.762   C78.62,65.349,77.948,64.677,77.12,64.677z M75.62,74.439h-6.762v-6.762h6.762V74.439z"/>
                            <path d="M89,13.394h-9.907c-0.013,0-0.024,0.003-0.037,0.004V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994   H56.041V11.4c0-3.268-2.658-5.926-5.926-5.926s-5.926,2.659-5.926,5.926v1.994H33.025V11.4c0-3.268-2.658-5.926-5.926-5.926   s-5.926,2.659-5.926,5.926v1.995c-0.005,0-0.01-0.001-0.015-0.001h-9.905c-0.829,0-1.5,0.671-1.5,1.5V92.64   c0,0.828,0.671,1.5,1.5,1.5H89c0.828,0,1.5-0.672,1.5-1.5V14.894C90.5,14.065,89.828,13.394,89,13.394z M70.204,11.4   c0-1.614,1.312-2.926,2.926-2.926s2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926s-2.926-1.312-2.926-2.926V11.4z    M50.115,8.474c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926c-1.614,0-2.926-1.312-2.926-2.926v-4.643   c0.004-0.047,0.014-0.092,0.014-0.141s-0.01-0.094-0.014-0.141V11.4C47.189,9.786,48.501,8.474,50.115,8.474z M24.173,11.4   c0-1.614,1.312-2.926,2.926-2.926c1.613,0,2.926,1.312,2.926,2.926v8.277c0,1.613-1.312,2.926-2.926,2.926   c-1.614,0-2.926-1.312-2.926-2.926V11.4z M87.5,91.14H12.753V16.394h8.405c0.005,0,0.01-0.001,0.015-0.001v3.285   c0,3.268,2.659,5.926,5.926,5.926s5.926-2.658,5.926-5.926v-3.283h11.164v3.283c0,3.268,2.659,5.926,5.926,5.926   s5.926-2.658,5.926-5.926v-3.283h11.163v3.283c0,3.268,2.658,5.926,5.926,5.926s5.926-2.658,5.926-5.926V16.39   c0.013,0,0.024,0.004,0.037,0.004H87.5V91.14z"/>
                        </g>
                    </svg>
                    <span class="season-info text-sm text-[#b3b3b3] truncate">${this._seasons} seasons</span>
                </div>
                <div class="flex flex-wrap items-start gap-1">
                    ${this._genres.map(genre => 
                        `<span class="genre-tag bg-[#F4F4F4] w-fit h-fit px-1 text-sm text-[#121212] truncate">${genre}</span>`
                    ).join('')}
                </div>
                <p class="update-info text-sm text-[#b3b3b3] truncate">Updated ${daysSinceUpdate} days ago</p>
            </div>
        `;
        
        // Add click event listener
        this.shadowRoot.querySelector('.podcast-card').addEventListener('click', () => {
            this.handleClick();
        });
    }
    
    // Rendering using connected Callback life cycle event: When the element is added to the DOM we can this call
    connectedCallback() {
        this.render();
    }
}

// Register the custom element 
customElements.define('podcast-preview', PodcastPreview);