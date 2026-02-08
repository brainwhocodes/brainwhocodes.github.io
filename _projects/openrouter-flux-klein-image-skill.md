---
title: OpenRouter Flux 2 (Klein + Max) Image Generation Skill for Codex CLI
category: AI Tooling
year: 2026
date: 2026-01-01
tldr: I built a terminal-first skill that generates repeatable Flux Klein and Max images fast, so content and product teams can move from idea to publish-ready visuals without manual download steps. Or having to create applications or workflows to generate images.
thumbnail: /assets/images/projects/openrouter-flux-klein-image-skill.webp
---

I built this skill to generate production-ready images from the terminal and keep the whole flow local. No copy and paste, no manual downloads, no guesswork on where files ended up.

It supports `black-forest-labs/flux.2-klein-4b` as the fast default in my OpenRouter setup.<sup><a href="#ref-7">7</a></sup> That model maps to FLUX.2 klein from Black Forest Labs.<sup><a href="#ref-4">4</a></sup> It can also switch to `black-forest-labs/flux.2-max` when I want more detail.<sup><a href="#ref-8">8</a></sup> That model maps to FLUX.2 max from Black Forest Labs.<sup><a href="#ref-5">5</a></sup> Both models come from Black Forest Labs.<sup><a href="#ref-6">6</a></sup>

## What this project includes

- A reusable skill with clear triggers and command patterns
- `generate_image.py` for one-off or batch image creation
- `generate_blog_images.py` for markdown-driven hero and inline sets
- Metadata JSON files for each render, so prompts and outputs are traceable

## Klein vs Max comparison examples

These examples were generated with the same prompt, aspect ratio, image size, and seed, then rendered once with Klein and once with Max.<sup><a href="#ref-3">3</a></sup>

If you work on content, product, or growth, this comparison helps with day-to-day choices:

- Use Klein when you need many options fast for drafts, internal review, or quick experiments
- Use Max when an image is going live on a homepage, ad, or launch asset
- Keep prompts and seeds in metadata so anyone on the team can reproduce the exact output later

### Prompt 1, Cozy podcast studio at night

<p class="comparison-prompt"><strong>Prompt:</strong> Editorial photo of a cozy podcast recording studio at night, warm practical lights, analog synth on desk, soft haze, cinematic composition, no text, no logos, no watermarks.</p>

I used this style for a weekly podcast workflow where each episode needs a blog hero, newsletter image, and social card background.

<div class="comparison-grid">
  <figure class="comparison-card">
    <img src="{{ '/assets/images/projects/openrouter-flux-klein-examples/prompt-01-klein.webp' | relative_url }}" alt="Klein render of a cozy podcast studio with warm lights and analog synth">
    <figcaption><strong>Klein:</strong> Fast to iterate, gave usable options for episode pages and email headers in one pass.</figcaption>
  </figure>
  <figure class="comparison-card">
    <img src="{{ '/assets/images/projects/openrouter-flux-klein-examples/prompt-01-max.webp' | relative_url }}" alt="Max render of a cozy podcast studio with richer texture detail and lighting gradients">
    <figcaption><strong>Max:</strong> Better detail on gear, cables, and light falloff, useful for homepage hero placement.</figcaption>
  </figure>
</div>

Why this is useful: Klein works for the normal publishing cadence, Max is the better pick for a season launch or sponsored campaign visual.

### Prompt 2, Indie game team standup

<p class="comparison-prompt"><strong>Prompt:</strong> Wide shot of a small indie game team in a bright office during standup, sticky notes on glass, laptops open, natural morning light, documentary photography style, no text, no logos, no watermarks.</p>

I used this type of image for hiring pages and investor update decks where you need a believable team scene without scheduling a real shoot.

<div class="comparison-grid">
  <figure class="comparison-card">
    <img src="{{ '/assets/images/projects/openrouter-flux-klein-examples/prompt-02-klein.webp' | relative_url }}" alt="Klein render of a game team standup in a bright office with sticky notes">
    <figcaption><strong>Klein:</strong> Strong room composition and readable body language, good for careers page sections.</figcaption>
  </figure>
  <figure class="comparison-card">
    <img src="{{ '/assets/images/projects/openrouter-flux-klein-examples/prompt-02-max.webp' | relative_url }}" alt="Max render of a game team standup with finer environment detail">
    <figcaption><strong>Max:</strong> Cleaner hands, faces, and glass note detail, less cleanup before publishing.</figcaption>
  </figure>
</div>

Why this is useful: both outputs are useful, then you choose speed or polish based on whether it is an internal deck or a public careers page.

### Prompt 3, Video editing desk scene

<p class="comparison-prompt"><strong>Prompt:</strong> Cinematic still of a creator editing a short video on a dual-monitor setup, waveform timeline visible, coffee mug and notebook nearby, moody teal and amber lighting, no text, no logos, no watermarks.</p>

I used this for a video workflow feature page where product copy sits beside the image and needs clean negative space.

<div class="comparison-grid">
  <figure class="comparison-card">
    <img src="{{ '/assets/images/projects/openrouter-flux-klein-examples/prompt-03-klein.webp' | relative_url }}" alt="Klein render of a creator editing video on dual monitors with moody lighting">
    <figcaption><strong>Klein:</strong> Great for quick layout tests, especially when trying multiple headline and CTA placements.</figcaption>
  </figure>
  <figure class="comparison-card">
    <img src="{{ '/assets/images/projects/openrouter-flux-klein-examples/prompt-03-max.webp' | relative_url }}" alt="Max render of a creator editing video with sharper monitor and desk details">
    <figcaption><strong>Max:</strong> Sharper monitor and desk detail, holds up better in large hero crops and retina displays.</figcaption>
  </figure>
