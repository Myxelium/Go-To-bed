const { app, dialog } = require('electron')
const system = require('electron-shutdown-command');
const express = require('express')
const cors = require('cors');
const AutoLaunch = require('auto-launch');
const server = express();
const ip = require('ip');
const firstRun = require('electron-first-run');

const autoLaunch = new AutoLaunch({
  name: 'GoToBed Server',
  path: process.env.PORTABLE_EXECUTABLE_DIR + '/GoToBed.exe',

});
const paramPort = app.commandLine.getSwitchValue("port") == "" ? "3000" : app.commandLine.getSwitchValue("port");
const isFirstRun = firstRun();
const options = {
  type: 'question',
  buttons: ['ok'],
  title: 'GoToBed Server: First time setup',
  message: 'You can now connect to your server on this address: http://' + ip.address() +':'+ paramPort + '',
  detail: 'Open GoToBed app and in settings make sure it looks like this: \n\nProtocol: http\nAddress: ' + 
          ip.address() + '\nPort: '+paramPort+'\n\nYou can also change the port by adding the parameter: --port=1337 when launching the server.',
};

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cors({
  exposedHeaders: ['Access-Control-Allow-Origin', '*'],
}))
server.post('/commandbridge', function (req, res) {
  switch (req.body.command) {
    case 'shutdown':
        console.log('shutting down')
        system.shutdown()
        break;

    case 'reboot':
        console.log('rebooting')
        system.reboot();
        break;

    case 'logout':
        console.log('logging out')
        system.logout();
        break;

    case 'shutdown-options':
        system.shutdown({
            force: req.body.options.force ?? false,
            timerseconds: req.body.options.timerseconds ?? 0,
            sudo: true,
            debug: true,
            quitapp: req.body.options.quitapp ?? false
        })
        break;

    case 'cancel-shutdown':
        console.log('cancelling shutdown')
        system.abort()
        break;
        
    case 'sleep':
        console.log('going to sleep')
        system.hibernate()
        break;

    case 'set-autostart':
      autoLaunch.isEnabled().then((isEnabled) => {
        if (!isEnabled) {
          autoLaunch.enable()
          res.send('Autostart enabled');
        } else {
          res.status(400).send('Autostart already enabled');
        }});
      break;

    case 'unset-autostart':
      autoLaunch.isEnabled().then((isEnabled) => {
        if (isEnabled) {
          autoLaunch.disable()
          res.send('Autostart disabled');
        } else {
          res.status(400).send('Autostart already disabled');
        }});
      break;

    case 'closeServer':
      res.send('Shutting down server');
      app.exit();
      break;

    case 'resetFirstRun':
      res.send('First run has been reset');
      firstRun.clear();
      break;

    default:
      console.log('unknown command')
      break;
}})

app.on('ready', async () => {
  if(isFirstRun) {
    const firstSetup = dialog.showMessageBox(null, options);
    console.log(firstSetup);
  }
  if(paramPort != null) {
    server.listen(paramPort, err => {
      if (err) {
        return console.error(err);
      }
    })
  }
});