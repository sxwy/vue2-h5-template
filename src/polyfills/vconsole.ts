import VConsole from 'vconsole'

if (/sxwydebug=true/.test(window.location.href)) {
  // eslint-disable-next-line no-new
  new VConsole()
}
