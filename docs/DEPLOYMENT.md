# Deploy the websites

The library is distributed through npm; `0.1.0-alpha.0` is published.

After a new npm release, run `npm run package:sync`, review the generated package
metadata, and commit it before rebuilding the sites. This keeps npm links and
published-version labels consistent while the demo build can use a newer workspace
version. See [npm package and releases](PACKAGE.md).
The documentation and playground are two independent
static websites hosted on Vercel from GitHub. Site deployment does not publish the library.
The initial deployments use [documentation](https://ngx-editra-docs.vercel.app) and
[playground](https://ngx-editra-playground.vercel.app) production URLs. No custom domains
are configured. Vercel assigns a new project's first deployment to production even
without `--prod`; later deployments default to preview unless production is requested.

## Build model

The library compiler uses Angular 17/Node 20/npm 10. The public websites have independent Angular 22/Node 24/npm 11 toolchains and lockfiles. GitHub Actions configures both runtimes, compiles the library with Node 20, then builds and deploys the apps with Node 24. The root npm commands select the appropriate runtime. Do not rebuild the apps with the root legacy compiler.

Only `dist/<app>/browser` is included. Documentation routes are prerendered; editor,
search and theme interactions run in the browser. No local SSR server, Node dependency
tree or function is deployed. Legacy build-tool audit findings still require maintenance.

## Owner setup

1. Push the repository to GitHub and verify validation on the intended revision.
2. Create separate documentation and playground projects in Vercel. Choose Other as the
   framework, Node 24 in project settings, and the repository root if requested.
3. Disable automatic Git deployments for these projects; the GitHub workflow deploys
   prepared output and avoids a second Vercel source build using the legacy toolchain.
   The root `vercel.json` sets `git.deploymentEnabled` to `false` for this purpose.
4. Add GitHub Actions secrets at repository level or in both deployment environments:

| Secret                       | Value                                      |
| ---------------------------- | ------------------------------------------ |
| VERCEL_TOKEN                 | Token authorized to deploy both projects   |
| VERCEL_ORG_ID                | Vercel team/account ID owning the projects |
| VERCEL_DOCS_PROJECT_ID       | Documentation project ID                   |
| VERCEL_PLAYGROUND_PROJECT_ID | Playground project ID                      |

5. Configure GitHub environments `preview` and `production`. Add a production approval
   rule if desired and require validation on the release branch.
6. Add domains to the matching Vercel projects and verify them before adding public links.
   Never commit tokens, `.vercel/project.json` or local credentials.

## GitHub deployment

Open Actions → Deploy static site to Vercel → Run workflow. Select the branch and app.
Leave production unchecked for a preview. Enable it to update the production domain.
Manual runs deploy the selected app only. After a merge or push to `main`, the
**Validate and prepare package** workflow runs first. On success, the deployment
workflow automatically builds and deploys both websites to production, checking out
the exact validated commit. Failed or cancelled validation, pull-request validation,
scheduled checks and other branches do not trigger automatic deployment.

The workflow file must be merged into the default branch for `workflow_run` triggers
to take effect. Existing production-environment approval rules still apply. Direct
Vercel Git builds remain disabled; all deployments use the prebuilt workflow.

For manual production runs, confirm validation passed on the selected revision.
The deployment workflow builds the selected app but does not replace release validation.
No npm publish command is run. Account settings and secrets require owner configuration.

## Local preparation

From the repository root with Node 20/npm 10 and node24 configured in release.local.json or EDITRA_NODE24:

```sh
npm ci
npm run build:site -- documentation
npm run build:site -- playground
```

Each command replaces only its generated staging directory under
`artifacts/sites/documentation` or `artifacts/sites/playground`. The result contains
`.vercel/output/config.json` (Build Output API v3), static browser files, explicit
prerendered-page routing and an index.html fallback for client routes.

For an optional manual deploy, switch to Node 24, enter the selected staging directory,
set VERCEL_ORG_ID and VERCEL_PROJECT_ID for that project, and authenticate with Vercel:

```sh
npm exec --yes --package=vercel@64.4.0 -- vercel deploy --prebuilt
```

This creates a preview. Add `--prod` only for an authorized production deployment.
The staging directory declares Node 24 independently of the legacy workspace engine.
Do not use `vercel build` to rebuild the workspace on Vercel.

## Vercel reports that Node 20 is discontinued

A log that starts by cloning a branch and rejects Node 20 before installation is a
Vercel source build of the workspace root. It is not the prebuilt deployment from
the GitHub workflow. The root compiler still requires Node 20; changing only its
engine to Node 24 does not migrate Angular 17 or its dependencies.

1. Set **Node.js Version** to **24.x** in both Vercel project settings.
2. Commit the root `vercel.json` on the production branch. Its
   `git.deploymentEnabled: false` disables automatic Git builds, including new
   Dependabot branch deployments; it does not prevent CLI deployments.
3. Ensure the four Vercel secrets listed above are configured in GitHub.
4. Run **Deploy static site to Vercel** from GitHub Actions on the intended reviewed
   branch, select the site, and choose preview or production. Repeat for the other site.
5. Confirm the deployment uses `vercel deploy --prebuilt` from the isolated staging
   directory, whose package manifest declares Node 24.

Do not redeploy the failed source-build deployment or use a Dependabot dependency
update branch as the production release. Existing branches without the new config
may still trigger Git builds; disconnect the Vercel Git integration for these
projects if automatic builds continue. The workflow uses the configured project
IDs and token to deploy prebuilt output.

## Verify the result

Open the documentation homepage, /examples and a direct /guides/angular-forms URL.
Refresh a deep URL and check assets, search and copying. In both apps, check typing,
popups, fullscreen and mobile layout. Confirm the expected project/domain was updated
and no server functions were deployed.

Official references: [Build Output API](https://vercel.com/docs/build-output-api),
[routing configuration](https://vercel.com/docs/build-output-api/configuration), and
[Node 20 retirement](https://vercel.com/changelog/node-js-20-is-being-deprecated).
