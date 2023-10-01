type Transitions = {
  [name: string]: { transform: string }
}

export const transitions: Transitions = {
  ['fade-left']: { transform: 'translate(-100%, 0)' },
  ['fade-right']: { transform: 'translate(100%, 0)' },
  ['fade-up']: { transform: 'translate(0, -100%)' },
  ['fade-down']: { transform: 'translate(0, 100%)' },
  default: { transform: 'transform(-100%, 0)' }
}
