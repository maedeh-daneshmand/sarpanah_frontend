'use client';

export interface ThemeColors {
  hue: number;
  bgFrom: string;
  bgTo: string;
  primary: string;
  primaryRgb: string;
  secondary: string;
  secondaryRgb: string;
  accent: string;
  name?: string;
}

// Pre-defined color palettes for iconic regions in Iran (instant, reliable fallback & quick preview)
export const regionColorPresets: Record<string, ThemeColors> = {
  // Gilan & North (Lush Forest Emerald)
  gilan: {
    hue: 138,
    bgFrom: '#eef6f0',
    bgTo: '#d6ebd9',
    primary: '138 42% 32%',
    primaryRgb: '45, 114, 69',
    secondary: '28 58% 44%',
    secondaryRgb: '178, 102, 48',
    accent: '138 30% 88%',
    name: 'گیلان سرسبز (سبز جنگلی)',
  },
  // Mazandaran (Coastal Pine & Caspian Breeze)
  mazandaran: {
    hue: 155,
    bgFrom: '#ebf5f1',
    bgTo: '#cfebdf',
    primary: '155 46% 30%',
    primaryRgb: '41, 112, 83',
    secondary: '35 60% 45%',
    secondaryRgb: '184, 114, 46',
    accent: '155 32% 88%',
    name: 'مازندران (کاج و دریا)',
  },
  // Isfahan (Turquoise Blue & Historic Clay)
  isfahan: {
    hue: 188,
    bgFrom: '#edf7f8',
    bgTo: '#d3edf0',
    primary: '188 55% 30%',
    primaryRgb: '34, 105, 119',
    secondary: '22 62% 46%',
    secondaryRgb: '189, 98, 45',
    accent: '188 35% 88%',
    name: 'اصفهان (فیروزه‌ای و خشت)',
  },
  // Shiraz (Persian Rose & Amber Sunshine)
  shiraz: {
    hue: 345,
    bgFrom: '#fcf0f3',
    bgTo: '#f8d9e2',
    primary: '345 48% 36%',
    primaryRgb: '136, 48, 70',
    secondary: '38 65% 46%',
    secondaryRgb: '194, 122, 41',
    accent: '345 35% 90%',
    name: 'شیراز (گل سرخ و باغ ارم)',
  },
  // Desert / Maranjab / Yazd (Warm Sunlit Terracotta Sand)
  desert: {
    hue: 32,
    bgFrom: '#faf4eb',
    bgTo: '#f3e3ce',
    primary: '28 58% 38%',
    primaryRgb: '153, 85, 41',
    secondary: '142 35% 35%',
    secondaryRgb: '58, 120, 77',
    accent: '32 40% 88%',
    name: 'کویر مرنجاب (طلایی و سفال)',
  },
  // Tehran / Mountain Alborz (Modern Stone & Slate)
  tehran: {
    hue: 140,
    bgFrom: '#f0f4f1',
    bgTo: '#dae4dc',
    primary: '142 38% 30%',
    primaryRgb: '47, 105, 66',
    secondary: '25 55% 45%',
    secondaryRgb: '178, 100, 51',
    accent: '140 28% 88%',
    name: 'تهران و البرز (کوهستان و صخره)',
  },
};

/**
 * Maps a given Hue to high-quality matching CSS background and primary variables
 */
