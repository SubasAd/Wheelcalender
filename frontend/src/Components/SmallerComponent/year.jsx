import React, { useRef, useEffect } from 'react';
import { config, nepDayNames } from './create3DArray';
import { writeYear } from './writeYear';
import { getCanvasValues } from './getCanvasValues';
import { drawStructureOfCalender } from './drawStructureOfCalender';
import { drawCalender2 } from './drawCalender2';
import { writeWeekName } from './writeWeekName';
import { writeMonthName } from './writeMonthName';
import { drawWeek } from './drawWeek';
import { writeDay } from './writeDay';
import { writeEvents } from './writeEvents';
const TrapezoidWithArcs = ({ canvasRef, }) => {
  useEffect(() => {
	if (canvasRef.current) {
			const canvas = canvasRef.current;
			const ctx = canvas.getContext('2d');
			const events=[]
			const { radii, centerX, centerY, colors, widths, separation, nepMonthToEng } = getCanvasValues(canvas);
			var { innermost_radii, array } = drawStructureOfCalender(ctx, canvas, radii, centerX, centerY, colors, widths, separation);		

			
			writeYear(centerX,centerY,ctx,"२०८१")
			// Draw lines from r2 to r8
			const angleIncrement = 360 / 12; // 12 lines at equal space
			const dayAngleIncrement = angleIncrement / 7; // 7 days in a week

			
			for (let i = 0; i < 12; i++) {
			
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
						 // Convert to radians
						writeDay(ctx, centerX, centerY,dayAngleIncrement, radii,week + 2, dayAngle, array[i][week][day])
						
						
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
      // Optionally perform operations on the canvas if needed
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



