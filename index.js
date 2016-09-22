/**
 * Created by honhe on 9/20/16.
 */

// 全部引入，模块化引入需要其它编译包支持,参考 Plotly.js 官方文档
var Plotly = require('plotly.js');
var Stats = require('./lib/stats.min');

// example 1
TESTER = document.getElementById('tester');
// Generating random data..
a = [];
b = [];
c = [];
for (i = 0; i < 50; i++) {
    var a_ = Math.random();
    a.push(a_);

    var b_ = Math.random();
    b.push(b_);

    var c_ = Math.random();
    c.push(c_);
}
// Plotting the mesh
var data = [
    {
        opacity: 0.8,
        color: 'rgb(300,100,200)',
        type: 'mesh3d',
        x: a,
        y: b,
        z: c,
    }
];
// Plotly.newPlot('tester', data);

// example 2
// multiplot

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);

z1 = [
    [8.83, 8.89, 8.81, 8.87, 8.9, 8.87],
    [8.89, 8.94, 8.85, 8.94, 8.96, 8.92],
    [8.84, 8.9, 8.82, 8.92, 8.93, 8.91],
    [8.79, 8.85, 8.79, 8.9, 8.94, 8.92],
    [8.79, 8.88, 8.81, 8.9, 8.95, 8.92],
    [8.8, 8.82, 8.78, 8.91, 8.94, 8.92],
    [8.75, 8.78, 8.77, 8.91, 8.95, 8.92],
    [8.8, 8.8, 8.77, 8.91, 8.95, 8.94],
    [8.74, 8.81, 8.76, 8.93, 8.98, 8.99],
    [8.89, 8.99, 8.92, 9.1, 9.13, 9.11],
    [8.97, 8.97, 8.91, 9.09, 9.11, 9.11],
    [9.04, 9.08, 9.05, 9.25, 9.28, 9.27],
    [9, 9.01, 9, 9.2, 9.23, 9.2],
    [8.99, 8.99, 8.98, 9.18, 9.2, 9.19],
    [8.93, 8.97, 8.97, 9.18, 9.2, 9.18]
];

z2 = [];
for (var i = 0; i < z1.length; i++) {
    z2_row = [];
    for (var j = 0; j < z1[i].length; j++) {
        // z2_row.push(z1[i][j]+1);
        z2_row.push(1);
    }
    z2.push(z2_row);
}

z3 = []
for (var i = 0; i < z1.length; i++) {
    z3_row = [];
    for (var j = 0; j < z1[i].length; j++) {
        z3_row.push(9);
    }
    z3.push(z3_row);
}
var data_z1 = {z: z1, type: 'surface'};
// var data_z2 = {z: z2, showscale: false, opacity:0.9, type: 'surface'};
// var data_z3 = {z: z3, showscale: false, opacity:0.9, type: 'surface'};
//
var data_z2 = {z: z2, showscale: false, opacity: 0.99, type: 'surface'};
var data_z3 = {z: z3, opacity: 1, type: 'surface'};

Plotly.plot('example', [data_z2, data_z3]);

// 动态渲染数据
// function freshPlot() {
//     console.log('freshPlot', i);
//     for (var i = 0; i < z1.length; i++) {
//         for (var j = 0; j < z1[i].length; j++) {
//             z3[i][j] = z1[i][j] + getRandomArbitrary(-1, 1);
//         }
//     }
//     Plotly.redraw('example');
//     setTimeout(freshPlot, 1000)
// }
// freshPlot();

// 动画并统计FPS
// 因用 requestAnimationFrame 统计 FPS，所以定时刷新的机制就不能用 setTimeout, 而是每次循环中判断。
var fresher = freshTimeout(2000);
function animate() {

    stats.begin();
    // monitored code goes here
    fresher();
    stats.end();

    requestAnimationFrame( animate );
}
requestAnimationFrame( animate );

function freshTimeout(intever) {
    var lastTime = new Date().getTime();
    var inteverTime = intever;
    return function() {
        var time = new Date().getTime();
        if(time - lastTime >= inteverTime) {
            // console.log('freshPlot', i);
            for (var i = 0; i < z1.length; i++) {
                for (var j = 0; j < z1[i].length; j++) {
                    z3[i][j] = z1[i][j] + getRandomArbitrary(-1, 1);
                }
            }
            Plotly.redraw('example');
            lastTime = time;
        }
    };
}

// 返回一个介于min和max之间的随机数
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}