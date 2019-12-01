import { useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  let history = useHistory()

  const handleListener = (location, action) => {
    action !== 'POP' && window.scrollTo(0, 0)
  }

  useEffect(() => {
    const unlisten = history.listen(handleListener)
    return () => unlisten()
  }, [history, pathname])

  return null
}
