    export  function curvedText(text,centerX,startAngle, centerY,radius,ctx){
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Move to the center of the canvas
    ctx.translate(centerX, centerY);

    // Rotate the canvas to the starting angle
    ctx.rotate(startAngle);

    // Move to the position where the text will be drawn
    ctx.translate(0, -radius);

    // Rotate the ctx by 90 degrees counter-clockwise (to place the text along the curve)
    ctx.rotate(-Math.PI / 2);

    // Draw the text along the arc
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, 0, 0);

    // Restore the original state
    ctx.resetTransform();
    }
