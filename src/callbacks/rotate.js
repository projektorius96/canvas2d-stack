export function matrixRotate(rad){
    
    // @https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations#transforms
    var c = Math.cos(rad);
    var s = Math.sin(rad);
    
    // Transformation matrix variant
    var m11 = c;
    var m12 = s;
    var m21 = -s;
    var m22 = c;

    return [
        m11,
        m12,
        m21,
        m22
    ]
    
}