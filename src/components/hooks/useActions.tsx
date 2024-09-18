import { createAction, useKBar, useRegisterActions, } from "kbar";
import { useEffect, useMemo, useState } from "react";
import type { Action } from 'kbar';
import { AppWindow, Bookmark, Command, CommandIcon, EyeOff, Globe, History, Plus, Printer, Star } from "lucide-react";
import React from "react";

export function useTabActions() {
    const visualState = useKBar(state => state.visualState);
    // biome-ignore lint/suspicious/noExplicitAny:
    const [tabs, setTabs] = useState<any[]>([]);

    // biome-ignore lint/correctness/useExhaustiveDependencies:
    useEffect(() => {
        chrome.runtime.sendMessage({ type: 'tabs_all' }, ({ tabs }) => {
            setTabs(tabs);
        });
    }, [visualState]);

    const tabActions = useMemo(() => {
        return tabs.map((tab) => {
            return createAction({
                name: tab.title,
                keywords: 'tab /tabs',
                section: 'Current Tabs',
                subtitle: 'Browser tab',
                icon: (tab.favIconUrl ? <img height='24px' width='24px' src={tab.favIconUrl} alt="img" /> : <Globe />),
                // biome-ignore lint/suspicious/noExplicitAny:
                perform: (_: any) => {
                    chrome.runtime.sendMessage({ type: 'change_tab', tabId: tab.tabId });
                }
            })
        })
    }, [tabs]);

    useRegisterActions([...tabActions].filter(Boolean) as Action[], [tabActions]);
}

export function useBookmarkActions() {
    const visualState = useKBar(state => state.visualState);
    // biome-ignore lint/suspicious/noExplicitAny:
    const [bookmarks, setBookmarks] = useState<any[]>([]);

    // biome-ignore lint/correctness/useExhaustiveDependencies:
    useEffect(() => {
        chrome.runtime.sendMessage({ type: 'bookmarks_all' }, ({ bookmarks }) => {
            setBookmarks(bookmarks);
        });
    }, [visualState]);

    const bookmarkActions = useMemo(() => {
        return bookmarks.map((bookmark) => {
            return createAction({
                name: bookmark.title,
                keywords: 'bookmark /bookmark',
                section: 'Bookmarks',
                subtitle: 'Bookmark',
                icon: <Star />,
                // biome-ignore lint/suspicious/noExplicitAny:
                perform: (_: any) => {
                    window.open(bookmark.url, "_target");
                }
            });
        });
    }, [bookmarks]);

    useRegisterActions([...bookmarkActions].filter(Boolean) as Action[], [bookmarkActions]);
}

// biome-ignore lint/suspicious/noExplicitAny: 
export function useBrowserActions(toast: (...args: any) => any) {
    const browserActions = [
        createAction({
            name: 'New tab',
            keywords: 'new tab',
            section: 'Browser',
            icon: React.createElement(Plus),
            shortcut: [],
            subtitle: 'Open a new tab',
            perform: (_) => {
                chrome.runtime.sendMessage({ type: 'browser_new_tab' });
            }
        }),
        createAction({
            name: 'New window',
            keywords: 'new window',
            section: 'Browser',
            subtitle: 'Open a new window',
            icon: React.createElement(AppWindow),
            perform: (_) => {
                chrome.runtime.sendMessage({ type: 'browser_new_window' });
            }
        }),
        createAction({
            name: 'New Incognito window',
            keywords: 'new incognito window',
            section: 'Browser',
            subtitle: 'Open a new incognito window',
            icon: React.createElement(EyeOff),
            perform: (_) => {
                chrome.runtime.sendMessage({ type: 'browser_new_incognito_window' });
            }
        }),
        createAction({
            name: 'History',
            keywords: 'history',
            section: 'Browser',
            subtitle: 'Opens browser history',
            icon: React.createElement(History),
            perform: (_) => {
                chrome.runtime.sendMessage({ type: 'browser_history' });
            }
        }),
        createAction({
            name: 'Bookmark',
            keywords: 'bookmark',
            section: 'Browser',
            subtitle: 'Create a bookmark',
            icon: React.createElement(Bookmark),
            perform: (_) => {
                chrome.runtime.sendMessage({ type: 'browser_create_bookmark' }, (message) => {
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
    useRegisterActions([...browserActions].filter(Boolean) as Action[], [browserActions]);
}

export function useExtensionOptionActions() {
    const extensionOptionActions = [
        createAction({
            name: 'Create Command',
            keywords: 'create command',
            section: 'Extension',
            subtitle: 'Create custom command',
            icon: React.createElement(Command),
            perform: (_) => {
                chrome.runtime.sendMessage({ type: 'options_page' });
            }
        }),
    ];
    useRegisterActions([...extensionOptionActions].filter(Boolean) as Action[], [extensionOptionActions]);
}

export function useCustomCommandActions() {
    const visualState = useKBar(state => state.visualState);
    // biome-ignore lint/suspicious/noExplicitAny:
    const [customCommands, setCustomCommands] = useState<any[]>([]);

    // biome-ignore lint/correctness/useExhaustiveDependencies:
    useEffect(() => {
        chrome.runtime.sendMessage({ type: 'options_get_commands' }, (commands) => {
            setCustomCommands(commands);
        });
    }, [visualState]);

    const customCommandActions = useMemo(() => {
        return customCommands.map((command) => {
            return createAction({
                name: command.name,
                keywords: 'custom command',
                section: 'Custom Commands',
                subtitle: 'Custom Command',
                icon: <CommandIcon />,
                // biome-ignore lint/suspicious/noExplicitAny:
                perform: (_: any) => {
                    window.open(command.url, "_target");
                }
            });
        });
    }, [customCommands]);

    useRegisterActions([...customCommandActions].filter(Boolean) as Action[], [customCommandActions]);
}