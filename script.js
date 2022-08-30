var contents = document.querySelectorAll('.contents'); // コンテンツの取得
var count = 1; // 表示させるコンテンツの番号を設定

// スマホの場合、タッチスライドで動かす
if ((navigator.userAgent.indexOf('iPhone') > 0 && navigator.userAgent.indexOf('iPad') === -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0) {
  // タッチの位置を取得するための変数
  var touchStart,
    touchMove,
    touchDistance;
  
  // タッチし始めた位置
  window.addEventListener('touchstart', function (e) {
    touchStart = event.touches[0].pageY;
    touchMove = event.touches[0].pageY;
  });
  // タッチし、動かした位置
  window.addEventListener('touchmove', function (e) {
    touchMove = event.touches[0].pageY;
  });
  // タッチ終了時に
  window.addEventListener('touchend', function (e) {
    // タッチの開始位置から、移動後の位置を引く
    touchDistance = touchStart - touchMove;
    
    // タッチスライドが上方向だったら
    if (touchDistance > 70) {
      // countの値をプラス
      count++;
      // countの値の上限をコンテンツの数にする
      if (count >= contents.length) {
        count = contents.length;
      }
    }
    // タッチスライドが下方向だったら
    else if (touchDistance < -70) {
      // countの値をマイナス
      count--;
      // countの値の下限を1とする
      if (count <= 1) {
        count = 1;
      }
    }
    // タッチスライドがなかったら、何もしない
    else {
      
    }
    
    // 一旦コンテンツを全部非表示にして
    for (var i = 0; i < contents.length; i++) {
      contents[i].classList.remove('show'); // showクラスを削除して非表示に
    }
    // 該当のコンテンツのみ表示
    contents[count - 1].classList.add('show'); // showクラスを付与して表示
  });
}
// PCの場合、ホイールで動かす
else {
  var countFlg = false; // ホイールのイベントをやたらめったに取得しないためのフラグ
  
  // ホイールの動きがあったら
  window.addEventListener('wheel', function (e) {
    // countFlgがfalseの場合だけ動く
    if (!countFlg) {
      // ホイールが下方向だったら
      if (e.deltaY > 0) {
        // countの値をプラス
        count++;
        // countの値の上限をコンテンツの数とする
        if (count >= contents.length) {
          count = contents.length;
        }
      }
      // ホイールが上方向だったら
      else if (e.deltaY < 0) {
        //countの値をマイナスにする
        count--;
        // countの値の下限を1とする
        if (count <= 1) {
          count = 1;
        }
      }
      // countFlgをtrueにする
      countFlg = true;
      
      // 数秒後、countFlgをfalseにして、またホイールのイベントで動くように
      setTimeout(function () {
        countFlg = false;
      },1000 ); // 秒数を指定。ミリ秒

      // 一旦コンテンツを全部非表示にし、
      for (var i = 0; i < contents.length; i++) {
        contents[i].classList.remove('show'); // showクラスを削除して非表示に
      }
      // 該当コンテンツのみ表示
      contents[count - 1].classList.add('show'); // showクラスを付与して表示
    }
  });
}