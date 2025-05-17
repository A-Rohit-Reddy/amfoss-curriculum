// widgets/ellipse.dart
import 'package:flutter/material.dart';

class Ellipse extends StatelessWidget {
  const Ellipse({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 33,
      height: 30,
      margin: const EdgeInsets.all(8),
      decoration: BoxDecoration(
        color: const Color(0xFFB20A0A),
        borderRadius: BorderRadius.circular(50),
        border: Border.all(color: const Color(0xFF011D24), width: 3),
      ),
    );
  }
}
