import device;
import ui.View as View;
import ui.ImageView as ImageView;

exports = Class(ImageView, function(supr) {	
	this.init = function(opts) {
		supr(this, 'init', [opts]);
	};

	this.updateImages = function(opts) {
		this.image = opts.image;
		this.disabledImage = opts.disabledImage;
		this.completeImage = opts.completeImage;

		this.updateState("disabled");
	};

	this.updateState = function(state) {
		if (state == "disabled") {
			this.setImage(this.disabledImage);
		} else if (state == "completed") {
			this.setImage(this.completeImage);
		} else {
			this.setImage(this.image);
		}
	};

});