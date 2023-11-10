console.log("##################Preload script is being loaded");
const { contextBridge, ipcRenderer } = require("electron");

// contextBridge.exposeInMainWorld("api", {
//   send: (channel, data) => ipcRenderer.send(channel, data),
//   receive: (channel, func) => {
//     ipcRenderer.on(channel, (event, ...args) => func(...args));
//   },
//   // ...other methods you want to expose
// });

contextBridge.exposeInMainWorld("api", {
  send: (channel, data) => ipcRenderer.invoke(channel, data),
});
