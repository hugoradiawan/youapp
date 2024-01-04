import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:horoflutter/chat/chat_controller.dart';
import 'package:horoflutter/client/nestjs_connect.dart';
import 'package:horoflutter/profile/profile_controller.dart';

class HomePageController extends GetxController
    with GetSingleTickerProviderStateMixin {
  late TabController tabController = TabController(length: 4, vsync: this);
  final RxInt tabIndex = 0.obs;

  @override
  void onInit() {
    Get.put(ChatController());
    tabController.addListener(() => tabIndex.value = tabController.index);
    if (Get.isRegistered<ProfileController>()) {
      Get.find<ProfileController>().reload();
    }
    tabIndex.listen((p0) {
      if (p0 == 0) Get.find<ChatController>().requestList();
      if (p0 == 3) Get.find<NestJsConnect>().getProfile();
    });
    super.onInit();
  }

  @override
  void dispose() {
    tabController.dispose();
    super.dispose();
  }
}
