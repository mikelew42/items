;(function(){
var is = utils.is, 
	copy = utils.copy,
	mod = utils.mod,
	sfn = utils.sfn;

Item = mod.clone({
	prop: "propName",
	$parent: {}, // reference to parent
	path: function(){
		var ret = this.$parent.path();
		ret.push(this.prop);
		return ret;
	},
	add: function(item){
		this[item.prop] = item;
	},
	fork: function(mods){
		var f = this.clone(mods);
		f.$base = this;
		return f;
	},
	save: function(){
		store.set(this.path(), this.data());
	},
	data: function(){
		var data = {};
		for (var i = 0; i < this.props.length; i++){
			data[this.props[i]] = this[this.props[i]];
		}
		return data;
	},
	props: [], // [ 'props', 'to', 'save' ],
	set: function(prop, value){
		if (this[prop] !== value){
			this[prop] = value;
			if (!this.$base || (this.$base && this.$base[prop] !== value))
				this.props.push(prop);
			// else, remove prop from savable if you want to re-link
		}
	},

	build: function(){
		// if this is a fork, we need to override 
	},
	render: function(){
		this.$el = $("<div>").addClass('item box').html(this.prop);
		return this.$el;
	}
});

})();