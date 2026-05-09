import { useMemo } from 'react';
import { prepare, layout } from '@chenglou/pretext';
import useMeasure from 'react-use-measure';

export function usePretextHeight(text: string, font: string, lineHeight: number) {
  const [ref, bounds] = useMeasure();

  // Phase 1: Measure once (Heavy, but memoized)
  const preparedText = useMemo(() => {
    if (!text) return null;
    return prepare(text, font);
  }, [text, font]);

  // Phase 2: Layout instantly on resize (Extremely lightweight)
  const calculatedHeight = useMemo(() => {
    if (!preparedText || bounds.width === 0) return 0;
    
    const { height } = layout(preparedText, bounds.width, lineHeight);
    return height;
  }, [preparedText, bounds.width, lineHeight]);

  return { ref, height: calculatedHeight };
}
