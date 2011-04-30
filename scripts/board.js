define(["metrics"], function(metrics) {
	function calculateNeighbours(board) {
		var neighbours = [];
		var row;
		var rowIndex;
		var columnIndex;
		var y;
		var x;
		var neighbourCount;
		var minX;
		var maxX;
		var minY;
		var maxY;

		for (rowIndex = 0; rowIndex < board.height; rowIndex++) {
			row = [];
			minY = rowIndex > 0 ? rowIndex - 1 : 0;
			maxY = rowIndex < (board.height-1) ? rowIndex + 1 : rowIndex;
			for (columnIndex = 0; columnIndex < board.width; columnIndex++) {
				neighbourCount = 0;
				minX = columnIndex > 0 ? columnIndex - 1 : 0;
				maxX = columnIndex < (board.width - 1) ? columnIndex + 1 : columnIndex;
				
				for(y = minY; y <= maxY; y++) {
					for(x = minX; x <= maxX; x++) {
						if (board.isAlive(x, y) && (rowIndex !== y || columnIndex !== x)) {
							neighbourCount++;
						}
					}
				}
				
				row.push(neighbourCount);
			}
			neighbours.push(row);
		}
		
		return neighbours;
	}
	
	return {
		create: function() {
			var board  = [];
			var row;
			var rowIndex;
			var columnIndex;
			
			for (rowIndex = 0; rowIndex < metrics.boardHeight; rowIndex++) {
				row = [];
				for (columnIndex = 0; columnIndex < metrics.boardWidth; columnIndex++) {
					row.push(false);
				}
				board.push(row);
			}
			
			return {
				width: metrics.boardWidth,
				height: metrics.boardHeight,
				cells: board,
				isAlive: function(column, row) {
					return this.cells[row][column];
				},
				setCell: function(column, row, isAlive) {
					this.cells[row][column] = isAlive;
				},
				randomize: function() {
					var rowIndex;
					var columnIndex;
					
					for (rowIndex = 0; rowIndex < this.height; rowIndex++) {
						for (columnIndex = 0; columnIndex < this.width; columnIndex++) {
							this.setCell(columnIndex, rowIndex, Number.randomInteger(10) > 4);
						}
					}
				},
				update: function() {
					var neighboursBoard;
					var neighbourCount;
					var cellIsAlive;
					
					neighboursBoard = calculateNeighbours(this);
					for (rowIndex = 0; rowIndex < this.height; rowIndex++) {
						for (columnIndex = 0; columnIndex < this.width; columnIndex++) {
							neighbourCount = neighboursBoard[rowIndex][columnIndex];
							cellIsAlive = this.isAlive(columnIndex, rowIndex);
							if (cellIsAlive) {
								this.setCell(columnIndex, rowIndex, neighbourCount === 2 || neighbourCount === 3);
							}
							else {
								this.setCell(columnIndex, rowIndex, neighbourCount === 3);
							}
						}
					}
				}
			};
		}
	};
})