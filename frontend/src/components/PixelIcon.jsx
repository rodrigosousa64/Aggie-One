import React from 'react';

const icons = {
  energy: [
    "00100",
    "01100",
    "11110",
    "00110",
    "00100",
    "01000",
  ],
  hunger: [
    "11000011",
    "11100111",
    "01111110",
    "00111100",
    "00111100",
    "01111110",
    "11100111",
    "11000011",
  ],
  affection: [
    "0110110",
    "1111111",
    "1111111",
    "0111110",
    "0011100",
    "0001000",
  ],
  boredom: [
    "0011100",
    "0100010",
    "1011101",
    "1010001",
    "1011111",
    "0100000",
    "0011110",
  ],
  anger: [
    "1000100",
    "0101000",
    "0011100",
    "1110111",
    "0011100",
    "0001010",
    "0010001",
  ],
  paw: [
    "01100110",
    "11111111",
    "11100111",
    "00000000",
    "01111110",
    "11111111",
    "11111111",
    "01111110",
  ],
  sleep: [
    "11111",
    "00010",
    "00100",
    "01000",
    "11111",
  ],
  alert: [
    "0110",
    "0110",
    "0110",
    "0110",
    "0000",
    "0110",
  ],
  fish: [
    "00000000",
    "00011101",
    "01111111",
    "11011110",
    "01111111",
    "00011101",
    "00000000"
  ],
  box: [
    "00000000",
    "01111110",
    "10000001",
    "10111101",
    "10111101",
    "10000001",
    "01111110",
    "00000000"
  ],
  laser: [
    "001100",
    "011110",
    "111111",
    "111111",
    "011110",
    "001100"
  ],
  leaf: [
    "000100",
    "001110",
    "011110",
    "111100",
    "011000",
    "000000"
  ],
  book: [
    "01111110",
    "10000001",
    "11111111",
    "11111111",
    "11111111",
    "10000001",
    "01111110"
  ]
};

const PixelIcon = ({ name, color = "#ffffff", size = 20 }) => {
  const grid = icons[name];
  if (!grid) return null;

  const height = grid.length;
  const width = grid[0].length;
  
  // Calculate block size
  const blockSizeX = size / width;
  const blockSizeY = size / height;
  const blockSize = Math.min(blockSizeX, blockSizeY);
  
  const realWidth = width * blockSize;
  const realHeight = height * blockSize;

  return (
    <svg 
      width={realWidth} 
      height={realHeight} 
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'inline-block', shapeRendering: 'crispEdges' }}
    >
      {grid.map((row, y) => 
        row.split('').map((pixel, x) => (
          pixel === '1' ? (
            <rect 
              key={`${x}-${y}`} 
              x={x} 
              y={y} 
              width="1" 
              height="1" 
              fill={color} 
            />
          ) : null
        ))
      )}
    </svg>
  );
};

export default PixelIcon;
