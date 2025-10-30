import { useState, useCallback,useEffect } from 'react';
import { ReactFlow, applyNodeChanges, applyEdgeChanges, addEdge,  useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { InputWithButton } from './InputJson';
import styles from './FlowPage.module.scss';
import {getLayoutedElements} from "./utils/layoutUtil"
const initialNodes = [
    {
        "id": "$.a.1",
        "data": {
            "label": 1
        },
        "type": "primitive",
        "position": {
            "x": 0,
            "y": 0
        }
    },
    {
        "id": "$.a",
        "type": "object",
        "data": {
            "label": "a"
        },
        "position": {
            "x": 0,
            "y": 0
        }
    },
    {
        "id": "$.b.0.w",
        "data": {
            "label": "w"
        },
        "type": "primitive",
        "position": {
            "x": 0,
            "y": 0
        }
    },
    {
        "id": "$.b.0",
        "type": "object",
        "data": {
            "label": "0"
        },
        "position": {
            "x": 0,
            "y": 0
        }
    },
    {
        "id": "$.b.1.c.2",
        "data": {
            "label": 2
        },
        "type": "primitive",
        "position": {
            "x": 0,
            "y": 0
        }
    },
    {
        "id": "$.b.1.c",
        "type": "object",
        "data": {
            "label": "c"
        },
        "position": {
            "x": 0,
            "y": 0
        }
    },
    {
        "id": "$.b.1",
        "type": "object",
        "data": {
            "label": "1"
        },
        "position": {
            "x": 0,
            "y": 0
        }
    },
    {
        "id": "$.b",
        "type": "object",
        "data": {
            "label": "b"
        },
        "position": {
            "x": 0,
            "y": 0
        }
    }
];
const initialEdges = [
    {
        "id": "$.a-$.a.1",
        "source": "$.a",
        "target": "$.a.1"
    },
    {
        "id": "$-$.a",
        "source": "$",
        "target": "$.a"
    },
    {
        "id": "$.b.0-$.b.0.w",
        "source": "$.b.0",
        "target": "$.b.0.w"
    },
    {
        "id": "$.b-$.b.0",
        "source": "$.b",
        "target": "$.b.0"
    },
    {
        "id": "$.b.1.c-$.b.1.c.2",
        "source": "$.b.1.c",
        "target": "$.b.1.c.2"
    },
    {
        "id": "$.b.1-$.b.1.c",
        "source": "$.b.1",
        "target": "$.b.1.c"
    },
    {
        "id": "$.b-$.b.1",
        "source": "$.b",
        "target": "$.b.1"
    },
    {
        "id": "$-$.b",
        "source": "$",
        "target": "$.b"
    }
];
import { ObjectNode } from "./nodes/ObjectNode";
import { ArrayNode } from "./nodes/ArrayNode";
import { PrimitiveNode } from "./nodes/PrimitiveNode";
import { flatten } from './utils/helper';

const nodeTypes = {
  object: ObjectNode,
  array: ArrayNode,
  primitive: PrimitiveNode,
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      "TB" // Top-Bottom layout
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
  }, []);

  // const onNodesChange = useCallback(
  //   (changes) => setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
  //   [],
  // );
  // const onEdgesChange = useCallback(
  //   (changes) => setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
  //   [],
  // );


  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );
  const handleVisualize = (str) => {
    try {
      const obj = JSON.parse(str);
      const { nodes, edges } = flatten(obj,"$");
      console.log({nodes,edges})
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      nodes,
      edges,
      "TB" // Top-Bottom layout
    );
    setNodes([...layoutedNodes]);
    setEdges([...layoutedEdges]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftPanel}>
        <InputWithButton 
          onVisualize={handleVisualize}
        />
      </div>
      <div className={styles.rightPanel}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
        />
      </div>
    </div>
  );
}