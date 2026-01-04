
import React from 'react';
import { Candle, SMCZone } from '../types';

interface CandlestickChartProps {
  candles: Candle[];
  zones: SMCZone[];
}

const CandlestickChart: React.FC<CandlestickChartProps> = ({ candles, zones }) => {
  const chartHeight = 300;
  const candleWidth = 40;
  const candleGap = 20;
  
  // Find min/max for scaling
  const allPrices = candles.flatMap(c => [c.high, c.low, c.open, c.close]);
  const minPrice = Math.min(...allPrices) * 0.8;
  const maxPrice = Math.max(...allPrices) * 1.2;
  const priceRange = maxPrice - minPrice;

  const getY = (price: number) => {
    return chartHeight - ((price - minPrice) / priceRange) * chartHeight;
  };

  return (
    <div className="relative w-full bg-slate-900/50 rounded-xl border border-slate-700 p-6 overflow-x-auto custom-scrollbar">
      <svg width={candles.length * (candleWidth + candleGap) + 100} height={chartHeight} className="mx-auto">
        {/* Draw Zones First */}
        {zones.map((zone, idx) => {
          const x = zone.startIndex * (candleWidth + candleGap) + 20;
          const totalWidth = candles.length * (candleWidth + candleGap) + 60;
          const width = (zone.endIndex - zone.startIndex + 1) * (candleWidth + candleGap) - candleGap + 40;
          const top = getY(zone.topPrice);
          const bottom = getY(zone.bottomPrice);
          const height = Math.abs(bottom - top);

          if (zone.type === 'line') {
            return (
              <g key={`zone-${idx}`}>
                <line
                  x1={0}
                  y1={(top + bottom) / 2}
                  x2={totalWidth}
                  y2={(top + bottom) / 2}
                  stroke={zone.color || 'white'}
                  strokeWidth="2"
                  strokeDasharray="8 4"
                />
                <text
                  x={10}
                  y={(top + bottom) / 2 - 10}
                  fill="white"
                  fontSize="12"
                  className="font-bold opacity-90"
                >
                  {zone.label}
                </text>
              </g>
            );
          }

          return (
            <g key={`zone-${idx}`}>
              <rect
                x={x - 20}
                y={Math.min(top, bottom)}
                width={width}
                height={height}
                fill={zone.color || 'rgba(255, 255, 255, 0.1)'}
                stroke={zone.color?.replace('0.2', '0.5').replace('0.1', '0.3') || 'white'}
                strokeWidth="1"
                strokeDasharray="4"
              />
              <text
                x={x + width / 2 - 20}
                y={Math.min(top, bottom) - 10}
                fill="white"
                fontSize="10"
                textAnchor="middle"
                className="font-bold opacity-70"
              >
                {zone.label}
              </text>
              {zone.type === 'fvg' && (
                <line
                  x1={x - 20}
                  y1={(top + bottom) / 2}
                  x2={x + width - 20}
                  y2={(top + bottom) / 2}
                  stroke="white"
                  strokeWidth="1"
                  strokeDasharray="2"
                  opacity="0.5"
                />
              )}
            </g>
          );
        })}

        {/* Draw Candles */}
        {candles.map((candle, idx) => {
          const x = idx * (candleWidth + candleGap) + 20;
          const highY = getY(candle.high);
          const lowY = getY(candle.low);
          const openY = getY(candle.open);
          const closeY = getY(candle.close);
          const bodyTop = Math.min(openY, closeY);
          const bodyHeight = Math.max(Math.abs(openY - closeY), 2);

          const isBullish = candle.type === 'bullish';
          const color = isBullish ? '#10b981' : '#ef4444';

          return (
            <g key={`candle-${idx}`} className="transition-all duration-300 hover:opacity-80 cursor-pointer">
              <line
                x1={x + candleWidth / 2}
                y1={highY}
                x2={x + candleWidth / 2}
                y2={lowY}
                stroke={color}
                strokeWidth="2"
              />
              <rect
                x={x}
                y={bodyTop}
                width={candleWidth}
                height={bodyHeight}
                fill={isBullish ? color : 'transparent'}
                stroke={color}
                strokeWidth="2"
              />
              <text
                x={x + candleWidth / 2}
                y={lowY + 20}
                fill="#94a3b8"
                fontSize="10"
                textAnchor="middle"
              >
                K{idx + 1}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default CandlestickChart;
