import { KBarSearch } from "kbar";

const searchStyle = {
    padding: "12px 16px",
    fontSize: "16px",
    width: "100%",
    boxSizing: "border-box" as React.CSSProperties["boxSizing"],
    outline: "none",
    border: "none",
    background: "var(--background)",
    color: "var(--foreground)",
  };

export default function Search() {
    return <KBarSearch style={searchStyle}/>
}