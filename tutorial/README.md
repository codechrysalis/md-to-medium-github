## Build Your First Desktop App with Electron

One of the most compelling reasons that so many developers learn JavaScript is because it's the "language of the web." As a result of the immense developer presence that powers the web as we know it, JavaScript, CSS, and HTML have become the most popular languages among developers; the [StackOverflow 2018 Survey](https://insights.stackoverflow.com/survey/2018#technology) found that 70% of developers work with JavaScript as their primary language, and the number is even higher for those who develop professionally.
![StackOverflow survey results](https://github.com/NateNeumann/electron-tutorial/blob/master/tutorial/img/js-dominance.png?raw=true)

But what if someone well-versed in JavaScript wanted to develop for applications that aren't web-based? Many other languages are suited for development of locally-run desktop applications, but modern JavaScript development practices are heavily weighted towards web development.

That's where [Electron](https://electronjs.org/) comes in. Developed by GitHub, Electron is an alternative platform for "web" app development, made for building desktop applications in the same way web apps are built -- with an HTML backbone, supported by CSS styling and JavaScript functionality.

Electron apps offer the same endless capabilities as web apps -- from simple brochure pages, to fully-functional, dynamic applications like the Figma, VS Code, and Discord desktop clients.

### Pros of Electron

- Converting existing web applications into Electron apps is a snap.
- Electron utilizes the same languages and a similar setup to the bulk of web development, making it easy to learn and use for most developers.
- There is [plenty of documentation](https://electronjs.org/docs) for Electron, and because of it's relative popularity, there's a wealth of [community support and tools](https://electronjs.org/community) as well.
- Very scalable -- Electron can handle apps of all levels of front- and back-end complexity, and you can develop freely using JavaScript frameworks like React and Vue.

### Cons of Electron:

- Space: Electron apps run with [Chromium](https://www.chromium.org/Home), and they need to have the Chromium OS to run, so they take up a decent amount of space --there’s a flat ~100MB overhead, even for simple apps. For smaller, lightweight apps, another language or runtime environment might be a better choice.
- Source code: Because of the way Electron apps are packaged, there are ways for the user to access and manipulate the source code using [asar](https://github.com/electron/asar). While this can enable users to make their own custom extensions and additions to applications, it can potentially pose a security threat for your app if you're not careful.

### Getting Started

Without further ado, let's get started developing with Electron! For the impatient, there is also an Electron Quick Start repo [here](https://github.com/electron/electron-quick-start), which sets up this foundation so you can clone and jump right into your app -- but it's worth knowing how Electron apps are built.

Start by making a new directory for your project, and then installing Electron as a development dependency for it. In your favorite command line interface, (if you don’t know what command line interfaces are, check out [this](https://www.codecademy.com/articles/command-line-interface); I’d recommend Terminal for Mac or Git Bash for Windows), you should be able to do this with "npm install --save-dev electron".

##### _Note: to develop with Electron, you’ll need Node.js and npm. If you don’t have them installed, please do so with Homebrew or [directly from Node](https://nodejs.org/en/); note that npm comes packaged with Node._

The basic structure of an Electron app is built around 3 files that will look familiar to web developers: index.html, package.json, and a base JavaScript script (the default is index.js).

Just like a web app, the HTML is the base structure of the app, the package file provides meta-information about your app such as the name and description, and your JavaScript is the script(s) that run on the page.

Let's start with package.json. You can run "npm init" to prompt you through creating your package file with the command line, or you can simply write it out in your preferred code editor. The important parts for now are the name, version, and description of your app, as well as the start script -- set the first three as you choose (I'll be making a simple app to convert text between English and Morse Code). If you’re using the command line, set your “main” or “entry point” to “index.js.” Then make sure to set your "start" or “test” script to "_electron ._" (mind the space).
You should have something that looks like this:

```json
{
  "name": "morse-transcriber",
  "version": "1.0.0",
  "description": "Translates between English alphabet and Morse Code.",
  "main": "index.js",
  "scripts": {
    "start": "electron ."
  }
}
```

This means you can now run your project with Electron from the command line with "npm start" -- but first, we need some HTML.

A simple file will do -- mine looked like this.

```html
<!DOCTYPE HTML>
<html>
   <head>
       <title>Morse Code Transcriber</title>
   </head>
   <body>
       <h1> Hello World! </h1>
   </body>
</html>
```

Great! Now, the last step is the JavaScript. Electron needs some base JS in order to manage windows, close correctly, and so on-- so we'll pop that in our index.js file.

```javascript
const { app, BrowserWindow } = require("electron");

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
  win.loadFile("index.html");

  // OPTIONAL: Open the window with DevTools open.
  win.webContents.openDevTools();

  // Dereference window when closed.
  win.on("closed", () => {
    win = null;
  });
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
```

Try running with `npm start` and you should see your app!

![StackOverflow survey results](https://github.com/NateNeumann/electron-tutorial/blob/master/tutorial/img/hello-world.png?raw=true)

The code for your app can be added directly into your index.js file, or to keep your project more organized, written in other files and imported by using _require_ at the top of the index.js. Note that it is difficult to directly alter the UI from background processes like our index.js file; if you want to modify the UI, it is easier to import your JS as a `<script>` in your html.

Once you're happy with it, your app can be packaged easily using [electron-packager](https://github.com/electron-userland/electron-packager). Install electron-packager with `npm install electron-packager -g`, and then you can package your Electron app for sharing by simply calling `electron-packager .` on the command line.

And that's all there is to it! Electron is a great framework for developers with web experience who want to develop native desktop applications. Not only that, but the process of converting a web app into a desktop app with electron is a cinch too. It's certainly best to rebuild it using your existing source files -- but if you want the functionality quick, try replacing `win.loadFile("src/index.html");` from your index.js file with `win.loadURL("https://sample-website.com")`, and you'll have a desktop-bootable build instantly.
Cheers!

If you enjoyed this tutorial, check us out!
[Code Chrysalis](https://www.codechrysalis.io) is a coding and English school located in the heart of Tokyo. Our programs include a [12-week advanced software engineering bootcamp](https://www.codechrysalis.io/immersive), a [beginner coding course](https://www.codechrysalis.io/foundations), and an [English communication immersive](https://www.codechrysalis.io/english). See why we are an industry leader in technical education in Japan.
Follow us on [Instagram](https://www.instagram.com/codechrysalis) | [Facebook](https://www.facebook.com/codechrysalis) |[Twitter](https://www.twitter.com/codechrysalis) | [YouTube](https://www.youtube.com/channel/UCb5gBm7mw_j0y6da0bdDxFA)
