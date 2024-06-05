import React, { useRef, useEffect } from 'react';



const TrapezoidWithArcs = ({ canvasRef, }) => {
  useEffect(() => {
	if (canvasRef.current) {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext('2d');
  
		const monthNames = ['Jansadsada', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		const monthNamesNepali = [
			'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
		  ];
		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		
		const separation = 40;
      	const initialRadius = centerX - 30;	
		
		const numCircles = 8;
//			decrease separation geometrically.
			
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

		//innermost radii
		const innermost_radii = radii[7] - separation * 3
		ctx.beginPath();
		ctx.arc(centerX, centerY, innermost_radii, 0, 2 * Math.PI);
		ctx.strokeStyle = colors[0];
		ctx.lineWidth = widths[0];
		ctx.stroke();
		//innermost radii

		
	
		  // Draw lines from r2 to r8
		  const angleIncrement = 360 / 12; // 12 lines at equal space
		  const dayAngleIncrement = angleIncrement / 7; // 7 days in a week
   
		  for (let i = 0; i < 12; i++) {
			
			const angle =   (i * angleIncrement) * (Math.PI / 180); // Convert to radians
	
			const startX = centerX + radii[0] * Math.cos(angle); // r2
			const startY = centerY + radii[0] * Math.sin(angle); // r2

			const topLeftX = startX;
			const topLeftY = startY;
			
			const topRightX = centerX + radii[0] * Math.cos(angle + angleIncrement); // r2
			const topRightY = centerY + radii[0] * Math.sin(angle + angleIncrement); // r2

			const bottomLeftX = centerX + radii[1] * Math.cos(angle); // r2
			const bottomLeftY = centerY + radii[1] * Math.sin(angle); // r2

			const bottomRightX = centerX + radii[1] * Math.cos(angle + angleIncrement); // r2
			const bottomRightY = centerY + radii[1] * Math.sin(angle + angleIncrement); // r2

			
			const endX = centerX + innermost_radii * Math.cos(angle); // r8
			const endY = centerY + innermost_radii * Math.sin(angle); // r8
	
			ctx.beginPath();
			ctx.moveTo(startX, startY);
			ctx.lineTo(endX, endY);
			ctx.strokeStyle = 'black';
			ctx.lineWidth = 1;
			ctx.stroke();
			

			function writeMonthName(start_angle, month_text_index) {
				
				const fontSize = 14;
				ctx.font = `${fontSize}px Arial`;
				ctx.fillStyle = "blue";	
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.save();
				
				const rad_increment = angleIncrement*(Math.PI / 180)
				const mid_radii = (radii[0] + radii[1])/2
				const m_centerX = centerX + mid_radii * Math.cos(start_angle + rad_increment/6); // r2
				const m_centerY = centerY + mid_radii * Math.sin(start_angle + rad_increment/6); // r2
	
				let angle = Math.atan2(m_centerY - centerY,m_centerX - centerX);
				ctx.translate(m_centerX, m_centerY);
				ctx.rotate(Math.PI/2+ angle);//
				ctx.fillText(monthNames[month_text_index],0,0);

				ctx.restore()


				ctx.font = `${fontSize}px Arial`;
				ctx.fillStyle = "blue";	
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.save();
				const nep_mid_radii = (radii[0] + radii[1])/2

				const nep_m_centerX = centerX + nep_mid_radii * Math.cos(start_angle + rad_increment*(5/6) ); // r2
				const nep_m_centerY = centerY + nep_mid_radii * Math.sin(start_angle + rad_increment*(5/6) ); // r2
	
				let angle_ = Math.atan2(nep_m_centerY - centerY,nep_m_centerX - centerX);

				ctx.translate(nep_m_centerX, nep_m_centerY);
				ctx.rotate(Math.PI/2 + angle_);//
				ctx.fillText(monthNamesNepali[month_text_index],0,0);
				ctx.restore();

			}
			
			writeMonthName(angle,i)
			//
			// Function to draw text inside trapezoin.

			//

			function writeDayName(start_angle, month_text) {
				
				const fontSize = 14;
				ctx.font = `${fontSize}px Arial`;
				ctx.fillStyle = "blue";	
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.save();
				
				const rad_increment = angleIncrement*(Math.PI / 180)
				const mid_radii = (radii[0] + radii[1])/2
				const m_centerX = centerX + mid_radii * Math.cos(start_angle + rad_increment/6); // r2
				const m_centerY = centerY + mid_radii * Math.sin(start_angle + rad_increment/6); // r2
	
				let angle = Math.atan2(m_centerY - centerY,m_centerX - centerX);
				ctx.translate(m_centerX, m_centerY);
				ctx.rotate(Math.PI/2+ angle);//
				ctx.fillText(month_text,0,0);

				ctx.restore()


				ctx.font = `${fontSize}px Arial`;
				ctx.fillStyle = "blue";	
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.save();
				const nep_mid_radii = (radii[0] + radii[1])/2

				const nep_m_centerX = centerX + nep_mid_radii * Math.cos(start_angle + rad_increment*(5/6) ); // r2
				const nep_m_centerY = centerY + nep_mid_radii * Math.sin(start_angle + rad_increment*(5/6) ); // r2
	
				let angle_ = Math.atan2(nep_m_centerY - centerY,nep_m_centerX - centerX);

				ctx.translate(nep_m_centerX, nep_m_centerY);
				ctx.rotate(Math.PI/2 + angle_);//
				ctx.fillText(month_text,0,0);
				ctx.restore();

			}
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
