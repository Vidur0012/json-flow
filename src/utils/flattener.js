export const flatten = (obj, parentKey) => {
    const edges = [], nodes = [];
    if (obj && typeof obj === "object") {
        const newObj = {};
        for (const key in obj) {
            const { flatObj, edges: childEdges, nodes: childNodes } = flatten(obj[key], `${parentKey}.${key}`);
            edges.push(...childEdges);
            nodes.push(...childNodes);
            edges.push({ id: `${parentKey}-${parentKey}.${key}`, source: `${parentKey}`, target: `${parentKey}.${key}` });
            nodes.push({ id: `${parentKey}.${key}`, type: Array.isArray(obj)?"array":"object", data: { label: key }, position:{x:0,y:0} });

            for (const childKey in flatObj) {
                newObj[childKey] = flatObj[childKey];
            }

        }

        return { flatObj: newObj, edges, nodes };
    }
    nodes.push({ id: `${parentKey}.${obj}`, data: { label: obj }, type:"primitive", position:{x:0,y:0}  });
    edges.push({ id: `${parentKey}-${parentKey}.${obj}`, source: `${parentKey}`, target: `${parentKey}.${obj}` });
    return { flatObj: { [`${parentKey}.${obj}`]: obj }, edges, nodes };
};