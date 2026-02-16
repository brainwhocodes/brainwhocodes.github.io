---
title: gopher-pdf, PyMuPDF features in Go
category: Go / PDF
year: 2026
date: 2026-02-14
tldr: I built gopher-pdf, a Go wrapper around MuPDF, so a PDF-heavy service could drop the Python runtime and ship as a single binary.
description: I built gopher-pdf, a Go wrapper around MuPDF that replaces PyMuPDF in production, renders pages, extracts text, and opens encrypted PDFs, without Python.
thumbnail: /assets/images/projects/gopher-pdf/page-0001.png
---

gopher-pdf is a Go package I built on top of MuPDF to replace PyMuPDF in a PDF-heavy bank statement service. It renders pages, extracts text, and opens encrypted documents, without running Python. It now processes thousands of PDFs a day as a single Go binary.

<figure class="project-figure">
  <img src="{{ '/assets/images/projects/gopher-pdf/page-0001.png' | relative_url }}" alt="Sample bank statement page 1 showing business checking account summary with transaction history">
  <figcaption>Page 1 of a sample business checking statement showing the account summary and beginning of transaction history that gopher-pdf can render and parse.</figcaption>
</figure>

## What gopher-pdf does

- Opens and saves PDFs, including password-protected files
- Renders pages to images
- Extracts text in multiple formats
- Reads outlines (table of contents) and links
- Supports concurrent use across goroutines

<figure class="project-figure">
  <img src="{{ '/assets/images/projects/gopher-pdf/page-0002.png' | relative_url }}" alt="Sample bank statement page 2 showing detailed transaction history with deposits and withdrawals">
  <figcaption>Page 2 showing detailed transaction history with check numbers, descriptions, and running balance, exactly the kind of tabular data gopher-pdf extracts.</figcaption>
</figure>

## Why I built it

I needed PyMuPDF's feature set, but I didn't want a Python runtime in production. Running Python as a subprocess added packaging work I didn't want, and the Go PDF libraries I tried didn't cover the same edge cases.

The clean answer was bindings to MuPDF, plus the extra logic PyMuPDF adds on top.

## Sample output

These pages show a typical 5-page business checking statement. gopher-pdf handles the complex layout, tabular data, and multi-page structure that bank statement processing requires.

<figure class="project-figure">
  <img src="{{ '/assets/images/projects/gopher-pdf/page-0003.png' | relative_url }}" alt="Sample bank statement page 3 showing continued transaction history">
  <figcaption>Page 3 with additional transactions and the ending balance calculation.</figcaption>
</figure>

<figure class="project-figure">
  <img src="{{ '/assets/images/projects/gopher-pdf/page-0004.png' | relative_url }}" alt="Sample bank statement page 4 showing summary of checks written and transaction fees">
  <figcaption>Page 4 showing the summary of checks written and account transaction fees, structured data that gopher-pdf extracts into usable formats.</figcaption>
</figure>

<figure class="project-figure">
  <img src="{{ '/assets/images/projects/gopher-pdf/page-0005.png' | relative_url }}" alt="Sample bank statement page 5 showing important information and legal disclosures">
  <figcaption>Page 5 with legal disclosures and important account information, demonstrating gopher-pdf's ability to extract both structured data and full text.</figcaption>
</figure>

## The hard parts

### Memory ownership and lifetimes

In PyMuPDF, reference counting and context managers make lifetimes feel automatic. MuPDF isn't automatic. A closed document can leave child objects pointing at freed memory.

In Go, I made each wrapper track its parent. If you keep a page after its document closes, calls return a clear error instead of crashing the process.

### Error handling across C and Go

MuPDF uses `setjmp` and `longjmp` for failure paths. That pattern can skip Go stack frames, so I don't call MuPDF directly from Go.

Every MuPDF entry point goes through a small C wrapper that catches the jump, then turns it into a normal Go `error`.

### Text extraction that matches PyMuPDF

The output most people care about is the Python-layer stuff, reading order, blocks, whitespace, and the "why did this line wrap like that?" problems.

I rebuilt the same multi-pass approach in Go: collect characters, group lines, detect blocks, and apply direction and spacing rules until the output matched PyMuPDF on real samples.

### Password callbacks

Encrypted PDFs need a callback that can ask for a password at open time. PyMuPDF wires this up naturally in Python.

In Go, I bridge it with a small registry of function pointers so MuPDF can call back into the right Go function safely.

## Build and reproducibility

PyMuPDF hides a lot of MuPDF compilation behind `setup.py`. For Go, I wrote a Makefile that pins a specific MuPDF version, verifies checksums, and builds static libs on macOS and Linux.

That build work took longer than the first bindings, but it made releases repeatable.

## Performance notes

Early tests showed PyMuPDF ahead, mostly because years of caching tricks add up. I added the ones that mattered:

- Cache document metadata to reduce repeated C calls
- Load page content lazily, only when it's used
- Pool buffers for render output

In normal workloads, gopher-pdf lands within about 20% of PyMuPDF, and the single-binary deploy is worth that trade.

## Testing parity

I treated PyMuPDF's output as the spec. The test suite runs the same PDFs through both libraries and compares results.

The fixtures include encrypted files, mixed encodings, messy layouts, and awkward outline trees.

## Technical details

- **Language**: Go, plus CGO and C wrappers around MuPDF
- **Size**: ~8,000 lines of Go, ~2,000 lines of C
- **Test coverage**: 85%+ with PyMuPDF parity checks
- **License**: AGPL (matches MuPDF)
