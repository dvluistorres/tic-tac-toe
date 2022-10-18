const players = (() => {

    const _playerFactory = (name , isO) => {
        const score = 0;
        let addScore = () => this.score++;
        const token = isO == true ? "O" : "X";
        return {name, token , score , addScore};
      };

    const player1 = _playerFactory(document.getElementById("player1Output").innerText , true);
    const player2 = _playerFactory(document.getElementById("player2Output").innerText , false);
    

    const changeNames = () =>{
        if (document.getElementById("player1Name").value != ""){
            newName = document.getElementById("player1Name");
            player1.name = newName.value;
            document.getElementById("player1Output").innerText = newName.value;
            document.getElementById("tableP1").innerText = `${player1.name}'s score`;
        };
        if (document.getElementById("player2Name").value != ""){
            newName = document.getElementById("player2Name");
            player2.name = newName.value;
            document.getElementById("player2Output").innerText = newName.value;
            document.getElementById("tableP2").innerText = `${player2.name}'s score`;
        };
    }

    const textBoxes = document.getElementsByClassName("textarea");
        for (const textarea of textBoxes) {
        textarea.addEventListener("focusout", changeNames)
        };

    const _gameBoard = (() => {
        let _player1turn = true;
        let player1plays = [];
        let player2plays = [];

        function _addToken(){
            if (_player1turn == true){
                this.innerText = player1.token;
                player1plays.push(this.className.split(" ")[1]);
                _gameOver(player1plays);
                _player1turn = false;
            } else {
                this.innerText = player2.token;
                player2plays.push(this.className.split(" ")[1]);
                _gameOver(player2plays);
                _player1turn = true;
            }
        };
        
        function _addListeners(){
        const squares = document.getElementsByClassName("square");
            for (const square of squares) {
            square.addEventListener("click", _addToken , {once:true});
            square.innerText = "";
            };
        };

        _addListeners();

        function _removeListeners(){
            const squares = document.getElementsByClassName("square");
                for (const square of squares) {
                square.removeEventListener("click", _addToken)
                };
            };

        function _gameOver(playerPlays){
            winningConditions = [
                [1,2,3],
                [4,5,6],
                [7,8,9],
                [1,4,7],
                [2,5,8],
                [3,6,9],
                [1,5,9],
                [3,5,7]
            ];
            let i = 0;
            let win = false
            while (i<8){
                win = winningConditions[i].every(winningCondition => playerPlays.map(a => Number(a)).includes(winningCondition));
                if (win == true){
                    break;
                };
                i++;
            };
            if (win == false) {return};

            if (_player1turn == true){
                player1.score++;
                document.getElementById("tableScore1").innerText = `${player1.score}`;
                setTimeout(() => alert(`${player1.name} wins`),100);
            } else {
                player2.score++;
                document.getElementById("tableScore2").innerText = `${player2.score}`;
                setTimeout(() => alert(`${player2.name} wins`),100);
            }

            setTimeout(() => {
            _removeListeners();
            _addListeners();
            player1plays = [];
            player2plays = [];
            },100)
        };
    })();

})();


