// const a = require('./components/aa')
// const path = require('path')

// console.log('index    mocked    __dirname..........', __dirname)
// console.log('index      path.resole.............', path.resolve())

// console.log(a)

const { app } = require('XRWeb');
// const image = require('./components/image')
// const model = require('./components/model')

let w = app.getWindowById('w1');
// w.appendChild(image)
// w.appendChild(model)

// 设置 Location Changed Callback
w.on('destroy', () => {
    console.log("w ondestroy");
    app.stop();
})

let greenWorld = w.root.getElementById('green world');
let yellowWorld = w.root.getElementById('yellow world');
let portal = w.root.getElementById('portal');
portal.showEdge();

//green world 无法透过传送门看到
portal.attachObject(greenWorld, false, true);

//yellow world 只能透过传送门看到
portal.attachObject(yellowWorld, true, true);

let root = w.root.getElementById('root');
var g_euler = { x: 0, y: 0, z: 0 };
w.on('postUpdate', () => {
    g_euler.y += 0.5;
    root.euler = g_euler;
});