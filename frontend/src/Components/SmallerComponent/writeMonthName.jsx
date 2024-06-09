import { config, monthNamesNepali } from './create3DArray';

export function writeMonthName(ctx, centerX, centerY, radii, angleIncrement, nepMonthToEng, start_angle, month_text_index) {

	const fontSize = config.font_size;
	ctx.font = `${fontSize}px Arial`;
	ctx.fillStyle = "blue";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.save();

	const rad_increment = angleIncrement * (Math.PI / 180);
	const mid_radii = (radii[0] + radii[1]) / 2;
	const m_centerX = centerX + mid_radii * Math.cos(start_angle + rad_increment / 6); // r2
	const m_centerY = centerY + mid_radii * Math.sin(start_angle + rad_increment / 6); // r2

	let angle = Math.atan2(m_centerY - centerY, m_centerX - centerX);
	ctx.translate(m_centerX, m_centerY);
	ctx.rotate(Math.PI / 2 + angle); //
	ctx.fillText(monthNamesNepali[month_text_index], 0, 0);

	ctx.restore();


	ctx.font = `${fontSize}px Arial`;
	ctx.fillStyle = "blue";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.save();
	const nep_mid_radii = (radii[0] + radii[1]) / 2;

	const nep_m_centerX = centerX + nep_mid_radii * Math.cos(start_angle + rad_increment * (5 / 6)); // r2
	const nep_m_centerY = centerY + nep_mid_radii * Math.sin(start_angle + rad_increment * (5 / 6)); // r2

	let angle_ = Math.atan2(nep_m_centerY - centerY, nep_m_centerX - centerX);

	ctx.translate(nep_m_centerX, nep_m_centerY);
	ctx.rotate(Math.PI / 2 + angle_); //
	ctx.fillText(nepMonthToEng[month_text_index], 0, 0);
	ctx.restore();

}
