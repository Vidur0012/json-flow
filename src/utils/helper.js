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

            // edges.concat(childEdges);
            // nodes.concat(childNodes);

            // if (flatObj && typeof flatObj === "object") {
            for (const childKey in flatObj) {
                newObj[childKey] = flatObj[childKey];
                // nodes.push({ id: `${key}.${childKey}`, data: { label: flatObj[childKey] } })
                // edges.push({ id: `${parentKey}.${key}-${childKey}`, source: `${parentKey}.${key}`, target: childKey });
            }

            // Object.assign(newObj, flatObj);
            // } else {
            //     newObj[`${parentKey}.${key}`] = flatObj;

            // }
        }
        // console.log(edges)

        return { flatObj: newObj, edges, nodes };
    }
    nodes.push({ id: `${parentKey}.${obj}`, data: { label: obj }, type:"primitive", position:{x:0,y:0}  });
    edges.push({ id: `${parentKey}-${parentKey}.${obj}`, source: `${parentKey}`, target: `${parentKey}.${obj}` });
    // console.log(edges);
    return { flatObj: { [`${parentKey}.${obj}`]: obj }, edges, nodes };
};