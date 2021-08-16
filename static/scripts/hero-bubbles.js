// Variables, values are all percentage or multipler of the browser height or width to allow the animation to be responsive.
var fullWidth = $('body').width();
var fullHeight = $(window).height();
var strokeWidth = fullHeight * 0.02;
var objectSize = fullHeight * 0.0605; // Triange, others are scaled based off it
var floorHeight = fullHeight * 0.1;
var totalFloorHeight = fullHeight - floorHeight - strokeWidth / 2;
var obstacleHeight = fullHeight * 0.09;
var moveSpeed = fullHeight / 56;

// Creates the canvas on document ready.
$(document).ready(function() {
    if($(".hero").length) {
        heroCanvas.create();
        $('.hero__bg').height(fullHeight);
    }
});

// Resizes all the variables so the browser size can be cahnged without breaking the animation
$(window).resize(function() {
    setTimeout(function() {resizeWindow();}, 100);
});

function resizeWindow() {
    fullWidth = $('body').width();
    fullHeight = $(window).height();
    $('#hero-bubbles').attr('width', fullWidth).attr('height', fullHeight)
    $('.hero__bg').height(fullHeight);
    floorGlow.height = fullHeight * 0.2;
    floorGlow.width = fullWidth;
    floorGlow.y = fullHeight - fullHeight * 0.2;
    bubbleArray = []
    loopCounter = 0;
}
 
// Variables
var loopState = 0; // Controls Start, Pause, Background
var loopCounter = 0; // How many times the loop has updated
var perfectFrameTime = 1000 / 300;
var deltaTime = 0;
var lastTimestamp = 0;

// Canvas
var heroCanvas = {
    // Cancus Creation
    canvas : document.createElement('canvas'),
    create : function() {  //Initial Creation
        this.canvas.setAttribute('id', 'hero-bubbles');
        // Full size of browser
        this.canvas.width  = fullWidth;
        this.canvas.height = fullHeight;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.ctx = this.canvas.getContext("2d");
        loopState = 1; // If 1 the animation loop runs
        loopCounter = 0;

        // Start Animation
         this.loop();
    },

    // Wipes the canvas clean by removing all it content
    clear: function() {
        heroCanvas.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); //Clears Canvas
    },

    // ANIMATION LOOP START
    // UpdateS the canvas each time it runs
    loop: function(timestamp) {
        if(loopState == 1) {                        // Allows the animation to be pause as the animation only runs in state 1
            requestAnimationFrame(heroCanvas.loop); // Re calls this fuction to complete the loop (calling this.loop doesn't work)
        }


        deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
        lastTimestamp = timestamp;

        if (loopCounter == 1) {                     // If loop hasn't run create 35 bubbles
            for (i = 0; i < 35; i++) {
                bubbleArray.push(new Bubble());
            }
        }

        else if (loopCounter % 4 == 0) {            // Every fourth time the loop has run create a new bubble.
            bubbleArray.push(new Bubble());
        }

        heroCanvas.clear();                         // Clears last frame

        floorGlow.draw();                           // Draw Glow

        for(i = 0; i < bubbleArray.length; i++) {   // Draw then apply movement physics and fading. Remove bubble if opacity requirements are met.
            bubbleArray[i].draw();            
            bubbleArray[i].physics()               
            bubbleArray[i].removeFaded()                 
        }
        loopCounter += 1;                           // Add 1 to the amount of time the loop has been run used for map render and background title creator
    },
    // ANIMATION LOOP END
};


// Floor Glow (Gradient)
var floorGlow = {
    height: fullHeight * 0.15,
    width: fullWidth,
    x: 0,
    y: fullHeight - fullHeight * 0.15,
    
    // Draws Glow
    draw: function() {
        var grd = heroCanvas.ctx.createLinearGradient(0,this.y,0,fullHeight);
        grd.addColorStop(0,'rgba(228,83,0,0)');
        grd.addColorStop(1,'rgba(228,83,0,1)');
        heroCanvas.ctx.fillStyle = grd;
        heroCanvas.ctx.beginPath();
        heroCanvas.ctx.fillRect(this.x, this.y, this.width, this.height);
        heroCanvas.ctx.closePath();
        heroCanvas.ctx.fill();
    },
}

// Random Number Generator
function randomNumber(min, max) { // min and max included 
    return Math.random() * (max - min) + min;
}

// Bubbles
var bubbleArray = []

function Bubble() {
    this.x = randomNumber(fullWidth*0.01, fullWidth*0.99);
    this.y = randomNumber(floorGlow.y, fullHeight);
    this.speed = floorGlow.height*0.002;
    this.calSpeed = function() {
        this.speed = randomNumber(floorGlow.height*0.002, floorGlow.height*0.006)
    };
    this.drawCount = 0;
    this.radius = 20;
    this.opacity = 1;
    this.opacityStep = 0;
    this.maxHeight = randomNumber(floorGlow.y*0.5, floorGlow.y*0.8);
    this.circleCenterX = this.x + this.radius;
    this.circleCenterY = this.y + this.radius;

    // Sets the radias and opacity of the bubbles based on their y axis starting position.
    this.calVars = function() {
        if (this.y <= fullHeight - floorGlow.height*0.8) {                          // Top of glow, smallest bubbles
            this.radius = randomNumber(fullHeight*0.001, fullHeight*0.002);
            this.opacity = randomNumber(0.1, 0.2);
        }
        else  if (this.y <= fullHeight - floorGlow.height*0.6) {
            this.radius = randomNumber(fullHeight*0.00175, fullHeight*0.00275);
            this.opacity = randomNumber(0.2, 0.4);
        }
        else  if (this.y <= fullHeight - floorGlow.height*0.4) {
            this.radius = randomNumber(fullHeight*0.00250, fullHeight*0.00350);
            this.opacity = randomNumber(0.4, 0.6);
        }
        else  if (this.y <= fullHeight - floorGlow.height*0.2) {
            this.radius = randomNumber(fullHeight*0.00325, fullHeight*0.00425);
            this.opacity = randomNumber(0.6, 0.8);
        }
        else {                                                                      // Bottom of glow, largest bubbles
            this.radius = randomNumber(fullHeight*0.004, fullHeight*0.005)
            this.opacity = randomNumber(0.8, 1);
        }
    };

    // Draws the bubble
    this.draw = function() {
        if (this.drawCount == 0) {
            this.calVars()
            this.calSpeed()
        }
        heroCanvas.ctx.fillStyle = `rgba(228,83,0,${this.opacity})`;
        heroCanvas.ctx.beginPath();
        heroCanvas.ctx.arc(this.circleCenterX, this.circleCenterY, this.radius, 0, 2 * Math.PI, true);
        heroCanvas.ctx.closePath();
        heroCanvas.ctx.fill();
        this.drawCount += 1
    };

    // Moves the bubbles up the canvas and reduced their opacity.
    this.physics = function() {
        this.circleCenterY -= this.speed
        if (this.drawCount == 1) {
            this.opacityStep = this.opacity/((this.circleCenterY - this.maxHeight)/this.speed)
        }
        this.opacity -= this.opacityStep
    };

    // Removes the bubbles from the Bubble Array when their opacity is 0 or less.
    this.removeFaded = function() {
        if (this.opacity <= 0) {
            bubbleArray.splice(i, 1)
        }
    };
}