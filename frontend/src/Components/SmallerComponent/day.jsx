import React, { useRef, useEffect } from 'react';



const TrapezoidWithArcs = ({ canvasRef, }) => {
  useEffect(() => {
	if (canvasRef.current) {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
  
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		
		const separation = 40;
      	const initialRadius = centerX;	
		const numCircles = 8;

		const radii = Array.from({ length: numCircles }, (_, index) => initialRadius - separation * index);
     

		const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#8B4513']; // Different colors
		const widths = [4, 1, 1, 1, 1, 1, 1, 1]; // Widths for each circle
  
		// Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
  
		// Draw circles
		radii.forEach((radius, index) => {
		  ctx.beginPath();
		  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		  ctx.strokeStyle = colors[index];
		  ctx.lineWidth = widths[index];
		  ctx.stroke();
		});
  
		// Draw month names around the largest circle
		const fontSize = 14;
		ctx.font = `${fontSize}px Arial`;
		ctx.fillStyle = '#000000';
		monthNames.forEach((month, index) => {
		  const angle = (index / monthNames.length) * 2 * Math.PI;
		  const x = centerX + radii[0] * Math.cos(angle) - fontSize;
		  const y = centerY + radii[0] * Math.sin(angle) + fontSize / 2;
		  ctx.fillText(month, x, y);
		});

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
