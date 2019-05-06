
var BlackColor = '#e6e6e6';
var WhiteColor = '#595857';
var checkMovingOptions = [];
var checkSitu = false;
var clickedPlayerColor = '#ffff00';
var optionsColor = '#ff0000';
var eatanPicesWhite = [];
var eatanPicesBlack = [];
var blackKingId = 15, whiteKingId = 85;
var lisetnWhiteCastle = [true, true]
var lisetnBlackCastle = [true, true]

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

var wE = [];


//Change the colors Board
for (let i = 1; i <= 8; i++) {
    for (let k = 1; k <= 8; k++) {
        if ($('#' + i + k).hasClass('btdWhite')) {
            $('#' + i + k).removeClass('btdWhite');
            $('#' + i + k).addClass('btdBlack');
        } else {
            $('#' + i + k).removeClass('btdBlack');
            $('#' + i + k).addClass('btdWhite');
        }
    }
}
// wScreen = $(document).width();
// $('#resetButton').css('left', Number(wScreen) / 2 + "px")
function AbsValue(num) {
    if (num < 0) {
        num *= -1;
    }
    return num;
}

function rColor() {

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


//Bishop
function Bishop(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Bishop";

    //Reset Board Colors

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
    this.checkingOptions = function () {

        //checking Options


        //אלכסון פינה שמאלית למטה
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

        // אלכסון פינה ימנית למעלה
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


        //אלכסון פינה שמאלית למעלה
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


        // אלכסון פינה ימנית למטה
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
    }
    this.movmentFirst = function () {
        this.checkingOptions();
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
    this.movmentSecond = function (ii, kk) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new Bishop([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnWhiteBishop';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackBishop.png')";



                        } else {
                            board[ii][kk] = new Bishop([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnBlackBishop';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteBishop.png')";



                        }
                        wE = [this.name, this.color];

                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
        callCheck(ii, kk);

    }


}

//knight
function Knight(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Knight";

    //Reset Board Colors


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
    this.checkingOptions = function () {
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
    }

    this.movmentFirst = function () {

        this.checkingOptions();
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

    this.movmentSecond = function (ii, kk) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new Knight([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnWhiteKnight';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackKnight.png')";



                        } else {
                            board[ii][kk] = new Knight([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnBlackKnight';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteKnight.png')";



                        }
                        wE = [this.name, this.color];

                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
        callCheck(ii, kk);

    }


}

//king
function King(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.castleOptions = [];
    this.name = "King";

    this.checkingOptions = function () {
        //checking Options
        if (this.id[0] == 7) {
            console.log('set');

        }
        // console.log(this.id[0]);

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
                if (k == 9) {
                    break;
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
        //הצרחה
        col = "";
        if (this.color == 'white') {
            if (this.id != "85") {
                lisetnWhiteCastle = [false, false]
                return;
            }
            if (board[8][1] instanceof Rook) {
                lineLeftRook = getKingRookLine("81", "85", "white");
                if (lineLeftRook.length == 4) {
                    this.castleOptions.push("83");
                }
            }
            if (board[8][8] instanceof Rook) {
                lineLeftRook = getKingRookLine("88", "85", "white");
                if (lineLeftRook.length == 3) {
                    this.castleOptions.push("87");
                }
            }

        } else if (this.color == 'black') {
            if (this.id != "15") {
                lisetnBlackCastle = [false, false]
                return;
            }
            if (board[1][1] instanceof Rook) {
                lineLeftRook = getKingRookLine("11", "15", "black");
                if (lineLeftRook.length == 4) {
                    this.castleOptions.push("13");
                }
            }
            if (board[1][8] instanceof Rook) {
                lineLeftRook = getKingRookLine("18", "15", "black");
                if (lineLeftRook.length == 3) {
                    this.castleOptions.push("17");
                }
            }
        }






    }
    this.movmentFirst = function () {
        var col = "";
        if (this.color == "black") {
            col = "white"
        } else {
            col = "black"
        }

        attCol = attackOptions(col);
        this.checkingOptions();
        for (let i = 0; i < this.options; i++) {
            if (attCol.includes(this.options[i])) {
                this.options.splice(i, 1)
                i--;
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
                    for (let g = 0; g < this.castleOptions.length; g++) {
                        if (board[i][k].id == this.castleOptions[g]) {
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
    this.castle = function (ii, kk) {
        if (this.color == "white") {
            if ("" + ii + kk == "83") {
                board[8][4] = new Rook([8, 4], 'white');
                board[8][1] = new Empty([8, 1], 'none');

                document.getElementById("84").className = 'btnWhiteRook';
                document.getElementById("84").style.backgroundImage = "url('WhiteRook.png')";
                document.getElementById("81").style.backgroundImage = "none";
            } else if ("" + ii + kk == "87") {
                board[8][6] = new Rook([8, 6], 'white');
                board[8][8] = new Empty([8, 8], 'none');

                document.getElementById("86").className = 'btnWhiteRook';
                document.getElementById("86").style.backgroundImage = "url('WhiteRook.png')";
                document.getElementById("88").style.backgroundImage = "none";
            }

        } else {
            if ("" + ii + kk == "13") {
                board[1][4] = new Rook([1, 4], 'black');
                board[1][1] = new Empty([1, 1], 'none');

                document.getElementById("14").className = 'btnBlackRook';
                document.getElementById("14").style.backgroundImage = "url('BlackRook.png')";
                document.getElementById("11").style.backgroundImage = "none";
            } else if ("" + ii + kk == "17") {
                board[1][6] = new Rook([1, 6], 'black');
                board[1][8] = new Empty([1, 8], 'none');

                document.getElementById("16").className = 'btnBlackRook';
                document.getElementById("16").style.backgroundImage = "url('BlackRook.png')";
                document.getElementById("18").style.backgroundImage = "none";
            }
        }
    }
    this.movmentSecond = function (ii, kk) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {



                        if (this.color == 'black') {
                            board[ii][kk] = new King([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnWhiteKing';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackKing.png')";
                            blackKingId = board[ii][kk].id;



                        } else {
                            board[ii][kk] = new King([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnBlackKing';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteKing.png')";
                            whiteKingId = board[ii][kk].id;


                        }
                        wE = [this.name, this.color];
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
    this.checkingOptions = function () {
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
        this.checkingOptions();

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

    this.movmentSecond = function (ii, kk) {

        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            if (this.id == "11") {
                                lisetnBlackCastle[0] = false;
                            } else if (this.id == "18") {
                                lisetnBlackCastle[1] = false;

                            }
                            board[ii][kk] = new Rook([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnBlackRook';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackRook.png')";



                        } else {
                            if (this.id == "81") {
                                lisetnWhiteCastle[0] = false;
                            } else if (this.id == "88") {
                                lisetnWhiteCastle[1] = false;

                            }
                            board[ii][kk] = new Rook([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnWhiteRook';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhiteRook.png')";



                        }
                        wE = [this.name, this.color];

                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }


        callCheck(ii, kk);

    }


}

//Queen
function Queen(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Queen";
    this.checkingOptions = function () {
        //checking Options

        //Rook
        i = this.id[0] * 1;
        k = this.id[1] * 1;
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
    }
    //Reset Board Colors


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
        this.checkingOptions();

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

    this.movmentSecond = function (ii, kk) {

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
                        wE = [this.name, this.color];

                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }

        callCheck(ii, kk);

    }


}

//Pawn
function Pawn(posion, color) {
    this.color = color;
    this.id = "" + posion[0] + posion[1];
    this.options = [];
    this.name = "Pawn";
    this.checkingOptions = function () {
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

    }
    this.movmentFirst = function () {

        this.checkingOptions();

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

    this.movmentSecond = function (ii, kk) {
        for (let i = 1; i <= 8; i++) {
            for (let k = 1; k <= 8; k++) {
                if (board && board[i] && board[i][k]) {
                    if (board[i][k].id == this.id) {


                        if (this.color == 'black') {
                            board[ii][kk] = new Pawn([ii, kk], 'black');
                            document.getElementById("" + ii + kk).className = 'btnBlackPawn';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('BlackPawn.png')";






                        } else {
                            board[ii][kk] = new Pawn([ii, kk], 'white');
                            document.getElementById("" + ii + kk).className = 'btnWhitePawn';
                            document.getElementById("" + ii + kk).style.backgroundImage = "url('WhitePawn.png')";

                        }

                        wE = [this.name, this.color];
                        document.getElementById(this.id).style.backgroundImage = 'none';

                        board[i][k] = {};
                        board[i][k] = new Empty([this.id[0], this.id[1]]);

                    }
                }
            }
        }
        callCheck(ii, kk);

    }

}

function Empty(posion) {
    this.id = "" + posion[0] + posion[1];
    this.color = 'none';

}



function callCheck(ii, kk) {
    board[ii][kk].options = [];
    board[ii][kk].checkingOptions();
    for (let j = 0; j < board[ii][kk].options.length; j++) {
        if (board[ii][kk].color == 'black') {
            if (whiteKingId == board[ii][kk].options[j]) {
                console.log('check');
                checkSitu = true;
                getLine(String(whiteKingId), "" + ii + kk, 'black');
                check('white', "" + ii + kk);


            }
        } else {
            if (blackKingId == board[ii][kk].options[j]) {
                console.log('check');
                checkSitu = true;
                getLine(String(blackKingId), "" + ii + kk, 'white');

                check('black', "" + ii + kk);

            }
        }

    }
    board[ii][kk].options = [];
}
function coverAttacer(idAttacker, colorAttacker, colorDefender) {
    b = board;
    coverOptions = [];
    for (let i = 1; i <= 8; i++) {
        for (let k = 1; k <= 8; k++) {
            // "";
            var bo = b[i][k];
            bo.options = [];
            if (bo.color == colorAttacker) {
                bo.color == colorDefender;
                bo.checkingOptions();
                for (let j = 0; j < bo.options.length; j++) {
                    coverOptions.push(bo.options[j]);
                }
                bo.color == colorAttacker;
            }
        }
    }
    return coverOptions;
}

function attackOptions(col) {
    var attackColor = [];

    b = board;
    for (let i = 1; i <= 8; i++) {
        for (let k = 1; k <= 8; k++) {
            // "";
            var bo = b[i][k];
            bo.options = [];
            if (bo.color == col) {
                bo.checkingOptions();
                for (let j = 0; j < bo.options.length; j++) {
                    attackColor.push(bo.options[j]);
                }
            }
        }
    }
    return attackColor
}

var Line = [];
function getLine(kingId, queenId, Color) {
    /*
    מחזיר מערך של המיקומים של כל הקוביות מהכלי המאיים עד המלך לא כולל

    */
    Line = [];
    Line.push(queenId);

    // אלכסון שמאל למעלה למלך 
    if (kingId[0] > queenId[0] && kingId[1] > queenId[1]) {
        var k = Number(queenId[1]) + 1;
        for (let i = Number(queenId[0]) + 1; i <= 8; i++) {
            if (k > 8) {
                break;
            }
            var br = breakLoopRant(i, k, Color);
            if (br) {
                break;
            }
            k++;

        }
    }

    // אלכסון ימין למעלה למלך
    if (kingId[0] > queenId[0] && kingId[1] < queenId[1]) {
        k = Number(queenId[1]) - 1;
        for (let i = Number(queenId[0]) + 1; i <= 8; i++) {
            if (k < 1) {
                break;
            }
            var br = breakLoopRant(i, k, Color);
            if (br) {
                break;
            }
            k--;


        }
    }


    //אלכסון פינה שמאלית למטה
    if (kingId[0] < queenId[0] && kingId[1] > queenId[1]) {
        var k = Number(queenId[1]) + 1;
        for (let i = Number(queenId[0]) - 1; i >= 1; i--) {
            if (k > 8) {
                break;
            }
            var br = breakLoopRant(i, k, Color);
            if (br) {
                break;
            }
            k++;

        }

    }

    //אלכסון פינה ימנית למטה
    if (kingId[0] < queenId[0] && kingId[1] < queenId[1]) {
        k = Number(queenId[1]) - 1;
        for (let i = Number(queenId[0]) - 1; i >= 1; i--) {
            if (k < 1) {
                break;
            }

            var br = breakLoopRant(i, k, Color);
            if (br) {
                break;
            }
            k--;

        }
    }

    //מתחת למלך קו ישר
    var i = queenId[0] * 1;
    var k = queenId[1] * 1;
    if (kingId[0] < queenId[0] && kingId[1] == queenId[1]) {

        for (let j = i - 1; j > 0; j--) {
            if (board[j][k] instanceof Empty) {
                Line.push(board[j][k].id);
            } else {
                break;
            }
        }
    }


    //מעל למלך קו ישר
    if (kingId[0] > queenId[0] && kingId[1] == queenId[1]) {
        for (let j = i + 1; j < 9; j++) {
            if (board[j][k] instanceof Empty) {
                Line.push(board[j][k].id);
            } else {
                break;
            }

        }
    }

    //מימין למלך קו ישר
    if (kingId[0] == queenId[0] && kingId[1] < queenId[1]) {
        for (let j = k - 1; j > 0; j--) {
            if (board[i][j] instanceof Empty) {
                Line.push(board[i][j].id);
            } else {
                break;
            }
        }
    }

    //משמאל למלך קו ישר
    if (kingId[0] == queenId[0] && kingId[1] > queenId[1]) {
        for (let j = k + 1; j < 9; j++) {
            if (board[i][j] instanceof Empty) {
                Line.push(board[i][j].id);
            } else {
                break;
            }
        }
    }

    // console.log(Line);
    return Line
}

function breakLoopRant(i, k, Color) {
    var br = false;
    if (board[i][k] instanceof King) {
        br = true;
    } else if (board[i][k].color == Color) {
        Line = [];

        br = true;
    } else {
        if (board[i][k].color != 'none') {
            Line.push("" + i + k);
            br = true;

        } else {
            Line.push("" + i + k);

        }
    }


    return br;
}

function getKingRookLine(kingId, queenId, Color) {
    /*
        מחזיר מערך של המיקומים של כל הקוביות מהכלי המאיים עד המלך לא כולל
    
        */
    L = [];
    L.push(queenId);

    // אלכסון שמאל למעלה למלך 
    if (kingId[0] > queenId[0] && kingId[1] > queenId[1]) {
        var k = Number(queenId[1]) + 1;
        for (let i = Number(queenId[0]) + 1; i <= 8; i++) {
            if (k > 8) {
                break;
            }
            var br = breakLoopRant(i, k, Color);
            if (br) {
                break;
            }
            k++;

        }
    }

    // אלכסון ימין למעלה למלך
    if (kingId[0] > queenId[0] && kingId[1] < queenId[1]) {
        k = Number(queenId[1]) - 1;
        for (let i = Number(queenId[0]) + 1; i <= 8; i++) {
            if (k < 1) {
                break;
            }
            var br = breakLoopRant(i, k, Color);
            if (br) {
                break;
            }
            k--;


        }
    }


    //אלכסון פינה שמאלית למטה
    if (kingId[0] < queenId[0] && kingId[1] > queenId[1]) {
        var k = Number(queenId[1]) + 1;
        for (let i = Number(queenId[0]) - 1; i >= 1; i--) {
            if (k > 8) {
                break;
            }
            var br = breakLoopRant(i, k, Color);
            if (br) {
                break;
            }
            k++;

        }

    }

    //אלכסון פינה ימנית למטה
    if (kingId[0] < queenId[0] && kingId[1] < queenId[1]) {
        k = Number(queenId[1]) - 1;
        for (let i = Number(queenId[0]) - 1; i >= 1; i--) {
            if (k < 1) {
                break;
            }

            var br = breakLoopRant(i, k, Color);
            if (br) {
                break;
            }
            k--;

        }
    }

    //מתחת למלך קו ישר
    var i = queenId[0] * 1;
    var k = queenId[1] * 1;
    if (kingId[0] < queenId[0] && kingId[1] == queenId[1]) {

        for (let j = i - 1; j > 0; j--) {
            if (board[j][k] instanceof Empty) {
                L.push(board[j][k].id);
            } else {
                break;
            }
        }
    }


    //מעל למלך קו ישר
    if (kingId[0] > queenId[0] && kingId[1] == queenId[1]) {
        for (let j = i + 1; j < 9; j++) {
            if (board[j][k] instanceof Empty) {
                L.push(board[j][k].id);
            } else {
                break;
            }

        }
    }

    //מימין למלך קו ישר
    if (kingId[0] == queenId[0] && kingId[1] < queenId[1]) {
        for (let j = k - 1; j > 0; j--) {
            if (board[i][j] instanceof Empty) {
                L.push(board[i][j].id);
            } else {
                break;
            }
        }
    }

    //משמאל למלך קו ישר
    if (kingId[0] == queenId[0] && kingId[1] > queenId[1]) {
        for (let j = k + 1; j < 9; j++) {
            if (board[i][j] instanceof Empty) {
                L.push(board[i][j].id);
            } else {
                break;
            }
        }
    }

    // console.log(Line);
    return L
}

function check(color, tId) {
    Li = Line;
    checkMovingOptions = [];
    if (Line.length != 0) {
        /*
    tId == המאיים
    tF == ספרה ראשונה
    tS == ספרה שנייה
    */
        var b = board;
        tF = tId[0];
        tS = tId[1];
        attecker = b[tF][tS]
        if (color == 'black') {
            for (let i = 1; i <= 8; i++) {
                for (let k = 1; k <= 8; k++) {

                    var bo = b[i][k];

                    if (bo.color == 'black') {
                        if (bo instanceof King) {
                            bo.options = [];
                            bo.checkingOptions();
                            atOptions = coverAttacer(tId, 'black', 'white');

                            for (let j = 0; j < bo.options.length; j++) {
                                // var name = bo.name;

                                var canMoveThisPiece = false;
                                var flag = true
                                for (let y = 0; y < Li.length; y++) {
                                    if (bo.options[j] + "" == Li[y]) {
                                        flag = false;
                                        break;

                                    }
                                }
                                attecker.options = [];
                                attecker.checkingOptions();
                                for (let i = 0; i < bo.options.length; i++) {
                                    if (attecker.options.includes(bo.options[i])) {
                                        bo.options.splice(i, 1);
                                        i--;
                                    }
                                }
                                if (!atOptions.includes(tId)) {
                                    if (bo.options.includes(tId) || flag) {
                                        canMoveThisPiece = true
                                    }
                                }
                                if (canMoveThisPiece) {
                                    checkMovingOptions.push("" + i + k);
                                } else {
                                    continue;
                                }
                            }
                            continue;
                        }
                        // if (bo instanceof King) {
                        //     continue;
                        // }
                        bo.options = [];
                        bo.checkingOptions();
                        for (let j = 0; j < bo.options.length; j++) {
                            var num1 = bo.options[j][0];
                            var num2 = bo.options[j][1];

                            // var name = bo.name;

                            var canMoveThisPiece = false;
                            for (let y = 0; y < Li.length; y++) {
                                if (num1 + num2 + "" == Li[y]) {
                                    canMoveThisPiece = true;
                                    break;

                                }
                            }
                            if (canMoveThisPiece) {
                                checkMovingOptions.push("" + i + k);
                            } else {
                                continue;
                            }

                        }
                    }
                }
            }
        } else {
            for (let i = 1; i <= 8; i++) {
                for (let k = 1; k <= 8; k++) {

                    var bo = b[i][k];

                    if (bo.color == 'white') {
                        if (bo instanceof King) {
                            bo.options = [];
                            bo.checkingOptions();
                            atOptions = coverAttacer(tId, 'white', 'black');

                            for (let j = 0; j < bo.options.length; j++) {
                                // var name = bo.name;

                                var canMoveThisPiece = false;
                                var flag = true
                                for (let y = 0; y < Li.length; y++) {
                                    if (bo.options[j] + "" == Li[y]) {
                                        flag = false;
                                        break;

                                    }
                                }

                                if (!atOptions.includes(tId)) {
                                    if (bo.options.includes(tId) || flag) {
                                        canMoveThisPiece = true
                                    }
                                }
                                if (canMoveThisPiece) {
                                    checkMovingOptions.push("" + i + k);
                                } else {
                                    continue;
                                }
                            }
                            continue;
                        }
                        bo.options = [];
                        bo.checkingOptions();
                        for (let j = 0; j < bo.options.length; j++) {
                            var num1 = bo.options[j][0];
                            var num2 = bo.options[j][1];
                            // var name = bo.name;

                            var canMoveThisPiece = false;
                            for (let y = 0; y < Line.length; y++) {
                                if (num1 + num2 + "" == Line[y]) {
                                    canMoveThisPiece = true;
                                    break;

                                }
                            }
                            if (canMoveThisPiece) {
                                checkMovingOptions.push("" + i + k);
                            } else {
                                continue;
                            }

                        }
                    }
                }
            }
        }
        // console.log(checkMovingOptions);

    }
    if (checkMovingOptions.length == 0) {
        CheckMate(color);
    }

}
function startNewGame() {

    location.reload();

}
function CheckMate(color) {
    console.log(`CheckMate!, ${color} Won!`);
    alert(`CheckMate!, ${color} Won!`)


}
function createPices() {
    //Create Black King
    board[1][5] = new King([1, 5], 'black');
    //Create White King
    board[8][5] = new King([8, 5], 'white');

    //Create Black Queen
    board[1][4] = new Queen([1, 4], 'black');
    //Create White Queen
    board[8][4] = new Queen([8, 4], 'white');


    //Create Black Bishops
    board[1][3] = new Bishop([1, 3], 'black');
    board[1][6] = new Bishop([1, 6], 'black');

    //Create white Bishops
    board[8][3] = new Bishop([8, 3], 'white');
    board[8][6] = new Bishop([8, 6], 'white');

    //Create Black Knights
    board[1][2] = new Knight([1, 2], 'black');
    board[1][7] = new Knight([1, 7], 'black');

    //Create White Knights
    board[8][2] = new Knight([8, 2], 'white');
    board[8][7] = new Knight([8, 7], 'white');

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
}

createPices();
var canBlock = false
var block = false;




function btnClicked(id) {


    for (let i = 1; i <= 8; i++) {
        for (let k = 1; k <= 8; k++) {
            if (board && board[i] && board[i][k]) {

                if (board[i][k].id == id) {
                    if (board[i][k] instanceof King) {
                        // "";
                    }
                    if (!checkSitu) {

                        //tCounter = 1 white
                        //tCounter = 2 black
                        if (fClick) {
                            if (tCounter % 2 != 0) {

                                if (board[i][k].color == 'white') {

                                    if (board[i][k].name) {

                                        rColor();
                                        board[i][k].movmentFirst();
                                        fClick = false;
                                    }

                                } else {
                                    alert('White Turn!');
                                    return;
                                }

                            } else {
                                if (board[i][k].color == 'black') {

                                    if (board[i][k].name) {
                                        rColor();
                                        board[i][k].movmentFirst();
                                        fClick = false;
                                    }
                                } else {
                                    alert('Black Turn!');
                                    return;
                                }
                            }
                        } else {
                            //second click
                            if (board[i][k].color == FirstClickInfo.color) {
                                rColor();
                                board[i][k].movmentFirst();
                                fClick = false;



                            } else if (board[i][k] instanceof Empty) {
                                //move
                                if (board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options) {
                                    for (let j = 0; j < board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options.length; j++) {
                                        if (board[i][k].id == board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options[j]) {
                                            rColor();
                                            board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].movmentSecond(i, k);
                                            fClick = true;
                                            tCounter++;

                                            break;
                                        }
                                    }
                                    if (board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]] instanceof King) {
                                        for (let j = 0; j < board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].castleOptions.length; j++) {
                                            if (board[i][k].id == board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].castleOptions[j]) {
                                                rColor();
                                                board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].castle(i, k);
                                                board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].movmentSecond(i, k);
                                                fClick = true;
                                                tCounter++;

                                                break;
                                            }
                                        }
                                    }
                                }




                            } else {
                                //eat
                                if (board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options) {
                                    for (let j = 0; j < board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options.length; j++) {
                                        if (board[i][k].id == board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options[j]) {
                                            rColor();

                                            board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].movmentSecond(i, k);
                                            if (wE[1] == 'black') {
                                                eatanPicesWhite.push(wE[0]);
                                            } else {
                                                eatanPicesBlack.push(wE[0]);

                                            }
                                            fClick = true;
                                            tCounter++;

                                            break;
                                        }
                                    }
                                }

                            }

                        }
                    } else {
                        if (!canBlock) {
                            for (let j = 0; j < checkMovingOptions.length; j++) {
                                if (board[i][k].id == checkMovingOptions[j]) {
                                    canBlock = true;
                                }
                            }
                        }

                        if (canBlock) {
                            //tCounter = 1 white
                            //tCounter = 2 black
                            if (fClick) {
                                if (tCounter % 2 != 0) {

                                    if (board[i][k].color == 'white') {

                                        if (board[i][k].name) {

                                            rColor();
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
                                            rColor();
                                            board[i][k].movmentFirst();
                                            fClick = false;
                                        }
                                    } else {
                                        alert('Black Turn!');
                                        break;
                                    }
                                }
                            } else {

                                if (!block) {

                                    for (let j = 0; j < Line.length; j++) {
                                        if (board[i][k].id == Line[j]) {
                                            block = true;
                                        }
                                    }
                                }

                                //second click
                                var cBlock = false;

                                for (let j = 0; j < checkMovingOptions.length; j++) {
                                    if (board[i][k].id == checkMovingOptions[j]) {
                                        cBlock = true;
                                    }
                                }



                                if (board[i][k].color == FirstClickInfo.color) {
                                    if (cBlock) {
                                        rColor();
                                        board[i][k].movmentFirst();
                                        fClick = false;
                                    }




                                } else if (board[i][k] instanceof Empty) {
                                    if (block) {
                                        //move
                                        if (board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options) {
                                            for (let j = 0; j < board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options.length; j++) {
                                                if (board[i][k].id == board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options[j]) {
                                                    rColor();
                                                    board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].movmentSecond(i, k);
                                                    fClick = true;
                                                    tCounter++;

                                                    break;
                                                }
                                            }
                                        }



                                        checkSitu = false;
                                    }


                                } else {
                                    //eat
                                    if (block) {
                                        if (board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options) {
                                            for (let j = 0; j < board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options.length; j++) {
                                                if (board[i][k].id == board[FirstClickInfo.postion[0]][FirstClickInfo.postion[1]].options[j]) {
                                                    rColor();

                                                    board[FirstClickInfo.postion[0]][[FirstClickInfo.postion[1]]].movmentSecond(i, k);
                                                    if (wE[1] == 'black') {
                                                        eatanPicesWhite.push(wE[0]);
                                                    } else {
                                                        eatanPicesBlack.push(wE[0]);

                                                    }
                                                    fClick = true;
                                                    tCounter++;

                                                    break;
                                                }
                                            }
                                        }
                                        checkSitu = false;
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

