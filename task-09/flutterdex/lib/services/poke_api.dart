import 'package:http/http.dart' as http;
import 'dart:convert';

class PokeApi {
  static Future<List<Map<String, dynamic>>> fetchPokemonList() async {
    final url = 'https://pokeapi.co/api/v2/pokemon?limit=100';
    final response = await http.get(Uri.parse(url));
    if (response.statusCode == 200) {
      final data = json.decode(response.body);
      final List results = data['results'];

      // Extract id from each pokemon URL
      return results.map<Map<String, dynamic>>((poke) {
        final url = poke['url'] as String;
        final id = int.parse(url.split('/')[url.split('/').length - 2]);
        return {
          'name': poke['name'],
          'id': id,
        };
      }).toList();
    } else {
      throw Exception('Failed to load Pokémon list');
    }
  }
}

