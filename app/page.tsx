"use client";

import { useState, useRef, useEffect } from "react";

type BackgroundType = "solid" | "pattern";

export default function Home() {
  const [title, setTitle] = useState("");
  const [backgroundType, setBackgroundType] = useState<BackgroundType>("solid");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const drawBackground = (
    ctx: CanvasRenderingContext2D,
    type: BackgroundType
  ) => {
    const width = 1920;
    const height = 1080;

    switch (type) {
      case "solid":
        // 明るいブルーグレーのベース背景
        ctx.fillStyle = "#A8B8C8";
        ctx.fillRect(0, 0, width, height);

        // アイキャッチなアクセントを追加
        // 右上にグラデーション円
        const gradient1 = ctx.createRadialGradient(width * 0.85, height * 0.15, 0, width * 0.85, height * 0.15, 600);
        gradient1.addColorStop(0, "rgba(100, 150, 200, 0.3)");
        gradient1.addColorStop(1, "rgba(100, 150, 200, 0)");
        ctx.fillStyle = gradient1;
        ctx.fillRect(0, 0, width, height);

        // 左下にアクセント円
        const gradient2 = ctx.createRadialGradient(width * 0.15, height * 0.85, 0, width * 0.15, height * 0.85, 500);
        gradient2.addColorStop(0, "rgba(120, 170, 220, 0.25)");
        gradient2.addColorStop(1, "rgba(120, 170, 220, 0)");
        ctx.fillStyle = gradient2;
        ctx.fillRect(0, 0, width, height);

        // 微細なドットパターンでテクスチャを追加
        ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        for (let x = 0; x < width; x += 40) {
          for (let y = 0; y < height; y += 40) {
            if ((x + y) % 80 === 0) {
              ctx.fillRect(x, y, 2, 2);
            }
          }
        }
        break;

      case "pattern":
        // 明るいブルーグレーのベース背景
        ctx.fillStyle = "#A8B8C8";
        ctx.fillRect(0, 0, width, height);

        // アイキャッチな幾何学模様
        // 大きな円形パターン
        ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
        for (let x = 0; x < width; x += 300) {
          for (let y = 0; y < height; y += 300) {
            ctx.beginPath();
            ctx.arc(x, y, 120, 0, Math.PI * 2);
            ctx.fill();
          }
        }

        // 斜めのストライプパターン
        ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
        ctx.lineWidth = 3;
        for (let i = -height; i < width + height; i += 100) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + height, height);
          ctx.stroke();
        }

        // 対角線のアクセント
        ctx.strokeStyle = "rgba(100, 150, 200, 0.3)";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(width, height);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(width, 0);
        ctx.lineTo(0, height);
        ctx.stroke();

        // 小さな装飾的な円
        ctx.fillStyle = "rgba(120, 170, 220, 0.2)";
        for (let x = 150; x < width; x += 400) {
          for (let y = 150; y < height; y += 400) {
            ctx.beginPath();
            ctx.arc(x, y, 60, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
    }
  };

  const drawText = (ctx: CanvasRenderingContext2D, text: string, scale: number = 1) => {
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
      const lineHeight = 100 * scale;
      const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, startY + index * lineHeight);
      });
    }

    // 筆者名を描画
    ctx.fillStyle = "#E8E8E8";
    const authorFontSize = 48 * scale;
    ctx.font = `500 ${authorFontSize}px 'Montserrat', sans-serif`;
    ctx.fillText("yamotty", width / 2, height / 2 + 120 * scale);
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
    drawBackground(ctx, backgroundType);

    // テキストを描画（scaleは既に適用されているので1を渡す）
    drawText(ctx, title, 1);
  };

  useEffect(() => {
    generateImage();
  }, [title, backgroundType]);

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
              <label className="block text-sm font-medium text-gray-700 mb-3">
                背景デザイン
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="background"
                    value="solid"
                    checked={backgroundType === "solid"}
                    onChange={(e) =>
                      setBackgroundType(e.target.value as BackgroundType)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>単色</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="background"
                    value="pattern"
                    checked={backgroundType === "pattern"}
                    onChange={(e) =>
                      setBackgroundType(e.target.value as BackgroundType)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>幾何学模様</span>
                </label>
              </div>
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
