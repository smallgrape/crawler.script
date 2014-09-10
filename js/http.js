exports.Header = org.apache.http.Header;
exports.HttpResponse = org.apache.http.HttpResponse;
exports.ClientProtocolException = org.apache.http.client.ClientProtocolException;
exports.HttpClient = org.apache.http.client.HttpClient;
exports.HttpPost = org.apache.http.client.methods.HttpPost;
exports.DefaultHttpClient = org.apache.http.impl.client.DefaultHttpClient;
exports.StringEntity = org.apache.http.entity.StringEntity;

/**
 * 进行一次get请求，最简实现。
 */
exports.get = function(url) {
	return org.apache.commons.io.IOUtils.toString(new java.net.URL(url));
}
/**
 * 获取URL的Host
 */
exports.getHost = function(url) {
	var regex = /http:\/\/([^\/]+)/;
	if (regex.test(url)) {
		return RegExp.$1;
	}
}
/**
 * 用于post请求，通常用于登录
 */
exports.post = function(url, postString) {
	var client = new this.DefaultHttpClient();
	var request = new this.HttpPost(url);
	var entity = new this.StringEntity(postString);
	request.setEntity(entity);
	
	var response = client.execute(request);
	var headers = response.getAllHeaders();
	var tmp = {};
	for (var i = 0; i < headers.length; i++) {
		var h = headers[i];
		tmp[h.getName()] = h.getValue();
	}
	try {
		return {
			'data' : org.apache.http.util.EntityUtils.toString(response.entity),
			'httpCode' : response.getStatusLine().getStatusCode(),
			'headers' : tmp
		};
		postString();
	} finally {
		org.apache.http.client.utils.HttpClientUtils.closeQuietly(response);
	}

}