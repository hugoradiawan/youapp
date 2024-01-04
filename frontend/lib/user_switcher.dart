import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:horoflutter/home/home_page.dart';
import 'package:horoflutter/login_register/login_or_register_page.dart';
import 'package:horoflutter/profile/uis/profile_page.dart';
import 'package:horoflutter/shared/auth_controller.dart';

class UserSwitcher extends GetView<AuthController> {
  const UserSwitcher({super.key});

  @override
  Widget build(_) => Obx(
        () => Navigator(
          pages: [
            if (controller.jwt.value == null)
              MaterialPage(child: LoginRegisterPage())
            else if ((controller.profile.value?.isEmpty() ?? true) ||
                (controller.profile.value?.interests?.isEmpty ?? true))
              const MaterialPage(child: ProfilePage())
            else
              const MaterialPage(child: HomePage())
          ],
          onPopPage: (route, result) => route.didPop(result),
        ),
      );
}
