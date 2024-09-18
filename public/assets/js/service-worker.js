chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
	switch (request.type) {
		case "browser_new_tab":
			chrome.tabs.create({});
			sendResponse();
			break;
		case "browser_new_window":
			chrome.windows.create({});
			sendResponse();
			break;
		case "browser_new_incognito_window":
			chrome.windows.create({ incognito: true });
			sendResponse();
			break;
		case "browser_history":
			chrome.tabs.create({ url: "chrome://history" });
			sendResponse();
			break;
		case "browser_create_bookmark":
			if (
				chrome.bookmarks.search(sender?.tab?.url, (results) => {
					if (results.length > 0) {
						sendResponse({
							success: true,
							is_duplicate: true,
						});
						return true;
					}
					chrome.bookmarks.create({
						title: sender?.tab?.title,
						url: sender?.tab?.url,
					});
					sendResponse({
						success: true,
						is_duplicate: false,
					});
				})
			);
			break;
		case "tabs_all":
			{
				chrome.tabs.query({ windowId: sender.tab.windowId }, (results) => {
					const tabs = results
						.sort((tabA, tabB) => tabA.lastAccessed - tabB.lastAccessed)
						.map((result) => {
							return {
								title: result.title ?? "",
								url: result.url ?? "",
								favIconUrl: result.favIconUrl ?? "",
								tabId: result.id,
							};
						});
					sendResponse({
						tabs,
					});
				});
			}
			break;
		case "change_tab":
			chrome.tabs.update(request.tabId, { active: true });
			break;
		case "bookmarks_all":
			{
				chrome.bookmarks.getRecent(100, (results) => {
					const bookmarks = results.map((result) => {
						return {
							title: result.title,
							url: result.url ?? "",
						};
					});
					sendResponse({
						bookmarks,
					});
				});
			}
			break;
		case "options_page": {
			if (chrome.runtime.openOptionsPage) {
				chrome.runtime.openOptionsPage();
			} else {
				window.open(chrome.runtime.getURL("/options/options.html"));
			}
			break;
		}
		case "options_new_command": {
			console.log("dada");
			const name = request.name;
			const url = request.url;
			if (name.length === 0 || url.length === 0) {
				sendResponse("Invalid name/url");
				return true;
			}

			chrome.storage.local.get("coro_custom_commands", (result) => {
				let storedCommands = [];
				if (result && "coro_custom_commands" in result) {
					storedCommands = result.coro_custom_commands;
					if (name in storedCommands) {
						sendResponse("Duplicate Command");
						return;
					}
				}

				const newCommands = { ...storedCommands, [name]: url };
				chrome.storage.local.set(
					{
						coro_custom_commands: newCommands,
					},
					() => {
						sendResponse("Success");
					},
				);
			});
			break;
		}
		case "options_get_commands": {
			chrome.storage.local.get("coro_custom_commands", (result) => {
				let commands = [];
				if (result && "coro_custom_commands" in result) {
					const storedCommands = result.coro_custom_commands;
					commands = Object.entries(storedCommands).map((value) => {
						return {
							name: value[0],
							url: value[1],
						};
					});
				}
				sendResponse(commands);
			});

			break;
		}
		case "options_delete_command": {
			const name = request.name;
			chrome.storage.local.get("coro_custom_commands", (result) => {
				let storedCommands = [];
				if (result && "coro_custom_commands" in result) {
					storedCommands = result.coro_custom_commands;
					delete storedCommands[name];
					chrome.storage.local.set(
						{
							coro_custom_commands: storedCommands,
						},
						() => {
							sendResponse("Success");
						},
					);
				}
			});
		}
	}
	return true;
});
