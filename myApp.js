
const electron = require('electron');
const { globalShortcut } = electron;
const { menubar } = require('menubar');

const mb = menubar({
  browserWindow: {
    webPreferences: {
      nodeIntegration: true
    },
    transparent: true,
    width: 800,
    height: 800,
  },
  icon: 'icon.png',
});

let isShown = false;

mb.on('ready', () => {
  const ret = globalShortcut.register('CommandOrControl+shift+X', (short) => {
    isShown ? mb.hideWindow() : mb.showWindow()
  })

  if (!ret) {
    console.log('registration failed')
  }

  // Check whether a shortcut is registered.
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
  console.log('app is ready');

  // your app code here
});

mb
  .on('will-quit', () => {
    // Unregister a shortcut.
    globalShortcut.unregister('CommandOrControl+X')
    globalShortcut.unregister('Esc')
  })
  .on('after-show', () => {
    const escTrigger = globalShortcut.register('Esc', (short) => {
      mb.hideWindow()
    })

    isShown = true
  })
  .on('after-hide', () => {
    globalShortcut.unregister('Esc')
    isShown = false
    electron.Menu.sendActionToFirstResponder('hide:')
  })
  .on('focus-lost', () => {
    globalShortcut.unregister('Esc')
    isShown = false
    electron.Menu.sendActionToFirstResponder('hide:')
  })
  .on('after-create-window', () => {
    // mb.window.openDevTools()
  })
