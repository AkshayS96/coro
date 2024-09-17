import { useKBar } from "kbar"


export default function Footer() {
    const state = useKBar(state => state);

    return <div className="flex flex-row p-2 justify-between">
        <span>{Object.keys(state.actions).length} results</span>
        <span>Use arrow keys <kbd>↑↓</kbd> to navigate</span>
    </div>
}