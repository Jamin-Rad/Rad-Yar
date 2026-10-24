import assert from 'node:assert/strict'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createRequire } from 'node:module'
const { default: InProgressBanner, LessonInProgressGate } = createRequire(import.meta.url)('../components/InProgressBanner.jsx')

for (const lang of ['de', 'en', 'fa']) {
  assert.equal(renderToStaticMarkup(React.createElement(InProgressBanner, { lang })), '')
  const content = React.createElement('main', { lang }, 'Lesson content')
  const expected = renderToStaticMarkup(content)
  assert.equal(renderToStaticMarkup(React.createElement(LessonInProgressGate, null, content)), expected)
  assert.equal(renderToStaticMarkup(React.createElement(LessonInProgressGate, null,
    React.createElement(InProgressBanner, { lang }), content)), expected)
}
assert.equal(renderToStaticMarkup(React.createElement(LessonInProgressGate)), '')
console.log('Lesson notice removal SSR PASS: standalone and layout usage render no banner/modal; lesson children are preserved in DE/EN/FA.')
