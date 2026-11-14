# S3n;t · Engineering portfolio

## Publish on GitHub Pages

Extract the ZIP into the root of your GitHub repository. Commit the source folders and the included `.github/workflows/pages.yml` to `main`. In Settings → Pages, choose **GitHub Actions** as the publishing source. Each push to main builds the site and deploys the generated `dist/` directory. To publish after changing the setting, run **Publish portfolio** in the Actions tab or push another commit.

## Add a project

Create `projects/project-name_id.md`. Use lowercase letters, numbers and hyphens for the name, and a short unique alphanumeric ID after the underscore. For example:

```md
# My project

A short paragraph describing the project.

## How it works

Add the full write-up here. Use Markdown headings, lists, links and code blocks.
```

The heading supplies the project title. The first paragraph supplies the listing brief. The full Markdown content becomes the detail page at `projects/project-name_id/`. Keep the filename stable when editing to preserve existing links. Deleting the Markdown file removes the project on the next build.

Project content supports CommonMark. Raw HTML is displayed as text. Images stored under `site/images/` can be referenced from a detail page with `../../images/filename.png`. The existing Signal explorer uses a standalone `<!-- signal-explorer -->` line to place its interactive demo.

## Local preview

With Python 3 and Pandoc installed, run `python3 scripts/build.py`, then `python3 -m http.server --directory dist 8000`. Open `http://localhost:8000`. The ZIP also includes the current, prebuilt site in `dist/`.

Edit the four hand-written pages under `site/`. Project navigation and layout are in `templates/projects.html`. Contact icons use local monochrome brand marks from Simple Icons 12.4.0.
