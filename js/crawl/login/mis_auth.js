exports.cookiePool = {};
exports.Header = org.apache.http.Header;
exports.HttpResponse = org.apache.http.HttpResponse;
exports.ClientProtocolException = org.apache.http.client.ClientProtocolException;
exports.HttpClient = org.apache.http.client.HttpClient;
exports.HttpPost = org.apache.http.client.methods.HttpPost;
exports.DefaultHttpClient = org.apache.http.impl.client.DefaultHttpClient;
exports.StringEntity = org.apache.http.entity.StringEntity;
// 登录
exports.auth = function(task) {
	var authUrl = 'http://mis.pyc.com.cn/login.aspx?ReturnUrl=%2f';
	// 获取页面
	var authHtml = require('http').get(authUrl);
	var viewstatePattern = /<input.*?id="__VIEWSTATE".*?value="(.*?)".*?\/>/;
	if (viewstatePattern.test(authHtml)) {
		var _viewstate = RegExp.$1;
	}
	var _eventPattern = /<input.*?id="__EVENTVALIDATION".*?value="(.*?)".*?\/>/;
	if (_eventPattern.test(authHtml)) {
		var _event = RegExp.$1;
	}
	var postBody = '__VIEWSTATE=' + _viewstate + '&__EVENTVALIDATION=' + _event
			+ '&' + 'txtName=' + task.user + '&txtPwd=' + task.pass
			+ '&btnLogin=%E7%99%BB+%E5%BD%95';
	postBody = '__VIEWSTATE=%2FwEPDwUJNjUwNzE0MTM4ZGRq%2FuXaVF47TNHr5WWnDm%2F6haaRp0gOdDNIQoZp%2FJkyIA%3D%3D&__EVENTVALIDATION=%2FwEWBQLc1Oq3DgLEhISFCwKd%2B7qdDgKC3IeGDAK7q7GGCL0B2uWAzgYaqwKD%2F9eVKMfwK6lpSiVQr9EOO89rWz0w&txtName=zhangnan1&txtPwd=radiance&btnLogin=%E7%99%BB+%E5%BD%95';
	var request = new this.HttpPost(authUrl);
	request.setHeader('Content-Type', 'application/x-www-form-urlencoded')
	request.setEntity(new this.StringEntity(postBody, 'utf-8'));
	var client = new this.DefaultHttpClient();
	var response = client.execute(request);
	var header = response.getLastHeader('Set-Cookie');
	if (header != null) {
		var outputValue = header.getValue();
		this.cookiePool[task.nickId] = [
				java.lang.System.currentTimeMillis() + (1000 * 60 * 15),
				outputValue ];
		print(task.user + ':登录成功');
	} else {
		var num = parseInt(task.loginFailureNumber + 1);
		task.setLoginFailureNumber(num);
		throw new Error('没有登录成功');
	}
}
exports.getCookie = function(task) {
	var tmp = this.cookiePool[task.nickId];
	if (null == tmp || tmp[0] < java.lang.System.currentTimeMillis()) {
		this.auth(task)
	}
	return this.cookiePool[task.nickId][1];
}