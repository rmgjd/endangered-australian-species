# Endangered Australian Species — FIT3179 DV2

An interactive, single-page visualisation by **Tianyi Xiao**.

The entry point is `index.html`. It loads `chart-bundle.js`, a generated copy of all 12 specifications with their data embedded. This avoids browser restrictions on fetching JSON when opening `index.html` directly through `file://`. Keep `chart-bundle.js` beside the HTML, CSS and JavaScript. An internet connection is still required for the Vega libraries loaded from jsDelivr.

The `data/` and `specs/` folders remain the readable source files for inspection. The hosted page can also load these JSON files if the bundle is unavailable. `.nojekyll` ensures GitHub Pages serves these files directly. After changing a specification or dataset, run `../scripts/build_chart_bundle.py`; `build_specs.py` also rebuilds the bundle automatically.

## Publish on GitHub Pages

1. Create a public repository under the `rmgjd` account, for example `endangered-australian-species`.
2. Put the **contents of this `site` folder at the repository root**, including the hidden `.nojekyll` file.
3. In repository **Settings → Pages**, choose **Deploy from a branch**, the default branch, and **/(root)**, then save.
4. Open the URL GitHub displays in Pages settings. Verify that all 12 charts and their tooltips work in a private browser window.

The likely URL for the example repository name is `https://rmgjd.github.io/endangered-australian-species/`; use the actual URL shown by GitHub after deployment.

The source data, processing scripts, sketch guide, and audit are in the parent `dv2` project folder. Include them in the repository if you want the full workflow to be reproducible, but then configure Pages to publish only a root or `docs/` folder, or use a Pages workflow. For the simplest branch deployment, upload only the contents of this `site` folder.

