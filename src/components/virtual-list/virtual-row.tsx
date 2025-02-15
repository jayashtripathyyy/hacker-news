import React from "react";

interface VirtualRowProps<T extends any> {
  item: T;
  index: number;
  height: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

const VirtualRow = React.memo(function VirtualRow<T extends any>({ 
  item, 
  index, 
  height, 
  renderItem 
}: VirtualRowProps<T>) {
  return (
    <div style={{ height }}>
      {renderItem(item, index)}
    </div>
  );
}) 

export default VirtualRow;  
