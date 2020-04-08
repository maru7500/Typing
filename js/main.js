'use strict';

{
    const words = [
    'apple',
    'orange',
    'banana',
    ];

    let word;
    let loc;
    let score;
    let miss;
    const timeLimit = 30 * 1000;
    let startTime;
    let isPlaying = false;
    let num = 0;
    let passSec;

    const target = document.getElementById('target');
    const scoreLabel = document.getElementById('score');
    const missLabel = document.getElementById('miss');
    const timerLabel = document.getElementById('timer');

    // 入力された文字の変換
    function updateTarget() {
        let placeholder = '';
        for (let i = 0; i < loc; i++) {
            placeholder += '_';
        }
        // textContentで要素のテキスト内容を取得。
        // substringでindexStartからindexEndまでの文字を取り出し。
        target.textContent = placeholder + word.substring(loc);
    }

    // タイマー
    function updateTimer() {
        // timeLeft=残り時間.
        const timeLeft = startTime + timeLimit - Date.now();
        // toFixed(2)で小数第2位まで表示する
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);

        const timeoutId = setTimeout(() => {
            updateTimer();
        }, 10);

        // タイムアップになったときisPlayingをfalseに変える
        if (timeLeft < 0) {
            isPlaying = false;

            // setTimeout()を解除。タイマー表記を0.00に。0.1秒後にshowResult発火？。
            clearTimeout(timeoutId);
            timerLabel.textContent = '0.00';
            setTimeout(() => {
                showResult();
            }, 100);
        target.textContent = 'click to replay';
        }
    }

    // アラートにて結果発表
    function showResult() {
        const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
        alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
    }

    function showPassage() {
        PassSec++;   // カウントアップ
        var msg = "ボタンを押してから " + PassSec + "秒が経過しました。";   // 表示文作成
        document.getElementById("timer").innerHTML = msg;   // 表示更新
     }

    // クリックした時に発火
    // タイピングスタート
    window.addEventListener('click', () => {
        // trueじゃなければ条件分岐通過して、isPlayingの中身をtrueにする。
        if (isPlaying === true) {
            return;
        }

        isPlaying = true;

        // 以下の変数の中身を0にリセット
        loc = 0;
        score = 0;
        miss = 0;
        scoreLabel.textContent = score;
        missLabel.textContent = miss;
        // ランダムで出力する場合は下のコード使う
        // [Math.floor(Math.random() * words.length)];
        // Math.floor=引数として与えた数以下の最大の整数を返す
        // Math.random()=0以上、1未満の値を返します。
        // Math.random()の結果に数値を掛け合わせ、Math.floor()で小数点以下を切り捨てることで目的の数値を得ることができます。
        word = words[0]

        // target部に表示
        target.textContent = word;
        
        // startTime = Date.now();
        updateTimer();
    });

    // keydownでキーボードを押した瞬間イベントが発火
    // キーボードで一文字打つごとに発火
    window.addEventListener('keydown', e => {
        if (isPlaying !== true) {
            return;
        }

        // 正しい文字を打った時
        if (e.key === word[loc]) {
            loc++;
            // locがwordの文字数と同じになったら
            if (loc === word.length) {
                // wordに次のwordを入れ込み、locの中身を０にリセット
                word = words[num = num + 1];
                // ランダムで出力する場合は下のコード使う
                // [Math.floor(Math.random() * words.length)];
                loc = 0;
            }
            updateTarget();
            //プラス1する
            score++;
            scoreLabel.textContent = score;
            // shiftを押したときにミスタイピングにならないようにする
        }else if(e.keyCode == 16){
            e.preventDefault();
        }else {
            // ミスタイピングをした時
            miss++;
            missLabel.textContent = miss;
        }
    });
}