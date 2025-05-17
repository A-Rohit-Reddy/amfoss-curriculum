import 'package:flutter/material.dart';
import '../services/poke_api.dart';
import '../widgets/pokemon_card.dart';
import '../widgets/background.dart';  // Import your background widget
import './details_page.dart';
import './search_page.dart';
import './all_pokemon_page.dart';


class PokedexHomePage extends StatefulWidget {
  const PokedexHomePage({super.key});

  @override
  State<PokedexHomePage> createState() => _HomePageState();
}

class _HomePageState extends State<PokedexHomePage> {
  late Future<List<Map<String, dynamic>>> _pokemonList;

  @override
  void initState() {
    super.initState();
    _pokemonList = PokeApi.fetchPokemonList();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: Colors.transparent,  // Make scaffold background transparent
      appBar: AppBar(
        title: const Text('Pokédex', style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.transparent,
        elevation: 0,
        actions: [
          IconButton(
            icon: const Icon(Icons.search, color: Colors.white),
            tooltip: 'Search Pokémon',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const SearchPage()),
              );
            },
          ),
          IconButton(
            icon: const Icon(Icons.list, color: Colors.white),
            tooltip: 'All Pokémon',
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const AllPokemonPage()),
              );
            },
          ),
        ],
      ),

      body: Padding(
        padding: const EdgeInsets.only(top: 20.0),
        child: PokeballBackground(
          child: Padding(
            padding: const EdgeInsets.only(top: 55.0),
            child: FutureBuilder<List<Map<String, dynamic>>>(
              future: _pokemonList,
              builder: (context, snapshot) {
                if (snapshot.connectionState == ConnectionState.waiting) {
                  return const Center(child: CircularProgressIndicator());
                } else if (snapshot.hasError) {
                  return const Center(child: Text('Error loading Pokémon'));
                }

                final pokemonList = snapshot.data!;

                return GridView.builder(
                  padding: const EdgeInsets.all(12),
                  itemCount: pokemonList.length,
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: 1.1,
                  ),
                  itemBuilder: (context, index) {
                    final pokemon = pokemonList[index];
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
                );
              },
            ),
          ),
        ),
      ),
    );
  }
}




