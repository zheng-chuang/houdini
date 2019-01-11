registerPaint('ripple', class {
  static get inputProperties() { 
    return [
      'background-color', 
      '--ripple-color', 
      '--animation-tick', 
      '--ripple-x', 
      '--ripple-y'
    ]; 
  }
  paint(ctx, geom, properties) {
    const backgroundColor = properties.get('background-color').toString();
    const rippleColor = properties.get('--ripple-color').toString();
    const rippleX = parseFloat(properties.get('--ripple-x').toString());
    const rippleY = parseFloat(properties.get('--ripple-y').toString());
    let animationTick = parseFloat(properties.get('--animation-tick').toString());
    if (animationTick < 0) {
      animationTick = 0;
    }
    if (animationTick > 1000) {
      animationTick = 1000;
    }

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, geom.width, geom.height);
    ctx.fillRect(0, 0, geom.width, geom.height);

    ctx.fillStyle = rippleColor;
    ctx.globalAlpha = 1 - animationTick / 1000;
    ctx.arc(
      rippleX, rippleY,
      geom.width * animationTick / 1000,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
});