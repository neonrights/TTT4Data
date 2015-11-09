/*
 * Nicholas Farn
 * Tic Tac Toe game to collect data for a machine learning algorithm
 */

(function() {
	var x_turn = true;  // true when x's turn, false when o's turn
	var turn = 1;  // turn number
	var data = [0, 0, 0, 0, 0, 0, 0, 0, 0];  // vector that records board
	var state = false;  // determines if game has been won

	// firebase database url
	var database = new Firebase('https://tictactoe-ml.firebaseIO.com');
	var child;

	// image urls
	var black_x = 'ttt-x-b.png';
	var black_o = 'ttt-o-b.png';
	var grey_x = 'ttt-x-g.png';
	var grey_o = 'ttt-o-g.png';
	var red_x = 'ttt-x-r.png';
	var red_o = 'ttt-o-r.png';

	window.onload = function() {
		var tiles = $('.tiles');
		for (var i = 0; i < tiles.length; i++) {
			tiles[i].onclick = record;
			tiles[i].onmouseover = highlight;
			tiles[i].onmouseout = unhighlight;
		}
		$('#restart').click(new_game);

		// create database and record data in it
		child = database.push();
	}

	// records moves and current board
	// then places piece and ends turn
	// runs gameover
	function record() {
		if (!state) {
			var index = parseInt(this.id.charAt(this.id.length - 1));
			if (data[index] == 0) {
				if (x_turn) {
					data[index] = 1;
					$(this).css('background-image', 'url(' + black_x + ')');
				} else {
					data[index] = -1;
					$(this).css('background-image', 'url(' + black_o + ')');
				}
				// save data
				child.child('turn-' + turn).set(data);
				gameover();
			}
		}
	}

	// shows ghosted over move when player hovers over tile
	function highlight() {
		if (!state) {
			// check if tile is occupied
			var index = parseInt(this.id.charAt(this.id.length - 1));
			if (data[index] == 0) {
				if (x_turn) {
					$(this).css('background-image', 'url(' + grey_x + ')');
				} else {
					$(this).css('background-image', 'url(' + grey_o + ')');
				}
			}
		}
	}

	// removes ghosted over image
	function unhighlight() {
		if (!state) {
			var index = parseInt(this.id.charAt(this.id.length - 1));
			if (data[index] == 0) {
				$(this).css('background-image', 'none');
			}
		}
	}

	// checks if game is over, reveals reset button if game is over
	// records winner and changes winning tiles
	// increments turn and switches x_turn
	function gameover() {
		var sum = 0;
		for (var i = 0; i < 9; i++) {
			sum += Math.abs(data[i]);
		}
		if ((data[0] + data[1] + data[2]) == 3) {
			$('#cell-0').css('background-image', 'url(' + red_x + ')');
			$('#cell-1').css('background-image', 'url(' + red_x + ')');
			$('#cell-2').css('background-image', 'url(' + red_x + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(1);
		} else if ((data[0] + data[1] + data[2] == -3)) {
			$('#cell-0').css('background-image', 'url(' + red_o + ')');
			$('#cell-1').css('background-image', 'url(' + red_o + ')');
			$('#cell-2').css('background-image', 'url(' + red_o + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(-1);
		} else if ((data[3] + data[4] + data[5]) == 3) {
			$('#cell-3').css('background-image', 'url(' + red_x + ')');
			$('#cell-4').css('background-image', 'url(' + red_x + ')');
			$('#cell-5').css('background-image', 'url(' + red_x + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(1);
		} else if ((data[3] + data[4] + data[5]) == -3) {
			$('#cell-3').css('background-image', 'url(' + red_o + ')');
			$('#cell-4').css('background-image', 'url(' + red_o + ')');
			$('#cell-5').css('background-image', 'url(' + red_o + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(-1);
		} else if ((data[6] + data[7] + data[8]) == 3) {
			$('#cell-6').css('background-image', 'url(' + red_x + ')');
			$('#cell-7').css('background-image', 'url(' + red_x + ')');
			$('#cell-8').css('background-image', 'url(' + red_x + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(1);
		} else if ((data[6] + data[7] + data[8]) == -3) {
			$('#cell-6').css('background-image', 'url(' + red_o + ')');
			$('#cell-7').css('background-image', 'url(' + red_o + ')');
			$('#cell-8').css('background-image', 'url(' + red_o + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(-1);
		} else if ((data[0] + data[3] + data[6]) == 3) {
			$('#cell-0').css('background-image', 'url(' + red_x + ')');
			$('#cell-3').css('background-image', 'url(' + red_x + ')');
			$('#cell-6').css('background-image', 'url(' + red_x + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(1);
		} else if ((data[0] + data[3] + data[6]) == -3) {
			$('#cell-0').css('background-image', 'url(' + red_o + ')');
			$('#cell-3').css('background-image', 'url(' + red_o + ')');
			$('#cell-6').css('background-image', 'url(' + red_o + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(-1);
		} else if ((data[1] + data[4] + data[7]) == 3) {
			$('#cell-1').css('background-image', 'url(' + red_x + ')');
			$('#cell-4').css('background-image', 'url(' + red_x + ')');
			$('#cell-7').css('background-image', 'url(' + red_x + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(1);
		} else if ((data[1] + data[4] + data[7]) == -3) {
			$('#cell-1').css('background-image', 'url(' + red_o + ')');
			$('#cell-4').css('background-image', 'url(' + red_o + ')');
			$('#cell-7').css('background-image', 'url(' + red_o + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(-1);
		} else if ((data[2] + data[5] + data[8]) == 3) {
			$('#cell-2').css('background-image', 'url(' + red_x + ')');
			$('#cell-5').css('background-image', 'url(' + red_x + ')');
			$('#cell-8').css('background-image', 'url(' + red_x + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(1);
		} else if ((data[2] + data[5] + data[8]) == -3) {
			$('#cell-2').css('background-image', 'url(' + red_o + ')');
			$('#cell-5').css('background-image', 'url(' + red_o + ')');
			$('#cell-8').css('background-image', 'url(' + red_o + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(-1);
		} else if ((data[0] + data[4] + data[8]) == 3) {
			$('#cell-0').css('background-image', 'url(' + red_x + ')');
			$('#cell-4').css('background-image', 'url(' + red_x + ')');
			$('#cell-8').css('background-image', 'url(' + red_x + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(1);
		} else if ((data[0] + data[4] + data[8]) == -3) {
			$('#cell-0').css('background-image', 'url(' + red_o + ')');
			$('#cell-4').css('background-image', 'url(' + red_o + ')');
			$('#cell-8').css('background-image', 'url(' + red_o + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(-1);
		} else if ((data[2] + data[4] + data[6]) == 3) {
			$('#cell-2').css('background-image', 'url(' + red_x + ')');
			$('#cell-4').css('background-image', 'url(' + red_x + ')');
			$('#cell-6').css('background-image', 'url(' + red_x + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(1);
		} else if ((data[2] + data[4] + data[6]) == -3) {
			$('#cell-2').css('background-image', 'url(' + red_o + ')');
			$('#cell-4').css('background-image', 'url(' + red_o + ')');
			$('#cell-6').css('background-image', 'url(' + red_o + ')');
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(-1);
		} if (sum == 9) {
			state = true;
			$('#restart').prop('disabled', false);
			$('#restart').css('visibility', 'visible');
			child.child("winner").set(0);	
		} else {
			x_turn = !x_turn;
			turn++;		
		}
	}

	// reset board and creates new entry in database
	function new_game() {
		// disable and hide button
		$(this).prop('disabled', true);
		$(this).css('visibility', 'hidden');

		// clear background and reset data
		for(var i = 0; i < 9; i++) {
			$('#cell-' + i).css('background-image', 'none');
			data[i] = 0;
		}

		// reset turn
		x_turn = true;
		turn = 1;
		state = false;

		// create new entry in database
		child = database.push();
	}
})();