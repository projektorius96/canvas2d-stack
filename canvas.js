import { HUD, Input } from '@declarative-hud/index.js'
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
const GUI = new HUD({container: document.body, relativeWidth: 20, position: 'right'})
const slider = GUI.addSection('slider'/*, false@default */);
/* === slider */
const rangeParams = {
  min: 1,
  max:  360,
  step: 1,
  value: 1,
}
const rangeController = GUI.addController(
    {
        label: '0to360', 
        view: new Input(
            {
                type: 'range', 
                attrs: {...rangeParams}
            }
        ), 
        section: slider.getRef
    }
);
// /* DEV_NOTE:
// * save/restore works incrementally, restores up to last save call
// */

// // First path
ctx.setTransform(1,0,0,1, shape.x, shape.y);
ctx.fillStyle = 'green'
ctx.fillRect(shape.x, shape.y, shape.width, shape.height);

GUI.find(rangeController.getRef).on('input', function(){

  ctx.resetTransform() /* DEV_NOTE # this was a culprit I could not get invoked in Konva.js */
  ctx.clearRect(shape.x, shape.y, canvas.width, canvas.height)
  ctx.setTransform(...matrixRotate( DegToRad( parseInt( this.value ) ) ), shape.x, shape.y)
  ctx.fillRect(shape.x, shape.y, shape.width, shape.height);

});