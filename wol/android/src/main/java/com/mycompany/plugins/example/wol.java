package com.mycompany.plugins.example;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.SocketException;

// create a wake on lan plugin for ionic capactor (android)
@CapacitorPlugin(name = "wol")
public class WolPlugin extends Plugin {

    // create a method to send the magic packet

    @PluginMethod
    public void sendMagicPacket(String macAddress, String ipAddress) throws IOException {
        // create a new thread to send the magic packet
        /*new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    // create a new datagram socket
                    DatagramSocket socket = new DatagramSocket();
                    // set the broadcast address
                    socket.setBroadcast(true);
                    // create a new byte array
                    byte[] macBytes = getMacBytes(macAddress);

                    private byte[] getIpBytes byte[] ipBytes = getIpBytes(ipAdress);
                    // create a new byte array
                    byte[] bytes = new byte[6 + 16 * macBytes.length];
                    // loop through the byte array
                    for (int i = 0; i < 6; i++) {
                        // set the byte array to ff
                        bytes[i] = (byte) 0xff;
                    }
                    // loop through the byte array
                    for (int i = 6; i < bytes.length; i += macBytes.length) {
                        // copy the mac bytes to the byte array
                        System.arraycopy(macBytes, 0, bytes, i, macBytes.length);
                    }
                    // create a new datagram packet
                    DatagramPacket packet = new DatagramPacket(bytes, bytes.length, InetAddress.getByAddress(ipBytes), 9);
*/
        // create a byte array to hold the mac address
        byte[] macBytes = getMacBytes(macAddress);
        // create a byte array to hold the ip address
        byte[] ipBytes = getIpBytes(ipAddress);
        // create a byte array to hold the magic packet
        byte[] packet = new byte[102];
        // fill the packet with 0xFF
        for (int i = 0; i < 6; i++) {
            packet[i] = (byte) 0xff;
        }
        // fill the packet with the mac address
        for (int i = 6; i < 102; i += 6) {
            System.arraycopy(macBytes, 0, packet, i, macBytes.length);
        }
        // create a datagram packet
        DatagramPacket datagramPacket = new DatagramPacket(packet, packet.length, InetAddress.getByAddress(ipBytes), 9);
        // create a datagram socket
        DatagramSocket datagramSocket = new DatagramSocket();
        // send the packet
        datagramSocket.send(datagramPacket);
        // close the socket
        datagramSocket.close();
    }

    private byte[] getMacBytes (String macAddress){
        // create a byte array to hold the mac address
        byte[] bytes = new byte[6];
        // split the mac address into 6 parts
        String[] hex = macAddress.split("(\\:|\\-)");
        // convert each part into a byte
        for (int i = 0; i < 6; i++) {
            bytes[i] = (byte) Integer.parseInt(hex[i], 16);
        }
        // return the byte array
        return bytes;
    }

    private byte[] getIpBytes (String ipAddress){
        // create a byte array to hold the ip address
        byte[] bytes = new byte[4];
        // split the ip address into 4 parts
        String[] hex = ipAddress.split("\\.");
        // convert each part into a byte
        for (int i = 0; i < 4; i++) {
            bytes[i] = (byte) Integer.parseInt(hex[i]);
        }
        // return the byte array
        return bytes;
    }

}
