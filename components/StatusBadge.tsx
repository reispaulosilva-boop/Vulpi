interface StatusBadgeProps {
  status: "EM USO" | "NOVO" | "PROPOSTO";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    "EM USO": "bg-green-800 text-white",
    NOVO: "bg-blue-700 text-white",
    PROPOSTO: "bg-gray-500 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium tracking-wide ${styles[status]}`}
      style={status === "NOVO" ? { backgroundColor: "#1B4FD8" } : undefined}
    >
      {status}
    </span>
  );
}
