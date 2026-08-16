// Levenshtein distance for typo tolerance
export function levenshtein(a: string, b: string): number {
  const matrix = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      if (a[i - 1] === b[j - 1]) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[a.length][b.length];
}

// Check if a word closely matches a keyword (allowing up to 2 typos for longer words)
export function isFuzzyMatch(word: string, keyword: string): boolean {
  if (word === keyword) return true;
  if (keyword.length <= 3) return word === keyword; // exact match for short words
  
  const distance = levenshtein(word, keyword);
  const maxTypos = keyword.length > 5 ? 2 : 1;
  return distance <= maxTypos;
}

// Tokenize a sentence and look for matches against an array of keywords
export function hasIntent(input: string, keywords: string[]): boolean {
  const normalized = input.toLowerCase().replace(/[^\w\s]/gi, '');
  const tokens = normalized.split(/\s+/);

  for (const token of tokens) {
    for (const keyword of keywords) {
      if (isFuzzyMatch(token, keyword)) {
        return true;
      }
    }
  }
  return false;
}
