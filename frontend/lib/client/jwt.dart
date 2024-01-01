import 'package:horoflutter/client/server_response.dart';
import 'package:jwt_decoder/jwt_decoder.dart';

class Jwt extends Jsonable {
  late final String accessToken, refreshToken;
  late final int accessTokenExpiration, refreshTokenExpiration;

  Jwt(Map<String, dynamic> json) {
    accessToken = json['accessToken'] as String;
    refreshToken = json['refreshToken'] as String;
    final Map<String, dynamic> payloadAt = JwtDecoder.decode(accessToken),
        payloadRt = JwtDecoder.decode(refreshToken);
    accessTokenExpiration = payloadAt['exp'] as int;
    refreshTokenExpiration = payloadRt['exp'] as int;
  }

  @override
  Map<String, dynamic> toJson() => {
        'accessToken': accessToken,
        'refreshToken': refreshToken,
      };
}
