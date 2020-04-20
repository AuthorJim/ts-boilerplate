module.exports = [
  // (function() {
  //     // 允许某些包在渲染线程下使用require的形式加载
  //     const IGNORES = ['qiniu']
  //     return function(context, request, callback) {
  //         if (IGNORES.includes(request)) {
  //             return callback(null, `require('${request}')`)
  //         }
  //         return callback()
  //     }
  // })()
];
