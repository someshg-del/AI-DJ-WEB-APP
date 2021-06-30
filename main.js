song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;

function preload() {
    song = loadSound("music.mp3")
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", gotPoses);

}

function modelLoaded() {
    console.log("model is loaded");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results)

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;


    }

}



function draw() {
    image(video, 0, 0, 600, 500);
    if (score_leftWrist > 0.2) {

        circle(leftWristX, leftWristY, 20);

        leftWristY = number(leftWristY);
        remove_decimals = floor(leftWristY);
        volume = remove_decimals / 500;


        song.setVolume(volume);
        document.getElementById("volume_id").innerHTML = "volume=" + volume;


    }



    if (score_rightWrist > 0.2) {

        circle(rightWristX, rightWristY, 20);

        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed_id").innerHTML = "Speed=0.5x"
            song.rate(0.5);

        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed_id").innerHTML = "Speed=1x"
            song.rate(1);

        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed_id").innerHTML = "Speed=1.5x"
            song.rate(1.5);

        }
        else if (rightWristY>300 && rightWristY<=400){
            document.getElementById("speed_id").innerHTML = "Speed=2x"
            song.rate(2);

        }
        else if (rightWristY>400 && rightWristY<=500){
            document.getElementById("speed_id").innerHTML = "Speed=2.5x"
            song.rate(2.5);

        }

    }

}


function play() {
    song.play();
    song.setVolume(1);
    song.rate(1);
}