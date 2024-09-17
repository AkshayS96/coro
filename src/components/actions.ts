import { createAction } from "kbar";

function getChromeActions() {
    return [
        createAction({
        name: 'New Tab',
        keywords: 'new tab',
        section: 'Tabs',
        subtitle: 'Open a new tab',
        perform: (_) => {
            window.open("", "_blank");
        }
    })
];
}



export function getAllActions() {
    return [...getChromeActions()];
}