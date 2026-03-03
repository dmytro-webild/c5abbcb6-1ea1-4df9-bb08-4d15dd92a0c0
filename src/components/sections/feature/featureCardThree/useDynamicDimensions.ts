import { useEffect, useCallback, useMemo } from 'react'

let cachedVw15: number | null = null
let lastWindowWidth = 0

const getVw15InPixels = (): number => {
  const currentWidth = window.innerWidth
  if (cachedVw15 !== null && lastWindowWidth === currentWidth) {
    return cachedVw15
  }

  const temp = document.createElement('div')
  temp.style.position = 'absolute'
  temp.style.width = 'var(--vw-1_5)'
  document.body.appendChild(temp)
  const width = temp.getBoundingClientRect().width
  document.body.removeChild(temp)

  cachedVw15 = width || 0
  lastWindowWidth = currentWidth
  return cachedVw15
}


const debounce = <T extends (...args: unknown[]) => void>(func: T, wait: number): ((...args: Parameters<T>) => void) & { cancel: () => void } => {
  let timeout: NodeJS.Timeout | null = null

  const debouncedFunction = function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      func(...args)
    }
    if (timeout !== null) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }

  debouncedFunction.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return debouncedFunction
}

interface DynamicDimensionsOptions {
  titleSelector?: string
  descriptionSelector?: string
  containerSelector?: string | null
}

type RefArray = React.RefObject<(HTMLDivElement | null)[]> | React.RefObject<(HTMLDivElement | null)[]>[]

export const useDynamicDimensions = (refs: RefArray, options: DynamicDimensionsOptions = {}) => {
  const {
    titleSelector = '.feature-card-three-title',
    descriptionSelector = '.feature-card-three-description',
    containerSelector = null
  } = options

  const calculateDimensions = useCallback(() => {
    const processRef = (ref: HTMLElement | null) => {
      if (!ref) return

      const container = containerSelector ? ref.querySelector(containerSelector) as HTMLElement : ref
      if (!container) return

      const titleElement = container.querySelector(titleSelector) as HTMLElement
      const descriptionElement = container.querySelector(descriptionSelector) as HTMLElement

      if (titleElement && descriptionElement) {
        const titleHeight = titleElement.offsetHeight
        const descriptionHeight = descriptionElement.offsetHeight

        const contentTop = `calc(100% - ${titleHeight}px - calc(var(--vw-1_5) * 1.5))`

        const vw15 = getVw15InPixels()

        const contentWrapperHeight = titleHeight + descriptionHeight

        const revealBgHeight = contentWrapperHeight + (vw15 * 2)

        const moveUp = descriptionHeight + (vw15 * 0.55)

        ref.style.setProperty('--reveal-bg-height', `${revealBgHeight}px`)
        ref.style.setProperty('--content-top-position', contentTop)
        ref.style.setProperty('--hover-translate-y', `-${moveUp}px`)
      }
    }

    if (Array.isArray(refs)) {
      refs.forEach((refArray) => {
        if (refArray?.current && Array.isArray(refArray.current)) {
          refArray.current.forEach(processRef)
        }
      })
    } else if ('current' in refs && refs.current) {
      if (Array.isArray(refs.current)) {
        refs.current.forEach(processRef)
      } else {
        processRef(refs.current)
      }
    }
  }, [titleSelector, descriptionSelector, containerSelector, refs])

  const debouncedCalculate = useMemo(
    () => debounce(calculateDimensions, 250),
    [calculateDimensions]
  )

  useEffect(() => {
    calculateDimensions()
    window.addEventListener('resize', debouncedCalculate)
    return () => {
      window.removeEventListener('resize', debouncedCalculate)
      debouncedCalculate.cancel()
    }
  }, [calculateDimensions, debouncedCalculate])
}
