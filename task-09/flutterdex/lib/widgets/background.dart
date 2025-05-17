import 'package:flutter/material.dart';

class PokeballBackground extends StatelessWidget {
  final Widget child;

  const PokeballBackground({super.key, required this.child});

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
        image: DecorationImage(
          image: AssetImage('assets/images/pokeball_bg.png'),
          fit: BoxFit.cover,
        ),
      ),
      child: child,
    );
  }
}
