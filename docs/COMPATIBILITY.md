# Angular compatibility

Use matching versions of Angular core, common, forms and platform-browser in your application.
Check the peer dependencies of the package version you install:

```sh
npm view ngx-editra@latest version peerDependencies
```

## Supported Angular versions

Version `1.0.0` supports stable Angular 17-22 with the peer range
`>=17.0.0 <23.0.0`, including Angular 22.1.2. Angular prereleases, Angular 16
and Angular 23 are outside this range. Earlier `0.1.0-alpha.0` releases use
narrower minimum patch versions:

| Angular | Minimum for 1.0.0 | Minimum for alpha.0 |
| ------- | ----------------- | ------------------- |
| 17      | 17.0.0            | 17.3.12             |
| 18      | 18.0.0            | 18.2.14             |
| 19      | 19.0.0            | 19.2.25             |
| 20      | 20.0.0            | 20.3.33             |
| 21      | 21.0.0            | 21.2.25             |
| 22      | 22.0.0            | 22.2.2              |

Check [npm versions](https://www.npmjs.com/package/ngx-editra?activeTab=versions)
for availability before choosing a release. An older published version does not
acquire a newer version's expanded peer range. Avoid `--force` and
`--legacy-peer-deps` to bypass an incompatible Angular version.

## Application requirements

Use the Node.js, TypeScript and RxJS versions supported by your Angular version.
See [Angular version compatibility](https://angular.dev/reference/versions).
Angular is a peer dependency and is not bundled as a separate framework runtime.

Compatibility testing covers minimum and later versions in each supported major,
plus Angular 22.1.2. This does not mean every patch was individually tested or that
older Angular releases receive upstream security maintenance. Prefer current patched
framework releases when possible.

## Forms and server rendering

Reactive Forms and template-driven forms use Angular's ControlValueAccessor.
Angular 22 Signal Forms uses the CVA compatibility integration and has dedicated
consumer tests. See [forms integration](ANGULAR_FORMS.md).

The editor uses an explicit hydration boundary for ProseMirror-managed DOM.
The surrounding application can hydrate normally. See [SSR and hydration](SSR.md)
for application setup and [troubleshooting](TROUBLESHOOTING.md) for integration issues.
