### Integrated terminal manager edge cases

#### Feature/Change Name
Automated unit coverage for terminal manager edge cases that do not require a browser or real shell.

#### Prerequisites/Setup
1. Dependencies installed with `pnpm install`

#### Steps
1. Run `pnpm run test:unit`
2. Optionally run the focused test file with `pnpm run test:unit -- src/server/terminalManager.test.ts`
3. Set UI language to Simplified Chinese, open the integrated terminal, and trigger or simulate a stale/missing terminal session error.
4. With UI language still set to Simplified Chinese, run `exit` in the integrated terminal or otherwise end the active terminal session.

#### Expected Results
- Missing thread ids are rejected before spawning a PTY
- Invalid cwd falls back to home and then process cwd
- Initial and resize dimensions are clamped
- PTY env normalizes `TERM`, locale, and strips `TERMINFO` variables
- Output snapshots truncate to the last 16 KiB and set `truncated`
- Existing session reattach emits init/attached events and safely syncs changed cwd
- `New` adds a new tab without killing the previous session, and close/exit removes snapshots for the active session
- App-provided terminal errors such as `Terminal session missing`, terminal close failure, and quick command failure render through the UI language translator instead of showing raw English in Simplified Chinese.
- The terminal writes `[终端已退出]` after the active terminal session exits in Simplified Chinese mode, not `[terminal exited]`.

#### Rollback/Cleanup
- None

---
