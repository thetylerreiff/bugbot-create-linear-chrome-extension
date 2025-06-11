# Loading the BugBot Extension in Arc Browser

Arc browser uses the same extension system as Chrome, so the process is very similar.

## Step-by-Step Installation

1. **Open Arc's Extension Manager**
   - Click the Arc menu (three dots) in the top-right corner
   - Select "More Tools" → "Extensions"
   - OR simply navigate to: `arc://extensions/`

2. **Enable Developer Mode**
   - In the Extensions page, look for the "Developer mode" toggle in the top-right corner
   - Click it to turn it ON (it should be highlighted/blue when enabled)

3. **Load the Extension**
   - Once Developer mode is enabled, you'll see new buttons appear
   - Click the "Load unpacked" button
   - A file browser will open

4. **Select the Extension Folder**
   - Navigate to: `/Users/tylerreiff/Developer/bugbot-create-issue-chrome-extention/`
   - Click "Select" or "Open" (don't select individual files, select the folder itself)

5. **Verify Installation**
   - The extension should now appear in your extensions list
   - You'll see "BugBot Linear Issue Creator" with version 1.0.0
   - If there are any errors, they'll be shown in red

6. **Pin the Extension (Optional)**
   - Click the puzzle piece icon in Arc's toolbar
   - Find "BugBot Linear Issue Creator"
   - Click the pin icon to keep it visible in your toolbar

## Testing the Extension

1. Navigate to any GitHub Pull Request page
2. Look for comments from users with "bugbot" in their username
3. You should see a purple "Create Linear Issue" button below BugBot comments
4. Click the extension icon in the toolbar to see if it's active on the current page

## Troubleshooting

- **Extension doesn't load**: Make sure you selected the folder containing manifest.json, not a parent folder
- **Icons missing**: The extension will work but show default icons. Add icon16.png, icon48.png, and icon128.png files to fix this
- **No buttons appearing**: Refresh the GitHub PR page after installing the extension
- **Permission errors**: Make sure Arc has permission to access github.com URLs

## Updating the Extension

If you make changes to the code:
1. Go back to `arc://extensions/`
2. Find the extension and click the refresh icon
3. Refresh any GitHub pages you have open