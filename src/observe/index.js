import { isObject, def } from '../utils/index'
import { arrayMethods } from './array'
// 使用Object.defineProperty() 重新定义

// 用来观测数据
export class Observe {
	constructor(data) {
		this.data = data
		// 给监听过的数组添加 实例方法和属性
		// 直接挂在的话会造成死循环
		// data.__ob__ = this
		
		def(data, '__ob__', this)

    if(Array.isArray(data)) {
      // 如果是数组的话，不要对索引进行观测，因为会有性能损耗
      // 而且一般前端开发中很少直接操作索引。 基本使用push pop shift unshift ...
			// 对原生的数组方法进行重写
			data.__proto__ = arrayMethods

      // 如果数组中放的是对象的话在进行拦截
      this.observeArray(data)
    } else {
      // 对对象进行拦截
      this.walk(data)
    }
		
	}
	walk(data) {
		let keys = Object.keys(data)
		keys.forEach((key) => {
			// 给每个属性添加劫持操作
			defineReactive(data, key, data[key])
		})
  }
  
  observeArray(data) {
    data.forEach(item => {
      observe(item)
    })
  }
}

// 数据劫持，收集响应
function defineReactive(data, key, value) {
	// 如果value也是一个对象的话，递归实现深度监测
	// 多层object 会造成性能损耗
	observe(value)

	Object.defineProperty(data, key, {
		get() {
			return value
		},
		set(newValue) {
			if (newValue === value) return
			value = newValue
			// 可能用户设置的还是个对象，需要对新设置的值进行监测(劫持)
			observe(value)
		},
	})
}

export function observe(data) {
	let ob
	if (!isObject(data)) {
		return
	} else {
		ob = new Observe(data)
	}

	return ob
}
