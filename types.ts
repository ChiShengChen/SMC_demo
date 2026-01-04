
export enum ConceptId {
  FVG = 'fvg',
  OB = 'ob',
  BOS_CHOCH = 'bos_choch',
  LIQUIDITY = 'liquidity',
  BREAKER = 'breaker',
  OTE = 'ote',
  AMD = 'amd',
  KILL_ZONES = 'kill_zones',
  DOM_FILTER = 'dom_filter'
}

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
  type: 'bullish' | 'bearish';
}

export interface SMCZone {
  type: 'fvg' | 'ob' | 'breaker' | 'liquidity' | 'line';
  startIndex: number;
  endIndex: number;
  topPrice: number;
  bottomPrice: number;
  label?: string;
  color?: string;
}

export interface ConceptData {
  id: ConceptId;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  candles: Candle[];
  zones: SMCZone[];
  tradingMethod: string;
  tradingMethodEn: string;
}
