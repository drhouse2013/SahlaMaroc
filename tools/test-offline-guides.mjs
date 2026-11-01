import test from 'node:test';
import assert from 'node:assert/strict';
import { serialize } from '../src/utils/offlineGuides.ts';

// DOM-shaped fixtures isolate the serialization boundary from networking and rendering.
const text = value => ({ nodeType: 3, textContent: value });
const element = (tag, attrs = {}, children = []) => ({ nodeType: 1, tagName: tag.toUpperCase(), id: attrs.id ?? '', childNodes: children, getAttribute: name => attrs[name] ?? null, hasAttribute: name => Object.hasOwn(attrs, name) });
const render = node => serialize(node, new URL('https://sahla-maroc.vercel.app/fr/guide'), 'page-2-');

test('offline text escapes markup and drops active elements and attributes', () => {
  const html = render(element('section', { onclick: 'alert(1)', style: 'background:url(https://bad.example)' }, [text('<script>literal</script> & café'), element('script', {}, [text('active-payload')]), element('iframe', { src: 'https://bad.example' }), element('img', { src: 'https://bad.example', onerror: 'alert(1)' })]));
  assert.match(html, /&lt;script&gt;literal&lt;\/script&gt; &amp; café/);
  assert.doesNotMatch(html, /active-payload|onclick|onerror|style=|src=|<script|<iframe|<img/);
});

test('offline links allow web URLs but do not keep executable schemes', () => {
  assert.equal(render(element('a', { href: 'javascript:alert(1)' }, [text('unsafe')])), '<a>unsafe</a>');
  assert.equal(render(element('a', { href: 'data:text/html,anything' }, [text('unsafe')])), '<a>unsafe</a>');
  assert.match(render(element('a', { href: '/fr/villes/fes', target: '_blank' }, [text('Fès')])), /href="https:\/\/sahla-maroc.vercel.app\/fr\/villes\/fes" rel="noreferrer"/);
});

test('offline sections keep namespaced anchors, open disclosures and tables', () => {
  const html = render(element('div', {}, [element('h2', { id: 'budget' }, [text('Budget')]), element('a', { href: '#budget' }, [text('Go')]), element('details', {}, [element('summary', {}, [text('FAQ')]), element('p', {}, [text('Answer')])]), element('td', { colspan: '2', rowspan: '2" onclick="bad' }, [text('Cell')])]));
  assert.match(html, /id="page-2-budget"/);
  assert.match(html, /href="#page-2-budget"/);
  assert.match(html, /<details open>/);
  assert.match(html, /<td colspan="2">Cell<\/td>/);
});
