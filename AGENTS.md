# Portfolio Agent Guidelines

This document provides instructions for agents working on this portfolio website project.

## Overview

This is a personal portfolio website built with Jekyll and modern web tooling. When making changes or generating content, agents must follow both the voice/tone guidelines and GEO (Generative Engine Optimization) best practices.

---

## Content Voice & Tone

**Reference:** Always consult `VOICE.md` for detailed content writing guidelines.

Key principles to remember:
- Flesch Reading Ease score of around 80 (8th grade level)
- Conversational, engaging tone with contractions and idioms
- Varied sentence length and structure for natural rhythm
- Mix professional and casual language
- Avoid forbidden words: opt, dive, unlock, unleash, intricate, utilization, transformative, alignment, proactive, scalable, benchmark
- Avoid forbidden phrases: "In this world," "in today's world," "at the end of the day," "on the same page," "end-to-end," "in order to," "best practices", "dive into"
- Use commas and semicolons instead of emphasis dashes

---

## GEO (Generative Engine Optimization) Best Practices

GEO optimizes content for AI-driven search engines (Gemini, Perplexity, Search Generative Experience). Follow these guidelines for all content:

### 1. Optimize for "Citatability"

AI models prioritize sources that are easy to cite and summarize.

**Guidelines:**
- Use direct, declarative language
- Avoid hedging phrases like "It could be argued that" or "Some people believe"
- State facts clearly: "X provides three primary benefits: A, B, and C"
- Attribute data to sources: "According to [Source], 73% of users..."
- Include specific numbers, dates, and concrete details

**Example:**
```
❌ "It seems like Jekyll is probably one of the better static site generators out there."
✅ "Jekyll powers over 1 million websites, including GitHub Pages, because it converts Markdown to static HTML in milliseconds."
```

### 2. Lead-With-Answer Strategy

Structure content so AI models can extract the most relevant snippet immediately.

**Guidelines:**
- Use the Inverted Pyramid: critical info first, details later
- Start each section with a 1-2 sentence summary (the "blurb")
- Front-load answers to common questions
- Use clear H2/H3 headers that contain the question or topic

**Page Structure Template:**
```
H1: [Clear, descriptive title with primary keyword]

[2-3 sentence summary answering the core question/topic]

H2: What Is [Topic]?
[Direct definition in 1-2 sentences]
[Supporting details]

H2: Why [Topic] Matters
[Core benefit statement]
[Elaboration with examples]
```

### 3. Structured Data & Technical Clarity

Help AI models parse your content hierarchy correctly.

**Guidelines:**
- Use semantic HTML: `<article>`, `<section>`, `<header>`, `<main>`, `<aside>`
- Implement Schema.org markup for:
  - Article (for blog posts)
  - Person (for author info)
  - CreativeWork (for projects)
  - FAQPage (for FAQ sections)
- Use proper heading hierarchy (H1 → H2 → H3, never skip levels)
- Include descriptive alt text for images
- Use `<thead>`, `<tbody>` for data tables

