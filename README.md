# vitest-reporter
Simple extension of reporter to emit OS messages. Not much to it.

## Bubs
- [ ] Cannot get terminal-notifier to show icon

## TODOs

In order of priority:
- [ ] Give it some configuration options
- [ ] Add in checks for system executables and appropriate warning messages and errors
- [ ] Add support for other OSes

## Dev notes

I don't understand the issue exactly yet, but kept getting "not the tsc you are looking for", but I *think* it resolved after running this command...which doesn't make sense based on docs.

Combination of using asdf, pnpm, etc seemed to cause confusion in which tsc to execute.

Possible Fix for TSC errors:
 
```sh
pnpm --package=typescript dlx tsc
```
