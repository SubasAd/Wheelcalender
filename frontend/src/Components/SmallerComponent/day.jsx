// src/CircularComponent.js
import React, { useRef, useEffect } from 'react';

const Day = ({ a, b, s, e, x, y, text }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const drawDay = (a, b, s, e, x, y, text) => {
      ctx.beginPath();

      // Convert degrees to radians
      let startAngle = (a * Math.PI) / 180;
      let endAngle = (b * Math.PI) / 180;

      // Draw outer arc
      ctx.arc(x, y, e, startAngle, endAngle);

      // Draw line from end of outer arc to end of inner arc
      ctx.lineTo(x + s * Math.cos(endAngle), y + s * Math.sin(endAngle));

      // Draw inner arc (in reverse direction)
      ctx.arc(x, y, s, endAngle, startAngle, true);

      // Draw line from start of inner arc to start of outer arc
      ctx.lineTo(x + e * Math.cos(startAngle), y + e * Math.sin(startAngle));

      ctx.closePath();
      
      ctx.fillStyle = "#FFFFFF";   // Semi-transparent green fill
      ctx.fill();

      // Calculate the middle radius and angle for text placement
      let middleRadius = (s + e) / 2;
      let middleAngle = (startAngle + endAngle) / 2;

      // Calculate the arc length of the text
      let arcLength = middleRadius * (endAngle - startAngle);
      let textLength = text.length * 25;  // Approximate length based on font size
      let anglePerChar = (endAngle - startAngle) / text.length;

      // Draw each character along the arc
      ctx.fillStyle = "red";  // Text color
      ctx.font = "bold 12px Arial";  // Font size and style
      ctx.textAlign = "center";  // Center align
      ctx.textBaseline = "middle";  // Middle align

      for (let i = 0; i < text.length; i++) {
        let char = text[i];
        let charAngle = startAngle + (i + 0.5) * anglePerChar;  // Position each character

        // Save the context before rotating
        ctx.save();

        // Move to the character's position and rotate the canvas
        ctx.translate(x + middleRadius * Math.cos(charAngle), y + middleRadius * Math.sin(charAngle));
        ctx.rotate(charAngle + Math.PI / 2);  // Rotate by character angle + 90 degrees

        // Draw the character
        ctx.fillText(char, 0, 0);

        // Restore the context to the original state
        ctx.restore();
      }
    };

    drawDay(a, b, s, e, x, y, text);
  }, [a, b, s, e, x, y, text]);

  return (
    <canvas ref={canvasRef} width={500} height={500} />
  );
};

export default Day;
