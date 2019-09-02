import MarkdownIt from 'markdown-it'
import emoji from 'markdown-it-emoji'
import twemoji from 'twemoji'
import mila from 'markdown-it-link-attributes'

export default class MarkdownRenderer {
  constructor (opts = {}) {
    this.md = new MarkdownIt(opts)
    this.md.use(emoji, {})
    this.md.use(mila, {
      attrs: {
        target: '_blank',
        rel: 'noopener'
      }
    })
    this.md.renderer.rules.emoji = (token, idx) => {
      return twemoji.parse(token[idx].content)
    }
  }

  render (data) {
    return this.md.render(data)
  }
}
