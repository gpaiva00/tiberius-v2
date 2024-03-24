function Help() {
  return (
    <div className="flex w-full flex-col gap-4 md:max-w-[600px]">
      <h3 className="text-2xl font-semibold leading-none tracking-tight md:text-3xl">Ajuda</h3>
      <p className="-mt-2 text-zinc-500">Saiba como tirar o máximo de proveito do Tiberius</p>

      <div className="flex flex-col gap-2">
        <h3 className="text-base font-semibold leading-none tracking-tight md:text-xl">Como funciona?</h3>
        <ul className="list-inside list-disc space-y-4 md:text-lg">
          <li>
            Você pode escrever suas tarefas nos 5 campos de textos disponíveis. Cada vez que você conclui uma tarefa,
            este campo é limpo e então disponível para incluir uma nova tarefa.
          </li>
          <li>
            Suas tarefas são armazenadas localmente em seu navegador. Então se você fechar a aba do Tiberius, não
            perderá suas tarefas.
          </li>
          <li>
            Você pode mover suas tarefas entre as 5 posições disponíveis para melhor se adequar às suas prioridades.
          </li>
        </ul>
      </div>
    </div>
  )
}

export { Help }
