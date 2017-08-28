    //获取到所有地图节点
    var rows=document.querySelectorAll(".row"),blocks=[],i,j;
	var wrap=document.querySelector(".wrap");
    var gamer;
    //snake类
    var inheirt=function(child,parent){
        var f=new parent();
        child.prototype=f;
        child.prototype.constructor=child;
    }
    let returnButton=document.getElementById("returnMain");
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
    const failed=function () {
        let failedmenu=document.getElementsByClassName("failed");
        failedmenu[0].style.display="block";
    }
    const win=function () {
        let winmenu=document.getElementById("win");
        winmenu.style.display="block";
    }
    const returnMain=function (condition) {
        let pop=document.querySelector('.pop');
        if(condition=="win"){
            let winmenu=document.getElementById("win");
            winmenu.style.display="none";
            pop.style.display="block";
            runsnake=new snake();
            gamer=null;
        }else{
            let failedmenu=document.getElementById("failed");
            failedmenu.style.display="none";
            pop.style.display="block";
            gamer.stop();
            runsnake=new snake();
            gamer=null;
        }
    };
    returnButton.onclick=function(){
        returnMain("failed");
    };
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
    const game=function(){
        this.timmer=setInterval(
            ()=>{
                //控制画面的绘制
                gamer.draw();
            }
            ,200);
        this.timmerSnake=setInterval(
            ()=>{
                //控制蛇身
                move(runsnake.forward);
            },
            1000
        );

        this.timmerFailed=setInterval(
            ()=>{
                gamer.failed();
            },
            500
        );
    };
    const snake=function(){
        var self=this;
        this.length=3;
        this.body=[];
        this.tail=new body(4,6);
        this.head=new body(4,4,new body(4,5,self.tail));
        this.forward="up";
    };
    snake.prototype.eatFood=function(){
        var self=this;
        switch (self.forward){
            case "up":this.tail.next=new body(this.tail.x+1,this.tail.y);
                this.tail=clone(this.tail.next);
                break;
            case "down":this.tail.next=new body(this.tail.x-1,this.tail.y);
                this.tail=clone(this.tail.next);
                break;
            case "left":this.tail.next=new body(this.tail.x,this.tail.y+1);
                this.tail=clone(this.tail.next);
                break;
            case "right":this.tail.next=new body(this.tail.x,this.tail.y-1);
                this.tail=clone(this.tail.next);
                break;
        }
    };
    //根据首位节点的位置以及当前的方向推断出所有节点的位置
    /*snake.prototype.getAllBody=function(){
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
     };*/
    //向上方向
    snake.prototype.upY=function(){
        var self=this;
        var point=self.head;
        var flag=clone(self.head);
        self.head.x-=1;
        while(self.head.next){
            console.log(point);
            var temp={};
            temp.x=point.next.x;
            temp.y=point.next.y;
            point.next.x=flag.x;
            point.next.y=flag.y;
            if(point.next!=='null'){
                point=point.next;
                flag.x=temp.x;
                flag.y=temp.y;
                console.log(flag.x);
                console.log(flag.y);
            }
            if(point.next==null){
                return false;
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
            temp.x=point.next.x;
            temp.y=point.next.y;
            point.next.x=flag.x;
            point.next.y=flag.y;
            if(point.next!='null'){
                point=point.next;
                flag.x=temp.x;
                flag.y=temp.y;
                console.log(flag.x);
                console.log(flag.y);
            }
            if(point.next==null){
                return false;
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
            temp.x=point.next.x;
            temp.y=point.next.y;
            point.next.x=flag.x;
            point.next.y=flag.y;
            if(point.next!='null'){
                point=point.next;
                flag.x=temp.x;
                flag.y=temp.y;
                console.log(flag.x);
                console.log(flag.y);
            }
            if(point.next==null){
                return false;
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
            temp.x=point.next.x;
            temp.y=point.next.y;
            point.next.x=flag.x;
            point.next.y=flag.y;
            if(point.next!='null'){
                point=point.next;
                flag.x=temp.x;
                flag.y=temp.y;
                console.log(flag.x);
                console.log(flag.y);
            }
            if(point.next==null){
                return false;
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
    //判断是否吃到自己
    snake.prototype.eatItself=function () {};
    snake.prototype.drawSnake=function(){
        //清空之前的样式
        for(let i=0;i<=9;i++){
            for(let j=0;j<=9;j++){
                blocks[i][j].setAttribute("class","block");
            }
        }
        try {
            var self = this;
            var flag = clone(self.head);
            while (flag != null) {
                var position = flag.getPosition();
                blocks[position.x][position.y].setAttribute("class", "block snakebody");
                flag = flag.next;
            }
        }catch(err){
            console.log("You are failed");
        }
    }

    var NormalSnaker=function(){
        var self=this;
        this.length=3;
        this.body=[];
        this.tail=new body(4,6);
        this.head=new body(4,4,new body(4,5,self.tail));
        this.forward="up";
    };
    var SkipSnaker=function () {
        var self=this;
        this.length=3;
        this.body=[];
        this.tail=new body(4,6);
        this.head=new body(4,4,new body(4,5,self.tail));
        this.forward="up";
    };
    var EludeSnaker=function () {
        var self=this;
        this.length=3;
        this.body=[];
        this.tail=new body(4,6);
        this.head=new body(4,4,new body(4,5,self.tail));
        this.forward="up";
    };
    inheirt(NormalSnaker,snake);
    inheirt(SkipSnaker,snake);
    inheirt(EludeSnaker,snake);
	//开始游戏
	function play(){
		var pop=document.querySelector('.pop');
		var skip=document.querySelector('#skip');
		var elude=document.querySelector('#elude');
		pop.style.display="block";
		var normalpaly=document.querySelector('#normal');
		normalpaly.onclick=()=>{
            gamer=new game();
			gamer.normalBegin();
		};
		skip.onclick=()=>{
            gamer=new game();
			gamer.skipMatch();
		};
		elude.onclick=()=>{
            gamer=new game();
			gamer.elude();
		};
	};
	//游戏暂停
	game.prototype.stop=function(){
	    clearInterval(this.timmerFailed);
	    clearInterval(this.timmerSnake);
	    clearInterval(this.timmer);
	    console.log("--------------------------")
        console.log("--------------------------")
        console.log("--------------------------")
	    console.log("game has been stoped");
        console.log("--------------------------")
        console.log("--------------------------")
        console.log("--------------------------")
    };
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
        this.timmerFailed(()=>{
        	gamer.failed();
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
	};
	//胜利判定
	game.prototype.win=function(){
		for(let i=0;i<=9;i++){
			for(let j=0;j<=9;j++){
				if(blocks[i][j].className!='block snakebody'){
					return false;
				}else{
					win();
					return true;
				}
			}
		}
	};
	//失败判定
	game.prototype.failed=function(){
		if(runsnake.wall()){
            failed();
            return true;
		}else if(runsnake.eatItself())
		{
            failed();
			return true;
		}
	};
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
	var runsnake=new snake();
	play();

