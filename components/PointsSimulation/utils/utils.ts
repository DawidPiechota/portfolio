import { deg2rad, randomRange } from "../../../utils/numbers";

export const getDistance = (ax: number, ay: number, bx: number, by: number) => {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy; // sqrt is expensive
}

export const getAccelerationByPosition = (ax: number, ay: number, bx: number, by: number) => {
  const distance = getDistance(ax, ay, bx, by);
  const accelerationX = ((Point.currentForceStrength / distance) * (ax - bx)) / distance;
  const accelerationY = ((Point.currentForceStrength / distance) * (ay - by)) / distance;
  return {accelerationX, accelerationY};
}

export const initiateMouseCapture = (canvas: HTMLCanvasElement) => {
  let speedTimeout: NodeJS.Timeout;
  let mouseM = {
    x: 0,
    y: 0,
    v: 1,
  };
  canvas.addEventListener('mousemove', e => {
    clearTimeout(speedTimeout);
    const v = mouseM.x
      ? Math.sqrt(
          Math.pow(e.clientX - mouseM.x,2)
          + Math.pow(e.clientY - mouseM.y,2)
        )
      : 0;
    mouseM.x = e.clientX;
    mouseM.y = e.clientY;
    mouseM.v = v;

    const speedDecline = () => {
      mouseM.v = mouseM.v*0.8;
      if(mouseM.v > 1) {
        speedTimeout = setTimeout(speedDecline, 200);
      } else {
        mouseM.v = 1;
      }
    }
    speedDecline();
  });
  return mouseM;
}
export const initiateFullScreenOnEnter = () => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
  document.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      toggleFullScreen();
    }
  }, false);
}


class Vector {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Border {
  x: {
    min: number;
    max: number;
  };
  y: {
    min: number;
    max: number;
  };
  constructor(minX: number, maxX: number, minY: number, maxY: number) {
    this.x = {
      min: minX,
      max: maxX,
    };
    this.y = {
      min: minY,
      max: maxY,
    };
  }
}

export class Point {
  border: Border;
  pos: Vector;
  velocity: Vector;
  radius: number;
  id: number;
  static forceDirection = 1;
  static currentForceStrength = 50000;
  static repellForceStrength = 50000;
  static convergeForceStrength = 10000000;
  static color = '#24f5ff';
  static textStyle = 'NEON';
  static ctx: CanvasRenderingContext2D;
  constructor(minX: number, maxX: number, minY: number, maxY: number) {
    this.border = new Border(minX, maxX, minY, maxY);
    this.pos = new Vector(randomRange(minX, maxX), randomRange(minY, maxY));
    // this.pos = new Vector(randomRange(maxX/2, maxX/2+1), randomRange(maxY/2, maxY/2+1));
    this.velocity = new Vector(randomRange(-1, 1), randomRange(-1, 1));
    this.radius = randomRange(4, 7);
    // this.color = color;
    this.id = Math.random();
  }

  static setCtx(ctx: CanvasRenderingContext2D) {
    Point.ctx = ctx;
  }

  static setColor(color: string) {
    Point.color = color;
  }

  static setTextStyle(textStyle: string) {
    Point.textStyle = textStyle;
  }

  reset() {
    // this.color = color;
    this.pos = new Vector(
      randomRange(this.border.x.min, this.border.x.max),
      randomRange(this.border.y.min, this.border.y.max),
    );
    this.velocity = new Vector(randomRange(-2, 2), randomRange(-2, 2));
  }

  update(mouse: {x: number, y: number}, mouseOffset: number) {
    const mouseX = mouse.x;// - mouseOffset;
    const mouseY = mouse.y - mouseOffset;
    const {accelerationX, accelerationY} = getAccelerationByPosition(this.pos.x, this.pos.y, mouseX, mouseY)

    if (Math.abs(accelerationX) > 1) {
      this.velocity.x += Point.forceDirection * Math.sign(accelerationX);
    } else {
      this.velocity.x += Point.forceDirection * accelerationX;
    }
    if (Math.abs(accelerationY) > 1) {
      this.velocity.y += Point.forceDirection * Math.sign(accelerationY);
    } else {
      this.velocity.y += Point.forceDirection * accelerationY;
    }

    if (Math.abs(this.velocity.x) > 1) {
      this.velocity.x *= 0.99;
    }
    if (Math.abs(this.velocity.y) > 1) {
      this.velocity.y *= 0.99;
    }

    this.bounce();
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  updateWith(points: Point[]) {
    let newAccelerationX = 0;
    let newAccelerationY = 0;

    for(const point of points) {
      if(point.id === this.id) continue;
      const { accelerationX, accelerationY } = getAccelerationByPosition(this.pos.x, this.pos.y, point.pos.x, point.pos.y);
      newAccelerationX += accelerationX;
      newAccelerationY += accelerationY;
    }

    if (Math.abs(newAccelerationX) > 1) {
      this.velocity.x += Math.sign(newAccelerationX);
    } else {
      this.velocity.x += newAccelerationX;
    }
    if (Math.abs(newAccelerationY) > 1) {
      this.velocity.y += Math.sign(newAccelerationY);
    } else {
      this.velocity.y += newAccelerationY;
    }

    if (Math.abs(this.velocity.x) > 1) {
      this.velocity.x *= 0.99;
    }
    if (Math.abs(this.velocity.y) > 1) {
      this.velocity.y *= 0.99;
    }

    this.bounce();
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  draw() {
    const ctx = Point.ctx;
    // ctx.fillStyle = this.color;
    ctx.fillStyle = Point.color;
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, deg2rad(360));
    ctx.fill();
    ctx.restore();
  }

  bounce() {
    if (this.pos.x > this.border.x.max || this.pos.x < this.border.x.min) {
      this.velocity.x *= -1
      this.pos.x = Math.max(this.border.x.min + 1, Math.min(this.border.x.max - 1, this.pos.x));
    };
    if (this.pos.y > this.border.y.max || this.pos.y < this.border.y.min) {
      this.velocity.y *= -1
      this.pos.y = Math.max(this.border.y.min + 1, Math.min(this.border.y.max - 1, this.pos.y));
    };
  }

  static connectWithLine(pA: Point, pB: Point, ctx: CanvasRenderingContext2D, distance: number) {
    ctx.strokeStyle = Point.color;
    ctx.lineWidth = Math.min(4_000 / distance, pA.radius, pB.radius);
    ctx.beginPath();
    ctx.moveTo(pA.pos.x, pA.pos.y);
    ctx.lineTo(pB.pos.x, pB.pos.y);
    ctx.stroke();
  }
}
