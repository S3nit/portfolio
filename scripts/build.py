"""Build the static portfolio from site files and Markdown project entries."""
from html import escape
from pathlib import Path
import re
import shutil
import subprocess
import tempfile

ROOT = Path(__file__).resolve().parents[1]
TEMPLATES = ROOT / "templates"
WIDGET = "<!-- signal-explorer -->"


def render_markdown(source):
    return subprocess.run(
        ["pandoc", "--from=commonmark-raw_html", "--to=html5", "--wrap=none"],
        input=source, text=True, capture_output=True, check=True,
    ).stdout


def read_project(path):
    if not re.fullmatch(r"[a-z0-9-]+_[a-z0-9]+", path.stem):
        raise ValueError(f"{path}: use a filename like project-name_a1b2c3.md")
    text = path.read_text(encoding="utf-8").strip()
    header = re.fullmatch(r"# ([^\n]+)\n\s*\n(.+)", text, re.DOTALL)
    if not header:
        raise ValueError(f"{path}: start with '# Project title', a blank line and a brief")
    title, content = header.groups()
    brief = re.split(r"\n\s*\n", content, maxsplit=1)[0].strip()
    if not brief or brief.startswith(("#", "<!--")):
        raise ValueError(f"{path}: add a brief paragraph after the title")
    return title.strip(), brief, content


def page(template, heading, content, nested=False, demo=False):
    if nested:
        template = template.replace('href="./', 'href="../../')
        template = template.replace('aria-current="page"', 'aria-current="location"')
    if demo:
        template = template.replace("</head>", '  <script defer src="../../projects.js"></script>\n</head>')
    template = template.replace("<title>Projects ·", "<title>" + escape(heading) + " ·")
    return template.replace("<!-- project-content -->", content)


def build(output):
    shutil.copytree(ROOT / "site", output, dirs_exist_ok=True)
    template = (TEMPLATES / "projects.html").read_text()
    briefs = []
    for path in sorted((ROOT / "projects").glob("*.md")):
        title, brief, source = read_project(path)
        link = f"./projects/{path.stem}/"
        briefs.append(f'''<section class="project-brief">
      <h2>{escape(title)}</h2>
      {render_markdown(brief).strip()}
      <a class="text-link" href="{link}" aria-label="Read more about {escape(title, quote=True)}">Read more <span aria-hidden="true">→</span></a>
    </section>''')
        blocks = re.split(r"(?m)^" + re.escape(WIDGET) + r"[ \t]*$", source)
        demo = len(blocks) > 1
        if len(blocks) > 2:
            raise ValueError(f"{path}: include the signal explorer only once")
        widget = (TEMPLATES / "signal-explorer.html").read_text() if demo else ""
        details = widget.join(render_markdown(block) for block in blocks)
        content = f'<h1>{escape(title)}</h1>\n<article class="project-body">\n{details}</article>'
        directory = output / "projects" / path.stem
        directory.mkdir(parents=True)
        (directory / "index.html").write_text(page(template, title, content, nested=True, demo=demo))
    listing = "<h1>Projects</h1>\n" + ("\n".join(briefs) or "<p>No projects published yet.</p>")
    (output / "projects.html").write_text(page(template, "Projects", listing))


if __name__ == "__main__":
    with tempfile.TemporaryDirectory(dir=ROOT) as stage:
        output = Path(stage) / "dist"
        build(output)
        destination = ROOT / "dist"
        if destination.exists():
            shutil.rmtree(destination)
        output.rename(destination)
