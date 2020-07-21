import { observe } from '../observe/index'

export function initState(vm) {
	const opts = vm.$options
	// vue 的数据来源： 属性、方法、数据、计算属性、watch
	if (opts.props) {
		initProps(vm)
	}

	if (opts.methods) {
		initMethods(vm)
	}

	if (opts.data) {
		initData(vm)
	}

	if (opts.computed) {
		initComputed(vm)
	}

	if (opts.watch) {
		initWatch(vm)
	}
}

function initProps() {}
function initMethods() {}
function initData(vm) {
	let data = vm.$options.data
	// data最终得到的是个object
	data = vm._data = typeof data === 'function' ? data.call(vm) : data || {}

	// 获取到数据并对数据进行劫持
	// 添加响应，Object.defineProperty() 给属性添加get set方法
	observe(data)
}
function initComputed() {}
function initWatch() {}
