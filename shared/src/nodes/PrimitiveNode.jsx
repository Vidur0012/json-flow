export function PrimitiveNode({ data }) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 0, // ✅ allows edges to be drawn correctly
        backgroundColor: "#FB8C00",
        color: "white",
        padding: "10px 16px",
        borderRadius: 8,
        border: "1px solid #EF6C00",
        fontWeight: 500,
        textAlign: "center",
        minWidth: 90,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      {data.label}
    </div>
  );
}
