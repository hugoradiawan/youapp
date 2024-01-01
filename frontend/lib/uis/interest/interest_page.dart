import 'package:flutter/material.dart';
import 'package:gap/gap.dart';
import 'package:get/get.dart';
import 'package:horoflutter/extensions.dart';
import 'package:horoflutter/ui_loc/interest_page_controller.dart';
import 'package:horoflutter/uis/background.dart';

class InterestPage extends StatelessWidget {
  const InterestPage({super.key});

  @override
  Widget build(_) => Background(
        child: Scaffold(
          backgroundColor: Colors.transparent,
          appBar: PreferredSize(
            preferredSize: Size.fromHeight(AppBar().preferredSize.height),
            child: Row(
              children: [
                Padding(
                  padding: const EdgeInsets.only(left: 16.0),
                  child: InkWell(
                    onTap: Get.back,
                    child: SizedBox(
                      height: AppBar().preferredSize.height,
                      child: const Row(
                        crossAxisAlignment: CrossAxisAlignment.center,
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.arrow_back_ios,
                            color: Colors.white,
                            size: 17,
                          ),
                          Gap(2),
                          Text(
                            "Back",
                            style: TextStyle(
                              fontSize: 17,
                              color: Colors.white,
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
                const Spacer(),
                TextButton(
                  onPressed: () => Get.find<InterestPageController>().save(),
                  child: const Text(
                    "Save",
                    style: TextStyle(
                      fontSize: 17,
                      color: Colors.lightBlue,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
          ),
          body: GetX<InterestPageController>(
            init: InterestPageController(),
            builder: (ipc) => Padding(
              padding: const EdgeInsets.all(26.0),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Tell everyone about yourself',
                    style: TextStyle(
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                      color: Colors.yellow,
                    ),
                  ),
                  const Gap(10),
                  const Text(
                    'What interest you?',
                    style: TextStyle(
                      fontSize: 26,
                      fontWeight: FontWeight.bold,
                      color: Colors.white,
                    ),
                  ),
                  const Gap(30),
                  Container(
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: Colors.white.withOpacity(0.1),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(4.0),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Wrap(
                            alignment: WrapAlignment.start,
                            crossAxisAlignment: WrapCrossAlignment.start,
                            children: ipc.interests
                                .map(
                                  (e) => Container(
                                    margin: const EdgeInsets.all(3),
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.circular(5),
                                      color: Colors.white.withOpacity(0.1),
                                    ),
                                    child: Padding(
                                      padding: const EdgeInsets.symmetric(
                                        horizontal: 8.0,
                                        vertical: 8,
                                      ),
                                      child: Row(
                                        mainAxisSize: MainAxisSize.min,
                                        children: [
                                          Text(
                                            e,
                                            style: const TextStyle(
                                              color: Colors.white,
                                            ),
                                          ),
                                          const Gap(5),
                                          InkWell(
                                            onTap: () => ipc.remove(e),
                                            child: const Icon(
                                              Icons.close,
                                              size: 15,
                                              color: Colors.white,
                                            ),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                )
                                .toList(),
                          ),
                          Container(
                            margin: const EdgeInsets.all(8),
                            child: Row(
                              children: [
                                Expanded(
                                  child: TextField(
                                    onEditingComplete: () => ipc.addNew(),
                                    controller: ipc.tec,
                                    cursorColor: Colors.white,
                                    style: const TextStyle(
                                      color: Colors.white,
                                    ),
                                    decoration:
                                        const InputDecoration().horoTransparent(
                                      isBordered: true,
                                      isDense: true,
                                      borderRadius: 25,
                                    ),
                                  ),
                                ),
                                const Gap(15),
                                InkWell(
                                  onTap: ipc.addNew,
                                  child: CircleAvatar(
                                    backgroundColor:
                                        Colors.white.withOpacity(0.1),
                                    child: const Icon(
                                      Icons.add,
                                      color: Colors.lightBlue,
                                    ),
                                  ),
                                )
                              ],
                            ),
                          )
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      );
}
