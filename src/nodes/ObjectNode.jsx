export function ObjectNode({ data }) {
  return (
    <div
      style={{
        position: "relative",
        zIndex: 0, // ✅ critical fix
        backgroundColor: "#6C63FF",
        color: "white",
        padding: "10px 16px",
        borderRadius: 8,
        border: "1px solid #4B45B5",
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
