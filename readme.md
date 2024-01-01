# Run the Server

First cd to backend, and run
```
npm i
```
then build and run the dockers
```
docker compose up
```
wait until all the microservices up and running

# Run the Android-app
First cd to frontend, and run
```
flutter pub get
```
then open main.dart, change the ip to your local ip (which also the same as the nest js server)
```dart
Future<void> main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Future.wait([
    GetStorage.init(),
    initializeDateFormatting('en'),
  ]);
  Get.lazyPut(() => NestJsConnect(ip: '192.168.1.100')); // change this ip
  Get.lazyPut(() => FileUploader());
  Get.lazyPut(() => ProfileController(), fenix: true);
  runApp(const HoroApp());
}
```
lastly connect your android device (or run android emulator), and run
```
flutter run
```

# Run Server Unit Tests
```
npm run test
```

# Run Flutter Tests
run unit and widget tests
```
flutter test
```

run integration tests
```
flutter test integration_test
```