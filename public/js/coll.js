;(function(){
var is = utils.is, 
	copy = utils.copy,
	mod = utils.mod,
	sfn = utils.sfn;

Coll = Item.clone({
	items: [],
	add: function(item, i){
		if (is.undef(i))
			i = -1;
		// TODO: add at i
		this.items.push(item.prop);
		this[item.prop] = item;

		if (!item.$parent)
			item.$parent = this;
		// this.changes.push({
		// 	changeType: "add",
		// 	index: i,
		// 	prop: item.prop
		// });

	},
	changes: [],
	fork: function(mods){
		mods = mods || {};
		mods.$base = this;
		mods.$parent = this.$parent;
		var f = this.clone(mods);
		// console.log(this);
		this.$parent.add && this.$parent.add(f);
		return f;
	},
	data: function(){
		var data = {
			items: this.items,
			changes: this.changes
		};
		this.each(function(v, i, n){
			data[i] = v.data();
		});
		return data;
	},
	each: function(fn){
		for (var i = 0; i < this.items.length; i++){
			fn.call(this, this[this.items[i]], this.items[i], i);
		}
		return this;
	},
	render: function($container){
		var $old;
		if (this.$el){
			$old = this.$el;
		}
		this.$el = $("<div>").addClass('coll box');
		this.$prop = $("<div>").html(this.prop).addClass('prop').appendTo(this.$el);
		this.$icon = $("<i>").addClass('fa fa-icon fa-cubes').prependTo(this.$prop);
		this.$itemsArr = $("<pre>").html("items: " + JSON.stringify(this.items)).appendTo(this.$el);
		this.$items = $("<div>").addClass('coll-items').appendTo(this.$el);
		this.each(function(v, i, n){
			if (v.render){
				this.$items.append(v.render());
			} else {
				this.$items.append("<div>NO RENDER FN FOR THIS ITEM, see console</div>");
				console.log(v);
			}
		});
		if ($container){
			this.$container = $container;
		}
		if ($old){
			$old.replaceWith(this.$el);
		} else if (this.$container){
			this.$el.appendTo(this.$container);
		}
		return this.$el
	}
});

})();