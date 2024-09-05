function About() {
  return (
    <div className="flex w-full flex-col gap-4 md:max-w-[600px]">
      <h3 className="text-2xl font-semibold leading-none tracking-tight dark:text-zinc-400 md:text-3xl">
        Sobre o Tiberius
      </h3>

      <p className="text-lg leading-relaxed dark:text-zinc-400">
        O Tiberius nasceu com um propósito: <i>diminuir a ansiedade por ter muitas tarefas.</i>
        <br />
        Ter uma vida produtiva não significa ter uma lista enorme de coisas para fazer e trabalhar em 10 coisas de uma
        vez.{' '}
        <b>
          Produtividade tem a ver com definir tarefas e encontrar maneiras de realizá-las de forma eficaz e eficiente.
        </b>
        <br />
        Sendo assim, comecei a trabalhar num projeto que me ajudasse a começar uma tarefa e, mais importante,
        concluí-la. Me chamo Gabriel Paiva e quero te ajudar a ter uma vida mais produtiva com o Tiberius.
        <br />
        <br />
        <q className="text-lg italic text-zinc-900 dark:text-zinc-400">
          Comece fazendo o que é necessário, então faça o que é possível, e de repente você estará fazendo o impossível.
        </q>
        <small className="text-base text-zinc-500 dark:text-zinc-500"> - Francisco de Assis</small>
        <br />
        <br />
        <q className="text-lg italic text-zinc-900 dark:text-zinc-400">
          Nem sempre precisamos fazer mais, mas sim nos concentrar em menos.
        </q>
        <small className="text-base text-zinc-500 dark:text-zinc-500"> - Nathan W. Morris</small>
      </p>
    </div>
  )
}

export { About }
