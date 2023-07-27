package com.transmission;

import androidx.annotation.NonNull;
import android.system.Os;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import java.io.FileOutputStream;

@ReactModule(name = TransmissionModule.NAME)
public class TransmissionModule extends ReactContextBaseJavaModule {
  public static final String NAME = "Transmission";

  public TransmissionModule(ReactApplicationContext reactContext) {
    super(reactContext);
    // TODO: Can we copy this file only when it has been updated ?
    FileCopyUtils.copyFileFromAssets(reactContext, "cacert.pem");
    // Set CURL_CA_BUNDLE: env var
    try {
      Os.setenv("CURL_CA_BUNDLE", reactContext.getFilesDir() + "/cacert.pem", true);
    } catch(Exception e) {
      e.printStackTrace();
    }
  }

  @Override
  @NonNull
  public String getName() {
    return NAME;
  }

  static {
    System.loadLibrary("cpp");
  }

  private static native void nativeInit(String configDir, String appName);
  private static native String nativeRequest(String json);
  private static native void nativeClose();
  private static native void nativeSaveSettings();

  @ReactMethod
  public void init(String configDir, String appName) {
    nativeInit(configDir, appName);
  }
  
  @ReactMethod
  public void request(String json, Callback callback) {
    Thread t = new Thread() {
      public void run() {
        try {
          String response = nativeRequest(json);
          callback.invoke(null, response);
        } catch(Exception e) {
          callback.invoke(e.toString());
        }
      }
    };

    t.start();
  }

  @ReactMethod
  public void close() {
    nativeClose();
  }

  @ReactMethod
  public void saveSettings() {
    nativeSaveSettings();
  }
}
