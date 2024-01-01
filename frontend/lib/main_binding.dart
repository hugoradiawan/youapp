import 'package:get/get.dart';
import 'package:horoflutter/shared/auth_controller.dart';

class Mainbinding extends Bindings {
  @override
  void dependencies() {
    Get.put<AuthController>(AuthController());
  }
}
