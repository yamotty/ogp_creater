"use client";

import { useState, useRef, useEffect } from "react";

type BackgroundType = "solid" | "gradient" | "pattern";

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
        // ブルーグレーの単色背景
        ctx.fillStyle = "#6B7A8F";
        ctx.fillRect(0, 0, width, height);
        break;

      case "gradient":
        // ブルーグレーのグラデーション背景
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, "#5A6B7F");
        gradient.addColorStop(1, "#7B8A9F");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        break;

      case "pattern":
        // ブルーグレーベースの幾何学模様
        ctx.fillStyle = "#6B7A8F";
        ctx.fillRect(0, 0, width, height);

        // 視認性を落とさない程度の幾何学模様を描画
        ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
        ctx.lineWidth = 2;

        // 斜めの線パターン
        for (let i = -height; i < width + height; i += 80) {
          ctx.beginPath();
          ctx.moveTo(i, 0);
          ctx.lineTo(i + height, height);
          ctx.stroke();
        }

        // 円形パターン
        ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
        for (let x = 200; x < width; x += 400) {
          for (let y = 200; y < height; y += 400) {
            ctx.beginPath();
            ctx.arc(x, y, 150, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        break;
    }
  };

  const drawText = (ctx: CanvasRenderingContext2D, text: string) => {
    const width = 1920;
    const height = 1080;

    // タイトルを描画
    if (text) {
      ctx.fillStyle = "#FFFFFF";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // 日本語用フォント（Noto Sans JP）
      ctx.font = "bold 80px 'Noto Sans JP', sans-serif";
      
      // 改行を考慮してテキストを描画
      const lines = text.split("\n");
      const lineHeight = 100;
      const startY = height / 2 - (lines.length - 1) * lineHeight / 2;

      lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, startY + index * lineHeight);
      });
    }

    // 筆者名を描画
    ctx.fillStyle = "#E8E8E8";
    ctx.font = "500 48px 'Montserrat', sans-serif";
    ctx.fillText("yamotty", width / 2, height / 2 + 120);
  };

  const generateImage = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // フォントが読み込まれるまで待機
    await document.fonts.ready;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // 高解像度対応
    const scale = 2;
    canvas.width = 1920 * scale;
    canvas.height = 1080 * scale;
    ctx.scale(scale, scale);

    // 背景を描画
    drawBackground(ctx, backgroundType);

    // テキストを描画
    drawText(ctx, title);
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
                    value="gradient"
                    checked={backgroundType === "gradient"}
                    onChange={(e) =>
                      setBackgroundType(e.target.value as BackgroundType)
                    }
                    className="w-4 h-4 text-blue-600"
                  />
                  <span>グラデーション</span>
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
              <canvas
                ref={canvasRef}
                className="w-full h-auto"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
