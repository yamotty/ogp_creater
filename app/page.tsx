"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const [authorName, setAuthorName] = useState("yamotty");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    const width = 1920;
    const height = 1080;

    // 明るいブルーグレーのベース背景（より洗練された色）
    ctx.fillStyle = "#B5C5D5";
    ctx.fillRect(0, 0, width, height);

    // おしゃれなグラデーションオーバーレイ
    // 右上から左下への大きなグラデーション
    const mainGradient = ctx.createLinearGradient(width * 0.8, 0, width * 0.2, height);
    mainGradient.addColorStop(0, "rgba(150, 180, 210, 0.3)");
    mainGradient.addColorStop(0.5, "rgba(180, 200, 220, 0.15)");
    mainGradient.addColorStop(1, "rgba(130, 160, 190, 0.25)");
    ctx.fillStyle = mainGradient;
    ctx.fillRect(0, 0, width, height);

    // 右上に大きなグラデーション円（より洗練された）
    const gradient1 = ctx.createRadialGradient(width * 0.9, height * 0.1, 0, width * 0.9, height * 0.1, 800);
    gradient1.addColorStop(0, "rgba(120, 160, 200, 0.35)");
    gradient1.addColorStop(0.4, "rgba(120, 160, 200, 0.2)");
    gradient1.addColorStop(1, "rgba(120, 160, 200, 0)");
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, width, height);

    // 左下にアクセント円（より洗練された）
    const gradient2 = ctx.createRadialGradient(width * 0.1, height * 0.9, 0, width * 0.1, height * 0.9, 700);
    gradient2.addColorStop(0, "rgba(140, 180, 220, 0.3)");
    gradient2.addColorStop(0.4, "rgba(140, 180, 220, 0.15)");
    gradient2.addColorStop(1, "rgba(140, 180, 220, 0)");
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, width, height);

    // 中央左側に小さなアクセント
    const gradient3 = ctx.createRadialGradient(width * 0.2, height * 0.5, 0, width * 0.2, height * 0.5, 500);
    gradient3.addColorStop(0, "rgba(160, 190, 230, 0.2)");
    gradient3.addColorStop(1, "rgba(160, 190, 230, 0)");
    ctx.fillStyle = gradient3;
    ctx.fillRect(0, 0, width, height);

    // 微細なドットパターンでテクスチャを追加（より上品に）
    ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
    for (let x = 0; x < width; x += 60) {
      for (let y = 0; y < height; y += 60) {
        if ((x + y) % 120 === 0) {
          ctx.beginPath();
          ctx.arc(x, y, 1.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 装飾的な幾何学パターン（より洗練された直線パターン）
    
    // 右上から左下への斜め線（メインのパターン、より多く）
    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(width * (0.4 + i * 0.08), 0);
      ctx.lineTo(width, height * (0.1 + i * 0.1));
      ctx.stroke();
    }
    
    // 左上から右下への斜め線（メインのパターン、より多く）
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      ctx.moveTo(0, height * (0.1 + i * 0.1));
      ctx.lineTo(width * (0.4 + i * 0.08), height);
      ctx.stroke();
    }
    
    // より細い補助的な斜め線（控えめに）
    ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(width * (0.5 + i * 0.06), 0);
      ctx.lineTo(width, height * (0.15 + i * 0.12));
      ctx.stroke();
    }
    
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.moveTo(0, height * (0.15 + i * 0.12));
      ctx.lineTo(width * (0.5 + i * 0.06), height);
      ctx.stroke();
    }
    
    // 対角線のアクセント（太めの線）
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 2;
    // 右上から左下への太い対角線
    ctx.beginPath();
    ctx.moveTo(width * 0.85, 0);
    ctx.lineTo(width, height * 0.15);
    ctx.stroke();
    // 左上から右下への太い対角線
    ctx.beginPath();
    ctx.moveTo(0, height * 0.15);
    ctx.lineTo(width * 0.15, height);
    ctx.stroke();
  };

  const drawText = (ctx: CanvasRenderingContext2D, text: string, authorName: string, scale: number = 1) => {
    const width = 1920;
    const height = 1080;

    // タイトルを描画
    if (text) {
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 日本語用フォント（Noto Sans JP）
      const titleFontSize = 80 * scale;
      ctx.font = `bold ${titleFontSize}px 'Noto Sans JP', sans-serif`;
      
      // 改行を考慮してテキストを描画
      const lines = text.split("\n");
      const lineHeight = 130 * scale; // 行間を広げる
      const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, startY + index * lineHeight);
      });
    }

    // 筆者名を描画（タイトルとの間隔をより広げる）
    if (authorName) {
      ctx.fillStyle = "#FFFFFF";
      const authorFontSize = 48 * scale;
      ctx.font = `bold ${authorFontSize}px 'Montserrat', sans-serif`;
      
      // タイトルの最後の行の位置を計算
      let authorY: number;
      if (text) {
        const lines = text.split("\n");
        const lineHeight = 130 * scale;
        const titleLastLineY = height / 2 + (lines.length - 1) * lineHeight / 2;
        authorY = titleLastLineY + 180 * scale; // タイトルとの間隔を180pxに拡大
      } else {
        // タイトルがない場合は中央から少し下に配置
        authorY = height / 2 + 100 * scale;
      }
      
      ctx.fillText(authorName, width / 2, authorY);
    }
  };

  const generateImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // フォントが読み込まれるまで待機
    await document.fonts.ready;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 高解像度対応（Retina対応）
    const scale = 2;
    const displayWidth = 1920;
    const displayHeight = 1080;
    
    // 実際のCanvasサイズ（高解像度）
    canvas.width = displayWidth * scale;
    canvas.height = displayHeight * scale;
    
    // 表示サイズはCSSでアスペクト比を維持（幅100%、高さ自動）
    canvas.style.width = "100%";
    canvas.style.height = "auto";
    canvas.style.aspectRatio = "16/9";
    
    // スケーリング
    ctx.scale(scale, scale);

    // 背景を描画
    drawBackground(ctx);

    // テキストを描画（scaleは既に適用されているので1を渡す）
    drawText(ctx, title, authorName, 1);
  };

  useEffect(() => {
    generateImage();
  }, [title, authorName]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `ogp-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          OGP画像生成ツール
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 入力フォーム */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                タイトル（32文字以内）
              </label>
              <textarea
                value={title}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value.length <= 32) {
                    setTitle(value);
                  }
                }}
                placeholder="タイトルを入力してください（改行はShift+Enter）"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={4}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                  }
                }}
              />
              <p className="mt-1 text-sm text-gray-500">
                {title.length}/32文字
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                筆者名
              </label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="筆者名を入力してください"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <button
              onClick={downloadImage}
              disabled={!title}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              画像をダウンロード
            </button>
          </div>

          {/* プレビュー */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              プレビュー
            </label>
            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white p-4">
              <div className="flex justify-center w-full">
                <canvas
                  ref={canvasRef}
                  style={{ 
                    width: "100%", 
                    height: "auto", 
                    aspectRatio: "16/9",
                    display: "block"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
