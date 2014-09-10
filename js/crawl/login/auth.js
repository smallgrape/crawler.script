/**
 * 登录逻辑入口处
 */
exports.auth = function(task) {
	var cookie;
	var host = require('http').getHost(task.getUrl());
	switch (host) {
	//如果是mis内网
	case 'mis.pyc.com.cn': {
		print('mis_auth');
		//调用mis内网登录逻辑。
		cookie = require('crawl/login/mis_auth').getCookie(task);
		print('cookie-=' + cookie);
	}
	}
	task.cookie = cookie;
}