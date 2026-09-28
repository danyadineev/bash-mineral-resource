import { useLayoutEffect } from 'react'
import { installPageMotion } from '../lib/pageMotion'
import './PageMotion.css'

export function usePageMotion(page: string) {
  useLayoutEffect(() => {
    const root = document.getElementById('root')
    if (root) return installPageMotion(root)
  }, [page])
}
