"use client";

import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [title, setTitle] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (ctx: CanvasRenderingContext2D) => {
    const width = 1920;
    const height = 1080;

    // 明るいブルーグレーのベース背景
    ctx.fillStyle = "#A8B8C8";
    ctx.fillRect(0, 0, width, height);

    // アイキャッチなアクセントを追加
    // 右上に大きなグラデーション円
    const gradient1 = ctx.createRadialGradient(width * 0.85, height * 0.15, 0, width * 0.85, height * 0.15, 700);
    gradient1.addColorStop(0, "rgba(100, 150, 200, 0.4)");
    gradient1.addColorStop(0.5, "rgba(100, 150, 200, 0.2)");
    gradient1.addColorStop(1, "rgba(100, 150, 200, 0)");
    ctx.fillStyle = gradient1;
    ctx.fillRect(0, 0, width, height);

    // 左下にアクセント円
    const gradient2 = ctx.createRadialGradient(width * 0.15, height * 0.85, 0, width * 0.15, height * 0.85, 600);
    gradient2.addColorStop(0, "rgba(120, 170, 220, 0.35)");
    gradient2.addColorStop(0.5, "rgba(120, 170, 220, 0.15)");
    gradient2.addColorStop(1, "rgba(120, 170, 220, 0)");
    ctx.fillStyle = gradient2;
    ctx.fillRect(0, 0, width, height);

    // 中央上部に小さなアクセント
    const gradient3 = ctx.createRadialGradient(width * 0.5, height * 0.2, 0, width * 0.5, height * 0.2, 400);
    gradient3.addColorStop(0, "rgba(140, 180, 230, 0.25)");
    gradient3.addColorStop(1, "rgba(140, 180, 230, 0)");
    ctx.fillStyle = gradient3;
    ctx.fillRect(0, 0, width, height);

    // 微細なドットパターンでテクスチャを追加
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    for (let x = 0; x < width; x += 50) {
      for (let y = 0; y < height; y += 50) {
        if ((x + y) % 100 === 0) {
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    // 装飾的な線を追加（控えめに）
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 2;
    // 右上から左下への斜め線
    ctx.beginPath();
    ctx.moveTo(width * 0.7, 0);
    ctx.lineTo(width, height * 0.3);
    ctx.stroke();
    // 左上から右下への斜め線
    ctx.beginPath();
    ctx.moveTo(0, height * 0.3);
    ctx.lineTo(width * 0.3, height);
    ctx.stroke();
  };

  const drawText = (ctx: CanvasRenderingContext2D, text: string, scale: number = 1) => {
    const width = 1920;
    const height = 1080;

    // タイトルを描画
    if (text) {
      ctx.fillStyle = "#000000";
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

    // 筆者名を描画（タイトルとの間隔を広げる）
    ctx.fillStyle = "#000000";
    const authorFontSize = 48 * scale;
    ctx.font = `bold ${authorFontSize}px 'Montserrat', sans-serif`;
    
    // タイトルの最後の行の位置を計算
    let authorY: number;
    if (text) {
      const lines = text.split("\n");
      const lineHeight = 130 * scale;
      const titleLastLineY = height / 2 + (lines.length - 1) * lineHeight / 2;
      authorY = titleLastLineY + 100 * scale; // タイトルとの間隔を100pxに
    } else {
      // タイトルがない場合は中央から少し下に配置
      authorY = height / 2 + 50 * scale;
    }
    
    ctx.fillText("yamotty", width / 2, authorY);
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
    drawText(ctx, title, 1);
  };

  useEffect(() => {
    generateImage();
  }, [title]);

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
