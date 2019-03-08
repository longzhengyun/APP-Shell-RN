package com.appshell;

import android.Manifest;
import android.content.Context;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class AppInfoModule extends ReactContextBaseJavaModule {

    private ReactContext mContext;

    public AppInfoModule(ReactApplicationContext reactContext) {
        super(reactContext);
        mContext = reactContext;
    }

    @Override
    public String getName() {
        return "AppInfoModule";
    }

    @ReactMethod
    public void getAppChannel(Promise promise){
        try {
            InputStream input = mContext.getAssets().open("channel.txt");
            InputStreamReader reader = new InputStreamReader(input);
            BufferedReader bufReader = new BufferedReader(reader);
            String channel = bufReader.readLine();
            input.close();

            if (TextUtils.equals("", channel)){
                promise.reject("0", "渠道文件内容为空");
            }else{
                promise.resolve(channel);
            }
        } catch (IOException e) {
            promise.reject("0", "没有渠道文件");
            e.printStackTrace();
        }
    }
}
