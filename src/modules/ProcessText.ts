import { TSearchedText } from '@/types/SearchedText';

export const processText = (
  text: string,
  keyWords: string[]
): TSearchedText[] => {
  // get unique ketwords to avoid duplication
  const uniqueKeyWords = [...new Set(keyWords)];

  const foundKeyWords: TSearchedText[] = [];
  const n = text.length;
  uniqueKeyWords.forEach((k) => {
    let i = 0;
    while (i < n) {
      const j = text.indexOf(k, i);
      if (j === -1) break;

      // limit pos within original text length
      const from = Math.max(j - 5, 0);
      const to = Math.min(j + k.length + 5, n);
      const redundantWord = text.substring(from, to);
      foundKeyWords.push({
        keyWord: k,
        pos: j,
        redundantKeyWord: redundantWord
      });

      // next check should be starting from current position + 1 to skip already-searched part of original string
      i = j + 1;
    }
  });
  return foundKeyWords;
};
