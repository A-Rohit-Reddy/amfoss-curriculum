from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes, useful for Flutter local testing

# Simple in-memory user store (replace with DB in production)
users = {}

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    print(f"Registering: {email}")  # Debug

    if email in users:
        print("User already exists")
        return jsonify({'error': 'User already exists'}), 400

    users[email] = password
    print(f"User {email} registered successfully")
    return jsonify({'message': 'User registered successfully'}), 200


@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400

    if users.get(email) == password:
        print(f"User logged in: {email}")  # Logging
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'error': 'Invalid credentials'}), 401

if __name__ == '__main__':
    # Listen on all interfaces for emulator/device access
    app.run(debug=True, host='0.0.0.0', port=5000)

