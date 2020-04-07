'use strict';

{
    const words = [
    '<h1>hello world</h1>',
    '<div class="container">',
    '<p>my name is tanaka</p>',
    "getElementById('id')",
    "console.log('hello world')",
    ];

    let word;
    let loc;
    let score;
    let miss;
    const timeLimit = 30 * 1000;
    let startTime;
    let isPlaying = false;

    const target = document.getElementById('target');
    const scoreLabel = document.getElementById('score');
    const missLabel = document.getElementById('miss');
    const timerLabel = document.getElementById('timer');

    function updateTarget() {
        let placeholder = '';
        for (let i = 0; i < loc; i++) {
            placeholder += '_';
        }
        // textContentで要素のテキスト内容を取得。
        // substringでindexStartからindexEndまでの文字を取り出し。
        target.textContent = placeholder + word.substring(loc);
    }

    function updateTimer() {
        const timeLeft = startTime + timeLimit - Date.now();
        timerLabel.textContent = (timeLeft / 1000).toFixed(2);

        const timeoutId = setTimeout(() => {
            updateTimer();
        }, 10);

        if (timeLeft < 0) {
            isPlaying = false;

            clearTimeout(timeoutId);
            timerLabel.textContent = '0.00';
            setTimeout(() => {
                showResult();
            }, 100);
        target.textContent = 'click to replay';
        }
    }

    function showResult() {
        const accuracy = score + miss === 0 ? 0 : score / (score + miss) * 100;
        alert(`${score} letters, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`);
    }

    // クリックした時に発火
    window.addEventListener('click', () => {
        // trueじゃなければ条件分岐通過して、isplayingの中身をtrueにする。
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
        word = words[Math.floor(Math.random() * words.length)];

        target.textContent = word;
        startTime = Date.now();
        updateTimer();
    });
　
    window.addEventListener('keydown', e => {
        if (isPlaying !== true) {
            return;
        }

        if (e.key === word[loc]) {
            loc++;
            if (loc === word.length) {
                word = words[Math.floor(Math.random() * words.length)];
                loc = 0;
            }
            updateTarget();
            score++;
            scoreLabel.textContent = score;
        } else {
            miss++;
            missLabel.textContent = miss;
        }
    });
}