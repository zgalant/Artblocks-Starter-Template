const seed = parseInt(tokenData.hash.slice(0, 16), 16);

const DONUT_COLORS = ['#937D64', '#5E503F'];
const FROSTING_COLORS = ['#EEB4B3', '#C179B9', '#A42CD6', '#502274'];
const SPRINKLES_COLORS = ['#E53D00', '#FFE900', '#FCFFF7', '#21A0A0'];

let donutColor, frostingColor, fp, sprinkles;

class Random {
  constructor(seed) {
    this.seed = seed
  }
  random_dec() {
    this.seed ^= this.seed << 13
    this.seed ^= this.seed >> 17
    this.seed ^= this.seed << 5
    return ((this.seed < 0 ? ~this.seed + 1 : this.seed) % 1000) / 1000
  }
  random_between(a, b) {
    return a + (b - a) * this.random_dec()
  }
  random_choice(x) {
    return x[Math.floor(this.random_between(0, x.length * 0.99))]
  }
}

function setup() {
    const smallerDimension = windowWidth < windowHeight ? windowWidth : windowHeight;
    createCanvas(smallerDimension, smallerDimension);
    let R = new Random(seed);
    donutColor = R.random_choice(DONUT_COLORS);
    frostingColor = R.random_choice(FROSTING_COLORS);

    fp = [];
    let frostingRadius = smallerDimension * .45;
    let c = width / 2;
    for (let a = 0; a < 360; a += 20) {
        let angle = radians(a);
        let variance = smallerDimension / 57;
        let x = c + cos(angle) * frostingRadius + R.random_between(-variance, variance);
        let y = c + sin(angle) * frostingRadius + R.random_between(-variance, variance);
        fp.push(x);
        fp.push(y);
    }

    sprinkles = [];
    let F = 2.8;
    let variance = smallerDimension / 50;
    for (let i = 0; i < width/7; i++) {
        let x1 = width/2 + R.random_between(-smallerDimension/F, smallerDimension/F);
        let y1 = height/2 + R.random_between(-smallerDimension/F, smallerDimension/F);
        let x2 = x1 + R.random_between(-variance, variance);
        let y2 = y1 + R.random_between(-variance, variance);
        sprinkles.push([x1, y1, x2, y2, R.random_choice(SPRINKLES_COLORS)]);
    }

    fill(donutColor);
    strokeWeight(0);
    ellipse(width / 2, height / 2, smallerDimension, smallerDimension);

    fill(frostingColor);
    beginShape();
    for (let i = 0; i < fp.length; i+= 2) {
        curveVertex(fp[i], fp[i + 1]);
    }
    curveVertex(fp[0], fp[1]);
    curveVertex(fp[2], fp[3]);
    endShape();

    strokeWeight(4);
    for (let i = 0; i < sprinkles.length; i++) {
        let sprinkle = sprinkles[i];
        stroke(sprinkle[4]);
        line(sprinkle[0], sprinkle[1], sprinkle[2], sprinkle[3])
    }

    strokeWeight(0);
    fill(donutColor);
    ellipse(width / 2, height / 2, smallerDimension / 3.3, smallerDimension/3.3);

    fill('#fff')
    ellipse(width / 2, height / 2, smallerDimension/4, smallerDimension/4);
}
