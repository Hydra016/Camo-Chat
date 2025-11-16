chrome.action.onClicked.addListener((tab) => {
    if (!tab.url || !tab.url.includes('chatgpt.com')) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                alert('This extension only works on chatgpt.com');
            }
        });
        return;
    }
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            alert('Camo Chat extension activated!');
        }
    });
});