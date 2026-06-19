# Project groups show three threads by default

#### Prerequisites
- Start the app locally.
- Have at least one project in the sidebar with more than three unpinned threads.
- Light theme and dark theme are both available from Settings.

#### Steps
1. Open the home route in light theme.
2. Expand the target project group if it is collapsed.
3. Count the visible thread rows under that project before pressing Show more.
4. Click Show more for that project.
5. Confirm older project threads beyond the first three appear.
6. Click Show less.
7. Switch to dark theme and repeat steps 2 through 6.
8. Use sidebar search for a term matching more than three project threads and confirm search results are not capped by the three-row browsing limit.

#### Expected Results
- Each non-expanded project group shows three thread rows by default.
- Show more expands that project group to all matching project threads.
- Show less restores the three-row default for that project group.
- The separate Chats section keeps its own default behavior.
- Search mode shows all matching project threads without the three-row browsing limit.
- The controls remain readable in both light and dark themes.

#### Rollback/Cleanup
- Clear the sidebar search and restore the previous theme if needed.
