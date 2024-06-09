import { config } from './create3DArray';

export function writeWeekName(ctx, centerX, centerY, dayAngleIncrement, radii, start_angle, week) {
	
	const fontSize = config.font_size;
	ctx.font = `${fontSize}px Arial`;
	ctx.fillStyle = "blue";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.save();

	const rad_increment = dayAngleIncrement * (Math.PI / 180);
	const mid_radii = (radii[1] + radii[2]) / 2;
	const m_centerX = centerX + mid_radii * Math.cos(start_angle - rad_increment + rad_increment / 2); // r2
	const m_centerY = centerY + mid_radii * Math.sin(start_angle - rad_increment + rad_increment / 2); // r2

	let angle = Math.atan2(m_centerY - centerY, m_centerX - centerX);
	ctx.translate(m_centerX, m_centerY);
	ctx.rotate(Math.PI / 2 + angle); //
	ctx.fillText(week, 0, 0);

	ctx.restore();




}
