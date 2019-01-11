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
  paint(ctx, size, styleMap) {
    const backgroundColor = styleMap.get('background-color').toString();
    const rippleColor = styleMap.get('--ripple-color').toString();
    const rippleX = parseFloat(styleMap.get('--ripple-x').toString());
    const rippleY = parseFloat(styleMap.get('--ripple-y').toString());
    let animationTick = parseFloat(styleMap.get('--animation-tick').toString());
    if (animationTick < 0) {
      animationTick = 0;
    }
    if (animationTick > 1000) {
      animationTick = 1000;
    }

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, size.width, size.height);

    ctx.fillStyle = rippleColor;
    ctx.globalAlpha = 1 - animationTick / 1000;
    ctx.arc(rippleX, rippleY, size.width * animationTick / 1000, 0, 2 * Math.PI);
    ctx.fill();
  }
});