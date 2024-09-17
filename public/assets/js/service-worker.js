chrome.runtime.onMessage.addListener((request, sender, sendResponse) =>{
    switch(request.type) {
      case 'browser_new_tab':
        chrome.tabs.create({});
        sendResponse();
        break;
      case 'browser_new_window':
        chrome.windows.create({});
        sendResponse();
        break;
      case 'browser_new_incognito_window':
        chrome.windows.create({incognito: true});
        sendResponse();
        break;
      case 'browser_history':
        chrome.tabs.create({url: 'chrome://history'});
        sendResponse();
        break;
      case 'browser_create_bookmark':
        if (chrome.bookmarks.search(sender?.tab?.url, (results) => {
          if (results.length > 0) {
            sendResponse({
              success: true,
              is_duplicate: true,
            });
            return true;
          }
          chrome.bookmarks.create({title: sender?.tab?.title, url: sender?.tab?.url});
          sendResponse({
            success: true,
            is_duplicate: false,
          });
        }));
        break;
      case 'tabs_all':
        {
          chrome.tabs.query({windowId: sender.tab.windowId}, (results) => {
            const tabs = results.sort((tabA, tabB) => tabA.lastAccessed - tabB.lastAccessed).map((result) => {
              return {
                title: result.title ?? '',
                url: result.url ?? '',
                favIconUrl: result.favIconUrl ?? '',
                tabId: result.id,
              }
            });
            sendResponse({
              tabs,
            });
          });
        }
        break;
    case 'change_tab':
      chrome.tabs.update(request.tabId, {active: true});
    }
    return true;
});