let cam
var cnv

function setup() {
    cnv = createCanvas(320, 240);
    cnv.parent('sketch-holder');
    cam = createCapture(VIDEO);
    cam.size(320, 240)
    cam.hide();

    async function sendSnap() {
        loadPixels();
        const image64 = canvas.toDataURL();
        var name = document.getElementById('namebox').value;
        const d = new Date();
        const time = d.toDateString();
        const milli = d.getTime();
    
        const data = {milli, time, image64, name};

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        };

        const response = await fetch('/api', options);
        const json  = await response.json();
        console.log(json.image64)
        console.log(json);
    }
    document.getElementById('sendsnap').addEventListener('click', sendSnap);
}

function draw() {
    background(220, 0, 120);
    translate(cam.width, 0);
    scale(-1, 1);
    image(cam, 0, 0);
    //filter(POSTERIZE, 2);
}



