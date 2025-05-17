import 'package:flutter/material.dart';

class BackArrow extends StatelessWidget {
  final VoidCallback onPressed;

  const BackArrow({super.key, required this.onPressed});

  @override
  Widget build(BuildContext context) {
    return IconButton(
      icon: const Icon(Icons.arrow_back, color: Colors.white),
      onPressed: onPressed,
    );
  }
}
