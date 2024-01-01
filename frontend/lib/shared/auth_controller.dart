import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:horoflutter/client/jwt.dart';
import 'package:horoflutter/client/nestjs_connect.dart';
import 'package:horoflutter/profile/profile.dart';
import 'package:horoflutter/chat/chat_controller.dart';
import 'package:horoflutter/profile/profile_controller.dart';

class AuthController extends GetxController {
  late final GetStorage _storage;
  static const String jwtKey = 'jwt', profileKey = 'profile';
  late final Rxn<Jwt> jwt = Rxn<Jwt>(
      _storage.read(jwtKey) != null ? Jwt(_storage.read(jwtKey)) : null);
  late final Rxn<Profile> profile = Rxn<Profile>(
    Profile().fromJson(_storage.read('profile')),
  );

  @override
  void onInit() {
    _storage = initStorage();
    ever(jwt, saveJwt);
    ever(
      profile,
      (Profile? pro) async => _storage.write(profileKey, pro?.toJson()),
    );
    super.onInit();
  }

  GetStorage initStorage() {
    return GetStorage();
  }

  void saveJwt(Jwt? jwt) async {
    _storage.write(jwtKey, jwt);
    if (jwt == null) return;
    profile.value = await Get.find<NestJsConnect>().getProfile();
  }

  void updateJwt(Jwt? newJwt) => jwt.value = newJwt;

  void logout() {
    Get.find<ChatController>().quitRoom();
    Get.find<ProfileController>().reload();
    _storage.erase();
    jwt.value = null;
    profile.value = null;
    imageCache.clear();
    imageCache.clearLiveImages();
  }

  String get username => profile.value?.username ?? '';
}
