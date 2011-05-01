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
			var canvas = $('#gameOfLifeCanvas');
			
			function pause() {
				that.paused = true;
				$('#startButton').attr('value', 'Start');
			};
			
			$('#startButton').click(function() {
				var msg = 'Pause';
				that.paused = !that.paused;
				if (that.paused) {
					msg = 'Resume';
				}
				$('#startButton').attr('value', msg);
			});
			$('#resetButton').click(function() {
				pause();
				reset(that.board, $('#boardType').val());
				generationLabel.html(that.board.generation);
			});
			canvas.click(function(e) {
				pause();
				var canvasPos = canvas.position();
				var x = e.pageX - canvasPos.left;
				var y = e.pageY - canvasPos.top;
				var boardPosition = renderer.getBoardCoordinates(that.board, x, y);
				that.board.setCell(boardPosition.x, boardPosition.y, !that.board.isAlive(boardPosition.x, boardPosition.y));
				renderer.render(that.board);
			});
			
			this.board = boardFactory.create();
			reset(this.board, 'random');
			setTimeout(function() { that.nextGeneration(); }, frameRate);
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