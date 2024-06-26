/* eslint-disable no-empty */
import { useAtom } from 'jotai'
import { useEffect } from 'react'

import { useToast } from '@/shared/components/ui/use-toast'

import { configsAtom, ConfigsProps } from '@/shared/stores'

function useDropdownMenu() {
  const [configs, setConfigs] = useAtom(configsAtom)

  const matchMediaDark = window.matchMedia('(prefers-color-scheme: dark)')

  const { toast } = useToast()

  matchMediaDark.addEventListener('change', applyApperance)

  useEffect(() => {
    applyApperance()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [configs])

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

  async function handleShareTiberius() {
    const linkToCopy = 'https://mytiberius.vercel.app'

    try {
      if (!navigator.clipboard && window.isSecureContext) return

      await navigator.clipboard.writeText(linkToCopy)

      toast({
        title: 'Link copiado ' + '👍',
        description: 'Agora é só compartilhar com seus amigos!',
      })
    } catch (error) {
      console.error(error)

      toast({
        title: 'Ops, houve um erro ' + '😭',
        description: 'Tente copiar o link da barra de navegação',
      })
    }
  }

  return {
    configs,
    setConfigs,
    handleChangeApperance,
    handleShareTiberius,
  }
}

export { useDropdownMenu }
