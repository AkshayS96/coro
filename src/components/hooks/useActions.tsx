import { createAction, useKBar, useRegisterActions, } from "kbar";
import { useEffect, useMemo, useState } from "react";
import type { Action } from 'kbar';
import { Globe, Star } from "lucide-react";

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