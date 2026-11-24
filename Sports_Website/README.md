# Sports News Website

A responsive sports-news web application built with Flask, Bootstrap, and vanilla JavaScript. It retrieves current articles from [NewsAPI](https://newsapi.org/) and displays them as interactive news cards.

**Live site:** [sportsnewsdaily.onrender.com](https://sportsnewsdaily.onrender.com/)

## Features

- Browse general sports headlines or filter by cricket, football, basketball, and kabaddi.
- Search for sports stories by keyword.
- View articles in responsive cards with an image, source, summary, date, and link to the original story.
- See a loading spinner while requests are in progress and a friendly message if news cannot be loaded.
- Explore a built-in collection of sports-story cards; selecting one opens a detail modal.
- Mobile-friendly navigation and layout powered by Bootstrap 5.

## Tech stack

- **Backend:** Python and Flask
- **News source:** NewsAPI
- **Frontend:** HTML, CSS, JavaScript, and Bootstrap 5
- **Deployment server:** Gunicorn (included in `requirements.txt`)

## Project structure

```text
Sports_Website/
├── app.py                 # Flask routes and NewsAPI request handling
├── requirements.txt       # Python dependencies
├── static/
│   ├── index.js           # News fetching, search, rendering, and UI states
│   └── style.css          # Custom styling
└── templates/
    └── index.html         # Main page, navigation, cards, and modal
```

## Getting started

### Prerequisites

- Python 3.8 or later
- A free [NewsAPI key](https://newsapi.org/register)

### Installation

1. Clone the repository and enter the project folder.

   ```bash
   git clone <repository-url>
   cd Sports_Website
   ```

2. Create and activate a virtual environment (recommended).

   ```bash
   python -m venv .venv
   ```

   **Windows PowerShell**

   ```powershell
   .\.venv\Scripts\Activate.ps1
   ```

   **macOS/Linux**

   ```bash
   source .venv/bin/activate
   ```

3. Install the dependencies.

   ```bash
   pip install -r requirements.txt
   ```

4. Set your NewsAPI key as an environment variable.

   **Windows PowerShell**

   ```powershell
   $env:NEWS_API_KEY="your_newsapi_key"
   ```

   **macOS/Linux**

   ```bash
   export NEWS_API_KEY="your_newsapi_key"
   ```

5. Start the development server.

   ```bash
   python app.py
   ```

6. Open [http://127.0.0.1:5000](http://127.0.0.1:5000) in your browser.

## How it works

The Flask app serves the homepage at `/` and exposes a `/news` endpoint used by the frontend:

| Request | Purpose |
| --- | --- |
| `/news?category=sports` | Retrieves Indian sports headlines. |
| `/news?category=cricket` | Searches current articles for a sport category. |
| `/news?q=virat+kohli` | Searches NewsAPI for a keyword. |

The browser fetches this endpoint and renders each returned article into a card. This keeps the API key on the server rather than exposing it in browser-side JavaScript.

## Configuration and security

Set `NEWS_API_KEY` before running the app. The current `app.py` includes a fallback API key for local development; remove that fallback before publishing or deploying the project, and keep credentials in environment variables or a secrets manager.

## Deployment

For a production deployment, configure the platform with the `NEWS_API_KEY` environment variable and run the application with Gunicorn:

```bash
gunicorn app:app
```

Also set `debug=False` in `app.py` for production.

## License

No license has been specified for this project.
