// pages/start_page.dart
import 'package:flutter/material.dart';
import '../widgets/ellipse.dart';
import '../widgets/back_arrow.dart';
import '../widgets/sign_up_form.dart';
import '../widgets/sign_in_form.dart';
import '../widgets/dialog_content.dart';

enum FormType { none, signUp, signIn }

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  FormType _currentForm = FormType.none;
  bool _showDialog = false;
  bool _showSecondContent = false;

  @override
  void initState() {
    super.initState();
    Future.delayed(const Duration(milliseconds: 500), () {
      setState(() {
        _showDialog = true;
      });
    });

    Future.delayed(const Duration(seconds: 3), () {
      setState(() {
        _showSecondContent = true;
      });
    });
  }

  double get dialogTop {
    if (!_showDialog) return MediaQuery.of(context).size.height;
    if (_currentForm == FormType.signUp || _currentForm == FormType.signIn) {
      return 240;
    }
    return _showSecondContent ? 340 : 150;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        color: const Color(0xFFE90303),
        child: Stack(
          children: [
            Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                const SizedBox(height: 170),
                Image.asset('assets/images/pokeball.png', height: 320, width: double.infinity,),
              ],
            ),
            Positioned(
              top: 50,
              left: 30,
              child: Row(
                children: [
                  Container(
                    width: 80,
                    height: 80,
                    decoration: BoxDecoration(
                      shape: BoxShape.circle,
                      gradient: const LinearGradient(
                        colors: [Color(0xFF07D2FF), Color(0xFFEDF9FB)],
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                      ),
                      border: Border.all(color: Colors.black, width: 2),
                    ),
                  ),
                  const SizedBox(width: 80),
                  const Ellipse(),
                  const Ellipse(),
                  const Ellipse(),
                  if (_currentForm != FormType.none)
                    BackArrow(onPressed: () {
                      setState(() => _currentForm = FormType.none);
                    }),
                ],
              ),
            ),
            AnimatedPositioned(
              duration: const Duration(milliseconds: 700),
              curve: Curves.easeOut,
              top: dialogTop,
              left: 0,
              right: 0,
              bottom: 0,
              child: Container(
                padding: const EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: const Color(0xFFD40707),
                  borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(60),
                    topRight: Radius.circular(60),
                  ),
                  border: Border.all(color: const Color(0xFF6D0707), width: 2),
                ),
                child: _currentForm == FormType.signUp
                    ? const SignUpForm()
                    : _currentForm == FormType.signIn
                    ? const SignInForm()
                    : _showSecondContent
                    ? FinalDialogContent(
                  onSelectForm: (form) {
                    setState(() => _currentForm = form);
                  },
                )
                    : const InitialDialogContent(),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
