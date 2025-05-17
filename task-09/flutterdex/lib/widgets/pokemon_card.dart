import 'package:flutter/material.dart';

class PokemonCard extends StatelessWidget {
  final Map<String, dynamic> pokemon;
  final VoidCallback onTap;

  const PokemonCard({super.key, required this.pokemon, required this.onTap});

  @override
  Widget build(BuildContext context) {
    final int id = pokemon['id'];
    final String name = pokemon['name'];

    // Build the sprite URL using the id
    final spriteUrl =
        'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/$id.png';

    return GestureDetector(
      onTap: onTap,
      child: Card(
        color: Colors.red[800],
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.network(
              spriteUrl,
              height: 80,
              fit: BoxFit.contain,
              errorBuilder: (context, error, stackTrace) {
                return const Icon(Icons.error, color: Colors.white, size: 50);
              },
            ),
            const SizedBox(height: 10),
            Text(
              name.toUpperCase(),
              style: const TextStyle(
                  color: Colors.white, fontWeight: FontWeight.bold),
            ),
          ],
        ),
      ),
    );
  }
}

