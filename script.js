(function() {
  function Box(parentElement, isant) {
    this.x = 10;
    this.y = 10;
    if(isant==false)
    {
      this.width = 20;
    this.height = 20;
    }
    else{
      this.rotate=90;
      this.width = 60;
    this.height = 60;
    }
    
    this.dx = 1;
    this.dy = -1;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;
    this.ant = isant;

    this.init = function() {
      // console.log(this.ant);
      if (this.ant == false) {
        console.log(this.ant);
        var box = document.createElement("div");
        box.style.backgroundColor = getRandomColor();
        box.style.height = this.height + "px";
        box.style.width = this.width + "px";
        box.classList.add("box");
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = this.boxClicked.bind(this);
        this.draw();
        return this;
      } else {
        var box = document.createElement("div");
        box.style.backgroundImage = "url('a.gif')";
        box.style.backgroundSize = "cover";
        box.style.height = this.height   + "px";
        box.style.width = this.width + "px";
        box.classList.add("box");
        this.parentElement.appendChild(box);
        this.element = box;
        this.element.onclick = this.boxClicked.bind(this);
        this.draw();
        return this;
      }
    };

    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
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
      if (x % 2 == 0) {
        this.speed = this.speed;
      } else {
        this.speed = -this.speed;
      }
    };

    this.setSize = function(x) {
      this.width = x;
      this.height = x;
    };

    this.boxClicked = function() {
     
      if(this.ant==true)
      {
       
        this.element.style.backgroundImage="url('b.jpg')";
      var a=  this.element;
        setTimeout(function()
        {
          a.style.display = "none";
        }
        ,100);
        
      }

    };

    this.draw = function() {
      this.element.style.left = this.x + "px";
      this.element.style.top = this.y + "px";
      this.element.style.width = this.width + "px";
      this.element.style.height = this.height + "px";
    };

    this.move = function(i) {
      if (this.x + this.dx > 500 - this.width || this.x + this.dx < 0) {
        this.dx = -this.dx;
        if(this.ant==true)
        {
          this.rotate=-this.rotate;
          this.element.style.transform=" rotate("+this.rotate +"deg)";
        }
      }
      if (this.y + this.dy > 500 - this.width || this.y + this.dy < 0) {
        this.dy = -this.dy;
        if(this.ant==true)
        {
          this.rotate=-this.rotate;
          this.element.style.transform=" rotate("+this.rotate +"deg)";
        }
      }

      this.x += this.dx;
      this.y += this.dy;
      this.draw();
    };

    this.checkCollision = function(boxes) {
      for (var i = 0; i <= boxes.length - 1; i++) {
        var a = this.x - boxes[i].x;
        var b = this.y - boxes[i].y;

        var dis = Math.sqrt(a * a + b * b);

        if (dis < (this.width + boxes[i].width) / 2 && dis > this.width / 2) {
          this.dx = -this.dx;
          this.dy = -this.dy;
          if(this.ant==true)
          {
            this.rotate=-this.rotate;
            this.element.style.transform=" rotate("+this.rotate +"deg)";
          }
        }
      }
    };
  }

  function getRandomArbitrary(min, max) {
    return Math.random() * max;
  }

  function Game(parentElement, boxCount, isant) {
    var boxes = [];
    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 10;

    this.startGame = function() {
      for (var i = 0; i < this.boxCount; i++) {
        var box = new Box(parentElement, isant).init();
        boxes.push(box);
        box.setPostion(
          getRandomArbitrary(0, MAX_WIDTH - box.width),
          getRandomArbitrary(0, MAX_HEIGHT - box.height),
          boxes
        );
        box.setspeed(i);

        box.draw();
      }

      setInterval(this.moveBoxes.bind(this), 10);
    };

    this.moveBoxes = function() {
      for (var i = 0; i < this.boxCount; i++) {
        boxes[i].move();
        boxes[i].checkCollision(boxes);
      }
    };
  }

  var parentElement = document.getElementById("app");
  var parentElement2 = document.getElementById("app1");
  new Game(parentElement, 20, false).startGame();
  new Game(parentElement2, 10, true).startGame();
})();
