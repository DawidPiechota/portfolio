import {
  initiateMouseCapture,
  initiateFullScreenOnEnter,
  getDistance,
  Point,
} from './utils';

export const renderAnimation = (canvas: HTMLCanvasElement) => {
  const MARGIN = Number(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--header-height')
      .replace('px', ''),
  );
  const POINTS_COUNT = Math.min(
    Math.floor((window.innerWidth * window.innerHeight) / 10_000),
    200,
  );
  console.log(POINTS_COUNT);

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const [cWidth, cHeight] = [canvas.width, canvas.height];
  const ctx = canvas.getContext('2d', { alpha: false });

  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * devicePixelRatio;
  canvas.height = rect.height * devicePixelRatio;
  if (!ctx) return;
  ctx.scale(devicePixelRatio, devicePixelRatio);
  canvas.style.width = rect.width + 'px';
  canvas.style.height = rect.height + 'px';

  // const middle = {
  //   x: cWidth / 2,
  //   y: cHeight / 2,
  // }

  const mouseM = initiateMouseCapture(canvas);
  initiateFullScreenOnEnter();

  // ---------------------------------------------------------------------------------

  const borderHeight = { min: 0, max: cHeight - MARGIN };
  const borderWidth = { min: 0, max: cWidth - MARGIN };

  // let textStyle: string

  ctx.font = '8px Arial';
  // const randomColor = () => {
  //   if (Math.random() > 0.5) {
  //     color = randomPastelColor()
  //     textStyle = 'PASTEL'
  //   } else {
  //     color = randomNeonColor()
  //     textStyle = 'NEON'
  //   }
  // }
  // randomColor()

  Point.setCtx(ctx);
  const points = Array(POINTS_COUNT)
    .fill(0)
    .map(
      () =>
        new Point(
          borderWidth.min,
          borderWidth.max,
          borderHeight.min,
          borderHeight.max,
        ),
    );

  points.forEach((e) => e.draw());

  const FRAMES_PER_SECOND = 60;
  const FRAME_MIN_TIME =
    (1000 / 60) * (60 / FRAMES_PER_SECOND) - (1000 / 60) * 0.5;
  var lastFrameTime = 0;
  function update(time: number) {
    if (time - lastFrameTime < FRAME_MIN_TIME) {
      requestAnimationFrame(update);
      return;
    }
    lastFrameTime = time;
    if (!ctx) return;
    ctx.fillStyle = '#121a24';
    ctx.fillRect(0, 0, cWidth, cHeight);
    ctx.fillStyle = Point.color;
    ctx.fillText(Point.textStyle, 10, 10);
    points.forEach((e) => {
      e.update(mouseM, MARGIN);
      // e.updateWith(points);
    });
    for (let i = 0; i < POINTS_COUNT; i++) {
      for (let j = i + 1; j < POINTS_COUNT; j++) {
        const distance = getDistance(
          points[i].pos.x,
          points[i].pos.y,
          points[j].pos.x,
          points[j].pos.y,
        );
        if (distance < 40000) {
          Point.connectWithLine(points[i], points[j], ctx, distance);
        }
      }
    }

    points.forEach((e) => {
      e.draw();
    });
    requestAnimationFrame(update);
  }
  requestAnimationFrame(update);

  document.onclick = () => {
    // randomColor();
    // points.forEach((e) => e.reset(color));
  };

  document.addEventListener(
    'mousedown',
    function (e) {
      Point.forceDirection = -1;
      Point.currentForceStrength = Point.convergeForceStrength;
    },
    false,
  );

  document.addEventListener(
    'mouseup',
    function (e) {
      Point.forceDirection = 1;
      Point.currentForceStrength = Point.repellForceStrength;
    },
    false,
  );

  // document.addEventListener(
  //   'keydown',
  //   function (e) {
  //     if (e.key === 'r') {
  //       randomColor()
  //       points.forEach((e) => e.reset())
  //     }
  //   },
  //   false,
  // )
};
