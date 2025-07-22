import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { URL } from 'node:url'

const ALLOWED_HOSTS = new Set(['github.com'])

function isSafeUrl(raw: string) {
  try {
    const u = new URL(raw)
    return u.protocol === 'https:' && ALLOWED_HOSTS.has(u.host)
  } catch {
    return false
  }
}

ipcMain.handle('open-external', async (_e, url: string) => {
  if (!isSafeUrl(url)) throw new Error('Blocked external url')
  await shell.openExternal(url)
})

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true
    }
  })

  // Intercept window.open / target=_blank etc.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (isSafeUrl(url)) {
      shell.openExternal(url)
    }
    return { action: 'deny' } // Always prevent new windows in Electron
  })

  // Intercept in-page navigation (e.g., <a href> without target=_blank)
  mainWindow.webContents.on('will-navigate', (e, url) => {
    if (!isSafeUrl(url)) return // Allow normal internal routing
    e.preventDefault()
    shell.openExternal(url)
  })


  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron.template')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}) 