### Feature: Platform-aware send shortcut label

#### Prerequisites
- App is running in a desktop browser
- Settings panel is accessible

#### Steps
1. On macOS, open Settings and find the send shortcut preference
2. Confirm the label and tooltip refer to `⌘ + Enter`
3. Disable Enter-to-send, type a multi-line draft, and press `⌘ + Enter`
4. On Windows or Linux, open Settings and find the same preference
5. Confirm the label and tooltip refer to `Ctrl + Enter`
6. Disable Enter-to-send, type a multi-line draft, and press `Ctrl + Enter`

#### Expected Results
- macOS shows `Require ⌘ + Enter to send`
- Windows and Linux show `Require Ctrl + Enter to send`
- With Enter-to-send disabled, the platform shortcut sends the message
- Plain Enter remains available for inserting a newline when Enter-to-send is disabled

#### Rollback/Cleanup
- Restore the send shortcut preference to the tester's normal setting
