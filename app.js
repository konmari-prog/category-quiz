// ===================================
// ココナラ診断アプリ - JavaScript
// ===================================

// カテゴリデータ
const categories = [
    { id: 'business', name: 'ビジネスノウハウ', url: 'https://coconala.com/contents_market/search?category_id=1' },
    { id: 'coconala', name: 'ココナラノウハウ', url: 'https://coconala.com/contents_market/search?category_id=144' },
    { id: 'learning', name: '学び', url: 'https://coconala.com/contents_market/search?category_id=9' },
    { id: 'money', name: 'マネー・副業', url: 'https://coconala.com/contents_market/search?category_id=10' },
    { id: 'template', name: 'テンプレート', url: 'https://coconala.com/contents_market/search?category_id=134', needsNotice: true },
    { id: 'fortune', name: '占い', url: 'https://coconala.com/contents_market/search?category_id=13' },
    { id: 'lifestyle', name: 'ライフスタイル', url: 'https://coconala.com/contents_market/search?category_id=8' },
    { id: 'ai', name: 'AI・テクノロジー', url: 'https://coconala.com/contents_market/search?category_id=6', needsNotice: true },
    { id: 'material', name: '素材', url: 'https://coconala.com/contents_market/search?category_id=14', needsNotice: true },
    { id: 'hobby', name: '趣味・エンタメ', url: 'https://coconala.com/contents_market/search?category_id=11' },
    { id: 'artwork', name: '作品', url: 'https://coconala.com/contents_market/search?category_id=15', needsNotice: true },
    { id: 'writing', name: '小説・コラム・エッセイ', url: 'https://coconala.com/contents_market/search?category_id=12' }
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
    {
        id: 'business-strategist',
        name: 'ビジネス戦略家',
        tagline: '仕事の知恵で人を導く',
        image: 'image/ビジネス戦略家.png',
        primaryCategories: ['business', 'learning', 'money']
    },
    {
        id: 'efficiency-designer',
        name: '効率化デザイナー',
        tagline: '使える型で時間を生む',
        image: 'image/効率化デザイナー.png',
        primaryCategories: ['template', 'business', 'ai']
    },
    {
        id: 'coconala-master',
        name: 'ココナラマスター',
        tagline: '販売ノウハウで成功を共有',
        image: 'image/ココナラマスター.png',
        primaryCategories: ['coconala', 'business', 'money']
    },
    {
        id: 'knowledge-curator',
        name: '知識キュレーター',
        tagline: '学びの道を照らす案内人',
        image: 'image/知識キュレーター.png',
        primaryCategories: ['learning', 'business', 'lifestyle']
    },
    {
        id: 'money-advisor',
        name: 'マネーアドバイザー',
        tagline: 'お金の知恵で未来を拓く',
        image: 'image/マネーアドバイザー.png',
        primaryCategories: ['money', 'business', 'coconala']
    },
    {
        id: 'life-stylist',
        name: 'ライフスタイリスト',
        tagline: '暮らしの彩りを届ける',
        image: 'image/ライフスタイリスト.png',
        primaryCategories: ['lifestyle', 'hobby', 'learning']
    },
    {
        id: 'spiritual-guide',
        name: 'スピリチュアルガイド',
        tagline: '心に寄り添い道を示す',
        image: 'image/スピリチュアルガイド.png',
        primaryCategories: ['fortune', 'lifestyle', 'writing']
    },
    {
        id: 'entertainment-curator',
        name: 'エンタメキュレーター',
        tagline: '好きを極めて魅力を伝える',
        image: 'image/エンタメキュレーター.png',
        primaryCategories: ['hobby', 'lifestyle', 'writing']
    },
    {
        id: 'storyteller',
        name: 'ストーリーテラー',
        tagline: '言葉で世界を紡ぐ',
        image: 'image/ストーリーテラー.png',
        primaryCategories: ['writing', 'hobby', 'lifestyle']
    }
];

