import { useCallback, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactFlow, addEdge, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { InputWithButton } from './InputJson';
import styles from './FlowPage.module.scss';
import { getLayoutedElements } from "./utils/layoutUtil"
import { flatten } from './utils/flattener';
import { toast } from 'react-toastify';

const getNodeStyle = (type) => {
    switch (type) {
        case 'object':
            return {
                backgroundColor: '#7b68ee', // Purple
                color: '#fff',
                border: '2px solid #5a4fcf',
            };
        case 'array':
            return {
                backgroundColor: '#2ecc71', // Green
                color: '#fff',
                border: '2px solid #27ae60',
            };
        case 'primitive':
            return {
                backgroundColor: '#ffa500', // Orange
                color: '#000',
                border: '2px solid #e69500',
            };
        default:
            return { backgroundColor: '#ccc', color: '#000' };
    }
};

export default function App() {
    const [searchValue, setSearchValue] = useState("");
    const [nodes, setNodes] = useNodesState([]);
    const [edges, setEdges] = useEdgesState([]);

    useEffect(() => {
        const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
            nodes,
            edges,
            "TB" // Top-Bottom layout
        );
        setNodes([...layoutedNodes]);
        setEdges([...layoutedEdges]);
    }, []);

    const onConnect = useCallback(
        (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
        [],
    );
    const handleVisualize = (str) => {
        try {
            const obj = JSON.parse(str);
            const { nodes, edges } = flatten(obj, "$");
            console.log({ nodes, edges })
            const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
                nodes,
                edges,
                "TB"
            );

            setNodes([...layoutedNodes.map(node => ({ ...node, style: getNodeStyle(node.type) }))]);
            setEdges([...layoutedEdges]);
        } catch (err) {
            toast.error("Invalid json...");
        }
    };
    const handleSearch = () => {
        const targetNode = nodes.find(node => node.id === searchValue);
        console.log({ targetNode })
        if (targetNode) {
            setNodes(prev => prev.map(node => node.id === targetNode.id ? ({ ...node, style: { ...node.style, backgroundColor: "yellow", color: '#000', } }) : ({ ...node, style: getNodeStyle(node.type) })));
        } else {
            toast.error("Node doesn't found");
        }
    };
    return (
        <>
            <div className={styles.pageContainer}>
                <div className={styles.leftPanel}>
                    <InputWithButton
                        onVisualize={handleVisualize}
                    />
                </div>
                <div className={styles.rightPanel}>
                    <div className={styles.searchRow}>
                        <input
                            type="search"
                            placeholder="Search…"
                            aria-label="search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            className={styles.searchInput}
                        />
                        <button type="button" className={styles.searchButton} onClick={handleSearch}>
                            Search
                        </button>
                    </div>
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onConnect={onConnect}
                        fitView
                    />
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}