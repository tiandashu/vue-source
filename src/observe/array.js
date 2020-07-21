let oldArrayMethods = Array.prototype

export const arrayMethods = Object.create(oldArrayMethods)

// 重写了会引起数组本身变化的api
const methods = ['push', 'pop', 'shift', 'unshift', 'sort', 'reverse', 'splie']

methods.forEach((method) => {
	arrayMethods[method] = function (...args) {
		let result = oldArrayMethods[method].apply(this, args)
		// push unshift 添加的可能还是一个数组对象，需要对新添加的对象继续拦截
		let inserted
		switch (method) {
			case 'push':
			case 'unshift':
				inserted = args
				break
			case 'splice':
				inserted = args.slice(2)
				break
			default:
				break
		}
		// 对新增的对象进行拦截
		let ob = this.__ob__
		if(inserted) {
			ob.observeArray(inserted)
		}
		return result
	}
})


