import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class PokemonDetailPage extends StatefulWidget {
  final int pokemonId;
  final String name;

  const PokemonDetailPage({
    super.key,
    required this.pokemonId,
    required this.name,
  });

  @override
  State<PokemonDetailPage> createState() => _PokemonDetailPageState();
}

class _PokemonDetailPageState extends State<PokemonDetailPage> {
  Map<String, dynamic>? _pokemonData;

  @override
  void initState() {
    super.initState();
    fetchPokemonDetail();
  }

  Future<void> fetchPokemonDetail() async {
    final url = 'https://pokeapi.co/api/v2/pokemon/${widget.pokemonId}';
    final response = await http.get(Uri.parse(url));

    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      print('Fetched data for ${widget.name}: $data');
      print('Image URL: ${data['sprites']?['other']?['official-artwork']?['front_default']}');

      setState(() {
        _pokemonData = data;
      });
    } else {
      print('Failed to load Pokémon details');
    }
  }

  @override
  Widget build(BuildContext context) {
    final imageUrl = _pokemonData?['sprites']?['other']?['official-artwork']?['front_default'] ??
        _pokemonData?['sprites']?['front_default'] ??
        '';

    return Scaffold(
      backgroundColor: const Color(0xFFE90303),
      appBar: AppBar(
        backgroundColor: const Color(0xFFB20202),
        title: Text(
          widget.name.toUpperCase(),
          style: const TextStyle(color: Colors.white),
        ),
      ),
      body: _pokemonData == null
          ? const Center(child: CircularProgressIndicator(color: Colors.yellow))
          : Padding(
        padding: const EdgeInsets.only(left: 40.0, top: 20.0),
        child: Column(
          children: [
            if (imageUrl.isNotEmpty)
              Image.network(
                imageUrl,
                height: 300,
                fit: BoxFit.contain,
                errorBuilder: (_, __, ___) => const Icon(
                  Icons.error,
                  color: Colors.white,
                  size: 80,
                ),
              )
            else
              const Icon(
                Icons.image_not_supported,
                color: Colors.white,
                size: 80,
              ),
            const SizedBox(height: 20),
            Text("${_pokemonData!['name']}".toUpperCase(),
                style: const TextStyle(fontSize: 30, color: Colors.yellowAccent),),
            const SizedBox(height: 50),
            Text("Height : ${_pokemonData!['height']} dm",
                style: const TextStyle(fontSize: 16, color: Colors.white)),
            Text("Weight : ${_pokemonData!['weight']} hg",
                style: const TextStyle(fontSize: 16, color: Colors.white)),
            const SizedBox(height: 30),
            const Text("Types :",
                style: TextStyle(fontSize: 22, color: Colors.yellow)),
            Wrap(
              spacing: 10,
              children: (_pokemonData!['types'] as List)
                  .map((typeInfo) => Chip(
                label: Text(typeInfo['type']['name'].toUpperCase()),
                backgroundColor: Colors.yellow,
                labelStyle: const TextStyle(color: Colors.red),
              ))
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}

