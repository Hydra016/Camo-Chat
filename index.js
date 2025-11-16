const button = document.getElementById('myButton');
const messageDiv = document.getElementById('message');

async function checkAndInitialize() {
    let [tab] = await chrome.tabs.query({ active: true });
    const url = tab.url;
    
    if (!url || !url.includes('chatgpt.com')) {
        button.style.display = 'none';
        messageDiv.style.display = 'block';
        messageDiv.textContent = 'This extension only works on chatgpt.com';
    } else {
        button.style.display = 'block';
        messageDiv.style.display = 'none';
    }
}

async function executeScript() {
    let [tab] = await chrome.tabs.query({ active: true });
    const url = tab.url;
    
    if (!url || !url.includes('chatgpt.com')) {
        alert('This extension only works on chatgpt.com');
        return;
    }
    
    const cssUrl = chrome.runtime.getURL('styles.css');
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (url) => {
            if (document.getElementById('camochat-styles')) {
                return;
            }
            
            const link = document.createElement('link');
            link.id = 'camochat-styles';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = url;
            
            document.head.appendChild(link);
        },
        args: [cssUrl]
    });
    
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ['page-script.js']
    })
}

checkAndInitialize();
button.addEventListener('click', executeScript);