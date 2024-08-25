import { MIN_CARACTERS_FOR_VALIDATION } from "@/shared/constants";

const MIN_ENTROPY_LIMIT = 2.5

function isTestText(text: string): boolean {

  if (text.length < MIN_CARACTERS_FOR_VALIDATION) return true;


  if (new Set(text.split('')).size === 1) return true;


  if (!/[a-zA-Z]/.test(text)) return true;


  const entropy = calculateEntropy(text);
  if (entropy < MIN_ENTROPY_LIMIT) return true;

  return false;
}

function calculateEntropy(text: string): number {
  const len = text.length;
  const frequencies: { [char: string]: number } = {};

  for (let i = 0; i < len; i++) {
    frequencies[text[i]] = (frequencies[text[i]] || 0) + 1;
  }

  return Object.values(frequencies).reduce((sum, f) => {
    const p = f / len;
    return sum - p * Math.log2(p);
  }, 0);
}

export { isTestText };

