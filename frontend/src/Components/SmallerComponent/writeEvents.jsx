import { config } from './create3DArray';
import { findEventsByMonth } from './findEventsByMonth';

export function writeEvents(ctx, angle, centerX, centerY, i, events, radii, angleIncrement) {
	const to_print = findEventsByMonth(i, events);
	try {
		if (to_print.length === 0) {
			return;
		}
		console.log(to_print);
	} catch (error) {
		return;
	}

	const outer_radii = radii[7];
	let separation = config.separation; // Define a separation value, you can adjust as needed
	let separation_N = 0;
	to_print.forEach((to_print_object, day_index) => {
		let events = to_print_object.events;
		if (typeof events === "string") {
			events = [events];
		}

		const day = `${to_print_object.d}`;
		events[0] = `${day} : ${events[0]}`;

		separation_N += (day_index + 1);

		events.forEach((event, within_day_index) => {
			separation_N += within_day_index;
			let inner_radii = outer_radii - separation_N * separation;
			const rad_increment = angleIncrement * (Math.PI / 180);
			const mid_radii = (outer_radii + inner_radii) / 2;


			const m_centerX = centerX + mid_radii * Math.cos(angle + rad_increment / 10);
			const m_centerY = centerY + mid_radii * Math.sin(angle + rad_increment / 10);

			let rot_angle = Math.atan2(m_centerY - centerY, m_centerX - centerX);

			const fontSize = 40;
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
