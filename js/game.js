var gameProperties = {

	screenWidth: 800,
    screenHeight: 600,
    
    tileWidth: 30,
    tileHeight: 30,

    wallBlockWidth: 32,

    nRows: 12,
    nColumns: 12, 
};

var graphicAssets = {
    blocks:{URL:'assets/blocks.png', name:'blockAsset', frames:5},
    wall:{URL:'assets/wall.png', name:"wallAsset"},
};

var states = {
	game: "game",
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

		if (this.board.canMoveDown(this.gamePiece)){
			if (this.counter == 60){
				this.gamePiece.moveDown();
				this.counter = -1;
			}
			if (this.cursors.up.isDown && this.cursors.up.repeats % 10 == 0){
				if (this.board.canRotate(this.gamePiece)){
					this.gamePiece.rotate();
				}
			}
		} else {
			//process the collision, update board states
			if (this.counter == 30){
				this.board.pieceLanded(this.gamePiece);
				this.gamePiece = null;
				this.counter = -1;
			}
		}

		if (this.cursors.left.isDown && this.cursors.left.repeats % 5 == 0 && this.board.canMoveLeft(this.gamePiece)){
			this.gamePiece.moveLeft();
		}

		if (this.cursors.right.isDown && this.cursors.right.repeats % 5 == 0 && this.board.canMoveRight(this.gamePiece)){
			this.gamePiece.moveRight();
		}
		this.counter++;
	},	

	makeNextPiece: function(){
		this.nextPieceType = Math.floor(Math.random() * (gamePieceProperties.totalPieces));
	}
};


var game = new Phaser.Game(gameProperties.screenWidth, gameProperties.screenHeight, Phaser.AUTO, 'gameDiv');
game.state.add(states.game, gameState);
game.state.start(states.game);

