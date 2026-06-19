### Chat bottom status and scroll controls

#### Feature/Change Name
Conversation bottom status tray, jump-to-latest placement, and composer expand control spacing.

#### Prerequisites/Setup
1. Dev server running: `pnpm run dev --host 127.0.0.1 --port 4173`
2. A thread that can produce a streaming response or visible live activity such as applying changes.
3. Light theme and dark theme are both available from the appearance switcher.

#### Steps
1. In light theme, open a thread and send a prompt that produces a multi-step response or file edit.
2. While the turn is active, confirm the activity text such as `Applying changes` appears in the bottom status tray, not as a message row.
3. Scroll up through the messages while the turn is still active.
4. Confirm the bottom status tray remains pinned outside the scrollable message list and does not move with message rows.
5. While scrolled away from the bottom, confirm the jump-to-latest button appears inside the bottom tray and does not cover the final message text.
6. Click the jump-to-latest button and confirm the message list scrolls to the latest output and follows new text again.
7. Type enough lines in the composer for the textarea to scroll, then confirm the expand button is above the textarea and does not overlap the textarea scrollbar.
8. Switch to dark theme and repeat steps 2-7.

#### Expected Results
- Live activity is visually styled as status, exposes polite status semantics, and is not presented as a message bubble.
- New response text continues to auto-scroll while the user has not manually scrolled away from the bottom.
- The jump-to-latest control is available only after the user scrolls away, and it stays in the bottom tray instead of covering message content.
- The composer expand button is reachable and does not overlap the textarea scrollbar in inline or expanded composer states.
- Light and dark themes keep the tray, button, and composer controls readable.

#### Rollback/Cleanup
- Stop the temporary dev server if it was started only for this check.
- Clear any draft text and delete disposable test threads if they are no longer needed.

---
