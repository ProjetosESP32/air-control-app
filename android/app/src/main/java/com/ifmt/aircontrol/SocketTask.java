package com.ifmt.aircontrol;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.net.Socket;
import java.nio.charset.Charset;

public class SocketTask implements Runnable {
    private String address;
    private int port;
    private String messageToSend;
    private Charset charset;
    private OnTaskResolve resolve;
    private OnTaskReject reject;

    @FunctionalInterface
    public interface OnTaskResolve {
        void apply(String data);
    }

    @FunctionalInterface
    public interface OnTaskReject {
        void apply(Exception e);
    }

    public SocketTask(String address, int port, String messageToSend, Charset charset, OnTaskResolve resolve, OnTaskReject reject) {
        this.address = address;
        this.port = port;
        this.messageToSend = messageToSend;
        this.charset = charset;
        this.resolve = resolve;
        this.reject = reject;
    }

    @Override
    public void run() {
        try {
            Socket socket = new Socket(address, port);
            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(socket.getOutputStream());
            BufferedInputStream bufferedInputStream = new BufferedInputStream(socket.getInputStream());

            byte[] messageData = messageToSend.getBytes(charset);
            bufferedOutputStream.write(messageData);
            bufferedOutputStream.flush();

            byte[] buffer = new byte[512];

            bufferedInputStream.read(buffer);

            if (!socket.isClosed()) {
                socket.close();
            }

            resolve.apply(new String(buffer, charset));
        } catch (Exception ex) {
            reject.apply(ex);
        }
    }
}
