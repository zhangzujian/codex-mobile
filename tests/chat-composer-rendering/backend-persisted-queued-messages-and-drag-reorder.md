### Backend-persisted queued messages and drag reorder

#### Feature/Change Name
Queued messages are saved through the backend, survive page refresh, and can be reordered by dragging a queued row before another queued row.

#### Prerequisites/Setup
1. Dev server running (`pnpm run dev`)
2. Open a thread where a turn is actively running
3. Queue at least three messages while the turn is running
4. Light theme and dark theme both available from the appearance switcher

#### Steps
1. In light theme, confirm each queued row has a drag handle at the start of the row
2. Refresh the page and reopen the same thread
3. Confirm all queued rows are still visible in the same order
4. Confirm the queued-message panel is directly joined to the composer or pending-request panel below it with no visible blank gap between borders
5. Drag the third queued message onto the first queued message
6. Confirm the third message moves to the first position and the remaining queued messages keep their relative order
7. Refresh again and confirm the reordered queue order is preserved
8. Let the active turn finish and confirm the next sent queued message is the first reordered item
9. Queue at least two more messages, switch to dark theme, and repeat the joined-border and drag reorder checks

#### Expected Results
- Queued rows survive a page refresh because they are restored from backend state
- The queued-message panel and composer or pending-request panel below it share a continuous border with no blank seam in both light theme and dark theme
- Dragging a queued row onto another queued row immediately reorders the queue
- The reordered queue order survives page refresh
- The reordered queue order controls which message sends next after the active turn finishes
- Edit, Steer, and Delete actions still operate on the correct queued row after reordering
- Drag handle, hover/drop target, and row text remain readable in both light theme and dark theme

#### Rollback/Cleanup
- Delete any queued test messages that should not be sent

---
