import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_connect/http/src/request/request.dart';
import 'package:horoflutter/client/ask_horoscope_zodiac_response.dart';
import 'package:horoflutter/shared/auth_controller.dart';
import 'package:horoflutter/client/create_user_dto.dart';
import 'package:horoflutter/client/jwt.dart';
import 'package:horoflutter/client/login_user_dto.dart';
import 'package:horoflutter/profile/profile.dart';
import 'package:horoflutter/client/server_response.dart';
import 'package:logger/logger.dart';

class NestJsConnect extends GetConnect {
  static const port = 3000;
  static const gridFsPort = 3001;
  final String ip;
  final RxBool isRefreshingToken = false.obs;

  NestJsConnect({required this.ip});
  @override
  void onInit() {
    isRefreshingToken.listen((val) async {
      if (val) {
        if (Get.find<AuthController>().jwt.value == null) return;
        Get.find<AuthController>().jwt.value = await refreshToken(
            Get.find<AuthController>().jwt.value!.refreshToken);
        isRefreshingToken.value = false;
      }
    });
    httpClient.baseUrl = 'http://$ip:$port/api/';
    httpClient.addRequestModifier<dynamic>(authInterceptor);
  }

  Future<Request> authInterceptor(Request request) async {
    final AuthController ac = Get.find<AuthController>();
    Jwt? jwt = ac.jwt.value;
    if (jwt != null) {
      if (DateTime.now()
                  .subtract(const Duration(seconds: 30))
                  .millisecondsSinceEpoch /
              1000 >
          jwt.accessTokenExpiration) {
        if (isRefreshingToken.value == false) {
          isRefreshingToken.value = true;
          while (isRefreshingToken.value) {
            await Future<void>.delayed(const Duration(milliseconds: 500));
          }
        }
      }
      request.headers['x-access-token'] = 'Bearer ${jwt.accessToken}';
    }
    return request;
  }

  String get gridFsUrl => 'http://$ip:$gridFsPort/api/';

  String get profileUrl =>
      '${Get.find<NestJsConnect>().gridFsUrl}file/${Get.find<AuthController>().profile.value?.id}';

  String getProfileUrl(String id) =>
      '${Get.find<NestJsConnect>().gridFsUrl}file/$id';

  Future<AskHoroscopeZodiacResponse?> askHoroscopeZodiac(
      String birthday) async {
    final Response res =
        await post('askHoroscopeZodiac', {'birthday': birthday});
    if (res.status.isOk) {
      final ServerResponse<AskHoroscopeZodiacResponse> serverResponse =
          ServerResponse.fromJson(
        res.body,
        fromJson: (json) => AskHoroscopeZodiacResponse(json),
      );
      return serverResponse.data;
    } else {
      handleError(res);
      return null;
    }
  }

  Future<bool> isUsernameExist(String username) async {
    final Response res = await post('isUsernameExist', {'username': username});
    if (res.status.isOk) {
      return res.body['data'] as bool;
    } else {
      handleError(res);
      return true;
    }
  }

  Future<List<Profile>> getProfiles() async {
    final Response res = await get('profiles');
    if (res.status.isOk) {
      final List<dynamic> jsonList = res.body['data'];
      final List<Profile> profiles = [];
      for (final dynamic json in jsonList) {
        profiles.add(Profile().fromJson(json) ?? Profile());
      }
      return profiles;
    } else {
      // handleError(res);
      return [];
    }
  }

  Future<bool> register(CreateUserDto createUserDto) async {
    final Response res = await post('register', createUserDto.toJson);
    if (res.status.isOk) {
      return true;
    } else {
      handleError(res);
      return false;
    }
  }

  Future<bool> login(LoginUserDto loginUserDto) async {
    final Response res = await post('login', loginUserDto.toJson);
    if (res.status.isOk) {
      final ServerResponse<Jwt> serverResponse =
          ServerResponse.fromJson(res.body, fromJson: (json) => Jwt(json));
      Get.find<AuthController>().updateJwt(serverResponse.data);
      return true;
    } else {
      handleError(res);
      return false;
    }
  }

  Future<Jwt?> refreshToken(String refreshToken) async {
    final Response res = await get('refresh', headers: {
      'x-refresh-token': 'Bearer $refreshToken',
    });
    if (res.status.isOk) {
      final ServerResponse<Jwt> serverResponse =
          ServerResponse.fromJson(res.body, fromJson: (json) => Jwt(json));
      Logger().i('refreshed token: ${serverResponse.data?.toJson()}');
      return serverResponse.data;
    } else {
      return null;
    }
  }

  Future<Profile?> getProfile() async {
    final Response res = await get('getProfile');
    if (res.status.isOk) {
      final ServerResponse<Profile> serverResponse = ServerResponse.fromJson(
        res.body,
        fromJson: (json) => Profile().fromJson(json) ?? Profile(),
      );
      Get.find<AuthController>().profile.value = serverResponse.data;
      return serverResponse.data;
    } else {
      final ServerResponse<Object?> serverResponse =
          ServerResponse<Profile>.fromJson(res.body);
      if (serverResponse.errorCode == 1000) {
        Get.find<AuthController>().profile.value = null;
        return null;
      } else {
        // handleError(res);
        return null;
      }
    }
  }

  Future<bool> createProfile(Profile profile) async {
    final Response res = await post('createProfile', profile.toJson());
    if (res.status.isOk) {
      unawaited(getProfile());
      return true;
    } else {
      handleError(res);
      return false;
    }
  }

  Future<bool> updateProfile(Profile profile) async {
    final Response res =
        await put('updateProfile', profile.toJson(withUsername: false));
    if (res.status.isOk) {
      return true;
    } else {
      unawaited(getProfile());
      handleError(res);
      return false;
    }
  }

  void handleError(Response res) {
    final ServerResponse serverResponse = ServerResponse.fromJson(res.body);
    Get.snackbar(
      'Error',
      '${serverResponse.message ?? ''} (${serverResponse.errorCode})',
      backgroundColor: Colors.red,
      colorText: Colors.white,
    );
  }
}
