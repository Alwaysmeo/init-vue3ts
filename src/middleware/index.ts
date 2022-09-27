import after from './module/after'
import before from './module/before'

export default (router: any) => {
    router.beforeEach(before)
    router.afterEach(after)
}
