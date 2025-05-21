import 'package:flutter/material.dart';
import '../services/auth_service.dart'; // For getting stored email/token
import 'package:http/http.dart' as http;
import 'dart:convert';

class UserPokemonPage extends StatefulWidget {
  const UserPokemonPage({super.key});

  @override
  State<UserPokemonPage> createState() => _UserPokemonPageState();
}

class _UserPokemonPageState extends State<UserPokemonPage> {
  late Future<List<Map<String, dynamic>>> _capturedPokemon;

  @override
  void initState() {
    super.initState();
    _capturedPokemon = fetchCapturedPokemon();
  }

  Future<List<Map<String, dynamic>>> fetchCapturedPokemon() async {
    final email = await AuthService.getLoggedInUser();
    if (email == null) {
      throw Exception('User not logged in');
    }
    final url = Uri.parse('http://192.168.201.109:5000/captured');

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return List<Map<String, dynamic>>.from(data['captured']);
    } else {
      throw Exception('Failed to load captured Pokémon');
    }
  }


  void _showTradeDialog(String pokemonName, int pokemonId) async {
    final response = await http.get(Uri.parse('http://192.168.201.109:5000/users'));

    if (response.statusCode == 200) {
      final List<dynamic> users = jsonDecode(response.body);

      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            backgroundColor: Colors.white,
            title: const Text('Select a User to Trade With'),
            content: SingleChildScrollView(
              child: Column(
                children: users.map<Widget>((user) {
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 4.0),
                    child: ElevatedButton(
                      style: ElevatedButton.styleFrom(
                        backgroundColor: Colors.redAccent,
                        foregroundColor: Colors.white,
                      ),
                      onPressed: () {
                        Navigator.of(context).pop(); // Close the dialog
                        _performTrade(user, pokemonName, pokemonId);
                      },
                      child: Text(user.toString()),
                    ),
                  );
                }).toList(),
              ),
            ),
          );
        },
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Failed to fetch users")),
      );
    }
  }

  void _performTrade(String toUser, String pokemonName, int pokemonId) async {
    final sender_email = await AuthService.getLoggedInUser();

    final response = await http.post(
      Uri.parse('http://192.168.201.109:5000/trade'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'user_email': sender_email,
        'pokemon_id': pokemonId,
        'pokemon_name': pokemonName,
        'to_user': toUser,  // Assume backend accepts this
      }),
    );

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Trade successful")),
      );
      setState(() {
        _capturedPokemon = fetchCapturedPokemon();
      });
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text("Trade failed: ${response.body}")),
      );
    }
  }



  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFFEF0202),
      appBar: AppBar(
        title: const Text('My Captured Pokémon', style: TextStyle(color: Colors.yellowAccent),),
        backgroundColor: const Color(0xFFB50707),
      ),
      body: FutureBuilder<List<Map<String, dynamic>>>(
        future: _capturedPokemon,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          }
          final captured = snapshot.data!;
          if (captured.isEmpty) {
            return const Center(child: Text('You have not captured any Pokémon yet.'));
          }
          return ListView.builder(
            itemCount: captured.length,
            itemBuilder: (context, index) {
              final pokemon = captured[index];
              final name = pokemon['pokemon_name'];
              final id = pokemon['pokemon_id'];

              return Padding(
                padding: const EdgeInsets.only(top: 15.0),
                child: ListTile(
                  leading: SizedBox(
                    width: 80,
                    height: 130,
                    child: Image.network(
                      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/$id.png',
                      fit: BoxFit.fitHeight,
                    ),
                  ),
                  title: Text(name, style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold, fontSize: 20),),
                  trailing: ElevatedButton(
                    onPressed: () => _showTradeDialog(name, id),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.yellowAccent,
                      foregroundColor: Colors.redAccent,
                    ),
                    child: const Text(
                      'Trade',
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    ),
                  ),

                ),
              );
            },
          );
        },
      ),
    );
  }
}
