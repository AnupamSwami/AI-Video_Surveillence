video = "" ;
status = "" ;
objects = [] ;


function preload() {
    video = createVideo("video.mp4") ;
    video.hide() ;
}

function setup() {
    canvas = createCanvas(480 , 380) ;
    canvas.position(450 , 40) ;
}

function draw() {
    image(video , 0 , 0 , 480 , 380) ;
    if(status != "") {
        objectDetector.detect(video , gotResults) ;
        for(i = 0 ; i < objects.length ; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected" ;
            document.getElementById("number_of_objects").innerHTML = "Objects Detected are : " + objects.length ;

            stroke('#0000FF') ;
            fill('#0000FF') ;
            noFill() ;
            percent = floor(objects[i].confidence * 100) ;
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15) ;
            rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height) ;
        }
    }
}

function gotResults(error , results) {
    if(error) {
        console.error(error) ;
    }
    console.log(results) ;
    objects = results ;
}

function start() {
    objectDetector = ml5.objectDetector("cocossd" , modelLoaded) ;
    document.getElementById("status").innerHTML = "Status : Detecting Object" ;
}

function modelLoaded() {
    console.log("Model Loaded!") ;
    status = true ;
    video.loop() ;
    video.speed(1) ;
    video.volume(0) ;
}