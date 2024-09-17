import { createAction } from "kbar";

import { Plus, AppWindow, EyeOff, History, Bookmark, Printer } from 'lucide-react';
import React from "react";

// biome-ignore lint/suspicious/noExplicitAny: 
function getBrowserActions(toast: (...args: any) => any) {
    return [
        createAction({
        name: 'New tab',
        keywords: 'new tab',
        section: 'Browser',
        icon: React.createElement(Plus),
        shortcut: [],
        subtitle: 'Open a new tab',
        perform: (_) => {
            chrome.runtime.sendMessage({type: 'browser_new_tab'});
        }
    }),
    createAction({
        name: 'New window',
        keywords: 'new window',
        section: 'Browser',
        subtitle: 'Open a new window',
        icon: React.createElement(AppWindow),
        perform: (_) => {
            chrome.runtime.sendMessage({type: 'browser_new_window'});
        }
    }),
    createAction({
        name: 'New Incognito window',
        keywords: 'new incognito window',
        section: 'Browser',
        subtitle: 'Open a new incognito window',
        icon: React.createElement(EyeOff),
        perform: (_) => {
            chrome.runtime.sendMessage({type: 'browser_new_incognito_window'});
        }
    }),
    createAction({
        name: 'History',
        keywords: 'history',
        section: 'Browser',
        subtitle: 'Opens browser history',
        icon: React.createElement(History),
        perform: (_) => {
            chrome.runtime.sendMessage({type: 'browser_history'});
        }
    }),
    createAction({
        name: 'Bookmark',
        keywords: 'bookmark',
        section: 'Browser',
        subtitle: 'Create a bookmark',
        icon: React.createElement(Bookmark),
        perform: (_) => {
            chrome.runtime.sendMessage({type: 'browser_create_bookmark'}, (message) => {
                toast({
                    title: 'Bookmark added',
                    variant: 'success',
                });
                console.log(message);
            });
        }
    }),
    createAction({
        name: 'Print page',
        keywords: 'print',
        section: 'Browser',
        subtitle: 'Print the current page',
        icon: React.createElement(Printer),
        perform: (_) => {
            window.print();
        }
    })
];
}

// async function getCurrentTabsActions() {
//     const data = await chrome.runtime.sendMessage({type: 'tabs_all'});
//     console.log(data);
//     return [];
// }

// biome-ignore lint/suspicious/noExplicitAny: 
export function getInitialActions(toast: (...args: any) => any) {
    return [...getBrowserActions(toast)];
}