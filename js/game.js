var gameProperties = {
	
	shiftX: 1,
	shiftY: 4,

	screenWidth: 800,
    screenHeight: 600,
    
    tileWidth: 30,
    tileHeight: 30,

    nRows: 15,
    nColumns: 15,
};

var graphicAssets = {
    blocks:{URL:'assets/blocks.png', name:'blockAsset', frames:5},
    wall:{URL:'assets/wall.png', name:"wallAsset"},
};

var states = {
	start: "menu",
	game: "game",
};

var menuState = function(game){

};

var gameState = function(game){
	this.board;
	this.gamePiece;
	this.nextPieceType;
	this.cursors;
	this.counter;
};

gameState.prototype = {

	preload: function(){
		game.load.spritesheet(graphicAssets.blocks.name, graphicAssets.blocks.URL, gameProperties.tileWidth, gameProperties.tileHeight, graphicAssets.blocks.frames);
		game.load.image(graphicAssets.wall.name, graphicAssets.wall.URL);
	},

	create: function(){
		game.physics.startSystem(Phaser.Physics.ARCADE);
		this.board = new board(gameProperties.nRows, gameProperties.nColumns);
		this.makeNextPiece();
		this.cursors = game.input.keyboard.createCursorKeys();
		this.counter = 0;
		//alert(this.board.isFilled(1,2));
		//alert(this.board.isRowFull(245));
	},

	update: function(){
		if (!this.gamePiece){
			this.gamePiece = new gamepiece(this.nextPieceType);
			this.makeNextPiece();
		}

		if (this.counter == 30){
			if (this.board.canMoveDown(this.gamePiece)){
				this.gamePiece.moveDown();
			} else {
				this.board.pieceLanded(this.gamePiece);
				this.gamePiece = null;
			}
			this.counter = -1;
		}

		if (this.gamePiece){ //in case it gets set to null before the next frame update
			if (this.cursors.left.isDown && this.cursors.left.repeats % 5 == 0 && this.board.canMoveLeft(this.gamePiece)){
				this.gamePiece.moveLeft();
			}

			if (this.cursors.right.isDown && this.cursors.right.repeats % 5 == 0 && this.board.canMoveRight(this.gamePiece)){
				this.gamePiece.moveRight();
			}

			if (this.cursors.up.isDown && this.cursors.up.repeats % 10 == 0){
				if (this.board.canRotate(this.gamePiece)){
					this.gamePiece.rotate();
				}
			}
		}
		
		this.counter++;
	},	

	makeNextPiece: function(){
		this.nextPieceType = Math.floor(Math.random() * (gamePieceProperties.totalPieces));
	}
};


var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add(states.game, gameState);
game.state.add(states.start, menuState);
//game.state.start(state.start);
game.state.start(states.game);


