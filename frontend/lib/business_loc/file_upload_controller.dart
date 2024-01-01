import 'package:async/async.dart';
import 'package:dio/dio.dart' as d;
import 'package:flutter/foundation.dart';
import 'package:get/get.dart';
import 'package:horoflutter/business_loc/auth_controller.dart';
import 'package:horoflutter/business_loc/nestjs_connect.dart';
import 'package:http_parser/http_parser.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mime/mime.dart';

class FileUploader extends GetxController {
  final d.Dio httpClient = d.Dio(
    d.BaseOptions(
      baseUrl: Get.find<NestJsConnect>().gridFsUrl,
    ),
  );

  Future<XFile?> getFile(ImageSource source) {
    return ImagePicker().pickImage(source: source);
  }

  Future<bool> upload(XFile xFile) {
    final String? profileId = Get.find<AuthController>().profile.value?.id;
    if (profileId == null) return Future<bool>.value(false);
    return _uploadFile(
      onProgressUpdate: (final double progress) {},
      contentType: lookupMimeType(xFile.path) ?? '',
      filePath: xFile.path,
      fileName: xFile.name,
      profileId: profileId,
    );
  }

  Future<String?> uploadChatImage(XFile xFile) async {
    final bool result = await _uploadFile(
      onProgressUpdate: (final double progress) {},
      contentType: lookupMimeType(xFile.path) ?? xFile.mimeType ?? '',
      filePath: xFile.path,
      fileName: xFile.name,
    );
    if (!result) return null;
    return xFile.name;
  }

  Future<bool> _uploadFile({
    required final void Function(double) onProgressUpdate,
    required final String contentType,
    required final String filePath,
    required final String fileName,
    final String? profileId,
  }) async {
    final d.FormData formData = d.FormData.fromMap({
      'file': d.MultipartFile.fromFileSync(
        filePath,
        filename: profileId ?? fileName,
        contentType: MediaType.parse(contentType),
      ),
    });
    final d.Response<bool> res = await httpClient.put(
      'upload',
      data: formData,
      options: d.Options(
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      ),
      onSendProgress: (final int sent, final int total) =>
          onProgressUpdate(sent / total),
    );
    return res.statusCode == 200;
  }

  Stream<List<int>> chunckFile(final Stream<List<int>> streamIn) async* {
    final ChunkedStreamReader<int> reader = ChunkedStreamReader<int>(streamIn);
    while (true) {
      final Uint8List data = await reader.readBytes(32 * 1024);
      if (data.isEmpty) {
        break;
      }
      yield data;
    }
  }
}
