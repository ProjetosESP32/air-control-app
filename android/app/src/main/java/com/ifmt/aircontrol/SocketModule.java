package com.ifmt.aircontrol;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.nio.charset.Charset;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class SocketModule extends ReactContextBaseJavaModule implements LifecycleEventListener {
    private final ExecutorService executorService = Executors.newSingleThreadExecutor();

    public SocketModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "SocketModule";
    }

    @ReactMethod()
    public void sendAndReceive(@NonNull String host, @NonNull Double port, @NonNull String message,
            @NonNull String charsetName, @NonNull Promise promise) {
        SocketTask task = new SocketTask(host, port.intValue(), message, Charset.forName(charsetName), promise::resolve,
                e -> {
                    promise.reject(e.getCause());
                });

        executorService.execute(task);
    }

    @Override
    public void onHostResume() {
    }

    @Override
    public void onHostPause() {
    }

    @Override
    public void onHostDestroy() {
        executorService.shutdownNow();
    }
}