export function hueToThemeColors(h: number): ThemeColors {
  if (h >= 80 && h < 165) {
    // Green Nature
    return {
      hue: h,
      bgFrom: `hsl(${h}, 28%, 94%)`,
      bgTo: `hsl(${h}, 24%, 86%)`,
      primary: `${h} 44% 32%`,
      primaryRgb: '45, 114, 69',
      secondary: '28 58% 44%',
      secondaryRgb: '178, 102, 48',
      accent: `${h} 30% 88%`,
    };
  } else if (h >= 165 && h < 225) {
    // Turquoise / Cyan / Coast
    return {
      hue: h,
      bgFrom: `hsl(${h}, 30%, 94%)`,
      bgTo: `hsl(${h}, 26%, 86%)`,
      primary: `${h} 52% 29%`,
      primaryRgb: '36, 112, 112',
      secondary: '25 60% 46%',
      secondaryRgb: '187, 99, 47',
      accent: `${h} 32% 88%`,
    };
  } else if (h >= 225 && h < 290) {
    // Blue / Indigo
    return {
      hue: h,
      bgFrom: `hsl(${h}, 32%, 95%)`,
      bgTo: `hsl(${h}, 28%, 88%)`,
      primary: `${h} 50% 36%`,
      primaryRgb: '46, 75, 138',
      secondary: '35 60% 48%',
      secondaryRgb: '196, 128, 49',
      accent: `${h} 35% 89%`,
    };
  } else if (h >= 20 && h < 80) {
    // Warm Ochre / Desert Sand
    return {
      hue: h,
      bgFrom: `hsl(${h}, 36%, 95%)`,
      bgTo: `hsl(${h}, 30%, 87%)`,
      primary: `${h} 56% 36%`,
      primaryRgb: '143, 89, 41',
      secondary: '140 38% 34%',
      secondaryRgb: '54, 119, 75',
      accent: `${h} 38% 88%`,
    };
  } else {
    // Warm Red / Berry / Rose
    return {
      hue: h,
      bgFrom: `hsl(${h}, 32%, 95%)`,
      bgTo: `hsl(${h}, 26%, 88%)`,
      primary: `${h} 46% 36%`,
      primaryRgb: '134, 50, 71',
      secondary: '35 60% 46%',
      secondaryRgb: '187, 118, 47',
      accent: `${h} 34% 90%`,
    };
  }
}

/**
 * Applies a theme palette to :root CSS variables with smooth transition
 */
export function applyThemeColors(theme: ThemeColors) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.style.setProperty('--theme-h', theme.hue.toString());
  root.style.setProperty('--hero-bg-from', theme.bgFrom);
  root.style.setProperty('--hero-bg-to', theme.bgTo);
  root.style.setProperty('--primary', theme.primary);
  root.style.setProperty('--primary-rgb', theme.primaryRgb);
  root.style.setProperty('--secondary', theme.secondary);
  root.style.setProperty('--secondary-rgb', theme.secondaryRgb);
  root.style.setProperty('--accent', theme.accent);
}

/**
 * Extracts dominant hue from an image using an offscreen canvas
 */
export async function extractDominantHueFromImage(imageUrl: string): Promise<number> {
  return new Promise((resolve) => {
    // Fast keyword detection first
    const lower = imageUrl.toLowerCase();
    if (lower.includes('gilan') || lower.includes('forest') || lower.includes('eco')) {
      resolve(138);
      return;
    }
    if (lower.includes('desert') || lower.includes('sand') || lower.includes('kavir')) {
      resolve(32);
      return;
    }
    if (lower.includes('shiraz') || lower.includes('garden')) {
      resolve(345);
      return;
    }

    if (typeof window === 'undefined') {
      resolve(138);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = 40;
        canvas.height = 40;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(138);
          return;
        }

        ctx.drawImage(img, 0, 0, 40, 40);
        const data = ctx.getImageData(0, 0, 40, 40).data;
        let rSum = 0, gSum = 0, bSum = 0, count = 0;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i], g = data[i + 1], b = data[i + 2];
          // Filter out pure black / pure white
          if (r + g + b < 60 || r + g + b > 690) continue;
          rSum += r;
          gSum += g;
          bSum += b;
          count++;
        }

        if (count === 0) {
          resolve(138);
          return;
        }

        const r = rSum / count / 255;
        const g = gSum / count / 255;
        const b = bSum / count / 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0;
        const d = max - min;

        if (d !== 0) {
          if (max === r) h = ((g - b) / d) % 6;
          else if (max === g) h = (b - r) / d + 2;
          else h = (r - g) / d + 4;
          h = Math.round(h * 60);
          if (h < 0) h += 360;
        }
        resolve(h);
      } catch {
        resolve(138);
      }
    };
    img.onerror = () => resolve(138);
    img.src = imageUrl;
  });
}
