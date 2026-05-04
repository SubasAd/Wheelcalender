/**
 * Helper to draw text rotated and positioned on a circular path.
 * 
 * @param {CanvasRenderingContext2D} ctx - The canvas context
 * @param {number} centerX - X coordinate of the wheel center
 * @param {number} centerY - Y coordinate of the wheel center
 * @param {number} radius - Radius from center where text should be placed
 * @param {number} angleRad - Angle in radians where text should be placed
 * @param {string} text - The text to draw
 * @param {string} font - Font string (e.g. "50px Arial")
 * @param {string} color - Fill color
 * @param {number} rotationOffset - Additional rotation (default PI/2 to make text outward facing)
 */
export function drawCircularText(ctx, centerX, centerY, radius, angleRad, text, font, color = "black", rotationOffset = Math.PI / 2) {
    ctx.save();
    
    // Position
    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);
    
    // Direction from center to point
    const angleFromCenter = Math.atan2(y - centerY, x - centerX);
    
    ctx.translate(x, y);
    ctx.rotate(angleFromCenter + rotationOffset);
    
    ctx.font = font;
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    
    ctx.fillText(text, 0, 0);
    
    ctx.restore();
}

/**
 * Helper to measure and draw text with icons (like the writing hand for exams)
 */
export function drawTextWithIcon(ctx, centerX, centerY, radius, angleRad, text, icon, textFont, iconFont, color = "black", rotationOffset = Math.PI / 2) {
    ctx.save();
    
    const x = centerX + radius * Math.cos(angleRad);
    const y = centerY + radius * Math.sin(angleRad);
    const angleFromCenter = Math.atan2(y - centerY, x - centerX);
    
    ctx.translate(x, y);
    ctx.rotate(angleFromCenter + rotationOffset);
    
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // Measure text
    ctx.font = textFont;
    const textWidth = ctx.measureText(text).width;
    
    // Draw text slightly offset to make room for icon
    ctx.fillText(text, -10, 0); // small offset for better centering with icon
    
    // Draw icon
    ctx.font = iconFont;
    ctx.fillText(icon, (textWidth / 2) + 15, 0);
    
    ctx.restore();
}
