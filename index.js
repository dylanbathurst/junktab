const { clipboard } = require('electron')

let cbText;
const pane = document.getElementById('styled')
pane.addEventListener('input', saveState)
grabAndAppendText()
window.onfocus = () => {
  grabAndAppendText()
}
window.onload = () => {
  grabAndAppendText()
}

function grabAndAppendText() {
  let newpane = pane;
  const text = window.localStorage.getItem('text')
  const lastChar = text[text.length - 1] === '\n'
  if (text && lastChar) {
    newpane.innerText = `${text}`
  } else if (text) {
    newpane.innerText = `${text}
`
  }
  if (cbText !== undefined) {
    newpane.innerText = `${text}
    ${cbText}
    `
    newpane.dispatchEvent(new Event('input'))
    clipboard.clear()
  }
  newpane.focus()
  document.execCommand('selectAll', false, null);
  document.getSelection().collapseToEnd();
}

function saveState(e) {
  window.localStorage.setItem('text', e.target.innerText)
}
