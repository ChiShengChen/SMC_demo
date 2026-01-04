
import { ConceptId, ConceptData } from './types';

export const CONCEPTS: ConceptData[] = [
  {
    id: ConceptId.FVG,
    title: '公允價值缺口 (FVG)',
    titleEn: 'Fair Value Gap',
    description: 'FVG是三根K棒的價格失衡，K棒1的高點與K棒3的低點之間沒有重疊，形成一個「缺口」區域。',
    descriptionEn: 'FVG is a three-candle price imbalance where candle 1\'s high doesn\'t overlap with candle 3\'s low, creating a "gap" zone.',
    candles: [
      { open: 10, high: 15, low: 8, close: 12, type: 'bullish' }, // Candle 1
      { open: 12, high: 25, low: 12, close: 24, type: 'bullish' }, // Candle 2 (Big impulse)
      { open: 24, high: 28, low: 22, close: 26, type: 'bullish' }, // Candle 3
    ],
    zones: [
      { type: 'fvg', startIndex: 0, endIndex: 2, topPrice: 22, bottomPrice: 15, label: 'FVG Zone', color: 'rgba(52, 211, 153, 0.2)' }
    ],
    tradingMethod: '等待價格回撤到FVG區域的50%中點，配合確認信號（拒絕燭芯、吞噬K棒）進場。止損設在FVG邊界之外。',
    tradingMethodEn: 'Wait for price to retrace to the 50% midpoint of FVG zone, enter with confirmation signals (rejection wick, engulfing candle). Stop loss beyond FVG boundary.'
  },
  {
    id: ConceptId.OB,
    title: '訂單區塊 (OB)',
    titleEn: 'Order Block',
    description: '訂單區塊是強勁反向移動之前最後一根相反顏色的K棒。看漲OB = 上漲前最後一根看跌K棒。',
    descriptionEn: 'Order Block is the last opposite-colored candle before a strong move. Bullish OB = last bearish candle before upward move.',
    candles: [
      { open: 15, high: 17, low: 10, close: 11, type: 'bearish' }, // OB Candle
      { open: 11, high: 25, low: 11, close: 24, type: 'bullish' }, // Breakout
      { open: 24, high: 32, low: 23, close: 30, type: 'bullish' }, // Confirmation
    ],
    zones: [
      { type: 'ob', startIndex: 0, endIndex: 0, topPrice: 15, bottomPrice: 10, label: 'Bullish OB', color: 'rgba(59, 130, 246, 0.3)' }
    ],
    tradingMethod: '有效OB標準：後續有結構突破(BOS)、之前有流動性掃蕩、未被緩解（價格未穿過）、符合更高時間框架方向。',
    tradingMethodEn: 'Valid OB criteria: Followed by BOS, preceded by liquidity sweep, unmitigated, aligned with HTF.'
  },
  {
    id: ConceptId.BOS_CHOCH,
    title: '結構分析 (BOS / CHoCH)',
    titleEn: 'Structure (BOS / CHoCH)',
    description: 'BOS（結構突破）代表趨勢延續；CHoCH（性質改變）代表潛在反轉。',
    descriptionEn: 'BOS (Break of Structure) means trend continuation; CHoCH (Change of Character) means potential reversal.',
    candles: [
      { open: 10, high: 15, low: 8, close: 14, type: 'bullish' }, 
      { open: 14, high: 12, low: 10, close: 11, type: 'bearish' },
      { open: 11, high: 22, low: 11, close: 20, type: 'bullish' }, // BOS!
    ],
    zones: [
      { type: 'breaker', startIndex: 0, endIndex: 2, topPrice: 15.2, bottomPrice: 14.8, label: 'BOS Line', color: 'rgba(239, 68, 68, 0.8)' }
    ],
    tradingMethod: 'BOS確認趨勢；CHoCH是首次突破逆勢結構點，需等待MSS進一步確認。',
    tradingMethodEn: 'BOS confirms trend; CHoCH is first break of counter-trend structure, wait for MSS for confirmation.'
  },
  {
    id: ConceptId.LIQUIDITY,
    title: '流動性概念',
    titleEn: 'Liquidity Concepts',
    description: '市場尋找止損單（流動性）來成交大額訂單。常見於等高點(EQH)或等低點(EQL)。',
    descriptionEn: 'Markets target stop-losses (liquidity) to fill large orders. Often found at Equal Highs (EQH) or Equal Lows (EQL).',
    candles: [
      { open: 20, high: 25, low: 18, close: 22, type: 'bullish' },
      { open: 22, high: 25, low: 19, close: 21, type: 'bearish' }, // EQL forming
      { open: 21, high: 28, low: 15, close: 26, type: 'bullish' }, // Sweep!
    ],
    zones: [
      { type: 'liquidity', startIndex: 0, endIndex: 1, topPrice: 25.5, bottomPrice: 24.5, label: 'Buy-Side Liquidity', color: 'rgba(234, 179, 8, 0.4)' }
    ],
    tradingMethod: '止損獵殺後反轉特徵：快速刺穿關鍵水平 -> 長影線 -> 立即反轉。',
    tradingMethodEn: 'Reversal after sweep: Quick pierce -> Long wick -> Immediate reversal.'
  }
];
