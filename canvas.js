document.getElementById('app').appendChild(
  document.createElement('canvas')
)
const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = innerWidth;
  canvas.height = innerHeight;
// const ctx = canvas.getContext("2d");
// const shape = {
//   width: 200,
//     x: 0,
//   height: 200,
//     y: 0,
// }
// /* DEV_NOTE:
// * save/restore works incrementally, restores up to last save call
// */

// // First path
// ctx.setTransform(1,0,0,1, shape.x, shape.y);
// ctx.fillStyle = 'green'
//   ctx.save()
// ctx.fillRect(shape.x, shape.y, shape.width, shape.height);
// // in Konva.js we would use ctx.clear()
// // ctx.clearRect(shape.x, shape.y, canvas.width, canvas.height)
// ctx.setTransform(1,0,0,1, shape.x, shape.y);
// ctx.fillStyle = 'red';
// ctx.fillRect(shape.x+100, shape.y+100, shape.width, shape.height);
// // ctx.clearRect(shape.x, shape.y, canvas.width, canvas.height)
// ctx.setTransform(1,0,0,1, shape.x, shape.y);
// ctx.fillStyle = 'purple';// let's use .restore() to reuse color from last save()
//   /* ctx.restore() */
// ctx.fillRect(shape.x+200, shape.y+200, shape.width, shape.height);

// IGNORE ABOVE AS USING SINGLE STACK IS A BIG NO NO NO!, INSTEAD FOLLOW ALONG:..

/* ALTERNATIVE APPROACH - MULTIPLE STACKS
Question: How to create multiple stacks (multiple contexts) per single canvas element ?
Credits to: ChatGPTv3.5
*/

// Create a first context for a new stack
var ctx1 = canvas.getContext("2d");

// Create a second context for a new stack
var ctx2 = canvas.getContext("2d");

// Create a third context for another stack
var ctx3 = canvas.getContext("2d");

const fillObjectList = {
  _ctx1: [50, 50, 100, 100],
  _ctx2: [175, 50, 100, 100],
  _ctx3: [300, 50, 100, 100]
}

// // Draw on the first context (ctx1)
ctx1.fillStyle = "red";
ctx1.fillRect(...fillObjectList._ctx1);

// // Draw on the second context (ctx2)
ctx2.fillStyle = "green";
ctx2.fillRect(...fillObjectList._ctx2);

// // Draw on the third context (ctx3)
ctx3.fillStyle = "blue";
ctx3.fillRect(...fillObjectList._ctx3);

// Selectively clear each independent stack;
// ctx1.clearRect(...fillObjectList._ctx1);
ctx2.clearRect(...fillObjectList._ctx2);/* remove independent shape without touching remaining stacks */
// ctx3.clearRect(...fillObjectList._ctx3);

// // To clear the entire canvas for ctx3:
// ctx3.clearRect(0, 0, canvas.width, canvas.height);