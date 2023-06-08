package com.transmission;

import android.content.Context;
import android.content.res.AssetManager;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class FileCopyUtils {

  public static void copyFileFromAssets(Context context, String fileName) {
    AssetManager assetManager = context.getAssets();
    InputStream inputStream = null;
    OutputStream outputStream = null;

    try {
      inputStream = assetManager.open(fileName);
      File outFile = new File(context.getFilesDir(), fileName);
      outputStream = new FileOutputStream(outFile);
      copyFile(inputStream, outputStream);
    } catch (IOException e) {
      e.printStackTrace();
    } finally {
      try {
        if (inputStream != null)
          inputStream.close();
        if (outputStream != null)
          outputStream.close();
      } catch (IOException e) {
        e.printStackTrace();
      }
    }
  }

  private static void copyFile(InputStream inputStream, OutputStream outputStream) throws IOException {
    byte[] buffer = new byte[1024];
    int length;

    while ((length = inputStream.read(buffer)) > 0) {
      outputStream.write(buffer, 0, length);
    }
  }
}
