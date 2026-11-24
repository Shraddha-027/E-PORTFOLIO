from flask import Flask, render_template, request, jsonify
import requests
import os

app = Flask(__name__)

# Load API key (better to store as environment variable in production)
API_KEY = os.getenv("NEWS_API_KEY", "d2e2322ee8e74ad2b57bbc1d5fda30ea")
BASE_URL = "https://newsapi.org/v2"


@app.route("/")
def home():
    """Render the homepage"""
    return render_template("index.html")


@app.route("/news")
def get_news():
    """Fetch news from NewsAPI and return JSON"""
    category = request.args.get("category", "sports")
    query = request.args.get("q", "")

    if query:
        url = f"{BASE_URL}/everything?q={query}&language=en&sortBy=publishedAt&apiKey={API_KEY}"
    else:
        if category == "sports":
            url = f"{BASE_URL}/top-headlines?country=in&category=sports&apiKey={API_KEY}"
        else:
            url = f"{BASE_URL}/everything?q={category}&language=en&sortBy=publishedAt&apiKey={API_KEY}"

    try:
        response = requests.get(url)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == "__main__":
    # Debug mode only for local development
    app.run(debug=True)
