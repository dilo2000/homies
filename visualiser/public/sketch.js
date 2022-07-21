let seed = 0;
let phase = 0;
let count = 0;

let cols = 500;
let rows = 250;

class NoiseLoop {
    constructor(noiseMax, offset) {
        this.noiseMax = noiseMax;
        this.offset = offset;
    }

    value(a, minValue, maxValue) {
        let xoff = map(cos(a), -1, 1, 0, this.noiseMax);
        let yoff = map(sin(a), -1, 1, 0, this.noiseMax);
        let zoff = 0;

        let radius = map(noise(xoff + this.offset, yoff + this.offset, zoff), 0, 1, minValue, maxValue);
        return radius; 
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    translate(width/2, height/2);

    rNoise = new NoiseLoop(1, random(1000));
    maxNoise = new NoiseLoop(1, random(1000));
    hNoise = new NoiseLoop(50, random(1000));
    greenNoise = new NoiseLoop(8, random(1000));
    blueNoise = new NoiseLoop(8, random(1000));
    


}   

function draw() {
    translate(width/2, height/2);
    
    h = hNoise.value(count, 0, 360);
    // s = sNoise.value(count, 120, 255);
    // b = lNoise.value(count, 120, 255);

    let xspacing = windowWidth/cols;
    let yspacing = windowHeight/rows;

    colorMode(HSB);

    //background(255 - r, 255 - g, 255 - b);
    //background(360 - h, 100, 100);
    
    // for (let i = -cols/2; i < cols/2; i ++) {
    //     for (let j = -rows/2; j < rows/2; j++) {
    //         let x = xspacing * i;
    //         let y = yspacing * j;
    //         fill(random(255), random(255), random(255));
    //         rect(x, y, xspacing, yspacing);   
    //     }
    // }
    colorMode(HSB);
    stroke(h, 100,100); 
    strokeWeight(2);
    noFill(); 
    beginShape();
 
    for (let a =0; a < TWO_PI; a+=0.01) {
        radius = rNoise.value(a, 0, windowWidth);
        let x = radius * cos(a);
        let y = radius * sin(a);

        vertex(x, y);
    }
    endShape(CLOSE);  
    count += 0.003;
    rNoise.noiseMax = maxNoise.value(count, 0, 50);
}   

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
