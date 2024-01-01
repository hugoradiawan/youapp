import 'package:flutter/material.dart';
import 'package:horoflutter/shared/background.dart';
import 'package:horoflutter/login_register/profile_content.dart';

class ProfilePage extends StatelessWidget {
  const ProfilePage({super.key});

  @override
  Widget build(_) => const Background(
        child: ProfileContent(),
      );
}