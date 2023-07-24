function on(eventName, listener) {
    const callListener = ({ detail }) => {
        listener(detail)
    }
    window.addEventListener(eventName, callListener)
    // Returning the unsubscribe function:
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }))
}

export const eventBusService = { on, emit }

export function showUserMsg(msg) {
    eventBusService.emit('show-msg', msg)    
}

export function showSuccessMsg(txt) {
    showUserMsg({txt, type: 'success'})
}
export function showErrorMsg(txt) {
    showUserMsg({txt, type: 'error'})
}


// setTimeout(() => {
//     eventBusService.emit('show-msg', { txt: 'Happy Day', type: 'success' })
// }, 5000)


// Cmp A, created:
// const unsubscribeFunc = eventBusService.on('puk', (data)=>{
//     console.log('Puk happened:', data)
// })

// // Cmp A1, created:
// eventBusService.on('puk', (data)=>{
//     console.log('Mee too:', data)
// })

// // Cmp B: emitting
// eventBusService.emit('puk', 7)
// setInterval(()=>{
//     eventBusService.emit('puk', 12)
// }, 1500)


// setTimeout(()=>{
//     unsubscribeFunc()
// }, 5000)