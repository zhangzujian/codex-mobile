# Feature: Simplified Chinese frontend translation coverage

#### Prerequisites
- Start the app locally.
- Have at least one workspace available so the home, sidebar, Skills/Plugins, Automations, Git branch, and chat surfaces can render.

#### Steps
1. Open Settings from the sidebar and set UI language to Simplified Chinese.
2. Open the Skills route and switch through Skills, Plugins, Apps, and Composio tabs.
3. Open the Automations route.
4. Open a thread, inspect the message area, queued-message controls if present, and approval/input request cards if any are pending.
5. Open the branch/worktree dropdown in the content header.
6. Return to Settings and inspect provider, account, Telegram, feedback, and terminal font rows.

#### Expected Results
- Static controls, headings, placeholders, empty states, badges, buttons, and toast/fallback messages are shown in Simplified Chinese where they are app-provided UI copy.
- Brand names, model names, branch names, plugin/app names, server-returned errors, paths, commands, and message content remain unchanged.
- No obvious English UI labels remain on the inspected app-provided surfaces.

#### Rollback/Cleanup
- Switch UI language back to English if needed.
