import 'package:flutter/material.dart';
import '../services/poke_api.dart';
import '../widgets/pokemon_card.dart';
import '../widgets/background.dart';
import 'details_page.dart';

class AllPokemonPage extends StatefulWidget {
  const AllPokemonPage({super.key});

  @override
  State<AllPokemonPage> createState() => _AllPokemonPageState();
}

class _AllPokemonPageState extends State<AllPokemonPage> {
  late Future<List<Map<String, dynamic>>> _pokemonFuture;
  List<Map<String, dynamic>> _displayList = [];

  String _sortOption = 'ID';
  String _filterType = 'All';

  @override
  void initState() {
    super.initState();
    _pokemonFuture = _loadAndPrepare();
  }

  Future<List<Map<String, dynamic>>> _loadAndPrepare() async {
    final allPokemon = await PokeApi.fetchPokemonList();
    _displayList = List<Map<String, dynamic>>.from(allPokemon);
    return _displayList;
  }

  void _applySortAndFilter() {
    setState(() {
      List<Map<String, dynamic>> filtered = _displayList;

      if (_filterType != 'All') {
        filtered = filtered.where((p) {
          final types = p['types'] as List;
          return types.contains(_filterType.toLowerCase());
        }).toList();
      }

      if (_sortOption == 'Name') {
        filtered.sort((a, b) => a['name'].compareTo(b['name']));
      } else {
        filtered.sort((a, b) => a['id'].compareTo(b['id']));
      }

      _displayList = filtered;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBodyBehindAppBar: true,
      backgroundColor: Colors.transparent,
      appBar: AppBar(
        title: const Text('All Pokémon', style: TextStyle(color: Colors.white)),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: PokeballBackground(
        child: Padding(
          padding: const EdgeInsets.only(top: 80.0, left: 16, right: 16),
          child: Column(
            children: [
              Row(
                children: [
                  Expanded(
                    child: DropdownButton<String>(
                      value: _sortOption,
                      dropdownColor: Colors.red.shade100,
                      onChanged: (value) {
                        if (value != null) {
                          _sortOption = value;
                          _applySortAndFilter();
                        }
                      },
                      items: ['ID', 'Name']
                          .map((option) => DropdownMenuItem(value: option, child: Text('Sort by $option')))
                          .toList(),
                    ),
                  ),
                  const SizedBox(width: 16),
                  Expanded(
                    child: DropdownButton<String>(
                      value: _filterType,
                      dropdownColor: Colors.yellow.shade100,
                      onChanged: (value) {
                        if (value != null) {
                          _filterType = value;
                          _applySortAndFilter();
                        }
                      },
                      items: [
                        'All',
                        'Fire',
                        'Water',
                        'Grass',
                        'Electric',
                        'Flying',
                        'Bug',
                        'Poison',
                        'Ground',
                        'Psychic',
                      ]
                          .map((type) => DropdownMenuItem(value: type, child: Text('Filter: $type')))
                          .toList(),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 12),
              FutureBuilder<List<Map<String, dynamic>>>(
                future: _pokemonFuture,
                builder: (context, snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return const Expanded(child: Center(child: CircularProgressIndicator()));
                  } else if (snapshot.hasError) {
                    return const Expanded(child: Center(child: Text('Error loading Pokémon')));
                  }

                  return Expanded(
                    child: GridView.builder(
                      itemCount: _displayList.length,
                      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 12,
                        mainAxisSpacing: 12,
                        childAspectRatio: 1.1,
                      ),
                      itemBuilder: (context, index) {
                        final pokemon = _displayList[index];
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
                  );
                },
              ),
            ],
          ),
        ),
      ),
    );
  }
}