// 質問データ（各選択肢にカテゴリスコアを設定）
const questions = [
    {
        id: 1,
        text: 'あなたの得意分野は？',
        options: [
            { text: 'ビジネス・マーケティング・仕事術', scores: { business: 5, coconala: 3, template: 2 } },
            { text: 'お金・投資・副業・節約術', scores: { money: 5, business: 3, coconala: 2 } },
            { text: 'テクノロジー・AI・プログラミング', scores: { ai: 5, learning: 3, template: 2 } },
            { text: '暮らし・美容・健康・趣味', scores: { lifestyle: 4, hobby: 4, writing: 2 } }
        ]
    },
    {
        id: 2,
        text: 'どんなコンテンツを作るのが好き？',
        options: [
            { text: 'ノウハウをまとめた解説記事', scores: { business: 4, learning: 4, ai: 2 } },
            { text: 'すぐ使えるテンプレート・資料', scores: { template: 5, business: 3, ai: 2 } },
            { text: '体験談やエッセイ・ストーリー', scores: { writing: 5, lifestyle: 3, hobby: 2 } },
            { text: '占い・スピリチュアルな内容', scores: { fortune: 5, lifestyle: 3, writing: 2 } }
        ]
    },
    {
        id: 3,
        text: 'AIツール（ChatGPT等）の活用状況は？',
        options: [
            { text: '日常的に使いこなしている', scores: { ai: 5, business: 3, template: 2 } },
            { text: '基本的な使い方はできる', scores: { ai: 3, learning: 3, business: 2 } },
            { text: 'これから学んでいきたい', scores: { learning: 4, coconala: 2, lifestyle: 2 } },
            { text: 'AIより自分の専門知識を活かしたい', scores: { business: 3, lifestyle: 3, fortune: 3 } }
        ]
    },
    {
        id: 4,
        text: '好きな作業スタイルは？',
        options: [
            { text: '情報を調べて整理・体系化する', scores: { learning: 4, business: 4, ai: 2 } },
            { text: '黙々とテンプレや資料を作り込む', scores: { template: 5, business: 2, money: 2 } },
            { text: '自分の経験や感性を言葉にする', scores: { writing: 4, lifestyle: 4, fortune: 2 } },
            { text: '好きなことを深掘りして発信する', scores: { hobby: 5, writing: 3, lifestyle: 2 } }
        ]
    },
    {
        id: 5,
        text: '購入者に届けたい価値は？',
        options: [
            { text: '時間の節約・業務の効率化', scores: { template: 4, business: 4, ai: 3 } },
            { text: '新しいスキル・知識の習得', scores: { learning: 5, ai: 3, business: 2 } },
            { text: '収入アップ・副業成功のきっかけ', scores: { money: 5, coconala: 4, business: 2 } },
            { text: '癒し・楽しさ・心の充実', scores: { fortune: 4, lifestyle: 4, hobby: 3 } }
        ]
    },
    {
        id: 6,
        text: 'ココナラでの目標は？',
        options: [
            { text: 'ノウハウ販売で継続的に稼ぎたい', scores: { business: 4, ai: 3, coconala: 3 } },
            { text: 'テンプレ販売で効率よく稼ぎたい', scores: { template: 5, money: 3, business: 2 } },
            { text: '専門知識で高単価商品を売りたい', scores: { learning: 4, business: 4, money: 3 } },
            { text: 'まずは小さく始めて様子を見たい', scores: { hobby: 3, lifestyle: 3, writing: 3 } }
        ]
    },
    {
        id: 7,
        text: '苦手・やりたくないことは？',
        options: [
            { text: '文章を書くこと', scores: { template: 4, ai: 3, business: 2 } },
            { text: '細かい資料作成', scores: { writing: 4, hobby: 3, fortune: 2 } },
            { text: '専門的な解説をすること', scores: { lifestyle: 4, hobby: 4, fortune: 2 } },
            { text: '特にない・何でもやれる', scores: { business: 3, learning: 3, ai: 3 } }
        ]
    },
    {
        id: 8,
        text: '今すぐ出品できそうなものは？',
        options: [
            { text: 'AI活用ノウハウ・プロンプト集', scores: { ai: 5, learning: 3, coconala: 2 } },
            { text: '業務用テンプレート・資料', scores: { template: 5, business: 3, money: 2 } },
            { text: 'ハウツー記事・専門知識の解説', scores: { business: 4, learning: 4, coconala: 2 } },
            { text: '占い・体験談・エンタメ系', scores: { fortune: 4, hobby: 4, writing: 3 } }
        ]
    }
];

