var board = function(rows, columns){
	//originally meant for x value to mean row, y for column
	//forgot cartesian coordinates are opposite,
	//so instead of fixing it, (x,y) is the x-th, y-th 
	//block in cartesian coordinate

	var rowsOfBlocks = [];

	//number of filled blocks in a row, and I actually
	//mean row
	var rowCount = [];
	for (var i = 0; i < columns; i++){
		//actually a column, not a row, see comment above
		var rowOfBlocks = [];
		for (var j = 0; j < rows; j++){
			rowOfBlocks.push(new block(i, j));
			rowCount[j] = 0;		
		}
		rowsOfBlocks.push(rowOfBlocks);
	}

	this.getRows = function(){
		return rowsOfBlocks;
	}

	this.isFilled = function(x, y){
		return rowsOfBlocks[x][y].getState();
	}

	this.canMoveLeft = function(gamePiece){
		var state = gamePiece.getCurrentState();
		var length = state.length;
		for (var a = 0; a < length; a++){
			var x = state[a].position.x;
			var y = state[a].position.y;
			if (x == 0){
				return false;
			} else {
				if (this.isFilled(x-1,y)){
					return false;
				}
			}
		}
		return true;	
	}

	this.canMoveRight = function(gamePiece){
		var state = gamePiece.getCurrentState();
		var length = state.length;
		for (var a = 0; a < length; a++){
			var x = state[a].position.x;
			var y = state[a].position.y;
			if (x == gameProperties.nColumns-1){
				return false;
			} else {
				if (this.isFilled(x+1,y)){
					return false;
				}
			}
		}
		return true;
	}

	this.canMoveDown = function(gamePiece){
		var state = gamePiece.getCurrentState();
		var length = state.length;
		for (var a = 0; a < length; a++){
			var x = state[a].position.x;
			var y = state[a].position.y;
			if (y == gameProperties.nRows-1){
				return false;
			} else {
				if (this.isFilled(x,y+1)){
					return false;
				}
			}
		}
		return true;
	}

	this.pieceLanded = function(gamePiece){
		var state = gamePiece.getCurrentState();
		var length = state.length;
		var completeRows=[];
		for (var a = 0; a < length; a++){
			var x = state[a].position.x;
			var y = state[a].position.y;
			rowsOfBlocks[x][y].setState(true);
			rowsOfBlocks[x][y].setSprite(state[a].sprite);
			rowCount[y]++;
			if (rowCount[y] == gameProperties.nColumns){
				//a row is full
				completeRows.push(y);
			}
		}
		if (completeRows.length > 0){
			this.processCompleteRows(completeRows);
		}
	}

	this.processCompleteRows = function(completeRows){
		//completeRows is an array of row numbers 
		//that are full
		var highestRow = completeRows[0]; //should never be null
		var nRowsFinished = completeRows.length;
		for (var i = 0; i < nRowsFinished; i++){
			if (highestRow > completeRows[i]){
				//higher row is lower y coordinate
				highestRow = completeRows[i];
			}
			for (var a = 0; a < gameProperties.nColumns; a++){
				rowsOfBlocks[a][completeRows[i]].reset(true);
			}
			rowCount[completeRows[i]] = 0;
		}
		var i = highestRow - 1;
		var moreCompletedRows = [];
		while (i >= 0 && rowCount[i] > 0){
			for (var a = 0; a < gameProperties.nColumns; a++){
				if (this.isFilled(a,i)){
					var sprite = rowsOfBlocks[a][i].getSprite();
					var newYPosition = i+1;
					while (newYPosition<gameProperties.nRows-1&&!this.isFilled(a, newYPosition+1)){
						newYPosition++;
					}
					sprite.y=gameProperties.tileWidth*(newYPosition);
					rowsOfBlocks[a][i].reset(false);
					rowsOfBlocks[a][newYPosition].setSprite(sprite);
					rowsOfBlocks[a][newYPosition].setState(true);
					rowCount[newYPosition]++;
					if (rowCount[newYPosition] == gameProperties.nColumns){
						//a row is full
						moreCompletedRows.push(newYPosition);
					}
					rowCount[i]--;
				}
			}
			i--;
		}
		if (moreCompletedRows.length > 0){
			this.processCompleteRows(moreCompletedRows);
		}
	}

	this.rotate = function(gamePiece){

	}
};