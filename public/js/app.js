;(function(){
var $body;
App = Coll.clone({
	path: function(){
		return ["App"];
	},
	$parent: window,
	prop: "App",
	rerender: function(){
		this.$el.remove();
		$body.append(this.render());
	}
});

$(function(){
	$body = $("body");
	App.add(Item.clone({
		prop: "myItem",
		$parent: App
	}));

	var item = App.myItem;
	item.set('test1', 1);

	// console.log(item);

	var item2 = item.fork({
		prop: "item2"
	});

	item2.set('test1', 2);
	// console.log(item2);

	App.add(Coll.clone({
		prop: "myColl",
		$parent: App
	}));

	var coll = App.myColl;
	coll.add(item);
	coll.add(item2);

	// console.log(App.data());

	App2 = App.fork({
		prop: "App2",
		path: function(){
			return ["App2"];
		},
		$parent: window
	});

	// console.log(App2.data())



	App.render($body);
});

})();