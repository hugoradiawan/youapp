import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:get/get.dart';
import 'package:get_storage/src/storage_impl.dart';
import 'package:horoflutter/shared/auth_controller.dart';
import 'package:horoflutter/client/login_user_dto.dart';
import 'package:horoflutter/client/nestjs_connect.dart';
import 'package:mockito/mockito.dart';

class _MockNestJsConnect extends NestJsConnect with Mock {
  final bool isRespondingOk;
  _MockNestJsConnect({required super.ip, this.isRespondingOk = true});

  @override
  void handleError(Response res) {}

  @override
  Future<Response<T>> post<T>(String? url, body,
          {String? contentType,
          Map<String, String>? headers,
          Map<String, dynamic>? query,
          Decoder<T>? decoder,
          Progress? uploadProgress}) =>
      isRespondingOk
          ? Future<Response<T>>.value(
              Response<T>(
                statusCode: 201,
                body: {
                  'isOk': true,
                  'data': {
                    'accessToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTkyY2MzMTgxNDM0OWI4ZGMwNTUyOWQiLCJpYXQiOjE3MDQxMzA0MzcsImV4cCI6MTcwNDEzMDYxN30.dMZb4fvdlETZe8evg6ZjfgflITQFUFpDY8elvhfbyMg',
                    'refreshToken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTkyY2MzMTgxNDM0OWI4ZGMwNTUyOWQiLCJpYXQiOjE3MDQxMzA0MzcsImV4cCI6MTcwNDczNTIzN30.fJfYCh0MYzXA22AA0PhcXGNeEThc91VG1iknjRN0jSA'
                  }
                } as T,
              ),
            )
          : Future<Response<T>>.value(
              Response<T>(
                statusCode: 401,
                body: {
                  'isOk': false,
                  'errorCode': 2004,
                  'message': 'Invalid username, email or password',
                } as T,
              ),
            );
}

class _MockAuthController extends AuthController with Mock {
  @override
  GetStorage initStorage() => _MockGetStorage();
}

class _MockGetStorage extends Mock implements GetStorage {
  @override
  Future<void> write(String key, value) => Future<void>.value();
}

void main() {
  WidgetsFlutterBinding.ensureInitialized();

  final LoginUserDto loginUserDto = LoginUserDto(
    usernameOrEmail: 'username',
    password: 'password',
  );

  setUp(() {
    Get.put<NestJsConnect>(NestJsConnect(ip: 'localhost'));
    Get.put<AuthController>(_MockAuthController());
  });

  group('NestjsConnect: login', () {
    test('returns true when the response status is ok', () async {
      final mockNestJsConnect = _MockNestJsConnect(ip: 'localhost');
      final result = await mockNestJsConnect.login(loginUserDto);
      expect(Get.find<AuthController>().jwt.value?.accessToken, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTkyY2MzMTgxNDM0OWI4ZGMwNTUyOWQiLCJpYXQiOjE3MDQxMzA0MzcsImV4cCI6MTcwNDEzMDYxN30.dMZb4fvdlETZe8evg6ZjfgflITQFUFpDY8elvhfbyMg');
      expect(result, isTrue);
    });

    test('returns false when the response status is not ok', () async {
      final mockNestJsConnect =
          _MockNestJsConnect(ip: 'localhost', isRespondingOk: false);
      final result = await mockNestJsConnect.login(loginUserDto);
      expect(Get.find<AuthController>().jwt.value?.accessToken, isNull);
      expect(result, isFalse);
    });
  });

  tearDown(() => Get.reset());
}
