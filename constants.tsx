
import { ConceptId, ConceptData } from './types';

export const CONCEPTS: ConceptData[] = [
  {
    id: ConceptId.FVG,
    title: '公允價值缺口 (FVG)',
    titleEn: 'Fair Value Gap',
    description: 'FVG是三根K棒的價格失衡，K棒1的高點與K棒3的低點之間沒有重疊，形成一個「缺口」區域。',
    descriptionEn: 'FVG is a three-candle price imbalance where candle 1\'s high doesn\'t overlap with candle 3\'s low, creating a "gap" zone.',
    candles: [
      { open: 10, high: 15, low: 8, close: 12, type: 'bullish' },
      { open: 12, high: 25, low: 12, close: 24, type: 'bullish' },
      { open: 24, high: 28, low: 22, close: 26, type: 'bullish' },
    ],
    zones: [
      { type: 'fvg', startIndex: 0, endIndex: 2, topPrice: 22, bottomPrice: 15, label: 'FVG Zone', color: 'rgba(52, 211, 153, 0.2)' }
    ],
    tradingMethod: '等待價格回撤到FVG區域的50%中點，配合確認信號進場。止損設在FVG邊界之外。',
    tradingMethodEn: 'Wait for price to retrace to the 50% midpoint of FVG zone. Stop loss beyond FVG boundary.'
  },
  {
    id: ConceptId.OB,
    title: '訂單區塊 (OB)',
    titleEn: 'Order Block',
    description: '訂單區塊是強勁移動前最後一根反向K棒，代表機構在此處「訂購」了大量反向單。',
    descriptionEn: 'Order Block is the last opposite-colored candle before a strong impulsive move.',
    candles: [
      { open: 15, high: 17, low: 10, close: 11, type: 'bearish' },
      { open: 11, high: 25, low: 11, close: 24, type: 'bullish' },
      { open: 24, high: 32, low: 23, close: 30, type: 'bullish' },
    ],
    zones: [
      { type: 'ob', startIndex: 0, endIndex: 0, topPrice: 15, bottomPrice: 10, label: 'Bullish OB', color: 'rgba(59, 130, 246, 0.3)' }
    ],
    tradingMethod: '有效OB需符合：後續有BOS、有FVG配合、且未被價格完全穿透。',
    tradingMethodEn: 'Valid OB criteria: Followed by BOS and FVG, remaining unmitigated.'
  },
  {
    id: ConceptId.DOM_FILTER,
    title: 'DOM 價格過濾 (Daily Open)',
    titleEn: 'Daily Open Filter',
    description: '利用當日開盤價(DO)作為過濾器。在看漲日，我們只在開盤價「下方」尋找買入機會（折價區）。',
    descriptionEn: 'Using the Daily Open (DO) as a directional filter. In a bullish day, we only look for longs BELOW the open price (Discount).',
    candles: [
      { open: 20, high: 21, low: 19, close: 20, type: 'bullish' }, // Day Open
      { open: 20, high: 21, low: 12, close: 14, type: 'bearish' }, // Manipulation Below DO (Discount)
      { open: 14, high: 30, low: 14, close: 28, type: 'bullish' }, // Distribution Above DO
    ],
    zones: [
      { type: 'line', startIndex: 0, endIndex: 2, topPrice: 20.1, bottomPrice: 19.9, label: 'Daily Open (DO)', color: 'rgba(255, 255, 255, 0.8)' },
      { type: 'liquidity', startIndex: 0, endIndex: 2, topPrice: 20, bottomPrice: 5, label: 'Discount Area (Buy Only)', color: 'rgba(16, 185, 129, 0.1)' }
    ],
    tradingMethod: '買入準則：價格必須低於當日開盤價（如果是看漲偏見）。這能確保你在機構「批發價」進場而非「零售價」。',
    tradingMethodEn: 'Buy Rule: Price MUST be below the Daily Open (for bullish bias). This ensures you enter at wholesale prices, not retail.'
  },
  {
    id: ConceptId.BREAKER,
    title: '破壞區塊 (Breaker)',
    titleEn: 'Breaker Block',
    description: '這是一個被價格強勢突破的失敗訂單區塊。當它被突破後，原有的阻力/支撐會反轉。',
    descriptionEn: 'A failed Order Block that was broken through with momentum, causing a role reversal.',
    candles: [
      { open: 20, high: 25, low: 18, close: 19, type: 'bearish' },
      { open: 19, high: 15, low: 5, close: 8, type: 'bearish' },
      { open: 8, high: 22, low: 8, close: 20, type: 'bullish' },
    ],
    zones: [
      { type: 'breaker', startIndex: 0, endIndex: 0, topPrice: 25, bottomPrice: 18, label: 'Bullish Breaker', color: 'rgba(168, 85, 247, 0.3)' }
    ],
    tradingMethod: '當價格突破前高/低並掃蕩流動性後，強行穿過原本的OB，回測該區域即是高機率進場點。',
    tradingMethodEn: 'Enter on retest of the broken OB zone after a liquidity sweep and strong displacement.'
  },
  {
    id: ConceptId.AMD,
    title: 'AMD 循環 (Power of 3)',
    titleEn: 'Accumulation / Manipulation / Distribution',
    description: '市場三階段：累積（橫盤）、操控（假突破掃損）、派發（真正的趨勢移動）。',
    descriptionEn: 'The three phases: Accumulation (Range), Manipulation (Stop Hunt), and Distribution (True Move).',
    candles: [
      { open: 15, high: 16, low: 14, close: 15, type: 'bullish' },
      { open: 15, high: 17, low: 14, close: 15, type: 'bearish' },
      { open: 15, high: 12, low: 5, close: 7, type: 'bearish' },
      { open: 7, high: 25, low: 7, close: 22, type: 'bullish' },
    ],
    zones: [
      { type: 'liquidity', startIndex: 0, endIndex: 1, topPrice: 16, bottomPrice: 14, label: 'Accumulation Range', color: 'rgba(234, 179, 8, 0.2)' }
    ],
    tradingMethod: '識別亞洲盤的震盪區間，等待倫敦盤或紐約盤初期發生假突破（Judas Swing）後進場。',
    tradingMethodEn: 'Identify Asian range, wait for the Judas Swing (fakeout), enter in direction of true distribution.'
  },
  {
    id: ConceptId.OTE,
    title: '最佳進場位置 (OTE)',
    titleEn: 'Optimal Trade Entry',
    description: '利用斐波那契回撤尋找進場「甜蜜點」，通常位於一個趨勢波段的 0.62 到 0.79 之間。',
    descriptionEn: 'The "sweet spot" for entries, typically between 0.62 and 0.79 Fibonacci retracement levels.',
    candles: [
      { open: 10, high: 30, low: 10, close: 28, type: 'bullish' },
      { open: 28, high: 30, low: 15, close: 18, type: 'bearish' },
      { open: 18, high: 35, low: 18, close: 32, type: 'bullish' },
    ],
    zones: [
      { type: 'fvg', startIndex: 1, endIndex: 1, topPrice: 22, bottomPrice: 15, label: 'OTE Zone (62%-79%)', color: 'rgba(236, 72, 153, 0.2)' }
    ],
    tradingMethod: '在衝擊波（Impulse Move）後，拉出斐波那契，在 OTE 區域尋找 OB 或 FVG 的重合點（Confluence）。',
    tradingMethodEn: 'Look for confluence of OB or FVG within the 0.62-0.79 Fibonacci retracement area.'
  },
  {
    id: ConceptId.KILL_ZONES,
    title: '時間窗口 (Kill Zones)',
    titleEn: 'Trading Kill Zones',
    description: '聰明錢在特定的時間（波動性最高時）進場。如倫敦開盤、紐約開盤及倫敦收盤。',
    descriptionEn: 'High probability trading windows: London Open, NY Open, and London Close.',
    candles: [
      { open: 10, high: 12, low: 10, close: 11, type: 'bullish' },
      { open: 11, high: 30, low: 8, close: 25, type: 'bullish' },
      { open: 25, high: 28, low: 20, close: 22, type: 'bearish' },
    ],
    zones: [
      { type: 'liquidity', startIndex: 1, endIndex: 2, topPrice: 32, bottomPrice: 5, label: 'Active Kill Zone', color: 'rgba(56, 189, 248, 0.1)' }
    ],
    tradingMethod: '避免在平淡的亞洲盤過度交易。在倫敦盤尋找日內低點/高點的建立，或在紐約盤尋找趨勢延續。',
    tradingMethodEn: 'Focus on volatility expansion during London and NY sessions. Avoid overtrading in low volume hours.'
  },
  {
    id: ConceptId.LIQUIDITY,
    title: '流動性概念',
    titleEn: 'Liquidity Concepts',
    description: '市場尋找止損單（流動性）來成交大額訂單。常見於等高點(EQH)或等低點(EQL)。',
    descriptionEn: 'Markets target stop-losses (liquidity) to fill large orders. Often found at Equal Highs (EQH) or Equal Lows (EQL).',
    candles: [
      { open: 20, high: 25, low: 18, close: 22, type: 'bullish' },
      { open: 22, high: 25, low: 19, close: 21, type: 'bearish' },
      { open: 21, high: 28, low: 15, close: 26, type: 'bullish' },
    ],
    zones: [
      { type: 'liquidity', startIndex: 0, endIndex: 1, topPrice: 25.5, bottomPrice: 24.5, label: 'Buy-Side Liquidity', color: 'rgba(234, 179, 8, 0.4)' }
    ],
    tradingMethod: '止損獵殺後反轉特徵：快速刺穿關鍵水平 -> 長影線 -> 立即反轉。',
    tradingMethodEn: 'Reversal after sweep: Quick pierce -> Long wick -> Immediate reversal.'
  }
];
