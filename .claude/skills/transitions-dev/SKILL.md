---
name: transitions-dev
description: Production-ready CSS transitions for web apps. Use when implementing notification badges, dropdowns, modals, panel reveals, page transitions, card resizes, hover effects, text reveals, skeleton loaders, shimmer text, sliding tabs, tooltips, accordions, toasts.
---

# Transitions.dev — Local Reference

Thirty-two portable CSS transitions, each namespaced under `t-*` selectors with semantic CSS custom properties. Pure CSS, no framework dependencies. Every snippet ships a `prefers-reduced-motion` guard.

## Motion tokens (to add to global.css)

### Durations
- `--duration-stagger`: 40ms (per-item stagger offset)
- `--duration-micro`: 80ms (tooltip/path delay, shake segment)
- `--duration-quick`: 150ms (modal/dropdown close, text swap, tooltip appear)
- `--duration-fast`: 250ms (icon swap, dropdown/modal open, tabs sliding, page slide)
- `--duration-medium`: 350ms (panel close, toast close)
- `--duration-slow`: 400ms (panel open, skeleton content reveal, input clear)
- `--duration-very-slow`: 500ms (emphasis moments, badge appear, text reveal, success check)

### Easings
- `--ease-smooth-out`: cubic-bezier(0.22, 1, 0.36, 1) (modal/dropdown/panel open+close, page slide, resize)
- `--ease-in-out`: ease-in-out (icon swap, text swap, text reveal, skeleton reveal)
- `--ease-out`: ease-out (tooltip open/close)
- `--ease-linear`: linear (shimmer, skeleton pulse, spinner)
- `--ease-bounce`: cubic-bezier(0.34, 1.36, 0.64, 1) (badge pop open)
- `--ease-bounce-strong`: cubic-bezier(0.34, 3.85, 0.64, 1) (bouncy hover-out)

### Distances
- `--distance-micro`: 4px
- `--distance-small`: 6px
- `--distance-base`: 8px
- `--distance-medium`: 12px
- `--distance-large`: 30px

### Scales
- `--scale-large`: 0.96 (modal open/close)
- `--scale-medium`: 0.97 (dropdown open)
- `--scale-small`: 0.98 (tooltip open)

### Blur
- `--blur-small`: 2px
- `--blur-medium`: 3px
- `--blur-large`: 8px

## Key transitions for SahlaMaroc
- **texts-reveal**: Staggered blurred rise for stacked text lines (hero copy, section headings)
- **card-hover-tilt**: Tilt a card in 3D toward the pointer with cursor-tracked glare
- **shimmer-text**: Sweep a highlight band across text on a loop (loading states)
- **skeleton-reveal**: Pulse placeholder, cross-fade to loaded content
- **tabs-sliding**: Slide the active pill between tabs
- **accordion**: Grow/shrink panel via grid-rows with chevron flip
- **tooltip**: Delayed fade+scale in, instant out (pure CSS)
- **card-resize**: Tween a container's dimensions on state change
