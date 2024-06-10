import { config } from './create3DArray';
import { getColor } from './create3DArray';

export function writeEvents(ctx, angle, centerX, centerY, i, events, radii, angleIncrement) {
	events = events[i]

	;
	let separation = config.separation; // Define a separation value, you can adjust as needed
	const outer_radii = radii[7]
	let separation_N = 0;

	let isDayWritten = []
	events.forEach((events_object, day_index) => {
		let events = events_object.event;
		if (typeof events === "string") {
			events = [events];
		}

		const day = `${events_object.day}`;
		let color = getColor(i,day.split('-')[0])

		separation_N = (day_index +1);
		let count = 0
		
		events.forEach((event, index) => {
			
			let inner_radii = outer_radii -separation*separation_N;
			
			const rad_increment = angleIncrement * (Math.PI / 180);
			const mid_radii = (outer_radii + inner_radii) / 2;


			const m_centerX = centerX + mid_radii * Math.cos((angle) );
			const m_centerY = centerY + mid_radii * Math.sin((angle) );

			let rot_angle = Math.atan2(m_centerY - centerY, m_centerX - centerX);

			let fontSize = 30-separation_N;
			
			ctx.font = `${fontSize}px Arial`;
			ctx.fillStyle = color || "purple";
			ctx.textAlign = "left";
			ctx.textBaseline = "ellipse";
			ctx.save();
			ctx.translate(m_centerX, m_centerY);
			ctx.rotate(2*Math.PI /3.5+ rot_angle);

			if(isDayWritten.includes(day)){
				ctx.fillText(event, 0, 0);
			}else{
				isDayWritten.push(day)
				ctx.fillText(day.concat(":").concat(event), 0, 0);
				
			}
			
			ctx.restore();
			
		});

		//outer_radii = inner_radii; // Update outer_radii for the next set of events
	});
}
