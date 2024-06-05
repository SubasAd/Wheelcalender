import React, { useRef, useEffect, useState } from 'react';
import Day from './day'

const renderMonth = (a, b, s, e, x, y, text,ctx)=>{


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
      ctx.font = "bold 20px Arial";  // Font size and style
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
  


  

const TrapezoidWithArcs = ({ canvasRef, }) => {

  useEffect(() => {
	if (canvasRef.current) {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
  
		const monthNames = [
			'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
		  ];
  
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		
		const separation = 40;
      	const initialRadius = centerX;	
		
		const numCircles = 8;
//			decrease separation geometrically.
			
		const radii = Array.from({ length: numCircles }, (_, index) => initialRadius - separation * index);
        
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		monthNames.map((month,index)=>{
			renderMonth(index*30, index*30+30,radii[1],radii[0], centerX,centerY,month,ctx)
		})
		
		const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#8B4513']; // Different colors
		const widths = [4, 1, 1, 1, 1, 1, 1, 1]; // Widths for each circle
  
		// Clear the canvas
	
  
		// Draw circles
		radii.forEach((radius, index) => {
		  ctx.beginPath();
		  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		  ctx.strokeStyle = colors[index];
		  ctx.lineWidth = widths[index];
		  ctx.stroke();
		});

		//innermost radii
		
		ctx.beginPath();
		ctx.arc(centerX, centerY, radii[7] - separation * 5, 0, 2 * Math.PI);
		ctx.strokeStyle = colors[0];
		ctx.lineWidth = widths[0];
		ctx.stroke();
		//innermost radii


		  // Draw lines from r2 to r8
		  const angleIncrement = 360 / 12; // 12 lines at equal space
		  const dayAngleIncrement = angleIncrement / 7; // 7 days in a week
   
		  for (let i = 0; i < 12; i++) {
			const angle = (i * angleIncrement) * (Math.PI / 180); // Convert to radians
	
			const startX = centerX + radii[0] * Math.cos(angle); // r2
			const startY = centerY + radii[0] * Math.sin(angle); // r2
			const endX = centerX + radii[7] * Math.cos(angle); // r8
			const endY = centerY + radii[7] * Math.sin(angle); // r8
	
			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 1;
			ctx.stroke();

			 // Draw week lines within the month
			 for (let j = 1; j < 7; j++) {
				const weekAngle = (i * angleIncrement + j * dayAngleIncrement) * (Math.PI / 180); // Convert to radians
				
				if (weekAngle % (2 * Math.PI / 12) === 0) continue; // Skip if it's the same as the month line
	  
				const weekStartX = centerX + radii[1] * Math.cos(weekAngle); // r2
				const weekStartY = centerY + radii[1] * Math.sin(weekAngle); // r2
				const weekEndX = centerX + radii[7] * Math.cos(weekAngle); // r8
				const weekEndY = centerY + radii[7] * Math.sin(weekAngle); // r8
	  
				ctx.beginPath();
				ctx.moveTo(weekStartX, weekStartY);
				ctx.lineTo(weekEndX, weekEndY);
				ctx.strokeStyle = 'gray';
				ctx.lineWidth = 1;
				ctx.stroke();
			  }
		  }


		  
	  }
	}, [canvasRef]);
  
	return null;
}





const ParentComponent = () => {
	
	const canvasRef = useRef(null);

	useEffect(() => {
	  if (canvasRef.current) {
		// Optionally perform operations on the canvas if needed
	  }
	}, [canvasRef]);

  return (
    <div>
      <h1>Canvas with Trapezoid and Arcs</h1>
      <canvas ref={canvasRef} width="1000" height="1000"></canvas>
      <TrapezoidWithArcs canvasRef={canvasRef} />


    </div>
  );
};

export default ParentComponent;
