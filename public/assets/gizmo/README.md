# Gizmo Character Asset Manifest

This directory is designated for isolated transparent PNG/WebP character exports of **Gizmo, the Workshop Wizard**, based on the provided character sheet: `Gizmo__Workshop_Wizard_Brand_Sheet_60c331ec.png`.

## Recommended Export Files

To add custom transparent cutouts for each emotional mode:

| File Name | Expression | Recommended Resolution | Used In |
|-----------|------------|------------------------|---------|
| `gizmo-happy.png` | Happy / Welcome | 512x512 px (transparent PNG) | Hero, Welcome popup, Greeting |
| `gizmo-curious.png` | Curious (Exploring) | 512x512 px (transparent PNG) | Project recommendations, Search |
| `gizmo-thinking.png` | Thinking (Help mode) | 512x512 px (transparent PNG) | Gizmo Guide drawer, Technical Q&A |
| `gizmo-excited.png` | Excited (Celebrating) | 512x512 px (transparent PNG) | Milestone celebrations, Comment posted |
| `gizmo-surprised.png` | Surprised (Discovery) | 512x512 px (transparent PNG) | Hidden easter eggs, 404 page |
| `gizmo-sleepy.png` | Sleepy (Idle) | 512x512 px (transparent PNG) | Long idle timeout |
| `gizmo-hero.png` | Full 3D Hero Wizard | 1024x1024 px (transparent PNG) | Homepage Hero display |

## Fallback System
The application automatically checks for these files. When an individual file is not found, it seamlessly falls back to our bespoke SVG illustrated character component with the exact color palette (Cream `#F5EDE2`, Leaf Green `#A7D7B7`, Forest Brown `#6B4E3F`, Golden Accent `#F6C85F`, Magic Teal `#4DD0B6`), ensuring no broken image icons ever appear.
