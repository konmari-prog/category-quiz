# ココナラ出品ジャンル診断ツールの作り方

---

## 📋 目次

1. 概要
2. 必要な知識
3. 開発環境
4. ステップ1: プロジェクトの準備
5. ステップ2: HTMLの作成
6. ステップ3: CSSの作成
7. ステップ4: JavaScriptの実装
8. ステップ5: シェア機能の実装
9. ステップ6: アニメーションの追加
10. ステップ7: テストとデバッグ
11. ステップ8: デプロイ
12. ステップ9: カスタマイズのアイデア
13. ステップ10: 運用とメンテナンス

---

## 🎯 概要

このガイドでは、ココナラコンテンツマーケット向けの出品ジャンル診断ツールを、ゼロから作成する方法を解説します。

**完成イメージ**
- 8つの質問に答えると、ユーザーのタイプを診断
- 10種類のタイプから最適なものを判定
- おすすめカテゴリTOP3を表示
- 診断結果をXでシェア、または画像保存
- レスポンシブデザイン対応

HTML、CSS、JavaScriptのみで構築できるため、初心者でも真似して作ることができます。

---

## 📚 必要な知識

- HTML基礎
- CSS基礎(Flexbox、Grid)
- JavaScript基礎(関数、配列、オブジェクト)
- Canvas API(画像生成用)

---

## 💻 開発環境

- テキストエディタ(VS Code推奨)
- モダンブラウザ(Chrome、Firefox、Safari、Edge)
- ローカルサーバー(Live Server拡張機能など)

---

## ステップ1: プロジェクトの準備

### 1-1. フォルダ構成を作成

```
project/
├── index.html
├── style.css
├── app.js
└── image/
    ├── AI活用マスター.png
    ├── ビジネス戦略家.png
    ├── 効率化デザイナー.png
    ├── ココナラマスター.png
    ├── 知識キュレーター.png
    ├── マネーアドバイザー.png
    ├── ライフスタイリスト.png
    ├── スピリチュアルガイド.png
    ├── エンタメキュレーター.png
    └── ストーリーテラー.png
```

---

### 1-2. 画像素材の準備

各タイプのイラスト画像を用意します。以下の方法で作成できます:

**AI画像生成ツール**
- Midjourney
- DALL-E
- Stable Diffusion

**イラスト素材サイト**
- いらすとや
- Canva

**推奨サイズ**
512x512px以上の正方形

---

## ステップ2: HTMLの作成

### 2-1. 基本構造

`index.html`を作成し、以下の構造を実装します:

```html
<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>出品ジャンル診断</title>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="app-container">
        <!-- 4つの画面を作成 -->
    </div>
    <canvas id="share-canvas" width="1080" height="1080" style="display: none;"></canvas>
    <script src="app.js"></script>
</body>
</html>
```

---

### 2-2. 4つの画面を作成

診断ツールは以下の4つの画面で構成されます:

1. **スタート画面** - 診断開始ボタン
2. **質問画面** - 8つの質問と選択肢
3. **ローディング画面** - 診断中のアニメーション
4. **結果画面** - タイプとおすすめカテゴリの表示

各画面は`<section>`タグで作成し、`.screen`クラスと`.active`クラスで表示切り替えを行います。

---

### スタート画面の例

```html
<section id="start-screen" class="screen active">
    <div class="start-content">
        <div class="logo-area">
            <span class="material-icons logo-icon">auto_awesome</span>
        </div>
        <h1 class="main-title">
            <span class="title-sub">ココナラコンテンツマーケット</span>
            <span class="title-main">出品ジャンル診断</span>
        </h1>
        <p class="description">
            8つの質問に答えるだけで、<br>
            あなたにピッタリの出品カテゴリがわかります
        </p>
        <div class="time-info">
            <span class="material-icons">schedule</span>
            <span>所要時間 約2分</span>
        </div>
        <button class="start-btn" onclick="startDiagnosis()">
            <span>診断をはじめる</span>
            <span class="material-icons">arrow_forward</span>
        </button>
    </div>
</section>
```

---

## ステップ3: CSSの作成

### 3-1. デザインシステムの設定

`style.css`の冒頭で、カラーパレットとフォントを定義します:

```css
:root {
    --primary-color: #1F2974;
    --accent-color: #DD047B;
    --background-light: #F8FAFF;
    --text-dark: #333333;
    --text-light: #666666;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Noto Sans JP', sans-serif;
    background: linear-gradient(135deg, #F8FAFF 0%, #FFF5F8 50%, #F0F4FF 100%);
    min-height: 100vh;
}
```

