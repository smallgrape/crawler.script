/**
 * 添加一个路径， 此方法使用的原因是需要调用Java类的时候，由此方法进行Jar包的动态引入。 使得部署时不再需要将所有可能的Jar包都打包进程序。
 */
exports.addPath = function(url) {
	// 获取ClassLoader的加载方法
	var methods = new java.net.URLClassLoader([ java.net
			.URL('http://localhost/') ]).getClass().getDeclaredMethods();

	var addURL;
	for (var i = 0; i < methods.length; i++) {
		var m = methods[i];
		if ('addURL' == m.getName()) {
			addURL = m;
		}
	}
	addURL.setAccessible(true);
	// 通过方法反射加载Jar包
	addURL.invoke(java.lang.ClassLoader.getSystemClassLoader(),
			new java.io.File(url).toURL());
	print('addJar:' + url)
}