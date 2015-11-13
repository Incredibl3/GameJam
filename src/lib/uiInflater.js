import ui.View as View;
import ui.widget.ButtonView;
// import src.config.config as config;

var resolveClass = function(className) {
	if (className) {
		return jsio('import ' + className);
	}
	return View;
};

exports.overlay = function(view1, view2, referenceView) {
	var v2 = referenceView ? view2.getPosition(referenceView) : view2.style;
	view1.style.width = v2.width;
	view1.style.height = v2.height;
	view1.style.x = v2.x;
	view1.style.y = v2.y;
};

exports.processOpts = function(opts) {
	if (opts.imgName) {
		opts.image = 'resources/images/' + (opts.imgDir || 'MAIN') + '/' + opts.imgName + '.png';
	}
	if (opts.confColor) {
		opts.color = config.colors[opts.confColor];
	}
	if (opts.confBackgroundColor) {
		opts.backgroundColor = config.colors[opts.confBackgroundColor];
	}
	if (opts.confStrokeStyle) {
		opts.strokeStyle = config.colors[opts.confStrokeStyle];
	}
	if (opts.cls == 'ui.widget.ButtonView') {
		opts.on = opts.on || {
			up: GC.app.buttonClick,
			down: GC.app.buttonClick
		};
	}
	return opts;
};

exports.addChildren = function(children, parent) {
	children.forEach(function(child, i) {
		this.processOpts(child);
		var v = new (resolveClass(child.cls))(merge({parent: parent}, child));
		if (child.name) {
			v.name = child.name;
			parent[child.name] = v;
		}
		if (child.children) {
			exports.addChildren(child.children, v);
		}
	}, this);
};