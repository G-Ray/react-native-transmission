#include <jni.h>

#include "react-native-transmission.h"

extern "C"
JNIEXPORT void JNICALL
Java_com_transmission_TransmissionModule_nativeInit(JNIEnv *env, jclass type, jstring configDir, jstring appName) {
    jboolean isCopy;
    const char *configDirConv = (env)->GetStringUTFChars(configDir, &isCopy);
    const char *appNameConv = (env)->GetStringUTFChars(appName, &isCopy);

    // setenv("CURL_CA_BUNDLE", "/data/data/com.transmissionexample/cacert-2023-05-30.pem", true);

    transmission::init(configDirConv, appNameConv);
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_transmission_TransmissionModule_nativeRequest(JNIEnv *env, jclass type, jstring json) {
    jboolean isCopy;
    const char *jsonConv = (env)->GetStringUTFChars(json, &isCopy);

    std::string response = transmission::request(jsonConv);
    // std::string response = std::string("my string");
    return (env)->NewStringUTF(response.c_str());
}

extern "C"
JNIEXPORT void JNICALL
Java_com_transmission_TransmissionModule_nativeClose(JNIEnv *env, jclass type) {
    transmission::close();
}

extern "C"
JNIEXPORT void JNICALL
Java_com_transmission_TransmissionModule_nativeSaveSettings(JNIEnv *env, jclass type) {
    transmission::saveSettings();
}
