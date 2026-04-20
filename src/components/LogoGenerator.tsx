import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Download, RefreshCw } from 'lucide-react';
import { generateImage, extractImageUrl } from '../services/meooImageGen';

interface LogoGeneratorProps {
  onLogoGenerated?: (logoUrl: string) => void;
}

export const LogoGenerator: React.FC<LogoGeneratorProps> = ({ onLogoGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLogo, setGeneratedLogo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generatePandaLogo = async () => {
    setIsGenerating(true);
    setError(null);

    try {
      const prompt = `A cute cartoon panda mascot logo for a travel company called "GO EAST". 
The panda is shown from the chest up, clearly displaying its head, neck, and shoulders.
The panda has a round white face with distinctive black eye patches, black ears, and white fur on its neck and upper body.
The panda is friendly, welcoming, and slightly smiling.
Simple, clean, and professional logo design suitable for a travel brand.
The composition is circular or rounded, showing the upper body including shoulders.
Soft, warm colors with a clean white/light background.
Style: Modern, minimalist, cute but professional mascot logo.`;

      const response = await generateImage(
        prompt,
        'wan2.7-image',
        '1K',
        { n: 1, watermark: false }
      );

      const imageUrl = extractImageUrl(response);
      if (imageUrl) {
        setGeneratedLogo(imageUrl);
        onLogoGenerated?.(imageUrl);
      } else {
        setError('未能生成图片，请重试');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '生成失败，请重试');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold text-gray-900 mb-4">生成大熊猫LOGO</h3>
      <p className="text-gray-600 mb-6">
        基于参考图片风格，生成一个能看到脖子和肩膀的可爱大熊猫LOGO
      </p>

      <div className="flex gap-4 mb-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generatePandaLogo}
          disabled={isGenerating}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              生成中...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              生成LOGO
            </>
          )}
        </motion.button>

        {generatedLogo && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={generatePandaLogo}
            className="flex items-center gap-2 px-6 py-3 border-2 border-amber-500 text-amber-600 rounded-full font-medium"
          >
            <RefreshCw className="w-5 h-5" />
            重新生成
          </motion.button>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg mb-4">
          {error}
        </div>
      )}

      {generatedLogo && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <p className="text-sm text-gray-500 mb-2">生成的LOGO：</p>
          <div className="relative inline-block">
            <img
              src={generatedLogo}
              alt="Generated Panda Logo"
              className="w-48 h-48 object-contain rounded-xl border-2 border-gray-200"
            />
            <a
              href={generatedLogo}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <Download className="w-4 h-4 text-gray-700" />
            </a>
          </div>
          <p className="text-xs text-gray-400 mt-2 break-all">{generatedLogo}</p>
        </motion.div>
      )}
    </div>
  );
};
