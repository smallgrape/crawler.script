//var alert = print;

exports.HtmlParserImpl = com.pyc.crawler.htmlparser.impl.HtmlParserImpl;
exports.DocParser = com.pyc.crawler.docparse.DocParser;

// 解析html
exports.parse = function(task) {
	var htmLParser = new this.HtmlParserImpl();
	htmLParser.parser(task, '');
}
/**
 * 解析文档类型
 * 
 * @param task
 *            实体对象
 * @param content
 *            文档内容
 */
exports.docParser = function(task, content) {
	this.DocParser.getInstance().dealDocTask(task, content);
}
/**
 * 总入口,总控制中心
 * 
 * @param task
 *            实体对象
 */
exports.exec = function(task) {
	// 执行登录逻辑
	require('crawl/login/auth').auth(task);
	// 执行Http请求.
	var content = com.pyc.search.crawler.node.script.HttpRequestClient.request(
			task, task.cookie, 'UTF-8');
	// 判断是否是html
	if (task.extension == 'html') {
		// 执行html解析
		this.parse(task);
	} else {
		// 执行文档解析
		this.docParser(task, content);
	}
	// 如果摘要为null，则变更摘要为''
	if (null == task.summary) {
		task.setSummary('');
	}
	//执行翻页逻辑。
	require('crawl/page/next').produceNext(task);

}