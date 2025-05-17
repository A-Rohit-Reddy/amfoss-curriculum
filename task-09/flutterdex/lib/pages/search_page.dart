import 'package:flutter/material.dart';
import '../services/poke_api.dart';
import '../widgets/pokemon_card.dart';
import '../widgets/background.dart';
import 'details_page.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  List<Map<String, dynamic>> _searchResults = [];
  String _query = '';
  bool _loading = false;

  Future<void> _searchPokemon(String query) async {
    setState(() {
      _loading = true;
    });

    final allPokemon = await PokeApi.fetchPokemonList();
    final results = allPokemon
        .where((poke) => poke['name'].toLowerCase().contains(query.toLowerCase()))
        .toList();

    setState(() {
      _query = query;
      _searchResults = results;
      _loading = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: Colors.transparent,
      appBar: AppBar(
        title: const Text('Search Pokémon', style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: PokeballBackground(
        child: Padding(
          padding: const EdgeInsets.only(top: 80.0, left: 16, right: 16),
          child: Column(
            children: [
              TextField(
                decoration: InputDecoration(
                  hintText: 'Enter Pokémon name...',
                  filled: true,
                  fillColor: Colors.yellow.shade100,
                  border: OutlineInputBorder(borderRadius: BorderRadius.circular(10)),
                ),
                onSubmitted: _searchPokemon,
              ),
              const SizedBox(height: 20),
              _loading
                  ? const CircularProgressIndicator()
                  : Expanded(
                child: _searchResults.isEmpty && _query.isNotEmpty
                    ? const Text('No Pokémon found!', style: TextStyle(color: Colors.white))
                    : GridView.builder(
                  itemCount: _searchResults.length,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: 1.1,
                  ),
                  itemBuilder: (context, index) {
                    final pokemon = _searchResults[index];
                    return PokemonCard(
                      pokemon: pokemon,
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => PokemonDetailPage(
                              pokemonId: pokemon['id'],
                              name: pokemon['name'],
                            ),
                          ),
                        );
                      },
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
