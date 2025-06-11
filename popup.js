chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const currentTab = tabs[0];
  const statusElement = document.getElementById('status');
  const statusText = document.getElementById('status-text');
  
  if (currentTab.url.includes('github.com') && currentTab.url.includes('/pull/')) {
    statusElement.classList.add('active');
    statusText.textContent = 'Active on this PR';
  } else {
    statusElement.classList.add('inactive');
    statusText.textContent = 'Not on a GitHub PR';
  }
});