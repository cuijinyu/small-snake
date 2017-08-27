//获取到所有地图节点
    var rows=document.querySelectorAll(".row"),blocks=[],i,j;
	var wrap=document.querySelector(".wrap");
	var clone=function(myobj){
		if(typeof myobj!="object"){
			return myobj;
		}
		if(myobj == null){
			return myobj;
		}
		var myNewObj=new Object();
		for(var i in myobj){
			myNewObj[i]=clone(myobj[i]);
		}
		return myNewObj;
	}
	//判断方向函数
	const move=function(direction) {
		if(direction=="up"){
			if(runsnake.forward!="down")
					runsnake.upY();
			}else if(direction=="down"){
				if(runsnake.forward!="up")
					runsnake.downY();
			}else if(direction=="right"){
				 if(runsnake.forward!="left")
					runsnake.rightX();
		  }else if(direction=="left"){
				if(runsnake.forward!="right")
					runsnake.leftX();
			}
		}
	for(i=0;i<10;i++){
		blocks[i]=rows[i].children;
	}
	//数组blocks[10][10]存储了所有的节点
    //游戏的设置
    var gameOpt={
		snakeBeginLength:4,
		speed:5,
		foodspeed:3
    };
    //蛇身类
    const body=function(x,y,next){
    	var self=this;
		this.x=x;
		this.y=y;
		if(next){
			this.next=next
		}else
			this.next=null;
		this.getPosition=function(){
			return {
				x:self.x,
				y:self.y
			}
		};
		this.setNext=function(n){
			self.next=n;
		};
    };
    //食物类
    const food=function(x,y){
    	var self=this;
		this.x=x;
		this.y=y;
		this.getPosition=function () {
			return {
				x:self.x,
				y:self.y
			}
        }
    };
	//snake类
	const snake=function(){
		var self=this;
		this.length=3;
		this.body=[];
        this.tail=new body(4,6);
		this.head=new body(4,4,new body(4,5,self.tail));
		this.forward="up";
	};
	snake.prototype.eatFood=function(){

	};
	//根据首位节点的位置以及当前的方向推断出所有节点的位置
	snake.prototype.getAllBody=function(){
		let headx=this.head.getPosition().x,
			heady=this.head.getPosition().y,
			tailx=this.tail.getPosition().x,
			taily=this.tail.getPosition().y;
		switch (this.forward){
			case "up":;
			case "down":;
			case "left":;
			case "right":;
		}
	};
	//向上方向
	snake.prototype.upY=function(){
        var self=this;
        var point=self.head;
        var flag=clone(self.head);
        self.head.x-=1;
        while(self.head.next){
        	console.log(point);
        	var temp={};
        	if(point.next!='null'&&point.next.x&&point.next.y){
                temp.x=point.next.x;
                temp.y=point.next.y;
                point.next.x=flag.x;
                point.next.y=flag.y;
			}
            if(point.next!='null'){
                point=point.next;
                flag.x=temp.x;
                flag.y=temp.y;
                console.log(flag.x);
                console.log(flag.y);
            }
        }
	};
	//向下方向
	snake.prototype.downY=function (){
        var self=this;
        var point=self.head;
        var flag=clone(self.head);
        self.head.x+=1;
        while(self.head.next){
            console.log(point);
            var temp={};
            if(point.next!='null'&&point.next.x&&point.next.y){
                temp.x=point.next.x;
                temp.y=point.next.y;
                point.next.x=flag.x;
                point.next.y=flag.y;
            }
            if(point.next!='null'){
                point=point.next;
                flag.x=temp.x;
                flag.y=temp.y;
                console.log(flag.x);
                console.log(flag.y);
            }
        }
	};
	//向左方向
	snake.prototype.leftX=function(){
        var self=this;
        var point=self.head;
        var flag=clone(self.head);
        self.head.y-=1;
        while(self.head.next){
            console.log(point);
            var temp={};
            if(point.next!='null'&&point.next.x&&point.next.y){
                temp.x=point.next.x;
                temp.y=point.next.y;
                point.next.x=flag.x;
                point.next.y=flag.y;
            }
            if(point.next!='null'){
                point=point.next;
                flag.x=temp.x;
                flag.y=temp.y;
                console.log(flag.x);
                console.log(flag.y);
            }
        }
	};
	//向右方向
	snake.prototype.rightX=function(){
        var self=this;
        var point=self.head;
        var flag=clone(self.head);
        self.head.y+=1;
        while(self.head.next){
            console.log(point);
            var temp={};
            if(point.next!='null'&&point.next.x&&point.next.y){
                temp.x=point.next.x;
                temp.y=point.next.y;
                point.next.x=flag.x;
                point.next.y=flag.y;
            }
            if(point.next!='null'){
                point=point.next;
                flag.x=temp.x;
                flag.y=temp.y;
                console.log(flag.x);
                console.log(flag.y);
            }
        }
	};
	//撞墙
	snake.prototype.wall=function(){
		var self=this;
		if(self.head.x<0||
			self.head.x>9||
			self.head.y<0||
			self.head.y>9){
			return true;
		}else{
			return false;
		}
	};
	snake.prototype.drawSnake=function(){
		//清空之前的样式
		for(let i=0;i<9;i++){
			for(let j=0;j<9;j++){
                blocks[i][j].setAttribute("class","block");
			}
		}
		var self=this;
		var flag=self.head;
		while (flag!=null){
			var position=flag.getPosition();
			blocks[position.x][position.y].setAttribute("class","block snakebody");
			flag=flag.next;
		}
    }
	const game=function(){
        this.timmer=function(callback) {
        setInterval(
        callback
        ,400)
		};
        this.timmerSnake=function(callback){
        	setInterval(
        		callback,
				1000
			)
		}
	};
	//开始游戏
	game.prototype.play=function(){
		var pop=document.querySelector('.pop');
		var skip=document.querySelector('#skip');
		var elude=document.querySelector('#elude');
		pop.style.display="block";
		var normalpaly=document.querySelector('#normal');
		normalpaly.onclick=()=>{
			gamer.normalBegin();
		};
		skip.onclick=()=>{
			gamer.skipMatch();
		};
		elude.onclick=()=>{
			gamer.elude();
		};
	};
	//游戏暂停
	game.prototype.stop=function(){};
	//绘制画面
	game.prototype.draw=function(){
		console.log("game.draw was called");
		runsnake.drawSnake();
	};
	//普通模式
	game.prototype.normalBegin=function(){
        var pop=document.querySelector('.pop');
        pop.style.display="none";
		let snakeNormal=new snake();
		this.timmer(()=>{
			gamer.draw();
		})
        this.timmerSnake(()=>{
            move(runsnake.forward);
        })
	};
	//过关模式
	game.prototype.skipMatch=function(){
        var pop=document.querySelector('.pop');
        pop.style.display="none";
        let snakeNormal=new snake();
        this.timmer(()=>{
            gamer.draw();
        })
        this.timmerSnake(()=>{
            move(runsnake.forward);
        })
	};
	//躲避模式
	game.prototype.elude=function(){
        var pop=document.querySelector('.pop');
        pop.style.display="none";
        let snakeNormal=new snake();
        this.timmer(()=>{
            gamer.draw();
        })
        this.timmerSnake(()=>{
            move(runsnake.forward);
        })
	};
	//胜利判定
	game.prototype.win=function(){};
	//失败判定
	game.prototype.failed=function(){};

	document.onkeydown=()=> {
        var event = window.event || arguments[0];
        switch (event.keyCode) {
            case 38:
                console.log("it's arrow up");
                runsnake.forward="up";
                break;
            case 37:
                console.log("it's arrow left");
                runsnake.forward="left";
                break;
            case 39:
                console.log("it's arrow right");
                runsnake.forward="right";
                break;
            case 40:
                console.log("it's arrow down");
                runsnake.forward="down";
                break;
            case 32:
                console.log("it's a black");
        }
        console.log(event.code);
    }
	var inheirt=function(child,parent){
		var f=new parent();
		child.prototype=f;
		child.prototype.constructor=child;
	}

	var gamer=new game();
	var runsnake=new snake();
	gamer.play();
	var NormalSnaker=function(){

	};
	var SkipSnaker=function () {

    };
	var EludeSnaker=function () {

    };
	inheirt(NormalSnaker,snake);
	inheirt(SkipSnaker,snake);
	inheirt(EludeSnaker,snake);
