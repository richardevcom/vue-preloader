import type { PropType } from 'vue'

type DefinedProps = {
  [key: string]: {
    type: PropType<Boolean | Number | String>
    default: boolean | number | string
  }
}

/**
 * Predefined properties
 */
const definedProps: DefinedProps = {
  overflow: {
    type: Boolean as PropType<boolean>,
    default: true
  },
  // Speed for linear interpolation between % values
  speed: {
    type: Number as PropType<number>,
    default: 1
  },
  theme: {
    type: String as PropType<string>,
    default: ''
  }
}

export default definedProps
