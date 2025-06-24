
< !--menu - filter.js-- >
    // Menu Filter JavaScript

    // Initialize the menu filter functionality
    function initMenuFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const mealItems = document.querySelectorAll('.meal-item');
        const searchInput = document.getElementById('menu-search');

        // Set up filter buttons
        if (filterButtons.length > 0) {
            filterButtons.forEach(button => {
                button.addEventListener('click', function () {
                    const filterValue = this.getAttribute('data-filter');

                    // Update active button
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');

                    // Filter meals
                    filterMeals(filterValue);
                });
            });
        }

        // Set up search functionality
        if (searchInput) {
            searchInput.addEventListener('input', function () {
                const searchTerm = this.value.trim().toLowerCase();
                searchMeals(searchTerm);
            });
        }

        // Initialize sorting functionality
        initSorting();

        // Initialize nutrition info toggles
        initNutritionToggles();
    }

// Filter meals based on category
function filterMeals(category) {
    const mealItems = document.querySelectorAll('.meal-item');

    mealItems.forEach(item => {
        if (category === 'all') {
            item.classList.remove('hidden');
        } else {
            const itemCategories = item.getAttribute('data-categories').split(',');
            if (itemCategories.includes(category)) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        }
    });

    // Update results count
    updateResultsCount();

    // Check if we need to show "no results" message
    checkNoResults();
}

// Search meals based on search term
function searchMeals(searchTerm) {
    const mealItems = document.querySelectorAll('.meal-item');

    mealItems.forEach(item => {
        const title = item.querySelector('.meal-title').textContent.toLowerCase();
        const description = item.querySelector('.meal-description')?.textContent.toLowerCase() || '';

        if (title.includes(searchTerm) || description.includes(searchTerm)) {
            item.classList.remove('hidden');
        } else {
            item.classList.add('hidden');
        }
    });

    // Update results count
    updateResultsCount();

    // Check if we need to show "no results" message
    checkNoResults();
}

// Initialize sorting functionality
function initSorting() {
    const sortSelect = document.getElementById('sort-menu');

    if (sortSelect) {
        sortSelect.addEventListener('change', function () {
            const sortValue = this.value;
            sortMeals(sortValue);
        });
    }
}

// Sort meals based on selected option
function sortMeals(sortBy) {
    const mealGrid = document.querySelector('.meal-grid');
    if (!mealGrid) return;

    const mealItems = Array.from(mealGrid.querySelectorAll('.meal-item'));

    mealItems.sort((a, b) => {
        switch (sortBy) {
            case 'name-asc':
                return a.querySelector('.meal-title').textContent.localeCompare(
                    b.querySelector('.meal-title').textContent
                );
            case 'name-desc':
                return b.querySelector('.meal-title').textContent.localeCompare(
                    a.querySelector('.meal-title').textContent
                );
            case 'calories-asc':
                return parseInt(a.getAttribute('data-calories')) - parseInt(b.getAttribute('data-calories'));
            case 'calories-desc':
                return parseInt(b.getAttribute('data-calories')) - parseInt(a.getAttribute('data-calories'));
            case 'protein-desc':
                return parseInt(b.getAttribute('data-protein')) - parseInt(a.getAttribute('data-protein'));
            default:
                return 0;
        }
    });

    // Remove all current items
    mealItems.forEach(item => item.remove());

    // Add sorted items back
    mealItems.forEach(item => mealGrid.appendChild(item));
}

// Initialize nutrition info toggles
function initNutritionToggles() {
    const nutritionToggles = document.querySelectorAll('.nutrition-toggle');

    nutritionToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();

            const mealItem = this.closest('.meal-item');
            const nutritionInfo = mealItem.querySelector('.nutrition-info');

            if (nutritionInfo) {
                nutritionInfo.classList.toggle('hidden');

                // Update toggle text
                if (nutritionInfo.classList.contains('hidden')) {
                    this.textContent = 'הצג ערכים תזונתיים';
                } else {
                    this.textContent = 'הסתר ערכים תזונתיים';
                }
            }
        });
    });
}

// Update the count of visible results
function updateResultsCount() {
    const resultsCounter = document.getElementById('results-count');
    if (!resultsCounter) return;

    const visibleItems = document.querySelectorAll('.meal-item:not(.hidden)').length;
    resultsCounter.textContent = visibleItems;
}

// Check if there are no results and show a message
function checkNoResults() {
    const mealGrid = document.querySelector('.meal-grid');
    const noResultsMessage = document.getElementById('no-results');

    if (!mealGrid || !noResultsMessage) return;

    const visibleItems = mealGrid.querySelectorAll('.meal-item:not(.hidden)').length;

    if (visibleItems === 0) {
        noResultsMessage.classList.remove('hidden');
    } else {
        noResultsMessage.classList.add('hidden');
    }
}

// Add meal to favorites
function toggleFavorite(button) {
    const mealItem = button.closest('.meal-item');
    const mealId = mealItem.getAttribute('data-id');
    const isFavorite = button.classList.contains('favorite');

    // Toggle favorite status
    button.classList.toggle('favorite');

    if (button.classList.contains('favorite')) {
        button.innerHTML = '<svg class="w-5 h-5 fill-current text-red-500" viewBox="0 0 20 20"><path d="M10 3.22l-.61-.6a5.5 5.5 0 00-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 00-7.78-7.77l-.61.61z"/></svg>';
        saveFavorite(mealId);
    } else {
        button.innerHTML = '<svg class="w-5 h-5 fill-current text-gray-400" viewBox="0 0 20 20"><path d="M10 3.22l-.61-.6a5.5 5.5 0 00-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 00-7.78-7.77l-.61.61z"/></svg>';
        removeFavorite(mealId);
    }
}

// Save meal to favorites in localStorage
function saveFavorite(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
    if (!favorites.includes(mealId)) {
        favorites.push(mealId);
        localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
    }
}

// Remove meal from favorites in localStorage
function removeFavorite(mealId) {
    let favorites = JSON.parse(localStorage.getItem('favoriteMeals')) || [];
    favorites = favorites.filter(id => id !== mealId);
    localStorage.setItem('favoriteMeals', JSON.stringify(favorites));
}

// Load favorites from localStorage and mark them
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('favoriteMeals')) || [];

    favorites.forEach(mealId => {
        const mealItem = document.querySelector(`.meal-item[data-id="${mealId}"]`);
        if (mealItem) {
            const favoriteButton = mealItem.querySelector('.favorite-btn');
            if (favoriteButton) {
                favoriteButton.classList.add('favorite');
                favoriteButton.innerHTML = '<svg class="w-5 h-5 fill-current text-red-500" viewBox="0 0 20 20"><path d="M10 3.22l-.61-.6a5.5 5.5 0 00-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 00-7.78-7.77l-.61.61z"/></svg>';
            }
        }
    });
}

// Initialize favorites when page loads
document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.meal-grid')) {
        loadFavorites();
    }
});
