//加载_global.js，此js可用于自定义全局变量，以及复写require方法。
load(__BASE__ + '_global.js');
/*
 * 入口JS 如果需要查阅语法，请参照 http://lzw.me/pages/ecmascript/
 */

function exec(task) {
	require('crawl/basic').exec(task);
}
print('main.js');