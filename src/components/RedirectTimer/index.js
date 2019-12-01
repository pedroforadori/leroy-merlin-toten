import { useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'

export default function RedirectTimer() {
  let history = useHistory()

  let timer

  const redirectHome = useCallback(() => history.push('/home'), [history])

  const startTimeout = useCallback(() => {
    clearTimeout(timer)
    // console.log('timeout started')
    timer = setTimeout(redirectHome, 1 * 60 * 1000)
  }, [redirectHome])

  useEffect(() => {
    startTimeout()
  }, [startTimeout])

  useEffect(() => {
    document.addEventListener('click', startTimeout)
    document.addEventListener('scroll', startTimeout)
    document.addEventListener('change', startTimeout)
    document.addEventListener('keypress', startTimeout)
    document.addEventListener('touchstart', startTimeout)
    // console.log('addEventListener startTimeout')

    return () => {
      document.removeEventListener('click', startTimeout)
      document.removeEventListener('scroll', startTimeout)
      document.removeEventListener('change', startTimeout)
      document.removeEventListener('keypress', startTimeout)
      document.removeEventListener('touchstart', startTimeout)
      clearTimeout(timer)
      // console.log('removeEventListener startTimeout')
    }
  }, [startTimeout, timer])

  return null
}
