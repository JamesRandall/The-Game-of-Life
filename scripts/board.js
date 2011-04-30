define(["metrics"], function(metrics) {	
	var patterns = {
		stillLifes: [
			"010000100",
			"101001010",
			"101000110",
			"010000000",
			"000000000", // line break
			"000000000", // line break
			"110000110",
			"101001001",
			"011000101",
			"000000010",
			"000000000", // line break
			"000000000", // line break
			"110000000",
			"110000000"
		],
		oscillators: [
		    "0000010",
		    "1110010",
			"0000010",
			"0000000",
			"0000000",
			"0011100",
			"0111000"
		],
		gliders: [
			"01000010",
			"11000011",
			"10100101",
			"000000000", // line break
			"000000000", // line break
			"10100101",
			"11000011",
			"01000010"
		],
		gun: [
			"00000000000000000000000000000000000000",
			"00000000000000000000000001000000000000",
			"00000000000000000000000101000000000000",
			"00000000000001100000011000000000000110",
			"00000000000010001000011000000000000110",
			"01100000000100000100011000000000000000",
			"01100000000100010110000101000000000000",
			"00000000000100000100000001000000000000",
			"00000000000010001000000000000000000000",
			"00000000000001100000000000000000000000"
		]
	};
	
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
				generation: 0,
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
					this.generation++;
				},
				clear: function() {
					var rowIndex;
					var columnIndex;
					
					for (rowIndex = 0; rowIndex < this.height; rowIndex++) {
						for (columnIndex = 0; columnIndex < this.width; columnIndex++) {
							this.setCell(columnIndex, rowIndex, false);
						}
					}
				},
				reset: function(boardType) {
					var patternWidth;
					var patternHeight;
					var left;
					var top;
					var x;
					var y;
					
					this.generation = 0;
					
					if (boardType === 'random') {
						this.randomize();
					}
					else
					{
						this.clear();
						pattern = patterns[boardType];
						if (pattern !== null)
						{
							patternWidth = pattern[0].length;
							patternHeight = pattern.length;
							
							left = ((this.width - patternWidth)/2).integer();
							top = ((this.height - patternHeight)/2).integer();
							
							for (y=0; y < patternHeight; y++) {
								for (x=0; x < patternWidth; x++) {
									this.setCell(left + x, top + y, pattern[y][x] === '1');
								}
							}
						}
					}
				}
			};
		}
	};
})