**Required Schema for All Pages:**
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Page Title",
  "description": "Page description (150-160 chars)",
  "url": "https://wwilsonportfolio.com/page-url",
  "author": {
    "@type": "Person",
    "name": "W. Wilson"
  }
}
```

### 4. Entity-Based Content

AI models think in entities (people, places, concepts) and their relationships.

**Guidelines:**
- Create topic clusters: link related concepts together
- Use consistent entity names (don't switch between "Jekyll," "the framework," and "it")
- Build internal linking between related projects/posts
- Establish entity relationships through context

**Key Entities for This Site:**
- W. Wilson (Person/Author)
- Web Development (Topic)
- Jekyll (Tool/Technology)
- Individual Projects (CreativeWorks)
- Blog Posts (Articles)

### 5. Human Perspective (EEAT)

Emphasize Experience, Expertise, Authoritativeness, and Trustworthiness.

**Guidelines:**
- Include personal case studies and "I built this" narratives
- Add specific challenges faced and how they were solved
- Use first-person perspective for authenticity
- Include dates and context for when work was done
- Cite tools, versions, and real resources used

**EEAT Signals to Include:**
- Author byline on all content
- Publication dates
- Personal insights and lessons learned
- Specific tool versions and methodologies
- Real results and metrics when possible

---

## Sitemap Structure

The portfolio follows this hierarchy:

```
/
├── index.html              (Homepage - personal intro, featured work)
├── /blog/                  (Blog listing page)
│   └── /blog/[post-slug]/  (Individual blog posts)
├── /projects/              (Projects listing - if applicable)
│   └── [project pages]     (Individual project details)
├── /about/                 (About page - optional)
├── /contact/               (Contact page - optional)
└── /assets/                (Static assets: images, CSS, JS)
```

### Page-Specific GEO Requirements

#### Homepage (`/`)
- **Primary Entity:** Person (W. Wilson)
- **Key Info:** Who, what, why in first 100 words
- **Schema:** Person, WebSite
- **Lead Answer:** "I'm [Name], a [role] who [unique value proposition]"

#### Blog Posts (`/blog/[slug]/`)
- **Primary Entity:** Article
- **Key Info:** Clear topic, publication date, author
- **Schema:** Article, Person (author)
- **Lead Answer:** Direct answer to the post's core question in first 2-3 sentences
- **Required:** Reading time estimate, publish date, author byline

#### Project Pages
- **Primary Entity:** CreativeWork or SoftwareApplication
- **Key Info:** What it does, tech stack, outcomes
- **Schema:** CreativeWork, Person
- **Lead Answer:** "[Project Name] is a [type] that solves [problem] using [key technologies]"

---

## Content Generation Checklist

Before publishing any content, verify:

### Voice & Tone (VOICE.md)
- [ ] Reading ease appropriate for target audience
- [ ] Contractions and conversational phrases used naturally
- [ ] Sentence length varies throughout
- [ ] No forbidden words or phrases used
- [ ] 8th grade readability target met

### GEO Optimization
- [ ] Lead paragraph contains the core answer/topic
- [ ] Citations and specific data included where relevant
- [ ] Schema markup implemented for page type
- [ ] Semantic HTML structure used
- [ ] Entity names consistent throughout
- [ ] Internal links to related content included
- [ ] Author information and date visible
- [ ] EEAT signals (personal insights, real examples) present

### Technical
- [ ] Meta title under 60 characters
- [ ] Meta description 150-160 characters
- [ ] Descriptive, keyword-rich URL slug
- [ ] Alt text for all images
- [ ] Proper heading hierarchy (no skipped levels)

---

## Traditional SEO vs. GEO Quick Reference

| Feature | Traditional SEO | GEO |
|---------|----------------|-----|
| **Primary Goal** | Rank #1 on Page 1 | Be the primary source in an AI summary |
| **Key Metric** | Click-Through Rate (CTR) | Brand mentions & citations |
| **Content Style** | Keyword-focused, long-form | Response-focused, authoritative, concise |
| **Structure** | Backlinks and Meta Tags | Schema, Entities, and Lead-Answers |
| **Focus** | Search engine crawlers | AI model comprehension |

---

## When Updating Existing Content

1. Read the current page content and structure
2. Check `VOICE.md` for tone guidelines
3. Review this AGENTS.md for GEO requirements
4. Identify the page type and apply appropriate schema
5. Ensure the lead paragraph answers the core question directly
6. Add/update internal links to related content
7. Verify EEAT signals are present
8. Check for forbidden words/phrases
9. Validate HTML structure and schema markup

---

## File Structure Reference

```
/
├── _config.yml              # Jekyll configuration
├── _layouts/                # Page templates
│   ├── default.html
│   ├── post.html
│   └── project.html
├── _includes/               # Reusable components
├── _posts/                  # Blog posts (YYYY-MM-DD-title.md)
├── _projects/               # Project pages
├── _sass/                   # SCSS partials
├── assets/                  # Static assets
│   ├── images/
│   ├── css/
│   └── js/
├── index.html               # Homepage
├── blog/                    # Blog section
├── styles.css               # Main stylesheet
├── script.js                # Main JavaScript
├── VOICE.md                 # Content voice guidelines
└── AGENTS.md                # This file
```
