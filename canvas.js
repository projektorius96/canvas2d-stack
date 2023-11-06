import { HUD, Input, Label } from "@declarative-hud/index.js";
import { matrixRotate } from './src/callbacks/rotate';
import { DegToRad } from './src/utils/constants';
document.getElementById('app').appendChild(
  document.createElement('canvas')
)
const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = innerWidth;
  canvas.height = innerHeight;
const ctx = canvas.getContext("2d");

const shape = {
  width: 200,
    x: 0,
  height: 200,
    y: 0,
}

/* === slider */
const rangeParams = {
  min: 0,
  max:  360,
  step: 1,
  value: 1,
}

const GUI = new HUD({container: document.body, minWidth: 15, position: 'right'})
    GUI.addGroup({name: 'group1', nodes: GUI.addSection('section', 2/* access each as section1|section2|sectionN : whereas N > 2 */)})

/* === group1 */
const rangeInput = new Input({name: 'range', attrs: {...rangeParams}})
GUI.find('section1').append(
    rangeInput
);

/* === group3 */
const cboxInput = new Input({name: 'cbox1', type: 'checkbox'/* , attrs: {cboxScaling: 1.5} */})
GUI.find('section2'/* tick1 */).append(
    new Label('clockwise?'),
    cboxInput
)

// // First path
ctx.setTransform(1,0,0,1, shape.x, shape.y);
ctx.fillStyle = 'green'
ctx.fillRect(shape.x, shape.y, shape.width, shape.height);

GUI.find(rangeInput.name).on('input', function(){

  ctx.resetTransform() /* DEV_NOTE # this was a culprit I could not get invoked in Konva.js */
  ctx.clearRect(shape.x, shape.y, canvas.width, canvas.height)
  if (GUI.find(cboxInput.name).checked){
    ctx.setTransform(...matrixRotate( DegToRad( parseInt( +1*this.value ) ) ), shape.x, shape.y)
  }
  else {
    ctx.setTransform(...matrixRotate( DegToRad( parseInt( -1*this.value ) ) ), shape.x, shape.y)
  }
  ctx.fillRect(shape.x, shape.y, shape.width, shape.height);

});