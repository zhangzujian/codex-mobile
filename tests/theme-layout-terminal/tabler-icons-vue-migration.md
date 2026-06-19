### Feature: Tabler Icons Vue migration

#### Prerequisites
- App is running from this repository.
- Browser can access the home/new-thread route.
- At least one existing thread with file attachments or queued messages is available, or a disposable message can be queued.

#### Steps
1. Open the home/new-thread route in light theme.
2. Inspect the sidebar search, Skills, Automations, Settings, account collapse, thread section chevrons, project folder, worktree, row menu, delete, and new-thread icons.
3. Open Settings and verify the account selector chevron changes between open and closed states.
4. Open the composer and inspect folder chips, file chips, file mention suggestions, markdown-file suggestions, microphone, stop, submit, expand, and collapse icons.
5. Queue a message and inspect the queued row drag handle, message icon, and delete icon.
6. Open a thread with file attachments and inspect the file chip icon plus edit, fork, copy, retry/redo, jump-to-latest, and close icons.
7. Switch to dark theme and repeat steps 2 through 6.
8. Narrow the viewport to a mobile width and confirm the same icon areas remain aligned and readable.

#### Expected Results
- UI operation icons render through the Tabler SVG style with consistent stroke weight, sizing, and color inheritance.
- No icon appears oversized, clipped, vertically misaligned, or visually inconsistent with adjacent controls.
- Light and dark themes keep icon contrast readable in normal, hover, selected, disabled, and destructive states.
- Queued message and account controls use SVG icons instead of inline SVG markup or text arrow glyphs.

#### Rollback/Cleanup
- Delete any disposable queued message or test thread created during verification.
- Restore the previous theme preference.
