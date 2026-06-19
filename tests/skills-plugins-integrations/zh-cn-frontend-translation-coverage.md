# Feature: Simplified Chinese frontend translation coverage

#### Prerequisites
- Start the app locally.
- Have at least one workspace available so the home, sidebar, Skills/Plugins, Automations, Git branch, and chat surfaces can render.

#### Steps
1. Open Settings from the sidebar and set UI language to Simplified Chinese.
2. Open the Skills route and switch through Skills, Plugins, Apps, and Composio tabs.
3. Open the Automations route.
4. Open a thread, inspect the message area, queued-message controls if present, and approval/input request cards if any are pending.
5. In the sidebar, expand a project or Chats section with hidden rows and confirm Show more/Show less labels are translated.
6. Open a project overflow menu and a thread overflow menu; inspect the trigger tooltips plus Browse files, Copy path, Export Project, automation, worktree, rename, Remove, fork, pin, and copy-chat actions.
7. In a thread with command execution rows, inspect command group summaries, compact status labels such as Done/Failed, and empty output placeholders.
8. In an assistant response toolbar, inspect Fork, Fork thread from this response, Copy, Copy response, Copied, and Response copied labels.
9. Open changed-file review/diff surfaces and confirm Changed files plus file operation badges such as Added, Modified, Deleted, and Renamed are translated.
10. Open the branch/worktree dropdown in the content header.
11. Open delete confirmation UI from a thread row/menu and confirm the title, explanatory text, Confirm, Cancel, Delete, and archive/remove labels are translated.
12. Return to Settings and inspect provider, account, Telegram, feedback, and terminal font rows.

#### Expected Results
- Static controls, headings, placeholders, empty states, badges, buttons, and toast/fallback messages are shown in Simplified Chinese where they are app-provided UI copy.
- Brand names, model names, branch names, plugin/app names, server-returned errors, paths, commands, and message content remain unchanged.
- No obvious English UI labels remain on the inspected app-provided surfaces.

#### Rollback/Cleanup
- Switch UI language back to English if needed.
