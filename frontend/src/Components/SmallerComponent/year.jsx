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

			const nepDayNames = [
				"s","m","t","w","thu","fri","sat"
			]

			const events = [
				[  // Month 0 (January?)
				  { "d": 1, "events": ["hi","bye"], "color": "green" },
				  { "d": 2, "events": "hi this entry", "color": "green" },
				  { "d": 18, "events": "hi", "color": "green" },
				],
				[], // Month 1 (February?) - Empty
				[], [], [], [], [], [], [],[],
				[  // Month 2 (March?)
				  { "d": 3, "events": "hi", "color": "green" },
				  { "d": 2, "events": "hi", "color": "green" },
				  { "d": 8, "events": "hi", "color": "green" },
				],
				// ... more months (months 3 to 11 are empty based on the provided structure)
			  ];
			
			  var eventsRadii = {
				//"0":[latest_radii, prev_radii_count] //mothiindex:
			  };

			  
			function findEventsByMonth(month,) {
				// Input validation (optional, but recommended for robustness)
				
			  
				
				try {
					
					
						return events[month]
					
				  
				} catch (error) {
					return []
				}
			  }
			  
			const centerX = canvas.width / 2;
			const centerY = canvas.height / 2;
			
			const separation = 40;
			const initialRadius = centerX - 30;	
			
			const numCircles = 8;
			//			decrease separation geometrically.
				
			const radii = Array.from({ length: numCircles }, (_, index) => initialRadius - separation * index);
			

			const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#8B4513']; // Different colors
			const widths = [4, 1, 1, 1, 1, 1, 1, 1]; // Widths for each circle
	
			const nepMonthToEng =[
				 "Apr/May",
				 "May/Jun",
				 "Jun/Jul",
				 "Jul/Aug",
				 "Aug/Sep",
				 "Sep/Oct",
				 "Oct/Nov",
				 "Nov/Dec",
				 "Dec/Jan",
				 "Jan/Feb",
				 "Feb/Mar",
				 "Mar/Apr",
			]
			//
			function generateRandomNumber(min, max) {
				return Math.floor(Math.random() * (max - min + 1)) + min;
			}
			
			function create3DArray(dim1, dim2, dim3, min, max) {
				let array = new Array(dim1);
				for (let i = 0; i < dim1; i++) {
					array[i] = new Array(dim2);
					for (let j = 0; j < dim2; j++) {
						array[i][j] = new Array(dim3);
						for (let k = 0; k < dim3; k++) {
							array[i][j][k] = generateRandomNumber(min, max);
						}
					}
				}
				return array;
			}
			
			let array = create3DArray(12, 5, 7, 1, 32);
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

			function writeYear(year="2081"){
					
				const fontSize = 34;
				ctx.font = `${fontSize}px Arial`;
				ctx.fillStyle = "purple";	
				ctx.textAlign = "center";
				ctx.textBaseline = "middle";
				ctx.save();
				
				
					ctx.translate(centerX, centerY);
					ctx.fillText(year,0,0);

					ctx.restore()



			}
			writeYear()
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
					ctx.fillText(monthNamesNepali[month_text_index],0,0);

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
					ctx.fillText(nepMonthToEng[month_text_index],0,0);
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
					
					const rad_increment = dayAngleIncrement*(Math.PI / 180)
					const mid_radii = (radii[1] + radii[2])/2
					const m_centerX = centerX + mid_radii * Math.cos(start_angle -rad_increment+ rad_increment/2); // r2
					const m_centerY = centerY + mid_radii * Math.sin(start_angle -rad_increment+ rad_increment/2); // r2

					let angle = Math.atan2(m_centerY - centerY,m_centerX - centerX);
					ctx.translate(m_centerX, m_centerY);
					ctx.rotate(Math.PI/2+ angle);//
					ctx.fillText(month_text,0,0);

					ctx.restore()


				

				}
					// Draw week lines within the month
				for (let j = 1; j <= 7; j++) {
					
					const  weekAngle = (i * angleIncrement + j * dayAngleIncrement) * (Math.PI / 180); // Convert to radians
					writeDayName(weekAngle ,nepDayNames[j-1] ) 
					
					if ((j ==7) || (weekAngle % (2 * Math.PI / 12) === 0)) continue; // Skip if it's the same as the month line
			
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
				
				function writeDay(given_week, dayAngle, day_text){
					
					const start_angle = dayAngle;
					const fontSize = 14;
					ctx.font = `${fontSize}px Arial`;
					ctx.fillStyle = "blue";	
					ctx.textAlign = "center";
					ctx.textBaseline = "middle";
					ctx.save();
					
					const rad_increment = dayAngleIncrement*(Math.PI / 180)
					const mid_radii= (radii[given_week]+radii[given_week+1])/2;
					const m_centerX = centerX + mid_radii * Math.cos(start_angle -rad_increment+ rad_increment/2); // r2
					const m_centerY = centerY + mid_radii * Math.sin(start_angle -rad_increment+ rad_increment/2); // r2

						let angle = Math.atan2(m_centerY - centerY,m_centerX - centerX);
						ctx.translate(m_centerX, m_centerY);
						ctx.rotate(Math.PI/2+ angle);//
						ctx.fillText(day_text,0,0);

						ctx.restore()



				}

				for (let week = 0; week<5; week++) {
					for (let day = 0; day<7; day++) {
				
						const  dayAngle = (i * angleIncrement + day * dayAngleIncrement) * (Math.PI / 180); // Convert to radians
						
						writeDay(week + 2, dayAngle, array[i][week][day]);
						
					}
					
				}

				function writeEvents() {
					const to_print = findEventsByMonth(i);
					try {
						if (to_print.length === 0) {
							return;
						}
						console.log(to_print);
					} catch (error) {
						return
					}
					
					const outer_radii = radii[7];
					let separation = 20; // Define a separation value, you can adjust as needed
					let separation_N =0;
					to_print.forEach((to_print_object,day_index) => {
						let events = to_print_object.events;
						if (typeof events === "string") {
							events = [events];
						}
				
						const day = `${to_print_object.d}`;
						events[0] = `${day} : ${events[0]}`;
						
						separation_N += (day_index+1);
						
						events.forEach((event, within_day_index) => {
							// if (index === 1 && N > 1) {
								// 	start_angle += angleIncrement;
								// }
							//let N = 1;
							// if (events[0].length > 30) {
							// 	N++;
							// }
							separation_N += within_day_index;
							let inner_radii = outer_radii - separation_N* separation;
							const rad_increment = angleIncrement * (Math.PI / 180);
							const mid_radii = (outer_radii + inner_radii) / 2;
				
							
							const m_centerX = centerX + mid_radii * Math.cos(angle +  rad_increment/10);
							const m_centerY = centerY + mid_radii * Math.sin(angle +  rad_increment/10);
				
							let rot_angle = Math.atan2(m_centerY - centerY, m_centerX - centerX);
							
							const fontSize = 10;
							ctx.font = `${fontSize}px Arial`;
							ctx.fillStyle = to_print_object.color || "purple";    
							ctx.textAlign = "left";
							ctx.textBaseline = "middle";
							ctx.save();
				
							ctx.translate(m_centerX, m_centerY);
							ctx.rotate(Math.PI / 2 + rot_angle);
							ctx.fillText(event, 0, 0);
							ctx.restore();
						});
				
						//outer_radii = inner_radii; // Update outer_radii for the next set of events
					});
				}
				
				// Example usage: assuming you have the required context (ctx), center coordinates (centerX, centerY), 
				// radii array, and the function findEventsByMonth(i) properly defined.
				// Call writeEvents() function where needed in your code.
				
				
				writeEvents();
					
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
