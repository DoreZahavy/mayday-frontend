export { clickOutside, icon, focusDirective }
import { svgService } from './services/svg.service.js'


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
    mounted(el, { value: cb }) {//{ value: cb }
        el.clickOutside = (ev) => {
            if (!el.contains(ev.target)) {
                // binding.value//
                cb()
                // console.log('cb:', cb)
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

