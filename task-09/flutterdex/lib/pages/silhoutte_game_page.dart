import 'dart:math';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../services/auth_service.dart';

class SilhouetteGamePage extends StatefulWidget {
  const SilhouetteGamePage({super.key});

  @override
  State<SilhouetteGamePage> createState() => _SilhouetteGamePageState();
}

class _SilhouetteGamePageState extends State<SilhouetteGamePage> {
  late int _randomId;
  String _pokemonName = '';
  String _userGuess = '';
  bool _isCorrect = false;
  bool _hasGuessed = false;

  @override
  void initState() {
    super.initState();
    _loadRandomPokemon();
  }

  Future<void> _loadRandomPokemon() async {
    final rand = Random();
    _randomId = rand.nextInt(151) + 1; // Gen 1 Pokémon
    final url = 'https://pokeapi.co/api/v2/pokemon/$_randomId';
    final res = await http.get(Uri.parse(url));
    if (res.statusCode == 200) {
      final data = json.decode(res.body);
      setState(() {
        _pokemonName = data['name'];
        _hasGuessed = false;
        _isCorrect = false;
        _userGuess = '';
      });
    }
  }

  Future<void> _capturePokemon() async {
    final email = await AuthService.getLoggedInUser();

    if (email == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Not logged in")),
      );
      return;
    }

    final response = await http.post(
      Uri.parse('http://192.168.201.109:5000/capture'),
      headers: {'Content-Type': 'application/json'},
      body: json.encode({
        'email': email,
        'pokemon_id': _randomId,
        'pokemon_name': _pokemonName,
      }),
    );

    if (response.statusCode == 200) {
      print("Captured $_pokemonName!");
    } else {
      print("Failed to capture Pokémon: ${response.body}");
    }
  }

  void _checkGuess() {
    setState(() {
      _hasGuessed = true;
      _isCorrect = _userGuess.trim().toLowerCase() == _pokemonName;
    });

    if (_isCorrect) {
      _capturePokemon(); // call backend
    }
  }

  void _goToMyPokemon() {
    Navigator.pushNamed(context, '/mypokemon');
  }

  @override
  Widget build(BuildContext context) {
    final silhouetteImage =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/$_randomId.png';

    return Scaffold(
      appBar: AppBar(
        title: const Text('Who\'s That Pokémon?', style: TextStyle(color: Colors.yellowAccent)),
        backgroundColor: const Color(0xFFB20202),
        actions: [
          IconButton(
            icon: const Icon(Icons.catching_pokemon, color: Colors.white),
            onPressed: _goToMyPokemon,
            tooltip: "My Pokémon",
          )
        ],
      ),
      body: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(16),
        color: const Color(0xFFE90303),
        child: Column(
          children: [
            const SizedBox(height: 70),
            ColorFiltered(
              colorFilter: _hasGuessed && _isCorrect
                  ? const ColorFilter.mode(Colors.transparent, BlendMode.dst)
                  : const ColorFilter.mode(Colors.black, BlendMode.srcATop),
              child: Image.network(silhouetteImage, height: 260),
            ),
            const SizedBox(height: 45),
            if (!_hasGuessed) ...[
              TextField(
                style: const TextStyle(color: Colors.yellowAccent),
                decoration: const InputDecoration(
                  hintText: 'Enter Pokémon name',
                  hintStyle: TextStyle(color: Colors.yellowAccent),
                  enabledBorder: OutlineInputBorder(
                    borderSide: BorderSide(color: Colors.yellow),
                  ),
                ),
                onChanged: (value) {
                  _userGuess = value;
                },
              ),
              const SizedBox(height: 45),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.yellowAccent,
                ),
                onPressed: _checkGuess,
                child: const Text('Guess'),
              ),
            ] else ...[
              Text(
                _isCorrect
                    ? 'Correct! You caught $_pokemonName!'
                    : 'Wrong! It was $_pokemonName!',
                style: TextStyle(
                  color: _isCorrect ? Colors.green : const Color(0xFFB20202),
                  fontSize: 20,
                ),
              ),
              const SizedBox(height: 45),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.yellowAccent,
                ),
                onPressed: _loadRandomPokemon,
                child: const Text('Try Another'),
              ),
            ]
          ],
        ),
      ),
    );
  }
}

