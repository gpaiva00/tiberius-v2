function Help() {
  return (
    <div className="flex w-full flex-1 flex-col gap-4 md:max-w-[600px]">
      <h3 className="text-2xl font-semibold leading-none tracking-tight dark:text-zinc-400 md:text-3xl">Ajuda</h3>
      <p className="-mt-2 text-lg text-zinc-500 md:text-base">Saiba como tirar o máximo de proveito do Tiberius</p>

      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold uppercase leading-none tracking-tight dark:text-zinc-400 md:text-xl">
          Como funciona?
        </h3>
        <ul className="list-inside list-disc space-y-4 text-lg dark:text-zinc-400">
          <li>
            <b>Limite de tarefas:</b> você pode criar até 5 tarefas no Tiberius. Por que? Dessa forma, evitamos a
            sobrecarga cognitiva, tornando o processo de gerenciamento de tarefas mais controlável e eficiente. Isso
            ajuda na produtividade, pois somos incentivados a concentrar nossos esforços em um conjunto limitado de
            atividades, em vez de desperdiçá-los no{' '}
            <a
              href="https://www.phind.com/search?cache=ngqsl8aja4rj1c6bhv5kwr06"
              className="italic underline"
            >
              multitasking
            </a>
            .
          </li>
          <li>
            <b>Limite de caracteres:</b> seguindo o{' '}
            <a
              href="https://www.phind.com/search?cache=hvqat33z89kdr17ov89pm4cy"
              className="underline"
            >
              princípio da concisão
            </a>
            , limitamos as tarefas em 250 caracteres. Essa técnica incentiva a clareza e objetividade na expressão das
            ideias, tornando as tarefas mais claras e diretas.
          </li>
          <li>
            <b>Posso renomear a lista padrão?</b> Sim, basta clicar no nome da lista padrão ("Tarefas") e digitar um
            nome que melhor se encaixe nos seus objetivos.
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
