---
name: gsap-core
description: GSAP animation skill — gsap.to(), from(), fromTo(), easing, stagger, gsap.matchMedia() for responsive and prefers-reduced-motion. Use for JavaScript animations, scroll-triggered effects, entrance animations.
---

# GSAP Core — Local Reference

## Core Methods
- gsap.to(targets, vars) — animate to vars
- gsap.from(targets, vars) — animate FROM vars to current
- gsap.fromTo(targets, fromVars, toVars) — explicit start/end
- gsap.set(targets, vars) — instant (duration 0)

## Key vars
- duration (seconds, default 0.5), delay, ease
- stagger: number or {amount, from: "center"|"random"|"edges"}
- repeat (-1 for infinite), yoyo
- autoAlpha (prefer over opacity — sets visibility:hidden at 0)

## Transform aliases (use these, not raw transform)
- x, y, z (px), xPercent, yPercent (%)
- scale, scaleX, scaleY, rotation, rotationX, rotationY
- skewX, skewY, transformOrigin

## Easing
- "power1.out" (default), "power3.inOut", "back.out(1.7)"
- "elastic.out(1, 0.3)", "bounce.out", "none"

## gsap.matchMedia() — Responsive + Accessibility
```js
let mm = gsap.matchMedia();
mm.add({
  isDesktop: "(min-width: 800px)",
  isMobile: "(max-width: 799px)",
  reduceMotion: "(prefers-reduced-motion: reduce)"
}, (context) => {
  const { isDesktop, reduceMotion } = context.conditions;
  gsap.to(".box", {
    rotation: isDesktop ? 360 : 180,
    duration: reduceMotion ? 0 : 2
  });
});
```

## Best Practices
- Use camelCase properties
- Prefer transform aliases over raw transform string
- Use autoAlpha for fade in/out
- Use gsap.matchMedia() for prefers-reduced-motion
- Store tween references for playback control
- Don't animate layout properties (width/height/top/left) when transforms work
