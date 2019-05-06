
var BlackColor = '#595857';
var WhiteColor = '#e6e6e6';

var clickedPlayerColor = '#ffff00';
var optionsColor = '#ff0000';
var eatanPicesWhite = [];
var eatanPicesBlack = [];
var FirstClickInfo = {
    color: 'none',
    postion: []
};
var board = [];
var tCounter = 1;
var fClick = true;
for (let i = 1; i <= 8; i++) {
    board[i] = [];
}






function AbsValue(num) {
    if (num < 0) {
        num *= -1;
    }
    return num;
}


//Bishop
function bishop(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Bishop";

    //Reset Board Colors
    this.rColor = function () {
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 0, 0)'
                        || document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 255, 0)') {

                        //לצבוע אותם
                        var IdPlayer = board[i][k].id;
                        var idC = board[i][k].id[0];

                        if (IdPlayer % 2 == 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 == 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }

                    }


                }
            }
        }
    }

    this.eColor = function (i, k) {
        if (board && board[i] && board[i][k]) {

            if (color == 'black') {
                if (board[i][k].color == 'white') {


                    this.options.push(board[i][k].id);
                }
            } else {
                if (board[i][k].color == 'black') {


                    this.options.push(board[i][k].id);
                }
            }
            // break;
        }
    }
    this.movmentFirst = function () {

        //checking Options
        var k = Number(this.id[1]) - 1;

        for (let i = Number(this.id[0]) - 1; i >= 1; i--) {
            if (k < 1) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color != 'none') {
                    this.options.push("" + i + k);
                    break;

                } else {
                    this.options.push("" + i + k);

                }
            }

            k--;

        }
        k = Number(this.id[1]) + 1;
        for (let i = Number(this.id[0]) + 1; i <= 8; i++) {
            if (k > 8) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color != 'none') {
                    this.options.push("" + i + k);
                    break;

                } else {
                    this.options.push("" + i + k);

                }
            }

            k++;


        }

        k = Number(this.id[1]) - 1;
        for (let i = Number(this.id[0]) + 1; i <= 8; i++) {
            if (k < 1) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color != 'none') {
                    this.options.push("" + i + k);
                    break;

                } else {
                    this.options.push("" + i + k);

                }
            }
            k--;


        }

        k = Number(this.id[1]) + 1;
        for (let i = Number(this.id[0]) - 1; i >= 1; i--) {
            if (k > 8) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color != 'none') {
                    this.options.push("" + i + k);
                    break;

                } else {
                    this.options.push("" + i + k);

                }
            }
            k++;

        }
        //Coloring Options
        document.getElementById(this.id).style.backgroundColor = clickedPlayerColor;

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {

                    for (let j = 0; j < this.options.length; j++) {

                        if (board[i][k].id == this.options[j]) {
                            document.getElementById(board[i][k].id).style.backgroundColor = optionsColor;

                        }

                    }
                }
            }
        }

        FirstClickInfo.color = this.color;
        FirstClickInfo.postion = posion;
        FirstClickInfo.name = this.name;

    }
    this.movmentSecond = function (ii, kk, e) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new bishop([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnWhiteBishop';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackBishop.png')";



                        } else {
                            board[ii][kk] = new bishop([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnBlackBishop';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteBishop.png')";



                        }
                        if (e) {
                            eatanPicesBlack.push(board[i][k].name);
                        }
                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
    }


}

