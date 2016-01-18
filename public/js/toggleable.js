;(function(){
var is = utils.is, 
	copy = utils.copy,
	mod = utils.mod,
	sfn = utils.sfn;

// mixin
var toggleable = mod.clone({
	isOn: true,
	toggle: function(){
		if (this.isOn){
			this.off();
		} else {
			this.on();
		}
	},
	on: function(){
		this.isOn = true;
	},
	off: function(){
		this.isOn = false;
	}
});

})();