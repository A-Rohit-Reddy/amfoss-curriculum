import 'dart:convert';
import 'package:http/http.dart' as http;

class AuthService {
  static const String _baseUrl = 'http://192.168.83.109:5000'; // Android emulator

  static Future<bool> register(String email, String password) async {
    final url = Uri.parse('$_baseUrl/register');
    try {
      final response = await http
          .post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      )
          .timeout(const Duration(seconds: 10));

      print('Register response status: ${response.statusCode}');
      print('Register response body: ${response.body}');

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['message'] == 'User registered successfully') {
          return true;
        } else {
          print('Unexpected success response: $data');
          return false;
        }
      } else {
        final data = jsonDecode(response.body);
        print('Register error response: $data');
        return false;
      }
    } catch (e) {
      print('Register exception: $e');
      return false;
    }
  }

  static Future<bool> login(String email, String password) async {
    final url = Uri.parse('$_baseUrl/login');
    try {
      final response = await http
          .post(
        url,
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({'email': email, 'password': password}),
      )
          .timeout(const Duration(seconds: 10));

      print('Login response status: ${response.statusCode}');
      print('Login response body: ${response.body}');

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        if (data['message'] == 'Login successful') {
          return true;
        } else {
          print('Unexpected success response: $data');
          return false;
        }
      } else {
        final data = jsonDecode(response.body);
        print('Login error response: $data');
        return false;
      }
    } catch (e) {
      print('Login exception: $e');
      return false;
    }
  }
}



