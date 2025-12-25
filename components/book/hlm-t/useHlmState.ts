import { useState } from '#app'

export const useHlmState = () => {
  const mode = useState<'prosperity' | 'decline'>('hlm-mode', () => 'prosperity')

  const toggleMode = () => {
    mode.value = mode.value === 'prosperity' ? 'decline' : 'prosperity'
  }

  return {
    mode,
    toggleMode
  }
}
