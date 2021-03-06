'use strict';

const extend = require('xtend/mutable');
const q = require('component-query');
const doc = require('get-doc');
const cookie = require('cookie-cutter');

// date parsing
const msInOneDay = 1000 * 60 * 60 * 24;
const today = Number(new Date());

// root and Dom
let root = doc && doc.documentElement;

let Bebinesh = function (options, callback) {

	this.options = extend({}, {
    daysHidden: 15, // Numbers of days to hide modal after dismissed
    daysReminder: 90, // Numbers of days to hide modal after progressed
		title: '', // Title of link and alt for image
		target: '_blank', // How to open link
  	force: false, // always show modal
    onProgress: function(){}, // On Progress callback
    onClose: function() {} // On Dismiss callback
	}, options || arguments[0] || {});

	if ( this.options.name ){
		this.options.name = '-' + this.options.name.replace(/\s/g, '-')
	} else {
		this.options.name = ''
	}

	const userDismissed = cookie.get('Bebinesh-closed' + this.options.name);
	const userProgressed = cookie.get('Bebinesh-progressed' + this.options.name);

	if (!this.options.force && (userDismissed || userProgressed)) return;

	this.create();
	this.show();

};

Bebinesh.prototype = {
	constructor: Bebinesh,

	create: function () {

		let modal = doc.createElement('div');

		modal.className = 'bebinesh';
		modal.innerHTML = '<div class="bebinesh-overlay bebinesh-close"></div>'+
                        '<div class="bebinesh-content">'+
													'<a href="' + this.options.href + '" title="' + this.options.title + '" target="' + this.options.target + '" class="bebinesh-progress">'+
													 	'<img src="' + this.options.src + '" alt="' + this.options.title + '">'+
													'</a>'+
                        '</div>'+
                      '</div>';

		// there isn’t neccessary a body
		if (doc.body) {
			doc.body.appendChild(modal);
		}	else if (doc) {
			doc.addEventListener('DOMContentLoaded', function () {
				doc.body.appendChild(modal);
			});
		}

    q('.bebinesh-progress', modal).addEventListener('click', this.progress.bind(this), false);
  	q('.bebinesh-close', modal).addEventListener('click', this.close.bind(this), false);
	},
	hide: function () {
		root.classList.remove('bebinesh-show');
	},
	show: function () {
		root.classList.add('bebinesh-show');
	},
	close: function () {
    this.options.onClose.call();
		this.hide();
		cookie.set('Bebinesh-closed' + this.options.name, 'true', {
			path: '/',
			expires: this.getExpirationDate(this.options.daysHidden)
		});
	},
	progress: function () {
		this.hide();
		cookie.set('Bebinesh-progressed' + this.options.name, 'true', {
			path: '/',
			expires: this.getExpirationDate(this.options.daysReminder)
		});
	},
	getExpirationDate: function (remainingDays) {
		return new Date(today + (remainingDays * msInOneDay))
	}
};

module.exports = Bebinesh;
