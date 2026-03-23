interface ViaBadgeProps {
  via: "VT" | "VO" | "VT+VO";
}

export default function ViaBadge({ via }: ViaBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-stone-100 text-stone-700 border border-stone-200">
      {(via === "VT" || via === "VT+VO") && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-3 h-3"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      )}
      {via === "VT" && <span>Tópico</span>}
      {via === "VO" && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-3 h-3"
          >
            <path d="M6.5 9a2.5 2.5 0 1 1 5 0v1a2.5 2.5 0 1 1-5 0V9Z" />
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm0-2a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Oral</span>
        </>
      )}
      {via === "VT+VO" && <span>Tópico + Oral</span>}
    </span>
  );
}
