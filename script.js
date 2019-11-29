(function() {
  function Box(parentElement) {
    this.x = 10;
    this.y = 10;
    this.speed = 1;
    this.width = 20;
    this.height = 20;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;

    this.init = function() {
      var box = document.createElement("div");
      box.style.backgroundColor=getRandomColor();
      box.style.height = this.height + "px";
      box.style.width = this.width + "px";
      box.classList.add("box");
      this.parentElement.appendChild(box);
      this.element = box;
      this.element.onclick = this.boxClicked.bind(this);
      this.draw();
      return this;
    };
   
    function getRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    this.setPostion = function(x, y, boxes) {

        this.x = x;
        this.y = y;
 
    };
    this.setspeed = function(x) {
      this.speed = x;
    };

    this.setSize = function(x) {
      this.width = x;
      this.height = x;
    };

    this.boxClicked = function() {
      console.log("boxClicked", this.width);
    };

    this.draw = function() {
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";
      this.element.style.width = this.width + "px";
      this.element.style.height = this.height + "px";
    };

    this.move = function() {
      if (this.y + this.speed < 0 || this.y + this.speed > 500 - this.height)
        this.speed = -this.speed;
      this.y += this.speed;
      if (this.x + this.speed < 0 || this.x + this.speed > 500 - this.width)
        this.speed = -this.speed;
      this.x += this.speed;
      this.y += this.speed;
      this.draw();
    };

    this.checkCollision = function(boxes) {
      // console.log("boxes", boxes.length);
      for (var i = 0; i <= boxes.length - 1; i++) {
        var a = this.x - boxes[i].x;
        var b = this.y - boxes[i].y;

        var dis = Math.sqrt(a * a + b * b);

        if (dis < (this.width + boxes[i].width) / 2 && dis > this.width / 2) {
          // console.log("inside" + dis);
          this.speed = -this.speed;
        }
      }
    };
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * max;
  }

  function Game(parentElement, boxCount) {
    var boxes = [];
    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500 ;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 15;

    this.startGame = function() {
      for (var i = 0; i < this.boxCount; i++) {
        var box = new Box(parentElement).init();
        boxes.push(box);

        box.setPostion(
          getRandomArbitrary(0, (MAX_WIDTH-box.width)),
          getRandomArbitrary(0, (MAX_HEIGHT-box.height)),
          boxes
        );
        box.draw();
      }

      setInterval(this.moveBoxes.bind(this), 15);
    };

    this.moveBoxes = function() {
      for (var i = 0; i < this.boxCount; i++) {
        boxes[i].move();
        boxes[i].checkCollision(boxes);
      }
    };
  }

  var parentElement = document.getElementById("app");

  new Game(parentElement).startGame();
})();