//knight
function knight(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Knight";

    //Reset Board Colors
    this.rColor = function () {
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 0, 0)'
                        || document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 255, 0)') {

                        //לצבוע אותם
                        var IdPlayer = board[i][k].id;
                        var idC = board[i][k].id[0];

                        if (IdPlayer % 2 == 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 == 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }

                    }


                }
            }
        }
    }

    this.eColor = function (i, k) {
        if (board && board[i] && board[i][k]) {

            if (color == 'black') {
                if (board[i][k].color == 'white') {


                    this.options.push(board[i][k].id);
                }
            } else {
                if (board[i][k].color == 'black') {


                    this.options.push(board[i][k].id);
                }
            }
            // break;
        }
    }
    this.movmentFirst = function () {

        //checking Options

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (i == this.id[0]) { //Can't be in the same row
                        break;
                    }
                    colDif = AbsValue(k - Number(this.id[1]));
                    rowDif = AbsValue(i - Number(this.id[0]));
                    if (colDif == 0 || rowDif == 0) {

                    } else if (colDif + rowDif == 3) {
                        if (board[i][k].color != this.color) {
                            this.options.push("" + i + k);

                        }
                    }
                }
            }
        }
        //Coloring Options
        document.getElementById(this.id).style.backgroundColor = clickedPlayerColor;

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {

                    for (let j = 0; j < this.options.length; j++) {

                        if (board[i][k].id == this.options[j]) {
                            document.getElementById(board[i][k].id).style.backgroundColor = optionsColor;

                        }

                    }
                }
            }
        }

        FirstClickInfo.color = this.color;
        FirstClickInfo.postion = posion;
        FirstClickInfo.name = this.name;
    }

    this.movmentSecond = function (ii, kk, e) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new knight([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnWhiteKnight';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackKnight.png')";



                        } else {
                            board[ii][kk] = new knight([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnBlackKnight';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteKnight.png')";



                        }
                        if (e) {
                            eatanPicesBlack.push(board[i][k].name);
                        }
                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
    }


}


//king
function king(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "King";

    //Reset Board Colors
    this.rColor = function () {
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 0, 0)'
                        || document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 255, 0)') {

                        //לצבוע אותם
                        var IdPlayer = board[i][k].id;
                        var idC = board[i][k].id[0];

                        if (IdPlayer % 2 == 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 == 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }

                    }


                }
            }
        }
    }

    this.eColor = function (i, k) {
        if (board && board[i] && board[i][k]) {

            if (color == 'black') {
                if (board[i][k].color == 'white') {


                    this.options.push(board[i][k].id);
                }
            } else {
                if (board[i][k].color == 'black') {


                    this.options.push(board[i][k].id);
                }
            }
            // break;
        }
    }
    this.movmentFirst = function () {

        //checking Options
        if (this.id[0] == 7) {
            console.log('set');

        }
        console.log(this.id[0]);

        var iTest = Number(this.id[0]) + 1;
        var kTest = Number(this.id[1]) - 1;
        var offsetI = 2;
        var offsetK = 2;

        if (iTest > 8) {
            iTest = 8;
            offsetI = 1;
        } else if (iTest == 2) {
            offsetI = 1;
        }
        if (kTest < 1) {
            kTest = 1;
            offsetK = 1;
        }


        for (let i = iTest; i >= iTest - offsetI; i--) {
            for (let k = kTest; k <= kTest + offsetK; k++) {

                if (i == this.id[0] && k == this.id[1]) {
                    continue;
                }

                if (board[i][k].color == this.color) {
                    continue;
                } else if (board[i][k].color != 'none') {
                    this.options.push(board[i][k].id);
                    continue;
                } else {
                    this.options.push(board[i][k].id);

                }
            }
        }

        if (this.id == "84") {
            //הצרחה
            document.getElementById("86").addEventListener('click', function () {
                this.rColor();

            });
            document.getElementById("82").addEventListener('click', LeftCast);
        } else if (this.id == "14") {

        }








        //Coloring Options
        document.getElementById(this.id).style.backgroundColor = clickedPlayerColor;

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {

                    for (let j = 0; j < this.options.length; j++) {

                        if (board[i][k].id == this.options[j]) {
                            document.getElementById(board[i][k].id).style.backgroundColor = optionsColor;


                            board[i][k] = {};
                            board[i][k] = new Empty([this.id[0], this.id[1]]);
                        }

                    }
                }
            }
        }

        FirstClickInfo.color = this.color;
        FirstClickInfo.postion = posion;
        FirstClickInfo.name = this.name;
    }

    this.movmentSecond = function (ii, kk, e) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new king([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnWhiteKing';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackKing.png')";



                        } else {
                            board[ii][kk] = new king([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnBlackKing';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteKing.png')";



                        }
                        if (e) {
                            eatanPicesBlack.push(board[i][k].name);
                        }
                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
    }


}