---

### 3-2. 画面切り替えのスタイル

```css
.screen {
    display: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.screen.active {
    display: flex;
    opacity: 1;
}
```

---

### 3-3. レスポンシブデザイン

モバイル、タブレット、デスクトップに対応するため、メディアクエリを使用します:

```css
@media (max-width: 768px) {
    .main-title {
        font-size: 24px;
    }
    
    .options-container {
        grid-template-columns: 1fr;
    }
}
```

---

## ステップ4: JavaScriptの実装

### 4-1. データ構造の設計

診断ツールの核となるデータを定義します:

```javascript
// カテゴリデータ
const categories = [
    { 
        id: 'business', 
        name: 'ビジネスノウハウ', 
        url: 'https://coconala.com/contents_market/search?category_id=1' 
    },
    // ... 他のカテゴリ
];

// タイプデータ
const types = [
    {
        id: 'ai-master',
        name: 'AI活用マスター',
        tagline: 'テクノロジーで可能性を拡げる',
        image: 'image/AI活用マスター.png',
        primaryCategories: ['ai', 'business', 'coconala']
    },
    // ... 他のタイプ
];

// 質問データ
const questions = [
    {
        id: 1,
        text: 'あなたの得意分野は？',
        options: [
            { 
                text: 'ビジネス・マーケティング・仕事術', 
                scores: { business: 5, coconala: 3, template: 2 } 
            },
            // ... 他の選択肢
        ]
    },
    // ... 他の質問
];
```

---

### 4-2. スコアリングシステム

各質問の選択肢には、カテゴリごとのスコアを設定します。

ユーザーが選択した選択肢のスコアを合計し、最もスコアが高いカテゴリを判定します。

```javascript
let categoryScores = {};

function selectOption(optionIndex) {
    const question = questions[currentQuestion];
    const selectedOption = question.options[optionIndex];
    
    // スコアを加算
    Object.entries(selectedOption.scores).forEach(([catId, score]) => {
        categoryScores[catId] = (categoryScores[catId] || 0) + score;
    });
    
    // 次の質問へ
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showLoading();
    }
}
```

---

### 4-3. 結果判定ロジック

スコアを集計し、TOP3のカテゴリとタイプを決定します:

```javascript
function calculateResult() {
    // カテゴリをスコア順にソート
    const sortedCategories = Object.entries(categoryScores)
        .sort((a, b) => b[1] - a[1])
        .map(([id]) => categories.find(c => c.id === id));
    
    // TOP3を取得
    const top3 = sortedCategories.slice(0, 3);
    
    // タイプを決定
    const topCategoryId = sortedCategories[0].id;
    const resultType = determineType(topCategoryId);
    
    displayResult(resultType, top3);
}
```

---

## ステップ5: シェア機能の実装

### 5-1. Canvas APIで画像生成

診断結果を画像化するため、Canvas APIを使用します:

```javascript
function drawShareImage(ctx, type, top3) {
    const W = 1080;
    const H = 1080;
    
    // 背景グラデーション
    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, '#F8FAFF');
    gradient.addColorStop(0.5, '#FFF5F8');
    gradient.addColorStop(1, '#F0F4FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);
    
    // タイプ名を描画
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 56px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText(type.name, W / 2, 530);
    
    // カテゴリTOP3を描画
    // ...
}
```

---

### 5-2. Xシェア機能

```javascript
function shareToX() {
    const { type, top3 } = window.currentResult;
    
    const text = `【出品ジャンル診断】
私は「${type.name}」タイプ！
〜${type.tagline}〜

おすすめカテゴリ
1位 ${top3[0].name}
2位 ${top3[1].name}
3位 ${top3[2].name}

#おうちAIラボ #SHIFTAI`;
    
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(shareUrl, '_blank', 'width=600,height=400');
}
```

---

### 5-3. 画像ダウンロード機能

```javascript
function downloadResult() {
    const canvas = document.getElementById('share-canvas');
    
    canvas.toBlob(function(blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'diagnosis-result.png';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    }, 'image/png');
}
```

---

## ステップ6: アニメーションの追加

### 6-1. ローディングアニメーション

```css
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

