from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
from config import ApplicationConfig
from uuid import uuid4
import requests
import os

app = Flask(__name__)
app.config.from_object(ApplicationConfig)
app.secret_key = os.environ.get('SECRET_KEY', 'dev_secret_key_for_testing')

CORS(app, supports_credentials=True, origins=["http://localhost:3000"])

db = SQLAlchemy(app)

TMDB_API_KEY = os.environ.get("TMDB_API_KEY", "68880f67ffa63eb0c3f6b210edafb7c9")
TMDB_BASE_URL = "https://api.themoviedb.org/3/movie/"

def get_uuid():
    return uuid4().hex

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(15), unique=True, nullable=False)
    password = db.Column(db.Text, nullable=False)

class Review(db.Model):
    __tablename__ = "reviews"
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(32), nullable=False)
    movie_id = db.Column(db.String(32), nullable=False)
    review_text = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Float, nullable=True)

class Watchlist(db.Model):
    __tablename__ = "watchlist"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    movie_id = db.Column(db.String(15), nullable=False)
    movie_title = db.Column(db.String(100), nullable=False)
    poster_path = db.Column(db.String(200), nullable=True)

    user = db.relationship("User", backref="watchlist")

# Helper function to fetch poster URL from TMDB
def fetch_movie_poster(movie_id):
    try:
        url = f"{TMDB_BASE_URL}{movie_id}?api_key={TMDB_API_KEY}"
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            poster_path = data.get('poster_path')
            if poster_path:
                return f"https://image.tmdb.org/t/p/w500{poster_path}"
        return None
    except Exception as e:
        print(f"Error fetching poster for movie_id {movie_id}: {e}")
        return None

# --- User Auth Routes (unchanged) ---

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Username and password required"}), 400

    username = data['username']
    password = data['password']

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"id": new_user.id, "username": new_user.username}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data or 'username' not in data or 'password' not in data:
        return jsonify({"error": "Username and password required"}), 400

    user = User.query.filter_by(username=data['username']).first()
    if not user or not check_password_hash(user.password, data['password']):
        return jsonify({"error": "Unauthorized"}), 401

    session['user'] = user.username
    return jsonify({"id": user.id, "username": user.username})

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logged out"})

@app.route('/me', methods=['GET'])
def get_user():
    username = session.get('user')
    if username:
        user = User.query.filter_by(username=username).first()
        return jsonify({"id": user.id, "username": user.username})
    return jsonify({"message": "Not authenticated"}), 401

# --- Movie & Review Routes ---

@app.route('/review', methods=['POST'])
def add_review():
    data = request.get_json()
    if not data or 'user' not in data or 'movie_id' not in data or 'review' not in data:
        return jsonify({"error": "Invalid request"}), 400

    review = Review(
        user=data['user'],
        movie_id=data['movie_id'],
        review_text=data['review'],
        rating=data.get('rating')
    )

    db.session.add(review)
    db.session.commit()

    return jsonify({
        "user": review.user,
        "movie_id": review.movie_id,
        "review": review.review_text,
        "rating": review.rating
    }), 201

@app.route('/reviews/<movie_id>', methods=['GET'])
def get_reviews(movie_id):
    reviews = Review.query.filter_by(movie_id=movie_id).all()
    result = [{"user": r.user, "review": r.review_text, "rating": r.rating} for r in reviews]
    return jsonify(result)

@app.route('/reviews/user', methods=['POST'])
def get_user_reviews():
    username = session.get('user')
    if not username:
        return jsonify({'error': 'Not authenticated'}), 401

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    reviews = Review.query.filter_by(user=user.username).all()
    
    result = []
    for r in reviews:
        poster = fetch_movie_poster(r.movie_id)
        result.append({
            "movie_id": r.movie_id,
            "movie_title": r.movie_id,  # Optional: replace with title if you store it somewhere
            "review_text": r.review_text,
            "rating": r.rating,
            "poster_path": poster or "/default-poster.png"  # fallback poster
        })

    return jsonify(result)


@app.route('/myreviews', methods=['GET'])
def get_my_reviews():
    username = session.get('user')
    if not username:
        return jsonify({"error": "Not authenticated"}), 401

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    reviews = Review.query.filter_by(user=user.username).all()
    review_data = []

    for r in reviews:
        poster_path = fetch_movie_poster(r.movie_id) or ""
        movie_title = r.movie_id  # fallback or replace with actual title if available

        review_data.append({
            "movie_id": r.movie_id,
            "movie_title": movie_title,
            "poster_path": poster_path,
            "review_text": r.review_text,
            "rating": r.rating
        })

    return jsonify(review_data)

# --- Watchlist ---

@app.route('/watchlist', methods=['POST'])
def add_to_watchlist():
    data = request.get_json()
    username = data.get("username")
    movie_id = data.get("movie_id")
    movie_title = data.get("movie_title")
    poster_path = data.get("poster_path")

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    existing = Watchlist.query.filter_by(user_id=user.id, movie_id=movie_id).first()
    if existing:
        return jsonify({"message": "Already in watchlist"}), 200

    entry = Watchlist(user_id=user.id, movie_id=movie_id, movie_title=movie_title, poster_path=poster_path)
    db.session.add(entry)
    db.session.commit()

    return jsonify({"message": "Added to watchlist"}), 201

@app.route('/watchlist/user', methods=['GET'])
def get_user_watchlist():
    username = session.get('user')
    if not username:
        return jsonify({'error': 'Not authenticated'}), 401

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    watchlist_items = Watchlist.query.filter_by(user_id=user.id).all()
    result = []
    for item in watchlist_items:
        poster = item.poster_path
        if not poster:
            # Fetch poster if not stored in DB
            poster = fetch_movie_poster(item.movie_id) or "/default-poster.png"
        result.append({
            "movie_id": item.movie_id,
            "movie_title": item.movie_title,
            "poster_path": poster
        })

    return jsonify(result)


# --- Profile Update ---

@app.route('/user/update-username', methods=['POST'])
def update_username():
    data = request.get_json()
    old_username = data.get('old_username')
    new_username = data.get('new_username')
    confirm_username = data.get('confirm_username')

    if not old_username or not new_username or not confirm_username:
        return jsonify({'message': 'Missing fields'}), 400

    if new_username != confirm_username:
        return jsonify({'message': 'New usernames do not match'}), 400

    user = User.query.filter_by(username=old_username).first()
    if not user:
        return jsonify({'message': 'Old username not found'}), 404

    if User.query.filter_by(username=new_username).first():
        return jsonify({'message': 'New username already exists'}), 400

    Review.query.filter_by(user=old_username).update({'user': new_username})
    user.username = new_username
    session['user'] = new_username
    db.session.commit()
    return jsonify({'message': 'Username updated successfully'})

@app.route('/user/update-password', methods=['POST'])
def update_password():
    data = request.get_json()
    username = data.get('username')
    old_password = data.get('old_password')
    new_password = data.get('new_password')
    confirm_password = data.get('confirm_password')

    if not username or not old_password or not new_password or not confirm_password:
        return jsonify({'message': 'Missing fields'}), 400

    if new_password != confirm_password:
        return jsonify({'message': 'New passwords do not match'}), 400

    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({'message': 'User not found'}), 404

    if not check_password_hash(user.password, old_password):
        return jsonify({'message': 'Old password is incorrect'}), 403

    user.password = generate_password_hash(new_password)
    db.session.commit()
    return jsonify({'message': 'Password updated successfully'})

# Initialize
if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

