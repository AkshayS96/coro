import { createAction, useKBar, useRegisterActions, } from "kbar";
import { useEffect, useMemo, useState } from "react";
import type { Action } from 'kbar';
import { Globe, Image } from "lucide-react";

export default function useTabsActions() {
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
                keywords: 'tab',
                section: 'Current Tabs',
                subtitle: 'Browser tab',
                icon: (tab.favIconUrl ? <Image href={tab.favIconUrl} /> : <Globe />),
                // biome-ignore lint/suspicious/noExplicitAny:
                perform: (_: any) => {
                    chrome.runtime.sendMessage({ type: 'change_tab', tabId: tab.tabId });
                }
            })
        })
    }, [tabs]);

    useRegisterActions([...tabActions].filter(Boolean) as Action[], [tabActions]);
}