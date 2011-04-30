define(["jquery", "board", "renderer"], function($,boardFactory,renderer) {
	var frameRate = 1000/30;
	var generationLabel = $('#generation');	
	
	function reset(board, boardType) {
		board.reset(boardType);
		renderer.render(board);
	}
	
	return {
		board: null,
		paused: true,
		begin: function() {
			var that = this;
			
			$('#startButton').click(function() {
				var msg = 'Pause';
				that.paused = !that.paused;
				if (that.paused) {
					msg = 'Resume';
				}
				$('#startButton').attr('value', msg);
			});
			$('#resetButton').click(function() {
				that.paused = true;
				$('#startButton').attr('value', 'Start');
				reset(that.board, $('#boardType').val());
				generationLabel.html(that.board.generation);
			});
			
			this.board = boardFactory.create();
			reset(this.board, 'random');
			setTimeout(function() { that.nextGeneration(); }, frameRate);
		},
		resume: function() {
			this.paused = false;
		},
		nextGeneration: function() {
			var that = this;
			if (!this.paused) {
				this.board.update();
				renderer.render(this.board);
				generationLabel.html(this.board.generation);
			}
			setTimeout(function() { that.nextGeneration(); }, frameRate);
		}
	};
});