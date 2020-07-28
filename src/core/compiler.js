
// Regular Expressions for parsing tags and attributes
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`
const qnameCapture = `((?:${ncname}\\:)?${ncname})`
const startTagOpen = new RegExp(`^<${qnameCapture}`)
const startTagClose = /^\s*(\/?)>/
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`)
const doctype = /^<!DOCTYPE [^>]+>/i


// #7298: escape - to avoid being passed as HTML comment when inlined in page
const comment = /^<!\--/
const conditionalComment = /^<!\[/

// ast抽象语法树：用对象来描述js语法
// 虚拟dom：用对象来描述真实的dom节点信息
export function compileToFunction(template) {
  console.log(333, template)
  // 将template 模板解析成render() 函数



  return function render() {

  }
}


// 解析的具体规则，先匹配到在删除

// let htmlStr = `
// <div id="app">
//   <p>name</p>
// </div>`

// let htmlParse = {
//   tag: 'div',
//   attrs: [
//     {
//       name: 'id',
//       value: 'app'
//     }
//   ],
//   parent: null,
//   type: 1,
//   children: []
// }

