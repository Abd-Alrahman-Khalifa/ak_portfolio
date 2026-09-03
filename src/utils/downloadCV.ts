import { profile } from '../data/profile'

/**
 * Triggers a real "Save As" download of the CV instead of navigating to it
 * or opening a new tab (which is what `window.open` / a plain link does for
 * PDFs in most browsers — they preview it instead of downloading it).
 */
export function downloadCV() {
  const link = document.createElement('a')
  link.href = profile.cvPath
  link.download = 'AbdAlrahman-Khalifa-CV.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
