var block = function(row, column){

	var currentState = false;
	var sprite;

	this.getRow = function(){
		return row;
	}

	this.getColumn = function(){
		return column;
	}

	this.getSprite = function(){
		return sprite;
	}

	this.getState = function(){
		return currentState;
	}

	this.setState = function(bool){
		currentState = bool;
	}

	this.setSprite = function(sp){
		sprite = sp;
	}

	this.reset = function(destroy){
		currentState = false;
		if (destroy){
			sprite.destroy();
		}
		currentSprite = null;
	}
};