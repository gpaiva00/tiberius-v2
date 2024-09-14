import { useState } from 'react'

interface UseFiniteStateMachineProps<T extends string> {
  currentState: T
  goToState: (newState: T) => void
}

/**
 * Hook responsible to manage all finite states, giving access to only one of them
 * @param {String[]} possibleStates
 * @param {Object} { initialState }
 */
function useFiniteStateMachine<T extends string>(
  possibleStates: T[],
  { initialState }: { initialState?: T } = {}
): UseFiniteStateMachineProps<T> {
  const [currentState, setCurrentState] = useState<T>(() => {
    if (initialState && !possibleStates.includes(initialState))
      throw new Error(`Unknown state for the initial value: "${initialState}".`)

    return initialState ?? possibleStates[0]
  })

  function goToState(newState: T) {
    if (possibleStates.includes(newState)) return setCurrentState(newState)

    throw new Error(`Invalid state "${newState}" for the finite state machine.`)
  }

  return { currentState, goToState }
}

export { useFiniteStateMachine }
