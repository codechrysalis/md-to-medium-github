const { app, BrowserWindow } = require("electron");

// This is just for handling the Electron window.
// Primary app functionality should be done in post-script.js.

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile("src/index.html");

  // OPTIONAL: Open the window with DevTools open.
  // win.webContents.openDevTools();

  // Dereference window when closed.
  win.on("closed", () => {
    win = null;
  });

  // win.webContents.executeJavaScript(
  //   console.log("This is a way of accessing the window from index.js.")
  // );
}

// Creates a new window once Electron is ready.
app.on("ready", createWindow);

// MacOS: Quits when all windows closed
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// MacOS: Creates new window upon clicking the dock icon w/ no windows open.
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});
