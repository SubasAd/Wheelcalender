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
import Heading from './heading';

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
			
				let angle = drawCalender2(i, angleIncrement, centerX, radii, centerY, innermost_radii, ctx);
				angle = angle-Math.PI/2-Math.PI/6
			
				writeMonthName(ctx,centerX,centerY, radii,angleIncrement,nepMonthToEng,angle,i)
				for (let j = 1; j <= 7; j++) {
					
					const  weekAngle = (i * angleIncrement + j * dayAngleIncrement) * (Math.PI / 180)-Math.PI/2-Math.PI/6; // Convert to radians
					writeWeekName(ctx,centerX, centerY,dayAngleIncrement, radii,weekAngle ,nepDayNames[j-1] ) 
					
					if ((j ==7) || (weekAngle % (2 * Math.PI / 12) === 0)) continue; // Skip if it's the same as the month line
			
					drawWeek(centerX, radii, weekAngle, centerY, ctx);
				}
				
	

				for (let week = 0; week<6; week++) {

					for (let day = 0; day<7; day++) {
						;
						const  dayAngle = (i * angleIncrement + (day+1) * dayAngleIncrement) * (Math.PI / 180)-Math.PI/2-Math.PI/6;
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
	< >
   
      <div style={{ 
        fontSize: `100pt`,
		fontWeight: 'bold',
		marginBottom: '300px',
		position: 'relative',
		left: '1800px', // Start at the desired horizontal position
		whiteSpace: 'nowrap', 
		// Prevent text wrapping
		
		// Adding some space between the heading and the canvas
      }}>
        श्री महेन्द्र ज्योति माध्यमिक विद्यालय<br/>
      	&emsp;&emsp;	महाशिला -५ , लुंखु, पर्वत   <br/>
      	&emsp;&emsp;	<u style={{
			color:"red"
		}}>वार्षिक कार्यपात्रो -२०८१</u><br/>
      </div>
	  <div style={{ 
        fontSize: `100pt`,
		fontWeight: 'bold',
		marginBottom: '2px',
		position: 'relative',
		left: '1000px', // Start at the desired horizontal position
		whiteSpace: 'nowrap',
		// Prevent text wrapping
		
		// Adding some space between the heading and the canvas
      }}>
      <canvas ref={canvasRef} width={config.width} height={config.height}></canvas>
      <TrapezoidWithArcs canvasRef={canvasRef} />
    </div>
	<div style={{ 
        fontSize: `20pt`,
		fontWeight: 'italic',
		marginBottom: '300px',
		position: 'relative',
		left: '4500px', // Start at the desired horizontal position
		whiteSpace: 'nowrap', 
		// Prevent text wrapping
		
		// Adding some space between the heading and the canvas
      }}>
        <br/>

<p style={{align:'right' }}> प्रधानाध्यापक: गोपाल प्रसाद शर्मा </p><br/>
डिजाइन : विष्णुमाया  शर्मा <br/>
तयार गर्ने : लेखनाथ अधिकारी <br/>
सहयोग : subasadhikari0025@gmail.com<br/>

  <br/>
    
      </div>
	</>
	
  );
};

export default ParentComponent;