.loading-circle {
    width: 100px;
    height: 100px;
    border: 5px solid #E8ECF0;
    border-top-color: #DD047B;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}
```

---

### 6-2. 選択肢のホバーエフェクト

```css
.option-btn {
    transition: all 0.3s ease;
}

.option-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(221, 4, 123, 0.2);
}
```

---

## ステップ7: テストとデバッグ

### 7-1. 動作確認項目

- [ ] すべての質問が正しく表示される
- [ ] 選択肢をクリックすると次の質問に進む
- [ ] 8つの質問に答えると結果画面が表示される
- [ ] 診断結果が正しく表示される
- [ ] カテゴリリンクが正しく機能する
- [ ] Xシェア機能が動作する
- [ ] 画像ダウンロード機能が動作する
- [ ] 「もう一度診断する」ボタンで最初に戻る
- [ ] スマートフォンで正しく表示される

---

### 7-2. デバッグのコツ

```javascript
// スコアを確認
console.log('Current scores:', categoryScores);

// 結果を確認
console.log('Result type:', resultType);
console.log('Top 3 categories:', top3);
```

---

## ステップ8: デプロイ

### 8-1. GitHub Pagesでホスティング

1. GitHubにリポジトリを作成
2. プロジェクトファイルをプッシュ
3. Settings > Pages > Source を `main` ブランチに設定
4. 数分後、`https://username.github.io/repository-name/` でアクセス可能

---

### 8-2. Netlifyでホスティング

1. Netlifyにログイン
2. 「New site from Git」をクリック
3. GitHubリポジトリを選択
4. 「Deploy site」をクリック
5. 自動的にURLが発行される

---

### 8-3. カスタムドメインの設定(任意)

独自ドメインを使用する場合:

1. ドメインを取得(お名前.com、ムームードメインなど)
2. GitHub PagesまたはNetlifyの設定でカスタムドメインを追加
3. DNSレコードを設定

---

## ステップ9: カスタマイズのアイデア

### 9-1. 質問のカスタマイズ

自分のサービスに合わせて質問を変更できます:

```javascript
const questions = [
    {
        id: 1,
        text: 'あなたの質問をここに',
        options: [
            { text: '選択肢1', scores: { category1: 5 } },
            { text: '選択肢2', scores: { category2: 5 } },
        ]
    },
];
```

---

### 9-2. デザインのカスタマイズ

カラーパレットを変更するだけで、印象が大きく変わります:

```css
:root {
    --primary-color: #あなたの色;
    --accent-color: #あなたの色;
}
```

---

### 9-3. 機能の追加

以下の機能を追加できます:

- 診断履歴の保存(LocalStorage)
- メールでの結果送信
- PDF出力機能
- 多言語対応
- Google Analytics連携

---

## ステップ10: 運用とメンテナンス

### 10-1. ユーザーフィードバックの収集

- Google Formsでアンケートを作成
- 診断結果画面にフィードバックボタンを追加
- SNSでの反応をモニタリング

---

### 10-2. 診断精度の改善

ユーザーのフィードバックをもとに:

- 質問内容の見直し
- スコアリングの調整
- 新しいタイプの追加

---

### 10-3. パフォーマンス最適化

- 画像の圧縮(TinyPNG、ImageOptimなど)
- CSSとJavaScriptの圧縮
- CDNの利用

---

## 🔧 トラブルシューティング

### よくある問題と解決策

**問題1: 画像が表示されない**
- 画像パスが正しいか確認
- 画像ファイル名の大文字小文字を確認
- ブラウザのコンソールでエラーを確認

**問題2: Canvas画像が真っ白**
- フォントの読み込みを待つ
- CORS問題を確認(同じドメインから画像を読み込む)

**問題3: スマホで表示が崩れる**
- viewportメタタグを確認
- メディアクエリの設定を確認
- Flexbox/Gridの設定を確認

---

## 📖 参考リソース

### 学習リソース

- MDN Web Docs(HTML、CSS、JavaScript)
- Canvas API チュートリアル
- Flexbox Froggy(Flexbox学習ゲーム)
- Grid Garden(Grid学習ゲーム)

---

### ツール

- VS Code(エディタ)
- Chrome DevTools(デバッグ)
- Figma(デザイン)
- TinyPNG(画像圧縮)

---

### コミュニティ

- Stack Overflow(質問サイト)
- GitHub Discussions(開発者コミュニティ)
- Qiita(日本語技術記事)

---

## 🎉 まとめ

このガイドに従えば、診断ツールを自分で作成できます。

**重要なポイント:**

1. **データ構造の設計**が最も重要
2. **スコアリングシステム**で診断精度が決まる
3. **レスポンシブデザイン**でユーザー体験が向上
4. **シェア機能**で拡散力が高まる
5. **継続的な改善**でツールの価値が上がる

自分のサービスに合わせてカスタマイズし、オリジナルの診断ツールを作ってみてください。

---

作成日: 2026年1月30日
作成者: おうちAIラボ
