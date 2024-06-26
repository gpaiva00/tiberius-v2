import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { configsAtom, ConfigsProps } from '@/shared/stores'

function useDropdownMenu() {
  const [configs, setConfigs] = useAtom(configsAtom)

  const matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)')

  matchMediaDark.addEventListener('change', applyApperance)

  function handleChangeApperance(value: string) {
    setConfigs((prev) => ({
      ...prev,
      apperance: value as ConfigsProps['apperance'],
    }))
  }

  function applyApperance() {
    if (configs.apperance === 'dark' || (configs.apperance === 'auto' && matchMediaDark.matches)) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  useEffect(() => {
    applyApperance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configs])

  return {
    configs,
    setConfigs,
    handleChangeApperance,
  }
}

export { useDropdownMenu }
