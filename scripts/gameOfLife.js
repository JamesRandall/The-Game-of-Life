define(["jquery", "board", "renderer"], function($,boardFactory,renderer) {
	var board;
	var frameRate = 1000/30;
	return {
		begin: function() {
			var that = this;
			board = boardFactory.create();
			board.randomize();
			renderer.render(board);
			setTimeout(function() { that.nextGeneration(); }, frameRate);
		},
		nextGeneration: function() {
			var that = this;
			board.update();
			renderer.render(board);
			setTimeout(function() { that.nextGeneration(); }, frameRate);
		}
	};
});