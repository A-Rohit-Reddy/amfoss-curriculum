import 'package:flutter/material.dart';
import '../pages/start_page.dart';

class InitialDialogContent extends StatelessWidget {
  const InitialDialogContent({super.key});

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: Text(
        "WELCOME TO YOUR POKEDEX",
        style: TextStyle(color: Colors.white, fontSize: 24),
        textAlign: TextAlign.center,
      ),
    );
  }
}

class FinalDialogContent extends StatelessWidget {
  final Function(FormType) onSelectForm;

  const FinalDialogContent({super.key, required this.onSelectForm});

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(height: 20),
        const Text(
          "HELLO TRAINER",
          style: TextStyle(color: Colors.white, fontSize: 35, fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 70),
        Row(
          children: [
            const SizedBox(width: 65),
            Expanded(
              child: ElevatedButton(
                onPressed: () => onSelectForm(FormType.signUp),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFFFFF705),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: const Text(
                  'Sign Up',
                  style: TextStyle(
                    fontSize: 45,
                    color: Color(0xFFFF0505),
                    fontFamily: 'Jersey10',
                  ),
                ),
              ),
            ),
            SizedBox(width: 30, height: 60)
          ],
        ),
        const SizedBox(height: 20),
        Row(
          children: [
            const SizedBox(width: 10),
            Image.asset(
              'assets/images/triangle.png',
              width: 45,
              height: 80,
            ),
          ],
        ),
        const SizedBox(height: 20),
        Row(
          children: [
            const SizedBox(width: 65),
            Expanded(
              child: ElevatedButton(
                onPressed: () => onSelectForm(FormType.signIn),
                style: ElevatedButton.styleFrom(
                  backgroundColor: Color(0xFFFFF705),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                ),
                child: const Text(
                  'Sign In',
                  style: TextStyle(
                    fontSize: 45,
                    color: Color(0xFFFF0505),
                    fontFamily: 'Jersey10',
                  ),
                ),
              ),
            ),
            SizedBox(width: 30),
          ],
        ),
      ],
    );
  }
}