// アプリケーションの状態
let currentQuestion = 0;
let categoryScores = {};
let answers = [];

// 初期化
function init() {
    // スコアを初期化
    categories.forEach(cat => {
        categoryScores[cat.id] = 0;
    });
}

// 診断開始
function startDiagnosis() {
    init();
    currentQuestion = 0;
    answers = [];
    showScreen('question-screen');
    displayQuestion();
}

// 画面切り替え
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

// 質問表示
function displayQuestion() {
    const question = questions[currentQuestion];

    document.getElementById('question-number').textContent = `Q${question.id}`;
    document.getElementById('question-text').textContent = question.text;
    document.getElementById('current-q').textContent = question.id;
    document.getElementById('progress-fill').style.width = `${(question.id / 8) * 100}%`;

    const container = document.getElementById('options-container');
    container.innerHTML = '';

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerHTML = `
            <span class="option-text">${option.text}</span>
            <span class="material-icons">check_circle</span>
        `;
        btn.onclick = () => selectOption(index);
        container.appendChild(btn);
    });
}

// 選択肢を選んだとき
function selectOption(optionIndex) {
    const question = questions[currentQuestion];
    const selectedOption = question.options[optionIndex];

    // スコアを加算
    Object.entries(selectedOption.scores).forEach(([catId, score]) => {
        categoryScores[catId] = (categoryScores[catId] || 0) + score;
    });

    answers.push(optionIndex);

    // 選択アニメーション
    const buttons = document.querySelectorAll('.option-btn');
    buttons[optionIndex].classList.add('selected');

    // 次の質問へ
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            displayQuestion();
        } else {
            showLoading();
        }
    }, 400);
}

// ローディング表示
function showLoading() {
    showScreen('loading-screen');

    // 2秒後に結果表示
    setTimeout(() => {
        calculateResult();
    }, 2000);
}

// 結果計算
function calculateResult() {
    // カテゴリをスコア順にソート
    const sortedCategories = Object.entries(categoryScores)
        .sort((a, b) => b[1] - a[1])
        .map(([id]) => categories.find(c => c.id === id));

    // TOP3を取得
    const top3 = sortedCategories.slice(0, 3);

    // タイプを決定（TOP1カテゴリに基づく）
    const topCategoryId = sortedCategories[0].id;
    const resultType = determineType(topCategoryId, sortedCategories);

    displayResult(resultType, top3);
}

// タイプ決定ロジック
function determineType(topCategoryId, sortedCategories) {
    // カテゴリとタイプのマッピング
    const categoryTypeMap = {
        'ai': types.find(t => t.id === 'ai-master'),
        'business': types.find(t => t.id === 'business-strategist'),
        'template': types.find(t => t.id === 'efficiency-designer'),
        'coconala': types.find(t => t.id === 'coconala-master'),
        'learning': types.find(t => t.id === 'knowledge-curator'),
        'money': types.find(t => t.id === 'money-advisor'),
        'lifestyle': types.find(t => t.id === 'life-stylist'),
        'fortune': types.find(t => t.id === 'spiritual-guide'),
        'hobby': types.find(t => t.id === 'entertainment-curator'),
        'writing': types.find(t => t.id === 'storyteller'),
        'material': types.find(t => t.id === 'efficiency-designer'),
        'artwork': types.find(t => t.id === 'entertainment-curator')
    };

    return categoryTypeMap[topCategoryId] || types[0];
}

