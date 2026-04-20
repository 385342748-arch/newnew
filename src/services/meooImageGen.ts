import { supabase } from '../supabase/client';

export async function generateImage(
  prompt: string,
  model: 'qwen-image-2.0' | 'wan2.7-image' = 'wan2.7-image',
  size?: string,
  options?: {
    images?: string[];
    n?: number;
    watermark?: boolean;
    thinking_mode?: boolean;
    enable_sequential?: boolean;
    seed?: number;
    bbox_list?: number[][][];
    color_palette?: { hex: string; ratio: string }[];
  }
) {
  const { data, error } = await supabase.functions.invoke('ai-image-gen', {
    body: { prompt, model, size, ...options },
  });
  if (error) throw error;
  return data;
}

export function extractImageUrl(response: any): string | null {
  return response?.output?.choices?.[0]?.message?.content?.[0]?.image ?? null;
}

export function extractAllImageUrls(response: any): string[] {
  const content = response?.output?.choices?.[0]?.message?.content;
  if (!Array.isArray(content)) return [];
  return content.filter((c: any) => c.type === 'image').map((c: any) => c.image);
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      resolve(result);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
