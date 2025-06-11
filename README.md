# BugBot Linear Issue Creator Chrome Extension

This Chrome extension automatically detects BugBot comments in GitHub Pull Requests and adds a button to create Linear issues from those comments.

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select this extension directory
5. The extension is now installed!

## Usage

1. Navigate to any GitHub Pull Request
2. The extension will automatically scan for BugBot comments
3. When a BugBot comment is found, a "Create Linear Issue" button will appear below it
4. Click the button to open Linear with pre-filled issue details

## Features

- Automatically detects BugBot comments (matches "bugbot", "bug-bot", or "bug bot" in author names)
- Creates Linear issue links with:
  - Title prefixed with "BugBot: " and the PR title
  - Description containing the full BugBot comment and a link back to the PR
- Works dynamically as new comments are added
- Shows extension status in the popup

## Note

You'll need to add icon files (icon16.png, icon48.png, icon128.png) for the extension to display properly in Chrome.