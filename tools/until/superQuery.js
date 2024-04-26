
/*
* 超级查询方法， 支持查询所属数据的上一个兄弟、下一个兄弟、父级
* keyName : 所要查询所属数据的那个的属性， 默认为查询ID
* obj 为对象类型。
* obj ： {
* 	dataSouce : 所有数据, 必填   数组类型
* 	queryData : 要查询的数据  必填	数组类型
*
* 例 ： superQuery({
* 			dataSource : [{ID:123,name:小明},{ ID:234,name:小红}],
* 			queryData : [{ID:123,name:小明}]
* 		},'ID')
* }


支持查询数据的上一个兄弟，下一个兄弟以及父级。支持树形结构的数据查询。有需要可以直接使用。

这个算法优点是大大减少了查询次数。比如总共为10条数据。[1,2.......10]

例如：查询[ 1,3 , 5]这三条。计算次数是5。       查[1,2,3]计算3次
例如：查询[ 1 , 8 , 5 ]  计算次数是15次。 

所以顺序选择数据会计算的更快，树形数据也是如此


* */
function superQuery(obj, keyName = 'ID') {
	const dataSource = JSON.parse(JSON.stringify(obj.dataSource));
	const queryData = JSON.parse(JSON.stringify(obj.queryData));
	let results = []; //查询结果
	const getSelects = (data) => {

		const currentQuery = queryData[0]; //当前要查询的数据
		if (currentQuery && data && data.current && data.current[keyName] === currentQuery[keyName]) {
			queryData.shift()
			results.push(data);

			//如果已经查询完毕，则无需继续往下查了
			if (!queryData.length) {
				return;
			}
		}

		const childs = data.children || [];
		let i = 0;
		let prevSibling = null; //上一个兄弟

		while (i < childs.length) {
			const item = childs[i];

			const filber = {
				current: item,
				parent: data,
				nextSibling: null,
				prevSibling: null,
				child: null,
				children: item.children
			}

			//如果index === 0 ，则data赋值第一个filber
			if (i === 0) {
				data.child = filber
			} else {
				filber.prevSibling = prevSibling;
			}

			if (prevSibling) {
				prevSibling.nextSibling = filber;
			}
			prevSibling = filber;
			i++;
		}

		if (data.child) {
			return getSelects(data.child)
		}

		let nextFiber = data;

		while (nextFiber) {
			if (nextFiber.nextSibling) {
				return getSelects(nextFiber.nextSibling)
			} else {
				nextFiber = nextFiber.parent;
			}
		}

		if (queryData.length) {
			return getSelects({
				current: null,
				children: dataSource
			})
		}

	}
	getSelects({
		current: null,
		children: dataSource
	})
	return results;
}