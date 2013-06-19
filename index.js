var Vim = require('js-vim'),
	View = require('./lib/view'),
	Keys = require('./lib/keys');

require('./lib/style');

/* set up */
var init = function(obj) {

	//Ok
	window.vim = new Vim();

	//Hmm.
	vim.edit = function(obj) {
		if(!obj || typeof obj !== 'object' || !('el' in obj)) throw "vim.edit required { el: <HTMLElement> }";
		var text = obj.el.innerHTML;
		obj.el.innerHTML = '';
		vim.view = new View({
			el: obj.el,
			vim: vim
		});
		if(text.length) {
			vim.curDoc.text(text);
			vim.exec('G')
			vim.exec('$')
		}
	
	};

	

	//Set up keys
	keys = new Keys();
	keys.listen(document);

	keys.fn = function(key) {
		vim.exec(key);
	};

	//Want to return a vim here, not a view
	//return vim;
};

init();	
