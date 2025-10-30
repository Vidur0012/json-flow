export function ArrayNode({ data }) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 0, // ✅ keep edges visible
        backgroundColor: "#2E7D32",
        color: "white",
        padding: "10px 16px",
        borderRadius: 8,
        border: "1px solid #1B5E20",
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
