# What is this?
I'm lazy and don't like to get up from bed to turn off my PC so i spent a while creating an application to turn off my pc for me.
	This application can turn off/on, logout, sleep and restart your pc remotely with a press on a button.


## Build
Download the repo and run:

Client:

    npm i
    ng serve --open
	// to build with Ionic and Android Studio
	ionic capacitor build android

Links: 
* [Android studio](https://developer.android.com/studio)
* [Grandle](https://gradle.org/install/)
* [JDK](https://developer.android.com/studio)
* [Setup Enviroment variables to point to JDK and JAVA_SDK](https://cordova.apache.org/docs/en/10.x/guide/platforms/android/#setting-environment-variables)

Ionic might set up those automatically, I migrated from Cordova so I did it manually...

Server:

    npm i
    electron-builder --win portable
    // npm start will work if you comment out the lines effected by: AutoLaunch

## What do I need to get this working?
You'll need to Install the Client APK file on your Android phone and download and run the "GoToBed" server on your pc so there is a connection between your phone and computer.

Client: [APK Download (Beta)](https://github.com/Myxelium/go-to-bed/raw/master/Binaries/GoToBed.apk)

Server: [EXE Download](https://github.com/Myxelium/go-to-bed/raw/master/Binaries/GoToBed.exe)

### ios devices
I haven't built the server or the application on either Mac or Ios devices, but there shouldn't be anything stopping you doing so. Both the server and client is built with Node (Server: Electron, Client: Ionic Capacitor/Cordova).

### Linux support
The server should be able to be built on Linux since it uses NodeJs and Electron. You will need to add some lines to package.json in order to get Electron-builder to work.


## Wakeup On Lan (WOL)

It's not yet inplemented, since i have to write a Java plugin specifically for that.
**This means the application does not support turning on the pc yet.**
In the meanwhile can I recommend: [Wake on lan](https://play.google.com/store/apps/details?id=co.uk.mrwebb.wakeonlan)

## Can I use this outside my own network?
You'll need to portforward your router so the App can connect to your Pc.
This might help you on the way:
* Common router addresses are: [192.168.1.1](http://192.168.1.1), [192.168.0.1](http://192.168.0.1) 
* Once reached the router login screen you'll need to login.
Common User and passwords are either blank or `Admin` / `Administrator`.
* Once logged in (This looks different for every router brand), but look for something called `WAN` or `PortForward`
* If you find it, click on it and you should be able to add a new entry. Start the server to find out port and your address and enter that, also use http/tcp as protocol.
* Now in your app, instead of using the local address of your pc that start with 192.168.XXX.YYY, use your [public address](https://whatismyipaddress.com/) (note: make sure are on your pc when entering the page to avoid the mistake of using your phones own network.) Enter your public IP in GoToBed App's Address field under Settings tab.

### Server API
If you check the server code you might see more functionality than the Client Application currently supports.
All the commands can be sent using a post request

So more functionality will be added later on inside the phone app.

    endpoint: http://localhost/commandbridge
    {
	    command: "yourcommand"
	}

List of commands

|Command| Description |
|--|--|
| shutdown | Turns off PC|
| reboot | Restarts PC |
| logout | Logouts User |
| shutdown-options | Shutdown with additional options, such as a timer |
| cancel-shutdown | Cancel shutdown, mainly implemented for command above |
| sleep | Puts the computer in hibernation mode |
| set-autostart | [Toggle] Start the server when windows starts|
| unset-autostart | [Toggle] Don't start server when windows starts |
| closeServer | Remote turn off GoToBed Server Application |
| resetFirstRun | Reset first run message. Window with setup information will show up on next startup. |

You can call those commands from any application that support it, so if you build something your own, you can integrate it with this.