//Rook
function Rook(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Rook";

    //Reset Board Colors
    this.rColor = function () {
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 0, 0)'
                        || document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 255, 0)') {

                        //לצבוע אותם
                        var IdPlayer = board[i][k].id;
                        var idC = board[i][k].id[0];

                        if (IdPlayer % 2 == 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 == 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }

                    }


                }
            }
        }
    }

    this.eColor = function (i, k) {
        if (board && board[i] && board[i][k]) {

            if (color == 'black') {
                if (board[i][k].color == 'white') {


                    this.options.push(board[i][k].id);
                }
            } else {
                if (board[i][k].color == 'black') {


                    this.options.push(board[i][k].id);
                }
            }
            // break;
        }
    }
    this.movmentFirst = function () {

        //checking Options

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {

                        //Checking Row

                        //Check Row Right
                        for (let j = k + 1; j < 9; j++) {

                            if (board[i][j] instanceof Empty) {
                                this.options.push(board[i][j].id);
                            } else {
                                this.eColor(i, j);
                                break;
                            }
                        }

                        //Checking Row Left
                        for (let j = k - 1; j > 0; j--) {
                            if (board[i][j] instanceof Empty) {
                                this.options.push(board[i][j].id);
                            } else {
                                this.eColor(i, j);
                                break;
                            }
                        }

                        //Checking Col

                        //Check Col Up
                        for (let j = i - 1; j > 0; j--) {
                            if (board[j][k] instanceof Empty) {
                                this.options.push(board[j][k].id);
                            } else {
                                this.eColor(j, k);
                                break;
                            }
                        }
                        //Check Col Down
                        for (let j = i + 1; j < 9; j++) {
                            if (board[j][k] instanceof Empty) {
                                this.options.push(board[j][k].id);
                            } else {
                                this.eColor(j, k);
                                break;
                            }
                        }




                        break;


                    }
                }
            }
        }
        //Coloring Options
        document.getElementById(this.id).style.backgroundColor = clickedPlayerColor;

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {

                    for (let j = 0; j < this.options.length; j++) {

                        if (board[i][k].id == this.options[j]) {
                            document.getElementById(board[i][k].id).style.backgroundColor = optionsColor;

                        }

                    }
                }
            }
        }

        FirstClickInfo.color = this.color;
        FirstClickInfo.postion = posion;
        FirstClickInfo.name = this.name;
    }

    this.movmentSecond = function (ii, kk, e) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new Rook([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnBlackRook';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackRook.png')";



                        } else {
                            board[ii][kk] = new Rook([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnWhiteRook';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteRook.png')";



                        }
                        if (e) {
                            eatanPicesBlack.push(board[i][k].name);
                        }
                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
    }


}

//Queen
function Queen(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Queen";

    //Reset Board Colors
    this.rColor = function () {
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 0, 0)'
                        || document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 255, 0)') {

                        //לצבוע אותם
                        var IdPlayer = board[i][k].id;
                        var idC = board[i][k].id[0];

                        if (IdPlayer % 2 == 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 == 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }

                    }


                }
            }
        }
    }

    this.eColor = function (i, k) {
        if (board && board[i] && board[i][k]) {

            if (color == 'black') {
                if (board[i][k].color == 'white') {


                    this.options.push(board[i][k].id);
                }
            } else {
                if (board[i][k].color == 'black') {


                    this.options.push(board[i][k].id);
                }
            }
            // break;
        }
    }
    this.movmentFirst = function () {

        //checking Options

        //Rook
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {

                        //Checking Row

                        //Check Row Right
                        for (let j = k + 1; j < 9; j++) {

                            if (board[i][j] instanceof Empty) {
                                this.options.push(board[i][j].id);
                            } else {
                                this.eColor(i, j);
                                break;
                            }
                        }

                        //Checking Row Left
                        for (let j = k - 1; j > 0; j--) {
                            if (board[i][j] instanceof Empty) {
                                this.options.push(board[i][j].id);
                            } else {
                                this.eColor(i, j);
                                break;
                            }
                        }

                        //Checking Col

                        //Check Col Up
                        for (let j = i - 1; j > 0; j--) {
                            if (board[j][k] instanceof Empty) {
                                this.options.push(board[j][k].id);
                            } else {
                                this.eColor(j, k);
                                break;
                            }
                        }
                        //Check Col Down
                        for (let j = i + 1; j < 9; j++) {
                            if (board[j][k] instanceof Empty) {
                                this.options.push(board[j][k].id);
                            } else {
                                this.eColor(j, k);
                                break;
                            }
                        }




                        break;


                    }
                }
            }
        }

        //bishop
        var k = Number(this.id[1]) - 1;

        for (let i = Number(this.id[0]) - 1; i >= 1; i--) {
            if (k < 1) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color != 'none') {
                    this.options.push("" + i + k);
                    break;

                } else {
                    this.options.push("" + i + k);

                }
            }

            k--;

        }
        k = Number(this.id[1]) + 1;
        for (let i = Number(this.id[0]) + 1; i <= 8; i++) {
            if (k > 8) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color != 'none') {
                    this.options.push("" + i + k);
                    break;

                } else {
                    this.options.push("" + i + k);

                }
            }

            k++;


        }

        k = Number(this.id[1]) - 1;
        for (let i = Number(this.id[0]) + 1; i <= 8; i++) {
            if (k < 1) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color != 'none') {
                    this.options.push("" + i + k);
                    break;

                } else {
                    this.options.push("" + i + k);

                }
            }
            k--;


        }

        k = Number(this.id[1]) + 1;
        for (let i = Number(this.id[0]) - 1; i >= 1; i--) {
            if (k > 8) {
                break;
            }
            if (board[i][k].color == this.color) {
                break;
            } else {
                if (board[i][k].color != 'none') {
                    this.options.push("" + i + k);
                    break;

                } else {
                    this.options.push("" + i + k);

                }
            }
            k++;

        }











        //Coloring Options
        document.getElementById(this.id).style.backgroundColor = clickedPlayerColor;

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {

                    for (let j = 0; j < this.options.length; j++) {

                        if (board[i][k].id == this.options[j]) {
                            document.getElementById(board[i][k].id).style.backgroundColor = optionsColor;

                        }

                    }
                }
            }
        }

        FirstClickInfo.color = this.color;
        FirstClickInfo.postion = posion;
        FirstClickInfo.name = this.name;
    }

    this.movmentSecond = function (ii, kk, e) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new Queen([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnBlackQueen';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackQueen.png')";



                        } else {
                            board[ii][kk] = new Queen([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnWhiteQueen';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteQueen.png')";



                        }
                        if (e) {
                            eatanPicesBlack.push(board[i][k].name);
                        }
                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
    }


}


