import { createStore } from 'vuex'
import state from './module/state'
import getters from './module/getters'
import mutations from './module/mutations'
import actions from './module/actions'

export default createStore({
    strict: true,
    modules: {
        state,
        getters,
        mutations,
        actions,
    },
})
