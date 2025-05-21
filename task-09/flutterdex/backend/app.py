from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes, useful for Flutter local testing

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///pokedex.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Define User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    captured_pokemon = db.relationship('CapturedPokemon', backref='user', lazy=True)

# Define CapturedPokemon model
class CapturedPokemon(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    pokemon_id = db.Column(db.Integer, nullable=False)
    pokemon_name = db.Column(db.String(100), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

# Create tables
with app.app_context():
    db.create_all()

@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.with_entities(User.email).all()
    user_emails = [user.email for user in users]
    return jsonify(user_emails)

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'User already exists'}), 400

    new_user = User(email=email, password=password)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User registered successfully'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email, password=password).first()
    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

@app.route('/capture', methods=['POST'])
def capture():
    data = request.get_json()
    email = data.get('email')
    pokemon_id = data.get('pokemon_id')
    pokemon_name = data.get('pokemon_name')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    existing = CapturedPokemon.query.filter_by(user_id=user.id, pokemon_id=pokemon_id).first()
    if existing:
        return jsonify({'message': 'Pokémon already captured'}), 200

    capture = CapturedPokemon(pokemon_id=pokemon_id, pokemon_name=pokemon_name, user_id=user.id)
    db.session.add(capture)
    db.session.commit()

    return jsonify({'message': f'{pokemon_name} captured!'}), 200

@app.route('/trade', methods=['POST'])
def trade_pokemon():
    # get all the required items for trade
    data = request.get_json()
    sender_email = data.get('user_email')
    receiver_email = data.get('to_user')
    pokemon_id = data.get('pokemon_id')
    pokemon_name = data.get('pokemon_name')

    user = User.query.filter_by(email = sender_email).first()
    reciever = User.query.filter_by(email = receiver_email).first()

    if not ([sender_email, receiver_email, pokemon_id, pokemon_name]):
        return jsonify({'error': 'Missing data'}), 400

    # check if sender has the pokemon
    trade_pokemon = CapturedPokemon.query.filter_by(
        user_id = user.id,
        pokemon_id=pokemon_id,
        pokemon_name=pokemon_name
    ).first()

    if not trade_pokemon:
        return jsonify({'error': 'Pokémon not found or not owned by user'}), 404

    # Remove from sender
    db.session.delete(trade_pokemon)

    # Add to receiver
    new_pokemon = CapturedPokemon(
        user_id = reciever.id,
        pokemon_id=pokemon_id,
        pokemon_name=pokemon_name
    )
    db.session.add(new_pokemon)
    db.session.commit()

    return jsonify({'message': 'Trade successful'})


@app.route('/captured', methods=['POST'])
def get_captured():
    data = request.get_json()
    email = data.get('email')

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    captured = CapturedPokemon.query.filter_by(user_id=user.id).all()
    result = [{'pokemon_id': p.pokemon_id, 'pokemon_name': p.pokemon_name} for p in captured]

    return jsonify({'captured': result}), 200


if __name__ == '__main__':
    # Listen on all interfaces for emulator/device access
    app.run(debug=True, host='0.0.0.0', port=5000)

