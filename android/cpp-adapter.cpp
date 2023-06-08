#include <jni.h>
#include "react-native-transmission.h"

extern "C"
JNIEXPORT jint JNICALL
Java_com_transmission_TransmissionModule_nativeMultiply(JNIEnv *env, jclass type, jdouble a, jdouble b) {
    return transmission::multiply(a, b);
}
