let currentCategory = 'sports';

// DOM Elements
const newsContainer = document.getElementById('newsContainer');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const loading = document.getElementById('loading');

// Fetch news from Flask backend
async function fetchNews(category = currentCategory, query = '') {
    try {
        showLoading();
        let endpoint = query
            ? `/news?q=${encodeURIComponent(query)}`
            : `/news?category=${encodeURIComponent(category)}`;

        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('News fetch error:', error);
        showError('⚠️ Failed to load news. Please try again later.');
    } finally {
        hideLoading();
    }
}

// Display news
function displayNews(articles) {
    newsContainer.innerHTML = '';

    if (!articles || articles.length === 0) {
        showError('Sports News Daily');
        return;
    }

    articles.forEach(article => {
        const card = createNewsCard(article);
        newsContainer.appendChild(card);
    });
}

function createNewsCard(article) {
    const card = document.createElement('div');
    card.className = 'col-12 col-md-6 col-lg-4 mb-4';

    card.innerHTML = `
        <div class="news-card h-100 d-flex flex-column">
            <div class="position-relative">
                <img src="${article.urlToImage || 'https://source.unsplash.com/800x500/?sports'}" 
                     class="card-img-top card-img" alt="${article.title}">
                <div class="source-badge">${article.source?.name || 'Unknown Source'}</div>
            </div>
            <div class="card-body d-flex flex-column">
                <h5 class="card-title mb-3">${article.title}</h5>
                <p class="card-text text-muted mb-auto">${truncateText(article.description, 100)}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                    <small class="text-muted">${formatDate(article.publishedAt)}</small>
                    <a href="${article.url}" target="_blank" 
                       class="btn btn-sm btn-outline-primary">Read More</a>
                </div>
            </div>
        </div>
    `;

    const img = card.querySelector('img');
    img.onerror = () => img.src = 'https://source.unsplash.com/800x500/?sports';

    return card;
}

// Helpers
function truncateText(text, maxLength) {
    return text?.length > maxLength ? text.substr(0, maxLength - 1) + '...' : text || '';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
}

function showLoading() {
    loading.style.display = 'flex';
}

function hideLoading() {
    loading.style.display = 'none';
}

function showError(message) {
    newsContainer.innerHTML = `
        <div class="col-12 text-center py-5">
            <h4 class="text-danger">${message}</h4>
        </div>
    `;
}

// Event Listeners
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.dataset.category === currentCategory) return;

        currentCategory = e.target.dataset.category;
        document.querySelector('.nav-link.active').classList.remove('active');
        e.target.classList.add('active');
        fetchNews(currentCategory);
    });
});

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) fetchNews('', query);
});

// Initial load
document.querySelector('.nav-link.active').click();

