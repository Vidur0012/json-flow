import { Handle, Position } from '@xyflow/react';

export function CustomNode({ data, isConnectable }) {
  return (
    <div title={data.tooltip}>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
}