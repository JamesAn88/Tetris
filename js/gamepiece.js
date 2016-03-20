var gamePieceProperties = {
	gamePieceI: 0,
	gamePieceJ: 1,
	gamePieceL: 2,
	gamePieceO: 3,
	gamePieceS: 4,
	gamePieceT: 5,
	gamePieceZ: 6,
	totalPieces: 6,
	map:[],
	rotation:[],
};

gamePieceProperties.map[gamePieceProperties.gamePieceI] = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 3, y: 0}];
gamePieceProperties.map[gamePieceProperties.gamePieceJ] = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 2, y: 1}];
gamePieceProperties.map[gamePieceProperties.gamePieceL] = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 0, y: 1}];
gamePieceProperties.map[gamePieceProperties.gamePieceO] = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 0, y: 1}, {x: 1, y: 1}];
gamePieceProperties.map[gamePieceProperties.gamePieceS] = [{x: 0, y: 1}, {x: 1, y: 1}, {x: 1, y: 0}, {x: 2, y: 0}];
gamePieceProperties.map[gamePieceProperties.gamePieceT] = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}, {x: 1, y: 1}];
gamePieceProperties.map[gamePieceProperties.gamePieceZ] = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 1, y: 1}, {x: 2, y: 1}];

gamePieceProperties.rotation[gamePieceProperties.gamePieceI]=[[{dx:2,dy:-1},{dx:1,dy:0},{dx:0,dy:1},{dx:-1,dy:2}],[{dx:1,dy:2},{dx:0,dy:1},{dx:-1,dy:0},{dx:-2,dy:-1}],[{dx:-2,dy:1},{dx:-1,dy:0},{dx:0,dy:-1},{dx:1,dy:-2}],[{dx:-1,dy:-2},{dx:0,dy:-1},{dx:1,dy:0},{dx:2,dy:1}]];
gamePieceProperties.rotation[gamePieceProperties.gamePieceJ]=[[{dx:1,dy:-1},{dx:0,dy:0},{dx:-1,dy:1},{dx:-2,dy:0}],[{dx:1,dy:1},{dx:0,dy:0},{dx:-1,dy:-1},{dx:0,dy:-2}],[{dx:-1,dy:1},{dx:0,dy:0},{dx:1,dy:-1},{dx:2,dy:0}],[{dx:-1,dy:-1},{dx:0,dy:0},{dx:1,dy:1},{dx:0,dy:2}]];
gamePieceProperties.rotation[gamePieceProperties.gamePieceL]=[[{dx:1,dy:-1},{dx:0,dy:0},{dx:-1,dy:1},{dx:0,dy:-2}],[{dx:1,dy:1},{dx:0,dy:0},{dx:-1,dy:-1},{dx:2,dy:0}],[{dx:-1,dy:1},{dx:0,dy:0},{dx:1,dy:-1},{dx:0,dy:2}],[{dx:-1,dy:-1},{dx:0,dy:0},{dx:1,dy:1},{dx:-2,dy:0}]];
gamePieceProperties.rotation[gamePieceProperties.gamePieceO]=[[{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0}],[{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0}],[{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0}],[{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0},{dx:0,dy:0}]];
gamePieceProperties.rotation[gamePieceProperties.gamePieceS]=[[{dx:0,dy:-2},{dx:-1,dy:-1},{dx:0,dy:0},{dx:-1,dy:1}],[{dx:2,dy:0},{dx:1,dy:-1},{dx:0,dy:0},{dx:-1,dy:-1}],[{dx:0,dy:2},{dx:1,dy:1},{dx:0,dy:0},{dx:1,dy:-1}],[{dx:-2,dy:0},{dx:-1,dy:1},{dx:0,dy:0},{dx:1,dy:1}]];
gamePieceProperties.rotation[gamePieceProperties.gamePieceT]=[[{dx:1,dy:-1},{dx:0,dy:0},{dx:-1,dy:1},{dx:-1,dy:-1}],[{dx:1,dy:1},{dx:0,dy:0},{dx:-1,dy:-1},{dx:1,dy:-1}],[{dx:-1,dy:1},{dx:0,dy:0},{dx:1,dy:-1},{dx:1,dy:1}],[{dx:-1,dy:-1},{dx:0,dy:0},{dx:1,dy:1},{dx:-1,dy:1}]];
gamePieceProperties.rotation[gamePieceProperties.gamePieceZ]=[[{dx:2,dy:0},{dx:1,dy:1},{dx:0,dy:0},{dx:-1,dy:1}],[{dx:0,dy:2},{dx:-1,dy:1},{dx:0,dy:0},{dx:-1,dy:-1}],[{dx:-2,dy:0},{dx:-1,dy:-1},{dx:0,dy:0},{dx:1,dy:-1}],[{dx:0,dy:-2},{dx:1,dy:-1},{dx:0,dy:0},{dx:1,dy:1}]];



