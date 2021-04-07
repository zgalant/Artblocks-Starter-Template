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
    background(151, 244, 247);
    for (let i = 0; i < 30; i++) {
        var x = R.random_between(width*.2, width*.8);
        var y = R.random_between(width/7, width/3);
        var w = R.random_between(width/9,width/7);
        var h = R.random_between(width/8, width/7);
        let c = color(R.random_between(0, 255), R.random_between(0, 255), R.random_between(0, 255));

        fill(c);
        stroke(width/8);
        line(width/2, 2*height/3, x, y);

        noStroke();
        ellipse(x, y, w, h);
    }
}
