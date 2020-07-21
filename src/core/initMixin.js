import { initState } from './state'

function initMixin(Vue) {
	// 初始化流程
	Vue.prototype._init = function (options) {
		const vm = this
		vm.$options = options

		// 初始化状态
		initState(vm)
	}
}

export { initMixin }
