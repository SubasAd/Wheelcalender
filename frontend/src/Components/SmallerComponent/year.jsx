import React, { useRef, useEffect,useState } from 'react';
import { config, nepDayNames, getColor} from './create3DArray';
import { writeYear } from './writeYear';
import { getCanvasValues } from './getCanvasValues';
import { drawStructureOfCalender } from './drawStructureOfCalender';
import { drawCalender2 } from './drawCalender2';
import { writeWeekName } from './writeWeekName';
import { writeMonthName } from './writeMonthName';
import { drawWeek } from './drawWeek';
import { writeDay } from './writeDay';
import { writeEvents } from './writeEvents';
import { getEvents } from './create3DArray';
import { curvedText } from './curvedText';

const TrapezoidWithArcs = ({ canvasRef, }) => {
  

  useEffect(() => {
	
  fetch('http://localhost:5000/get_color')
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json(); // Parse JSON response
  })
  .then((data) => {
    console.log(data); // Log the parsed data
    localStorage.setItem("events", JSON.stringify(data)); // Store data in localStorage
    
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
    // Set error message
    
  });

	

	if (canvasRef.current) {

		

	
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');

			let events = []
			
			const { radii, centerX, centerY, colors, widths, separation, nepMonthToEng } = getCanvasValues(canvas);
			var { innermost_radii, array } = drawStructureOfCalender(ctx, canvas, radii, centerX, centerY, colors, widths, separation);		

			
			writeYear(centerX,centerY,ctx,"२०८१")
			// Draw lines from r2 to r8
			const angleIncrement = 360 / 12; // 12 lines at equal space
			const dayAngleIncrement = angleIncrement / 7; // 7 days in a week

			
			for (let i = 0; i < 12; i++) {
				events.push(getEvents(i))
			
				const angle = drawCalender2(i, angleIncrement, centerX, radii, centerY, innermost_radii, ctx);
			
				writeMonthName(ctx,centerX,centerY, radii,angleIncrement,nepMonthToEng,angle,i)
				for (let j = 1; j <= 7; j++) {
					
					const  weekAngle = (i * angleIncrement + j * dayAngleIncrement) * (Math.PI / 180); // Convert to radians
					writeWeekName(ctx,centerX, centerY,dayAngleIncrement, radii,weekAngle ,nepDayNames[j-1] ) 
					
					if ((j ==7) || (weekAngle % (2 * Math.PI / 12) === 0)) continue; // Skip if it's the same as the month line
			
					drawWeek(centerX, radii, weekAngle, centerY, ctx);
				}
				
	

				for (let week = 0; week<6; week++) {

					for (let day = 0; day<7; day++) {
						;
						const  dayAngle = (i * angleIncrement + (day+1) * dayAngleIncrement) * (Math.PI / 180);
						let color = getColor(i,array[i][week][day])
						console.log("Color",color,i,array[i][week][day])
						
						
						if (day!=6){
							writeDay(ctx, centerX, centerY,dayAngleIncrement, radii,week + 2, dayAngle, array[i][week][day],color)
						}else{
							writeDay(ctx, centerX, centerY,dayAngleIncrement, radii,week + 2, dayAngle, array[i][week][day], "red")
						}
						 // Convert to radians
						
						
						
					}
					
				}
				
				writeEvents(ctx, angle, centerX, centerY, i,events,radii,angleIncrement);
					
			}
		}
	}, [canvasRef]);
  
	return null;
}


const ParentComponent = () => {
  const canvasRef = useRef(null);
  

  useEffect(() => {
    if (canvasRef.current) {
      
    }
  }, [canvasRef]);

  return (
    <div>
      
      <canvas ref={canvasRef} width={config.width} height={config.height}></canvas>
      <TrapezoidWithArcs canvasRef={canvasRef} />
    </div>
  );
};

export default ParentComponent;