</div>

Why this is useful: product and content teams can ship a clear visual story the same day, then swap in the polished version when needed.

## When to use each model

| Scenario | Better first pick | Why |
|---|---|---|
| Rapid idea rounds with many prompts | Klein | Faster iteration for content planning and early review |
| Final image for a launch page | Max | More fine detail and cleaner textures |
| Internal decks and working docs | Klein | Good quality with less waiting |
| Paid campaign hero visuals | Max | Higher polish helps when visuals carry the message |
| Daily publishing pipeline | Klein first, Max only when needed | Keeps production moving while preserving a high-quality path |

## Example prompts and commands used for these images

When I run this in Codex CLI, I call the skill and describe what I want in plain language.

```text
$openrouter-flux-klein-image-gen
Create a Klein and Max pair for a cozy podcast studio at night.
Use this prompt: Editorial photo of a cozy podcast recording studio at night, warm practical lights, analog synth on desk, soft haze, cinematic composition, no text, no logos, no watermarks.
Use 16:9, 1K, seed 2401.
```

```text
$openrouter-flux-klein-image-gen
Create a Klein and Max pair for an indie game team standup scene.
Use this prompt: Wide shot of a small indie game team in a bright office during standup, sticky notes on glass, laptops open, natural morning light, documentary photography style, no text, no logos, no watermarks.
Use 16:9, 1K, seed 7312.
```

```text
$openrouter-flux-klein-image-gen
Create a Klein and Max pair for a video editing desk scene.
Use this prompt: Cinematic still of a creator editing a short video on a dual-monitor setup, waveform timeline visible, coffee mug and notebook nearby, moody teal and amber lighting, no text, no logos, no watermarks.
Use 16:9, 1K, seed 9904.
```

If I want full control, I run direct script commands like these through OpenRouter's documented image workflow.<sup><a href="#ref-3">3</a></sup>

```bash
# Prompt 1, podcast studio
python3 scripts/generate_image.py \
  --prompt "Editorial photo of a cozy podcast recording studio at night, warm practical lights, analog synth on desk, soft haze, cinematic composition, no text, no logos, no watermarks" \
  --model-variant klein \
  --aspect-ratio 16:9 \
  --image-size 1K \
  --seed 2401 \
  --output prompt-01-klein.png

python3 scripts/generate_image.py \
  --prompt "Editorial photo of a cozy podcast recording studio at night, warm practical lights, analog synth on desk, soft haze, cinematic composition, no text, no logos, no watermarks" \
  --model-variant max \
  --aspect-ratio 16:9 \
  --image-size 1K \
  --seed 2401 \
  --output prompt-01-max.png
```

```bash
# Prompt 2, indie game team standup
python3 scripts/generate_image.py \
  --prompt "Wide shot of a small indie game team in a bright office during standup, sticky notes on glass, laptops open, natural morning light, documentary photography style, no text, no logos, no watermarks" \
  --model-variant klein \
  --aspect-ratio 16:9 \
  --image-size 1K \
  --seed 7312 \
  --output prompt-02-klein.png

python3 scripts/generate_image.py \
  --prompt "Wide shot of a small indie game team in a bright office during standup, sticky notes on glass, laptops open, natural morning light, documentary photography style, no text, no logos, no watermarks" \
  --model-variant max \
  --aspect-ratio 16:9 \
  --image-size 1K \
  --seed 7312 \
  --output prompt-02-max.png
```

```bash
# Prompt 3, video editing desk scene
python3 scripts/generate_image.py \
  --prompt "Cinematic still of a creator editing a short video on a dual-monitor setup, waveform timeline visible, coffee mug and notebook nearby, moody teal and amber lighting, no text, no logos, no watermarks" \
  --model-variant klein \
  --aspect-ratio 16:9 \
  --image-size 1K \
  --seed 9904 \
  --output prompt-03-klein.png

python3 scripts/generate_image.py \
  --prompt "Cinematic still of a creator editing a short video on a dual-monitor setup, waveform timeline visible, coffee mug and notebook nearby, moody teal and amber lighting, no text, no logos, no watermarks" \
  --model-variant max \
  --aspect-ratio 16:9 \
  --image-size 1K \
  --seed 9904 \
  --output prompt-03-max.png
```

## Citations

1. <a id="ref-1"></a>[OpenRouter Quickstart](https://openrouter.ai/docs/quickstart)
2. <a id="ref-2"></a>[OpenRouter API Reference Overview](https://openrouter.ai/docs/api-reference/overview)
3. <a id="ref-3"></a>[OpenRouter Image Generation Guide](https://openrouter.ai/docs/features/multimodal/image-generation)
4. <a id="ref-4"></a>[FLUX.2 klein (Black Forest Labs)](https://bfl.ai/models/flux-2-klein)
5. <a id="ref-5"></a>[FLUX.2 max (Black Forest Labs)](https://bfl.ai/models/flux-2-max)
7. <a id="ref-7"></a>[FLUX.2 Klein 4B on OpenRouter](https://openrouter.ai/black-forest-labs/flux.2-klein-4b)
8. <a id="ref-8"></a>[FLUX.2 Max on OpenRouter](https://openrouter.ai/black-forest-labs/flux.2-max)

## Current status

The skill is running in my daily workflow now, and this page reflects real outputs generated from the same script commands.
