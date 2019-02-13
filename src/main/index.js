import { app, BrowserWindow } from 'electron'
import store from '../renderer/store'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index2.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 563,
    useContentSize: true,
    width: 1000
  })

  /*
  console.log("准备写数据库");
  const Corps = require("../renderer/SysDb");
let form = {
  FullName:'test',
  LimitName:'test',
  Phone:'',
  Contact
};
          Corps.saveCorp(form,(err)=>{
            if(err){
                console.log(err);
            }else{
              console.log("保存成功");              
            }
          });
          */

  console.log("openUrl.." + winURL);
  mainWindow.loadURL(winURL)

  // let corps = corpApi.getAllCorps();
  // console.log(corps);
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})
