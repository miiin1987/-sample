========================================
images フォルダ ― 画像差し替えガイド
========================================

このフォルダに下記のファイルを配置してください。

【写真ファイル一覧】

・hero-bg.jpg
  使用箇所: ファーストビュー（ヒーロー）背景
  推奨サイズ: 1920x1080px 以上（横長）
  差し替え方法: css/style.css の .hero__bg 内
    background-image: url('../images/hero-bg.jpg');
    のコメントを外す

・solution.jpg
  使用箇所: セクション3「解決策」の施術イメージ
  推奨サイズ: 800x600px 以上（横長）
  差し替え方法: index.html の .img-ph--rect を
    <img src="images/solution.jpg" alt="ヘッドスパ施術イメージ"> に変更

・avatar-1.jpg
  使用箇所: お客様の声（30代・事務職）アバター
  推奨サイズ: 120x120px（正方形）
  差し替え方法: index.html の .img-ph--avatar（1つ目）を <img> に変更

・avatar-2.jpg
  使用箇所: お客様の声（20代・営業職）アバター
  推奨サイズ: 120x120px（正方形）
  差し替え方法: index.html の .img-ph--avatar（2つ目）を <img> に変更

・（オプション）cta-bg.jpg
  使用箇所: セクション10「最後のひと押し」背景
  推奨サイズ: 1440x600px 以上（横長）
  差し替え方法: css/style.css の .final-cta 内
    background-image: url('../images/cta-bg.jpg');
    のコメントを外す

【地図の差し替え】
  index.html の アクセスセクション内の
  <div class="img-ph img-ph--map"> を削除し、
  代わりに Google マップの埋め込みコード (<iframe>…</iframe>) を
  <div class="access__map"> の中に貼り付けてください。

========================================
