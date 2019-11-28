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
      box.style.height = this.height + "px";
      box.style.width = this.width + "px";
      box.classList.add("box");
      this.parentElement.appendChild(box);
      this.element = box;
      this.element.onclick = this.boxClicked.bind(this);
      this.draw();

      return this;
    };

    this.setPostion = function(x, y) {
        this.x=x
        this.y = y;
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
      this.element.style.width=this.width+"px";
      this.element.style.height=this.height+"px";
    };

    this.move = function() {
      if (this.y < 0 || this.y >= 480) this.speed = -this.speed;
      this.y += this.speed;
      if (this.x < 0 || this.x >= 480) this.speed = -this.speed;
      this.x += this.speed;
      this.y += this.speed;
      this.draw();
    };

    this.checkCollision = function(boxes) {
      // console.log("boxes", boxes.length);
      for (var i = 0; i <= boxes.length-1; i++) {
        var a = this.x - boxes[i].x;
        var b = this.y - boxes[i].y;

        var dis = Math.sqrt(a * a + b * b);
       

        if (dis <= 20 && dis>0 ) {
            console.log("inside"+dis);
           this.speed = -this.speed;
        }
      }
    };
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }
 

  function Game(parentElement, boxCount) {
    var boxes = [];
    var MAX_WIDTH = 480;
    var MAX_HEIGHT = 480;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 10;

    this.startGame = function() {
      for (var i = 0; i < this.boxCount; i++) {
        var box = new Box(parentElement).init();
        box.setPostion(
          getRandomArbitrary(0, MAX_WIDTH),
          getRandomArbitrary(0, MAX_HEIGHT)
        );
       // box.setSize( getRandomArbitrary(20, 50));
        box.draw();
       
        boxes.push(box);
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
