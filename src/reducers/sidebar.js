
const DRAWER = 'DRAWER'

function drawerCha (value) {
    return {
        type: DRAWER,
        value
    }
}

export function drawerChange (value) {
    return {
        type: DRAWER,
        value
    }
}

export default function sidebar (state=null, action) {
    switch(action.type) {
        case DRAWER :
            console.log('reducer', state, action.value.val)
            return action.value.val
        default :
            return state
    }
}