// 結果表示
function displayResult(type, top3) {
    showScreen('result-screen');

    // タイプ情報を表示
    const typeImageEl = document.getElementById('type-image');
    typeImageEl.src = type.image;
    document.getElementById('type-name').textContent = type.name;
    document.getElementById('type-tagline').textContent = `〜${type.tagline}〜`;

    // 画像をBase64でプリロード（CORS対策）
    preloadImageAsBase64(type.image).then(base64Img => {
        if (base64Img) {
            window.loadedTypeImage = base64Img;
        }
    });

    // カテゴリTOP3を表示
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = '';

    top3.forEach((cat, index) => {
        const item = document.createElement('a');
        item.href = cat.url;
        item.target = '_blank';
        item.className = 'category-item';
        item.innerHTML = `
            <span class="rank-badge rank-${index + 1}">${index + 1}</span>
            <span class="category-name">${cat.name}</span>
            <span class="material-icons">arrow_forward</span>
        `;
        categoryList.appendChild(item);
    });

    // 注意書き表示判定
    const noticeSection = document.getElementById('notice-section');
    if (top3[0].needsNotice) {
        noticeSection.style.display = 'block';
    } else {
        noticeSection.style.display = 'none';
    }

    // グローバルに結果を保存
    window.currentResult = { type, top3 };
}