//Pawn
function Pawn(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Pawn";
    this.rColor = function () {
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 0, 0)'
                        || document.getElementById(board[i][k].id).style.backgroundColor == 'rgb(255, 255, 0)') {

                        //לצבוע אותם
                        var IdPlayer = board[i][k].id;
                        var idC = board[i][k].id[0];

                        if (IdPlayer % 2 == 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 == 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 != 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = BlackColor;
                        }
                        if (IdPlayer % 2 != 0 && idC % 2 == 0) {
                            document.getElementById(IdPlayer).style.backgroundColor = WhiteColor;
                        }

                    }


                }
            }
        }
    }
    this.movmentFirst = function () {
        var colorid, eRI, eLI;
        if (this.color == 'black') {
            colorid = 10;
            eRI = 11;
            eLI = 9;
        } else {
            colorid = -10;
            eRI = -9;
            eLI = -11;
        }


        //#f00 = red
        //#ff0 = yellow;


        //checking options
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id * 1 + colorid) {

                        if (board[i][k] instanceof Empty) {
                            if (this.color == 'white') {
                                if (i == 6) {
                                    if (board[5][k] instanceof Empty) {
                                        this.options.push(board[5][k].id);

                                    }
                                }
                            } else {
                                if (i == 3) {
                                    if (board[4][k] instanceof Empty) {
                                        this.options.push(board[4][k].id);

                                    }
                                }
                            }
                            this.options.push(board[i][k].id);

                        }

                    }
                    if (board[i][k].id == this.id * 1 + eRI) {
                        if (color == 'black') {
                            if (board[i][k] instanceof Empty == false && board[i][k].color == 'white') {


                                this.options.push(board[i][k].id);
                            }
                        } else {
                            if (board[i][k] instanceof Empty == false && board[i][k].color == 'black') {


                                this.options.push(board[i][k].id);
                            }
                        }

                    }
                    if (board[i][k].id == this.id * 1 + eLI) {
                        if (color == 'black') {
                            if (board[i][k] instanceof Empty == false && board[i][k].color == 'white') {


                                this.options.push(board[i][k].id);
                            }
                        } else {
                            if (board[i][k] instanceof Empty == false && board[i][k].color == 'black') {


                                this.options.push(board[i][k].id);
                            }
                        }

                    }

                }
            }
        }

        //Coloring

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    for (let j = 0; j < this.options.length; j++) {
                        if (board[i][k].id == this.options[j]) {
                            document.getElementById(board[i][k].id).style.backgroundColor = optionsColor;

                        }
                        document.getElementById(this.id).style.backgroundColor = clickedPlayerColor;

                    }
                }
            }
        }
        FirstClickInfo.color = this.color;
        FirstClickInfo.postion = posion;
        FirstClickInfo.name = this.name;


    }

    this.movmentSecond = function (ii, kk, e) {
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new Pawn([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnBlackPawn';
                            if (e) {
                                eatanPicesBlack.push(board[i][k].name);
                                document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackPawn.png')";

                            }




                        } else {
                            board[ii][kk] = new Pawn([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnWhitePawn';
                            if (e) {
                                eatanPicesBlack.push(board[i][k].name);
                                document.getElementById("" + ii + kk).style.backgroundImage = "url('WhitePawn.png')";

                            }


                        }


                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
    }

}

function Empty(posion) {
    this.id = "" + posion[0] + posion[1];
    this.color = 'none';

}

//Create Black King
board[1][4] = new king([1, 4], 'black');
//Create White King
board[8][4] = new king([8, 4], 'white');

//Create Black Queen
board[1][5] = new Queen([1, 5], 'black');
//Create White Queen
board[8][5] = new Queen([8, 5], 'white');


//Create Black Bishops
board[1][3] = new bishop([1, 3], 'black');
board[1][6] = new bishop([1, 6], 'black');

//Create white Bishops
board[8][3] = new bishop([8, 3], 'white');
board[8][6] = new bishop([8, 6], 'white');

//Create Black Knights
board[1][2] = new knight([1, 2], 'black');
board[1][7] = new knight([1, 7], 'black');

//Create White Knights
board[8][2] = new knight([8, 2], 'white');
board[8][7] = new knight([8, 7], 'white');

//create Black Rooks
board[1][1] = new Rook([1, 1], 'black');
board[1][8] = new Rook([1, 8], 'black');

//create White Rooks
board[8][1] = new Rook([8, 1], 'white');
board[8][8] = new Rook([8, 8], 'white');

//create Black Pawns
for (let i = 1; i <= 8; i++) {
    board[2][i] = new Pawn([2, i], 'black');
}

//create White Pawns
for (let i = 1; i <= 8; i++) {
    board[7][i] = new Pawn([7, i], 'white');
}

//Create Empty Objects
for (let k = 3; k < 7; k++) {
    for (let i = 1; i <= 8; i++) {
        board[k][i] = new Empty([k, i]);
    }
}



function btnClicked(id) {


    for (let i = 1; i <= 8; i++) {
        for (let k = 1; k <= 8; k++) {
            if (board && board[i] && board[i][k]) {

                if (board[i][k].id == id) {


                    //tCounter = 1 white
                    //tCounter = 2 black
                    if (fClick) {
                        if (tCounter % 2 != 0) {

                            if (board[i][k].color == 'white') {

                                if (board[i][k].name) {

                                    board[i][k].rColor();
                                    board[i][k].movmentFirst();
                                    fClick = false;
                                }

                            } else {
                                alert('White Turn!');
                                break;
                            }

                        } else {
                            if (board[i][k].color == 'black') {

                                if (board[i][k].name) {
                                    board[i][k].rColor();
                                    board[i][k].movmentFirst();
                                    fClick = false;
                                }
                            } else {
                                alert('Black Turn!');
                                break;
                            }
                        }
                    } else {
                        //second click
                        if (board[i][k].color == FirstClickInfo.color) {
                            board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].rColor();
                            board[i][k].movmentFirst();
                            fClick = false;



                        } else if (board[i][k] instanceof Empty) {
                            //move
                            if (board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options) {
                                for (let j = 0; j < board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options.length; j++) {
                                    if (board[i][k].id == board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options[j]) {
                                        board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].rColor();
                                        board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].movmentSecond(i, k, false);
                                        fClick = true;
                                        tCounter++;

                                        break;
                                    }
                                }
                            }




                        } else {
                            //eat
                            if (board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options) {
                                for (let j = 0; j < board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options.length; j++) {
                                    if (board[i][k].id == board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options[j]) {
                                        board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].rColor();
                                        board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].movmentSecond(i, k, true);
                                        fClick = true;
                                        tCounter++;

                                        break;
                                    }
                                }
                            }

                        }

                    }



                }
            }
        }
    }
}

