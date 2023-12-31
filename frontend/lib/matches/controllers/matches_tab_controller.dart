import 'package:get/get.dart';
import 'package:horoflutter/client/nestjs_connect.dart';
import 'package:horoflutter/profile/profile.dart';

class MatchesTabController extends GetxController {
  final RxList<Profile> matches = <Profile>[].obs;

  @override
  void onInit() {
    matches.listen((p0) => update());
    super.onInit();
  }

  @override
  Future<void> onReady() async {
    matches.assignAll(await Get.find<NestJsConnect>().getProfiles());
    super.onReady();
  }
}