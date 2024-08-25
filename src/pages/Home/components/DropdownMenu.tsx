import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenu as OriginalDropdownMenu,
} from '@/shared/components/ui/dropdown-menu'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/shared/components/ui/hover-card'
import { Label } from '@/shared/components/ui/label'
import { Switch } from '@/shared/components/ui/switch'
import { useDropdownMenu } from '../hooks'

import { ArrowUpDown, EyeOff, Info, Menu, Monitor, Moon, Share, Sun } from 'lucide-react'

function DropdownMenu() {
  const { configs, setConfigs, handleChangeApperance, handleShareTiberius } = useDropdownMenu()

  return (
    <OriginalDropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="secondary"
          // size="default"
        >
          <Menu className="mr-2 h-4 w-4" /> Menu
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72">
        <DropdownMenuLabel>Tarefas</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="justify-between">
            <Label
              htmlFor="reorder"
              className="flex items-center gap-1 font-normal capitalize"
            >
              <ArrowUpDown className="mr-2 h-4 w-4" />
              Auto Reordenar
              <HoverCard>
                <HoverCardTrigger>
                  <Info className="h-3 w-3" />
                </HoverCardTrigger>
                <HoverCardContent className="ml-2 font-normal normal-case">
                  As tarefas vazias vão para baixo automaticamente, mantendo sua lista sempre organizada.
                </HoverCardContent>
              </HoverCard>
            </Label>
            <Switch
              id="reorder"
              checked={configs.autoReorder}
              onCheckedChange={() =>
                setConfigs((prev) => ({
                  ...prev,
                  autoReorder: !configs.autoReorder,
                }))
              }
            />
          </DropdownMenuItem>
          <DropdownMenuItem className="justify-between">
            <Label
              htmlFor="hide-suggestions"
              className="flex items-center gap-1 font-normal capitalize"
            >
              <EyeOff className="mr-2 h-4 w-4" />
              Ocultar sugestões
            </Label>
            <Switch
              id="hide-suggestions"
              checked={configs.hideSuggestions}
              onCheckedChange={() =>
                setConfigs((prev) => ({
                  ...prev,
                  hideSuggestions: !configs.hideSuggestions,
                }))
              }
            />
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Aparência</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={configs.apperance}
          onValueChange={handleChangeApperance}
        >
          <DropdownMenuRadioItem value="dark">
            <Moon className="mr-2 h-4 w-4" />
            Escura
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="light">
            <Sun className="mr-2 h-4 w-4" />
            Clara
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="auto">
            <Monitor className="mr-2 h-4 w-4" />
            Automático
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleShareTiberius}>
          <Share className="mr-2 h-4 w-4" />
          Compartilhar o Tiberius
        </DropdownMenuItem>
      </DropdownMenuContent>
    </OriginalDropdownMenu>
  )
}

export { DropdownMenu }