// Xでシェア
async function shareToX() {
    const { type, top3 } = window.currentResult;

    // まず画像を生成してクリップボードにコピー
    await copyImageToClipboard();

    const text = `【出品ジャンル診断】
私は「${type.name}」タイプ！
〜${type.tagline}〜

おすすめカテゴリ
1位 ${top3[0].name}
2位 ${top3[1].name}
3位 ${top3[2].name}

#おうちAIラボ #SHIFTAI`;

    const quoteUrl = 'https://x.com/SHIFT_AI_0/status/2017175969837264941';
    const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(quoteUrl)}`;

    window.open(shareUrl, '_blank', 'width=600,height=400');
}

// 画像をクリップボードにコピー
async function copyImageToClipboard() {
    return new Promise((resolve) => {
        try {
            const { type, top3 } = window.currentResult;
            const canvas = document.getElementById('share-canvas');
            const ctx = canvas.getContext('2d');

            // 画像なしで描画（CORS問題を回避）
            drawShareImageWithoutImage(ctx, type, top3);

            // クリップボードにコピー
            canvas.toBlob(async (blob) => {
                if (blob) {
                    try {
                        await navigator.clipboard.write([
                            new ClipboardItem({ 'image/png': blob })
                        ]);
                        showCopyNotification();
                    } catch (e) {
                        console.log('Clipboard copy failed:', e);
                    }
                }
                resolve();
            }, 'image/png');
        } catch (e) {
            console.log('Error:', e);
            resolve();
        }
    });
}

// シェア画像描画 (1080x1080 正方形)
function drawShareImage(ctx, type, top3) {
    const W = 1080;
    const H = 1080;

    // 背景グラデーション
    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, '#1F2974');
    gradient.addColorStop(0.5, '#3D4A9E');
    gradient.addColorStop(1, '#DD047B');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    // 白い背景カード
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, 60, 60, W - 120, H - 120, 32);
    ctx.fill();

    // カード上部のアクセントライン
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, 60, 60, W - 120, 8, 32);
    ctx.clip();
    const lineGradient = ctx.createLinearGradient(60, 0, W - 60, 0);
    lineGradient.addColorStop(0, '#DD047B');
    lineGradient.addColorStop(1, '#1F2974');
    ctx.fillStyle = lineGradient;
    ctx.fillRect(60, 60, W - 120, 8);
    ctx.restore();

    // ヘッダーラベル
    ctx.fillStyle = '#DD047B';
    ctx.font = 'bold 28px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('あなたのタイプは...', W / 2, 140);

    // タイプ画像 (中央に大きく配置)
    const img = window.loadedTypeImage || document.getElementById('type-image');
    const imgCenterX = W / 2;
    const imgCenterY = 320;
    const imgRadius = 140;

    if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(imgCenterX, imgCenterY, imgRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, imgCenterX - imgRadius, imgCenterY - imgRadius, imgRadius * 2, imgRadius * 2);
        ctx.restore();
    } else {
        ctx.fillStyle = '#FFF0F5';
        ctx.beginPath();
        ctx.arc(imgCenterX, imgCenterY, imgRadius, 0, Math.PI * 2);
        ctx.fill();
    }

    // 画像のボーダー
    ctx.strokeStyle = '#DD047B';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(imgCenterX, imgCenterY, imgRadius, 0, Math.PI * 2);
    ctx.stroke();

    // タイプ名
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 56px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText(type.name, W / 2, 530);

    // タグライン
    ctx.fillStyle = '#666666';
    ctx.font = '28px "Noto Sans JP"';
    ctx.fillText(`〜${type.tagline}〜`, W / 2, 580);

    // 区切り線
    ctx.strokeStyle = '#E8ECF0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(120, 630);
    ctx.lineTo(W - 120, 630);
    ctx.stroke();

    // おすすめカテゴリタイトル
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 28px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('おすすめカテゴリ TOP3', W / 2, 690);

    // カテゴリリスト
    const rankColors = ['#FFD700', '#A0AEC0', '#C97F4B'];
    const startY = 750;
    const itemHeight = 70;

    top3.forEach((cat, index) => {
        const y = startY + (index * itemHeight);

        // ランクバッジ
        ctx.fillStyle = rankColors[index];
        ctx.beginPath();
        ctx.arc(200, y, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px "Noto Sans JP"';
        ctx.textAlign = 'center';
        ctx.fillText(index + 1, 200, y + 8);

        // カテゴリ名
        ctx.fillStyle = '#1F2974';
        ctx.font = '32px "Noto Sans JP"';
        ctx.textAlign = 'left';
        ctx.fillText(cat.name, 260, y + 10);
    });

    // ハッシュタグ
    ctx.fillStyle = '#DD047B';
    ctx.font = 'bold 24px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('#おうちAIラボ  #SHIFTAI', W / 2, H - 90);
}

// シェア用テキスト描画（ハッシュタグ変更）
function drawTextForShare(ctx, type, top3) {
    // ヘッダーラベル
    ctx.fillStyle = '#DD047B';
    ctx.font = 'bold 20px "Noto Sans JP"';
    ctx.textAlign = 'left';
    ctx.fillText('あなたのタイプは...', 420, 140);

    // タイプ名
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 48px "Noto Sans JP"';
    ctx.fillText(type.name, 420, 200);

    // タグライン
    ctx.fillStyle = '#666666';
    ctx.font = '24px "Noto Sans JP"';
    ctx.fillText(`〜${type.tagline}〜`, 420, 250);

    // おすすめカテゴリ
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 24px "Noto Sans JP"';
    ctx.fillText('おすすめカテゴリ TOP3', 420, 320);

    // カテゴリリスト
    const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    top3.forEach((cat, index) => {
        const y = 370 + (index * 50);

        // ランクバッジ
        ctx.fillStyle = rankColors[index];
        ctx.beginPath();
        ctx.arc(450, y, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 18px "Noto Sans JP"';
        ctx.textAlign = 'center';
        ctx.fillText(index + 1, 450, y + 6);

        // カテゴリ名
        ctx.fillStyle = '#1F2974';
        ctx.font = '24px "Noto Sans JP"';
        ctx.textAlign = 'left';
        ctx.fillText(cat.name, 490, y + 8);
    });

    // ハッシュタグ
    ctx.fillStyle = '#DD047B';
    ctx.font = '18px "Noto Sans JP"';
    ctx.textAlign = 'right';
    ctx.fillText('#おうちAIラボ #SHIFTAI', 1100, 540);
}

// コピー通知を表示
function showCopyNotification() {
    const notification = document.createElement('div');
    notification.className = 'copy-notification';
    notification.innerHTML = '<span class="material-icons">check_circle</span>画像をコピーしました！Xの投稿画面で貼り付けてください';
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 結果画像をダウンロード
function downloadResult() {
    const { type, top3 } = window.currentResult;

    const canvas = document.getElementById('share-canvas');
    const ctx = canvas.getContext('2d');

    // 画像を非同期で描画してからダウンロード
    drawShareImageAsync(ctx, type, top3).then(() => {
        canvas.toBlob(function(blob) {
            if (blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = 'coconala-diagnosis-result.png';
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
            }
        }, 'image/png');
    });
}

// 非同期でシェア画像を描画
async function drawShareImageAsync(ctx, type, top3) {
    const W = 1080;
    const H = 1080;

    // 明るい爽やかな背景グラデーション
    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, '#F8FAFF');
    gradient.addColorStop(0.5, '#FFF5F8');
    gradient.addColorStop(1, '#F0F4FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    // 装飾的な円（背景に淡く）
    ctx.fillStyle = 'rgba(221, 4, 123, 0.05)';
    ctx.beginPath();
    ctx.arc(900, 150, 200, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(31, 41, 116, 0.04)';
    ctx.beginPath();
    ctx.arc(180, 900, 180, 0, Math.PI * 2);
    ctx.fill();

    // 白い背景カード
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, 80, 80, W - 160, H - 160, 32);
    ctx.fill();

    // カード上部のアクセントライン
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, 80, 80, W - 160, 6, 32);
    ctx.clip();
    const lineGradient = ctx.createLinearGradient(80, 0, W - 80, 0);
    lineGradient.addColorStop(0, '#DD047B');
    lineGradient.addColorStop(1, '#1F2974');
    ctx.fillStyle = lineGradient;
    ctx.fillRect(80, 80, W - 160, 6);
    ctx.restore();

    // ヘッダーラベル
    ctx.fillStyle = '#DD047B';
    ctx.font = 'bold 28px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('あなたのタイプは...', W / 2, 150);

    // イラスト画像を描画
    const imgCenterX = W / 2;
    const imgCenterY = 330;
    const imgRadius = 140;

    // 画像の背景円（淡いピンク）
    ctx.fillStyle = '#FFF5F8';
    ctx.beginPath();
    ctx.arc(imgCenterX, imgCenterY, imgRadius + 5, 0, Math.PI * 2);
    ctx.fill();

    // 画像を読み込んで描画
    try {
        const img = await loadImageForCanvas(type.image);
        if (img) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(imgCenterX, imgCenterY, imgRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();
            ctx.drawImage(img, imgCenterX - imgRadius, imgCenterY - imgRadius, imgRadius * 2, imgRadius * 2);
            ctx.restore();
        }
    } catch (e) {
        console.log('画像の描画をスキップ');
    }

    // 画像のボーダー（ピンクの円）
    ctx.strokeStyle = '#DD047B';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(imgCenterX, imgCenterY, imgRadius, 0, Math.PI * 2);
    ctx.stroke();

    // タイプ名
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 56px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText(type.name, W / 2, 540);

    // タグライン
    ctx.fillStyle = '#8494A7';
    ctx.font = '28px "Noto Sans JP"';
    ctx.fillText(`〜${type.tagline}〜`, W / 2, 590);

    // 区切り線
    ctx.strokeStyle = '#E8ECF0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(140, 640);
    ctx.lineTo(W - 140, 640);
    ctx.stroke();

    // おすすめカテゴリタイトル
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 28px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('おすすめカテゴリ TOP3', W / 2, 700);

    // カテゴリリスト
    const rankColors = ['#F5A623', '#A0AEC0', '#C97F4B'];
    const startY = 765;
    const itemHeight = 70;

    top3.forEach((cat, index) => {
        const y = startY + (index * itemHeight);

        ctx.fillStyle = rankColors[index];
        ctx.beginPath();
        ctx.arc(220, y, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px "Noto Sans JP"';
        ctx.textAlign = 'center';
        ctx.fillText(index + 1, 220, y + 8);

        ctx.fillStyle = '#1F2974';
        ctx.font = '32px "Noto Sans JP"';
        ctx.textAlign = 'left';
        ctx.fillText(cat.name, 280, y + 10);
    });

    // ハッシュタグ
    ctx.fillStyle = '#DD047B';
    ctx.font = 'bold 24px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('#おうちAIラボ  #SHIFTAI', W / 2, H - 110);
}

// Canvas用に画像を読み込む（fetchを使用してCORS回避）
async function loadImageForCanvas(src) {
    try {
        // fetchで画像を取得してBlobに変換
        const response = await fetch(src);
        const blob = await response.blob();

        // BlobをBase64 Data URLに変換
        const dataUrl = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(blob);
        });

        // Data URLからImageオブジェクトを作成
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = () => resolve(null);
            img.src = dataUrl;
        });
    } catch (e) {
        console.log('画像の読み込みに失敗:', e);
        return null;
    }
}

// 画像付きでシェア画像を描画（明るいデザイン）
function drawShareImageWithoutImage(ctx, type, top3) {
    const W = 1080;
    const H = 1080;

    // 明るい爽やかな背景グラデーション（サイトに合わせた淡いピンク〜ブルー）
    const gradient = ctx.createLinearGradient(0, 0, W, H);
    gradient.addColorStop(0, '#F8FAFF');
    gradient.addColorStop(0.5, '#FFF5F8');
    gradient.addColorStop(1, '#F0F4FF');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, W, H);

    // 装飾的な円（背景に淡く）
    ctx.fillStyle = 'rgba(221, 4, 123, 0.05)';
    ctx.beginPath();
    ctx.arc(900, 150, 200, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(31, 41, 116, 0.04)';
    ctx.beginPath();
    ctx.arc(180, 900, 180, 0, Math.PI * 2);
    ctx.fill();

    // 白い背景カード（影付き）
    ctx.shadowColor = 'rgba(31, 41, 116, 0.12)';
    ctx.shadowBlur = 40;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    ctx.fillStyle = '#FFFFFF';
    roundRect(ctx, 80, 80, W - 160, H - 160, 32);
    ctx.fill();
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // カード上部のアクセントライン
    ctx.save();
    ctx.beginPath();
    roundRect(ctx, 80, 80, W - 160, 6, 32);
    ctx.clip();
    const lineGradient = ctx.createLinearGradient(80, 0, W - 80, 0);
    lineGradient.addColorStop(0, '#DD047B');
    lineGradient.addColorStop(1, '#1F2974');
    ctx.fillStyle = lineGradient;
    ctx.fillRect(80, 80, W - 160, 6);
    ctx.restore();

    // ヘッダーラベル
    ctx.fillStyle = '#DD047B';
    ctx.font = 'bold 28px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('あなたのタイプは...', W / 2, 150);

    // イラスト画像を描画
    const imgCenterX = W / 2;
    const imgCenterY = 330;
    const imgRadius = 140;

    // 画像の背景円（淡いピンク）
    ctx.fillStyle = '#FFF5F8';
    ctx.beginPath();
    ctx.arc(imgCenterX, imgCenterY, imgRadius + 5, 0, Math.PI * 2);
    ctx.fill();

    // 画像を取得して描画
    const img = window.loadedTypeImage || document.getElementById('type-image');
    if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(imgCenterX, imgCenterY, imgRadius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, imgCenterX - imgRadius, imgCenterY - imgRadius, imgRadius * 2, imgRadius * 2);
        ctx.restore();
    }

    // 画像のボーダー（ピンクの円）
    ctx.strokeStyle = '#DD047B';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(imgCenterX, imgCenterY, imgRadius, 0, Math.PI * 2);
    ctx.stroke();

    // タイプ名
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 56px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText(type.name, W / 2, 540);

    // タグライン
    ctx.fillStyle = '#8494A7';
    ctx.font = '28px "Noto Sans JP"';
    ctx.fillText(`〜${type.tagline}〜`, W / 2, 590);

    // 区切り線
    ctx.strokeStyle = '#E8ECF0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(140, 640);
    ctx.lineTo(W - 140, 640);
    ctx.stroke();

    // おすすめカテゴリタイトル
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 28px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('おすすめカテゴリ TOP3', W / 2, 700);

    // カテゴリリスト
    const rankColors = ['#F5A623', '#A0AEC0', '#C97F4B'];
    const startY = 765;
    const itemHeight = 70;

    top3.forEach((cat, index) => {
        const y = startY + (index * itemHeight);

        ctx.fillStyle = rankColors[index];
        ctx.beginPath();
        ctx.arc(220, y, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 24px "Noto Sans JP"';
        ctx.textAlign = 'center';
        ctx.fillText(index + 1, 220, y + 8);

        ctx.fillStyle = '#1F2974';
        ctx.font = '32px "Noto Sans JP"';
        ctx.textAlign = 'left';
        ctx.fillText(cat.name, 280, y + 10);
    });

    // ハッシュタグ
    ctx.fillStyle = '#DD047B';
    ctx.font = 'bold 24px "Noto Sans JP"';
    ctx.textAlign = 'center';
    ctx.fillText('#おうちAIラボ  #SHIFTAI', W / 2, H - 110);
}

// テキスト描画
function drawText(ctx, type, top3) {
    // ヘッダーラベル
    ctx.fillStyle = '#DD047B';
    ctx.font = 'bold 20px "Noto Sans JP"';
    ctx.textAlign = 'left';
    ctx.fillText('あなたのタイプは...', 420, 140);

    // タイプ名
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 48px "Noto Sans JP"';
    ctx.fillText(type.name, 420, 200);

    // タグライン
    ctx.fillStyle = '#666666';
    ctx.font = '24px "Noto Sans JP"';
    ctx.fillText(`〜${type.tagline}〜`, 420, 250);

    // おすすめカテゴリ
    ctx.fillStyle = '#1F2974';
    ctx.font = 'bold 24px "Noto Sans JP"';
    ctx.fillText('おすすめカテゴリ TOP3', 420, 320);

    // カテゴリリスト
    const rankColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
    top3.forEach((cat, index) => {
        const y = 370 + (index * 50);

        // ランクバッジ
        ctx.fillStyle = rankColors[index];
        ctx.beginPath();
        ctx.arc(450, y, 18, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 18px "Noto Sans JP"';
        ctx.textAlign = 'center';
        ctx.fillText(index + 1, 450, y + 6);

        // カテゴリ名
        ctx.fillStyle = '#1F2974';
        ctx.font = '24px "Noto Sans JP"';
        ctx.textAlign = 'left';
        ctx.fillText(cat.name, 490, y + 8);
    });

    // ハッシュタグ
    ctx.fillStyle = '#DD047B';
    ctx.font = '18px "Noto Sans JP"';
    ctx.textAlign = 'right';
    ctx.fillText('#おうちAIラボ #SHIFTAI', 1100, 540);
}

// 角丸四角形
function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

// やり直し
function restartDiagnosis() {
    startDiagnosis();
}

// 画像をBase64でプリロード（CORS対策）
function preloadImageAsBase64(src) {
    return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = function() {
            try {
                const canvas = document.createElement('canvas');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const base64Img = new Image();
                base64Img.onload = function() {
                    resolve(base64Img);
                };
                base64Img.onerror = function() {
                    resolve(img);
                };
                base64Img.src = canvas.toDataURL('image/png');
            } catch (e) {
                resolve(img);
            }
        };
        img.onerror = function() {
            // crossOriginなしで再試行
            const fallbackImg = new Image();
            fallbackImg.onload = function() {
                resolve(fallbackImg);
            };
            fallbackImg.onerror = function() {
                resolve(null);
            };
            fallbackImg.src = src;
        };
        img.src = src;
    });
}

// 初期化実行
init();
