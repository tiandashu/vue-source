import { initState } from './state'
import { compileToFunction } from './compiler'
function initMixin(Vue) {
	// 初始化流程
	Vue.prototype._init = function (options) {
		const vm = this
		vm.$options = options

		// 初始化状态
		initState(vm)

		// 挂载
		if(vm.$options.el) {
			vm.$mount(vm.$options.el)
		}
	}

	Vue.prototype.$mount = function(el) {
		const vm = this;
		const options = vm.$options
		el = document.querySelector(el)

		// render template el 的渲染顺序
		if(!options.render) {
			// 对模板进行编译
			let tempalte = options.tempalte

			// 对el进行编译
			if(!tempalte && el) {
				tempalte = el.outerHTML
			}
			
			const render = compileToFunction(tempalte)

			// ？
			options.render = render
		}
	}
}

export { initMixin }
