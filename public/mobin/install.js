// iOS can save the document URL itself as a Home Screen shortcut.
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true) {
  window.location.replace('/mobin')
}
