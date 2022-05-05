# HN Adblock

A Chrome extension that removes "[company] is hiring" ads on
https://news.ycombinator.com/.

Note: I do not read the orange site. This was motivated entirely by boredom.

## Extension

To add the extension to Chrome, visit
[chrome://extensions/](chrome://extensions/) and click "Load unpacked." Then,
navigate to and select the `src` directory of this repository.

## Userscript

For those who aren't on Chrome or don't want to install an extension, the
following user script should work instead:

```javascript
// ==UserScript==
// @name        HN Adblock
// @version     1.0
// @match       https://news.ycombinator.com/*
// @author      https://github.com/brownie-in-motion/
// @description Removes ads on https://news.ycombinator.com/
// ==/UserScript==

// whether to re-number the posts after the removed ads
const FIX_NUMBERING = false;

[...(document.querySelector('table.itemList')?.rows ?? [])]
  .reduce((a, _r, i, rows) => (i % 3 ? a : [...a, rows.slice(i, i + 3)]), [])
  .filter((row) => row.length === 3)
  .filter(([title]) => !title.querySelector('td.votelinks'))
  .forEach((rows) => rows.forEach((row) => row.remove()));

if (FIX_NUMBERING) {
  document
    .querySelectorAll('span.rank')
    .forEach?.((s, i) => s.textContent && (s.textContent = `${i + 1}.`));
}
```

This can be used with userscript managers like Greasemonkey or Tampermonkey.
