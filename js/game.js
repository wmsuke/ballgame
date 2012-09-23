var oriX = 0, oriY = 0;
var system;

var gameMain = arc.Class.create(arc.Game, {
	x:200,
	y:200,
	_sp:null,
	_timer:null,
	_timeTxt:null,
  //Gameパラメーターをセットする処理等の初期化処理
  initialize:function(params){
	//タイマー表示テキスト
	this._timer = new arc.Timer();
	this._timeTxt = new arc.display.TextField();

	//スタートボタン
	this._cover = new Cover();
	this._cover.addEventListener(arc.Event.TOUCH_END, arc.util.bind(this._onClickCover, this));
	this.addChild(this._cover);
  },
  
  //Coverのクリックハンドラ
	_onClickCover: function(event){
		this.removeChild(this._cover);
		this._start();
	},
	
  _start: function(event){
  	//タイマー表示
	this._timeTxt.setX(225);
	this._timeTxt.setY(20);
	this._timeTxt.setAlign(arc.display.Align.CENTER);
	this._timeTxt.setFont("Helvetica", 30, true);
	this.addChild(this._timeTxt);
	this._timer.start();
	
  	//玉の配置
    this._sp = new arc.display.Sprite(this._system.getImage('img/circle.png'));
    this.addChild(this._sp);
  },
  
  update:function(){
	//時間経過
	var elapsed = this._timer.getElapsed(),
	    sec = ("00" + Math.floor(elapsed / 1000)).slice(-2),
	    msec =("00" + Math.floor((elapsed % 1000) / 10)).slice(-2);
	this._timeTxt.setText(sec + ":" + msec);
	
	//ボールの位置を移動
  	 if(this._sp){
		 this.x += oriX;
		 this.y += oriY;
		 this._sp.setX(this.x);
		 this._sp.setY(this.y);
		 //画面外に行ったらGAME OVER
		 if( this.x > 450 || this.x < 0 || this.y < 20 || this.y > 450 ){
			this._timer.stop();		 	
		 }
  	 }
  }
},
	false);

//傾きイベント取得
jQuery(function($) {
	window.addEventListener("deviceorientation", function(evt){
		var alpha = evt.alpha; // 方角
		oriY = evt.beta;  // 前後の傾き
		oriX = evt.gamma; // 左右の傾き
		var absolute = evt.absolute; // 3つの値が取得できたかのboolean
	});
});

//STARTボタン
var Cover = arc.Class.create(arc.display.DisplayObjectContainer, {
	initialize:function(){
		//黒背景
		this._bg = new arc.display.Shape();
		this._bg.beginFill(0x000000, 0.7);
		this._bg.drawRect(0, 0, system.getWidth(), system.getHeight());
		this._bg.endFill();

		//スタート表示のテキスト
		this._txt = new arc.display.TextField();
		this._txt.setAlign(arc.display.Align.CENTER);
		this._txt.setFont("Helvetica", 30, true);
		this._txt.setText("START");
		this._txt.setX(system.getWidth() / 2);
		this._txt.setY(system.getHeight() / 2);
		this._txt.setColor(0xffffff);

		this.addChild(this._bg);
		this.addChild(this._txt);
	}
});

window.addEventListener('DOMContentLoaded', function(e){
  //ゲームのサイズとcanvasのidを渡す
  system = new arc.System(450, 450, 'canvas');

  //第二引数で渡したオブジェクトがゲームクラスのinitializeの引数として渡される
  system.setGameClass(gameMain);

  //画像パスを配列で指定して読み込み開始
  system.load(['img/circle.png']);
}, false);


