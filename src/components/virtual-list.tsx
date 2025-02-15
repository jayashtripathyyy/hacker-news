import React, { useEffect, useRef, useState } from 'react';

interface VirtualListProps<T> {
  data: T[];
  rowHeight: number;
  visibleRows?: number;
  renderItem: (item: T, index: number) => React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

const VirtualList = <T extends any>({
  data,
  rowHeight,
  visibleRows = 10,
  renderItem,
  className = '',
  footer,
}: VirtualListProps<T>) => {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = data.length * rowHeight;
  const containerHeight = visibleRows * rowHeight;


  const startIndex = Math.max(0, Math.floor(scrollTop / rowHeight));
  const endIndex = Math.min(
    data.length,
    Math.ceil((scrollTop + containerHeight) / rowHeight)
  );

  const visibleData = data.slice(startIndex, endIndex + 1);
  const offsetY = startIndex * rowHeight;

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  };

  return (
    <div
      className={`${className}`}
      style={{
        height: containerHeight,
        overflow: 'auto',
      }}
      onScroll={handleScroll}
    >
      <div
        style={{
          height: totalHeight,
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: offsetY,
            width: '100%',
          }}
        >
          {visibleData.map((item, index) => (
            <div
              key={startIndex + index}
              style={{ height: rowHeight }}
            >
              {renderItem(item, startIndex + index)}
            </div>
          ))}
          {footer}
        </div>
      </div>
    </div>
  );
};

export default VirtualList;