var gamepiece = function(type){
	var startingConfig = gamePieceProperties.map[type];
	//info about current state of tetrominoe
	//tetrominoeState[i].position.x is row
	//tetrominoeState[i].sprite is the actual sprite
	var tetrominoeState = [];
	var length = startingConfig.length;
	var blockColor = Math.floor(Math.random() * (graphicAssets.blocks.frames));
	var curState = 0;
	for (var i = 0; i < length; i++){
		var blockState = {}; //state of a single piece
		var position = {};
		position.x = startingConfig[i].x;
		position.y = startingConfig[i].y;
		var sprite = game.add.sprite(((position.x+gameProperties.shiftX) * gameProperties.tileWidth), ((position.y+gameProperties.shiftY) * gameProperties.tileWidth), graphicAssets.blocks.name, blockColor); //make sprite here
		blockState.position = position;
		blockState.sprite = sprite;
		tetrominoeState.push(blockState);
	}

	this.moveDown = function(){
		for (var a = 0; a < length; a++){
			tetrominoeState[a].position.y+=1;
			tetrominoeState[a].sprite.y+=gameProperties.tileWidth;
		}
	}

	this.moveLeft = function(){
		for (var a = 0; a < length; a++){
			tetrominoeState[a].position.x-=1;
			tetrominoeState[a].sprite.x-=gameProperties.tileWidth;
		}
	}

	this.moveRight = function(){
			for (var a = 0; a < length; a++){
				tetrominoeState[a].position.x+=1;
				tetrominoeState[a].sprite.x+=gameProperties.tileWidth;
			}
	}

	this.getRotationCoords = function(){
		var coords = [];
		for (var a = 0; a < length; a++){
			var transition = gamePieceProperties.rotation[type][curState];
			var newBlockCoords = {};
			newBlockCoords.x = tetrominoeState[a].position.x + transition[a].dx;
			newBlockCoords.y = tetrominoeState[a].position.y + transition[a].dy;
			coords.push(newBlockCoords);
		}
		return coords;
	}

	this.rotate = function(){
		for (var a = 0; a < length; a++){
			var transition = gamePieceProperties.rotation[type][curState];
			tetrominoeState[a].position.x+=transition[a].dx;
			tetrominoeState[a].position.y+=transition[a].dy;
			tetrominoeState[a].sprite.x+=(transition[a].dx*gameProperties.tileWidth);
			tetrominoeState[a].sprite.y+=(transition[a].dy*gameProperties.tileWidth);
		}
		curState = (curState+1)%4;
	}
	/** this stuff should belong to board
	this.canMoveLeft = function(board){
		for (var a = 0; a < length; a++){
			var x = tetrominoeState[a].position.x;
			var y = tetrominoeState[a].position.y;
			if (x == 0){
				return false;
			} else {
				if (board.isFilled(x-1,y)){
					return false;
				}
			}
		}
		return true;
	}

	this.canMoveRight = function(board){
		for (var a = 0; a < length; a++){
			var x = tetrominoeState[a].position.x;
			var y = tetrominoeState[a].position.y;
			if (x == gameProperties.nColumns-1){
				return false;
			} else {
				if (board.isFilled(x+1,y)){
					return false;
				}
			}
		}
		return true;
	}
	
	this.canMoveDown = function(board){
		for (var a = 0; a < length; a++){
			var x = tetrominoeState[a].position.x;
			var y = tetrominoeState[a].position.y;
			if (y == gameProperties.nRows-1){
				return false;
			} else {
				if (board.isFilled(x, y+1)){
					return false;
				}
			}
		}
		return true;
	}
	**/
	this.getCurrentState = function(){
		return tetrominoeState;
	}
};

