function detectBugBotComments() {
  // More comprehensive selectors for GitHub's comment structure
  const comments = document.querySelectorAll('.timeline-comment, .review-comment, .comment, .js-comment-container');

  comments.forEach((comment, index) => {
    // Multiple selectors for author elements
    const authorElement = comment.querySelector('.author');

    // Multiple selectors for content
    const contentElement = comment.querySelector('.comment-body-content, .js-comment-body, .markdown-body, .comment-body');

    if (!authorElement || !contentElement) {
      return;
    }

    const author = authorElement.textContent.trim();

    const isBugBot = author.toLowerCase().includes('cursor-com') ||
      author.toLowerCase().includes('cursor-com') ||
      author.toLowerCase().includes('cursor-com');

    if (isBugBot) {

      // Find all details tags within the comment
      const detailsSections = contentElement.querySelectorAll('details');

      // Get the comment permalink
      const commentPermalink = comment.querySelector('.Link--secondary[href*="#issuecomment-"], .timestamp[href*="#issuecomment-"]')?.href || 
                              comment.querySelector('a[id^="issuecomment-"]')?.href ||
                              window.location.href;

      if (detailsSections.length > 0) {
        // Process each details section as a separate bug
        detailsSections.forEach((details, detailIndex) => {
          if (!details.querySelector('.linear-issue-link-container')) {
            // Extract the summary (bug title) and full details content
            const summary = details.querySelector('summary')?.textContent.trim() || `Bug ${detailIndex + 1}`;
            const detailsContent = details.textContent.trim();
            
            const prUrl = window.location.href;
            const prTitle = document.querySelector('.js-issue-title, .markdown-title, h1.gh-header-title span')?.textContent.trim() || 'PR Issue';

            const linearLink = createLinearIssueLink(detailsContent, prUrl, prTitle, summary, commentPermalink);

            const linkContainer = document.createElement('div');
            linkContainer.className = 'linear-issue-link-container';
            linkContainer.appendChild(linearLink);

            // Append the link inside the details element
            details.appendChild(linkContainer);
          }
        });
      } else {
        // Fallback: If no details tags, create one link for the whole comment
        if (!comment.querySelector('.linear-issue-link-container')) {
          const commentText = contentElement.textContent.trim();
          const prUrl = window.location.href;
          const prTitle = document.querySelector('.js-issue-title, .markdown-title, h1.gh-header-title span')?.textContent.trim() || 'PR Issue';

          const linearLink = createLinearIssueLink(commentText, prUrl, prTitle, null, commentPermalink);

          const linkContainer = document.createElement('div');
          linkContainer.className = 'linear-issue-link-container';
          linkContainer.appendChild(linearLink);

          const appendTarget = contentElement.parentElement || comment;
          appendTarget.appendChild(linkContainer);
        }
      }
    }
  });
}

function createLinearIssueLink(commentText, prUrl, prTitle, bugSummary = null, commentPermalink = null) {
  const linearBaseUrl = 'https://linear.new';

  // If bugSummary is provided, use it for a more specific title
  const issueTitle = bugSummary 
    ? `${bugSummary} - ${prTitle}`
    : `BugBot: ${prTitle}`;
  
  // Build the issue description with links
  let issueDescription = bugSummary
    ? `## Bug Details\n\n${commentText}\n\n`
    : `## BugBot Comment\n\n${commentText}\n\n`;
  
  // Add links section
  issueDescription += `## Links\n\n`;
  issueDescription += `- [Pull Request](${prUrl})\n`;
  if (commentPermalink && commentPermalink !== prUrl) {
    issueDescription += `- [Original Comment](${commentPermalink})\n`;
  }

  const params = new URLSearchParams({
    title: issueTitle,
    description: issueDescription
  });

  const link = document.createElement('a');
  link.href = `${linearBaseUrl}?${params.toString()}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.className = 'linear-issue-link btn btn-sm ';
  link.innerHTML = `
    <svg class="octicon octicon-issue-opened" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true">
      <path d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
      <path fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 1113 0 6.5 6.5 0 01-13 0z"></path>
    </svg>
    Create Linear Issue
  `;

  return link;
}

function observeComments() {
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length > 0) {
        detectBugBotComments();
      }
    });
  });

  const targetNode = document.querySelector('.js-discussion, #discussion_bucket, .pull-discussion-timeline');
  if (targetNode) {
    observer.observe(targetNode, {
      childList: true,
      subtree: true
    });
  }
}

// Initial scan
detectBugBotComments();

// Set up observer
observeComments();

// Periodic rescan
setInterval(detectBugBotComments, 5000);

// Also run after a short delay to catch late-loading content
setTimeout(detectBugBotComments, 2000);
