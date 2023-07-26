import { svgService } from './services/svg.service.js'

export { clickOutside, icon, focusDirective }

const focusDirective = {
    // When the bound element is inserted into the DOM...
    mounted(el) {
        console.log('Hi', el)
        el.focus()
    }
}


const icon = {
    mounted: (el, binding) => {
        const icon = svgService.getSvg(binding.value)
        el.innerHTML = icon
    },
    updated: (el, binding) => {
        const icon = svgService.getSvg(binding.value)
        el.innerHTML = icon
    },
}

const clickOutside = {
    mounted(el, { value: cb }) {
        el.clickOutside = (ev) => {
            if (!el.contains(ev.target)) {
                cb()
            }
        }
        setTimeout(() => {
            document.addEventListener('click', el.clickOutside)
        }, 0)
    },
    unmounted(el) {
        document.removeEventListener('click', el.clickOutside)
    },
}

