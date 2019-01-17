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
  paint(context, size, properties) {
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

    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, size.width, size.height);

    context.fillStyle = rippleColor;
    context.globalAlpha = 1 - animationTick / 1000;
    context.arc(rippleX, rippleY, size.width * animationTick / 1000, 0, 2 * Math.PI);
    context.fill();
  }
});