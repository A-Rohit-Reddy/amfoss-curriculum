import 'package:flutter/material.dart';
import '../pages/home_page.dart';
import '../services/auth_service.dart';

class SignUpForm extends StatefulWidget {
  const SignUpForm({super.key});

  @override
  State<SignUpForm> createState() => _SignUpFormState();
}

class _SignUpFormState extends State<SignUpForm> {
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  Future<void> _handleRegister() async {
    print('Register button pressed');

    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    final email = _emailController.text.trim();
    final password = _passwordController.text.trim();

    print('Registering user: $email');

    final success = await AuthService.register(email, password);

    print('Register success: $success');

    if (mounted) {
      setState(() {
        _isLoading = false;
      });

      if (success) {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute(builder: (_) => const PokedexHomePage()),
        );
      } else {
        setState(() {
          _errorMessage = 'Registration failed. Try a different username.';
        });
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const Text("Sign Up", style: TextStyle(color: Colors.white, fontSize: 28)),
        const SizedBox(height: 20),
        _buildInput("Email", controller: _emailController),
        _buildInput("Password", controller: _passwordController, obscureText: true),
        if (_errorMessage != null) ...[
          const SizedBox(height: 10),
          Text(_errorMessage!, style: const TextStyle(color: Colors.red)),
        ],
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: _isLoading ? null : _handleRegister,
          style: ElevatedButton.styleFrom(backgroundColor: Colors.yellow),
          child: _isLoading
              ? const CircularProgressIndicator(color: Colors.black)
              : const Text("Register", style: TextStyle(color: Colors.black)),
        ),
      ],
    );
  }

  Widget _buildInput(String hint,
      {required TextEditingController controller, bool obscureText = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: TextField(
        controller: controller,
        obscureText: obscureText,
        decoration: InputDecoration(
          filled: true,
          fillColor: Colors.yellow,
          hintText: hint,
          hintStyle: const TextStyle(color: Colors.red),
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }
}

