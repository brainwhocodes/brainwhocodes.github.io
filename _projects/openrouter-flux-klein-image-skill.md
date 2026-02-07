---
title: OpenRouter Flux 2 (Klein + Max) Image Generation Skill for Codex CLI
category: AI Tooling
year: 2025
thumbnail: /assets/images/projects/openrouter-flux-klein-image-skill.webp
---

I needed a better way to generate blog images, something that didn't involve wrestling with Midjourney's Discord interface or paying for credits I'd never use. So I built this.

It's a Codex skill that hooks into OpenRouter and supports both `black-forest-labs/flux.2-klein-4b` (default) and `black-forest-labs/flux.2-max` when higher-quality output is requested. Now I can generate hero images and inline visuals straight from the command line, all saved locally where I want them.

## What's inside

- **SKILL.md** with clear triggers, workflow, and output contract
- **scripts/generate_image.py** for single or multi-image generation from direct prompts
- **scripts/generate_blog_images.py** for markdown-driven hero and inline image sets
- **references/prompt-templates.md** for reusable prompt patterns
- **references/openrouter-api.md** for endpoint and payload conventions
- **.env.example** and **.gitignore** for local setup hygiene

## The decisions that mattered

Here's what we actually figured out:

**Flexible model selection** - `black-forest-labs/flux.2-klein-4b` stays the fast default, and `black-forest-labs/flux.2-max` is available for higher-fidelity renders.

**Script-first approach** - Scripts you can run again and again, not one-off prompts you forget.

**Markdown-aware batches** - Drop in a blog post, get back a full set of images with a manifest.

**Built for reality** - Validation, dry-runs, and error handling because things will go sideways.

## How it works

1. Set `OPENROUTER_API_KEY`
2. Create or refine prompts for hero and section imagery
3. Run one script for single image output, or batch against a markdown post
4. Save outputs to local paths and generate a manifest for publishing workflows

## Example Commands

```bash
# Hero image from direct prompt
python3 scripts/generate_image.py \
  --prompt "Editorial hero image for a conversion-focused landing page article." \
  --model-variant klein \
  --size 1536x1024 \
  --output /absolute/path/to/images/hero.png

# Higher-quality render with Flux Max
python3 scripts/generate_image.py \
  --prompt "Editorial hero image for a conversion-focused landing page article." \
  --model-variant max \
  --size 1536x1024 \
  --output /absolute/path/to/images/hero-max.png

# Batch blog images from markdown
python3 scripts/generate_blog_images.py \
  --markdown /absolute/path/to/post.md \
  --output-dir /absolute/path/to/images \
  --style "minimal editorial photography, warm neutrals" \
  --inline-count 3
```

## What I learned

The stuff that surprised me:

- **Good prompts beat clever parameters** every single time.
- **Batch processing from markdown** is way more useful than I expected, saves so much mental overhead.
- **Absolute paths and manifests** might sound boring, but they make everything else downstream so much easier.

## What's in (and out)

| In | Out (maybe later) |
|----|-------------------|
| Hero images and inline blog visuals | Inpainting |
| OpenRouter's chat completions endpoint | Outpainting |
| Local outputs with metadata manifests | Image editing features |

## Current status

Built and tested. I'm already using this for my own blog posts, it works.
