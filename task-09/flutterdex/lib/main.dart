import 'package:flutter/material.dart';
import 'pages/start_page.dart'; // This is your splash/auth page

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Pokédex',
      home: const HomePage(), // Your start_page.dart class is HomePage
    );
  }
}




