var webra1n = function(content, load_cb) {
	var self = {};

	self.made_by = [
		['_argp', 'argp'],
		['axi0mX', 'axi0mX'],
		['DanyL931', 'Dany Lisiansky'],
		['Jaywalker', 'Jaywalker'],
		['hbkirb', 'Adam Demasi'],
		['littlelailo', 'littlelailo'],
		['nitoTV', 'nitoTV'],
		['never_released', 'Longhorn'],
		['jamiebishop123', 'Jamie Bishop'],
		['pimskeks', 'pimskeks'],
		['qwertyoruiopz', 'qwertyoruiopz'],
		['sbingner', 'Sam Bingner'],
		['s1guza', 'Siguza']
	];

	self.thanks_to = [
		['kjchaifisch', 'Dylan Laws'],
		['jndok', 'jndok'],
		['JonathanSeals', 'Jonathan Seals'],
		['xerub', 'xerub'],
		['littlesteve', 'Steve'],
		['iBSparkes', 'PsychoTea'],
		['Simone_Ferrini', 'Simone Ferrini'],
		['ihackbanme', 'ihackbanme'],
		['iH8sn0w', 'iH8sn0w'],
		['cjori', 'Ori Kadosh'],
		['r0nyrus', 'Rony Kelner']
	];

	self.bitmap = new Uint32Array([
		0x0, 		0xa00, 		0x400, 		0x5540, 	0x7fc0, 	0x3f80, 	0x3f80, 	0x1f00,
		0x1f00, 	0x1f00, 	0x3f80, 	0xffe0, 	0x3f80, 	0x3f80, 	0x3f83, 	0x103f9f,
		0x18103ffb, 0xe3fffd5, 	0x1beabfab, 0x480d7fd5, 0xf80abfab, 0x480d7fd5, 0x1beabfab, 0xe3fffd5,
		0x18107ffb, 0x107fdf, 	0x7fc3, 	0xffe0, 	0xffe0, 	0xffe0, 	0x1fff0, 	0x1fff0
	]);

	self.theme = {
		background: {
			color: {
				intense: '#232323',
				light: '#2e3436'
			}
		},
		text: {
			title: {
				font: 'sans-serif',
				color: 'white'
			},
			subtitle: {
				font: 'sans-serif',
				color: 'gray'
			},
		}
	};

	self.drawLogo = function(canvas) {
		var context = canvas.getContext('2d');
	    var idata = context.getImageData(0,0,512,512);
	    var data = idata.data;
	    data.fill(0xff);
	    for (let y = 0; y < 512; y++) {
	        let b32 = self.bitmap[y/16 | 0];
	        for (let x = 0; x < 512; x++) {
	            data[(x + y*512) * 4 + 3] = (b32 >> (x/16|0)) & 1 ? 0xff : 0;
	        }
	    }
	    context.putImageData(idata,0,0);
	};

	self.initBody = function() {
		self.body = document.body;
		self.body.style.backgroundColor = self.theme.background.color.intense;
		self.body.style.margin = "0px";
	}

	self.initHeader = function() {
		self.header = document.createElement("div");
		self.header.style.backgroundColor = self.theme.background.color.intense;
		self.header.style.position = "relative";
		self.header.style.width = '100%';
		self.header.style.height = 130;
		self.header.style.top = 0;
		self.header.style.borderBottom = '1px solid white';
		self.body.appendChild(self.header);

		var logo = document.createElement("canvas");
		logo.width = "512";
		logo.height = "512";
		logo.style.width = 50;
		logo.style.height = 50;
		logo.style.position = "absolute";
		logo.style.marginLeft = "auto";
		logo.style.marginRight = "auto";
		logo.style.top = "10px";
		logo.style.left = 0;
		logo.style.right = 0;
		self.drawLogo(logo);
		self.header.appendChild(logo);

		var title = document.createElement("h");
		title.style.position = "absolute";
		title.style.marginLeft = "auto";
		title.style.marginRight = "auto";
		title.style.top = logo.clientHeight + logo.clientTop + 15;
		title.style.left = 0;
		title.style.right = 0;
		title.style.textAlign = "center";
		title.style.color = self.theme.text.title.color;
		title.style.fontFamily = self.theme.text.title.font;
		title.style.fontWeight = "bold";
		title.style.fontSize = '1.5em';
		title.innerText = 'webra1n';
		self.header.appendChild(title);

		var subtitle = document.createElement("h");
		subtitle.style.position = "absolute";
		subtitle.style.marginLeft = "auto";
		subtitle.style.marginRight = "auto";
		subtitle.style.top = title.clientHeight + title.clientTop + 70;
		subtitle.style.left = 0;
		subtitle.style.right = 0;
		subtitle.style.color = self.theme.text.subtitle.color;
		subtitle.style.fontFamily = self.theme.text.subtitle.font;
		subtitle.style.fontSize = '0.8em';
		subtitle.style.textAlign = 'center';
		subtitle.innerText = 'iPhone 5s – iPhone X, iOS 12.0 and up';
		self.header.appendChild(subtitle);
	};

	self.initContainer = function() {
		self.container = document.createElement("div");
		self.container.style.backgroundColor = self.theme.background.color.light;
		self.container.style.display = "inline-block";
		self.container.style.position = "relative";
		self.container.style.width = '100%';
		self.body.appendChild(self.container);

		self.content.style.position = "relative";
		self.content.style.marginLeft = "auto";
		self.content.style.marginRight = "auto";
		self.content.style.marginTop = "100px";
		self.content.style.marginBottom = "100px";
		self.content.style.left = 0;
		self.content.style.right = 0;
		self.container.appendChild(self.content);

		if (load_cb != undefined)
			load_cb();
	};

	self.initFooter = function() {
		var addContributor = function(e, handle, name) {
			var contributor_link = document.createElement("a");
			contributor_link.href = "https://twitter.com/intent/follow?screen_name=" + handle;
			contributor_link.style.verticalAlign = "middle";
			contributor_link.style.padding = "12px 20px";
			contributor_link.style.display = "inline-block";
			contributor_link.style.whiteSpace = "nowrap";
			contributor_link.style.wordWrap = "break-word";
			contributor_link.style.boxSizing = "border-box";
			contributor_link.style.textOverflow = "ellipsis";
			contributor_link.style.overflow = "hidden";
			contributor_link.style.position = "relative";
			contributor_link.style.minWidth = "210";
			contributor_link.style.top = "-7px";
			contributor_link.style.fontFamily = self.theme.text.subtitle.font;
			contributor_link.style.color = self.theme.text.subtitle.color;
			contributor_link.style.textDecoration = "none";
			contributor_link.onmouseover = function() { contributor_link.style.textDecoration = "underline"; };
			contributor_link.onmouseout = function() { contributor_link.style.textDecoration = "none"; };
			e.appendChild(contributor_link);

			var contributor_image = document.createElement("img");
			contributor_image.src = "images/credits/" + handle + ".png";
			contributor_image.style.borderRadius = "50%";
			contributor_image.style.position = "relative";
			contributor_image.style.top = "7px";
			contributor_image.style.background = "#ddd";
			contributor_image.style.width = "24px";
			contributor_image.style.height = "24px";
			contributor_link.appendChild(contributor_image);

			var contributor_name = document.createElement("span");
			contributor_name.style.position = "relative";
			contributor_name.style.padding = "20px 20px";
			contributor_name.innerText = name;
			contributor_link.appendChild(contributor_name);
		};

		var addCreditsBlock = function(e, title, credits) {
			var credits_container = document.createElement("div");
			credits_container.style.maxWidth = "710px";
			credits_container.style.marginLeft = "auto";
			credits_container.style.marginRight = "auto";
			credits_container.style.left = 0;
			credits_container.style.right = 0;
			credits_container.style.padding = "20px 0px";
			e.appendChild(credits_container);

			var title_e = document.createElement("h");
			title_e.style.fontFamily = self.theme.text.title.font;
			title_e.style.color = self.theme.text.title.color;
			title_e.style.fontWeight = "bold";
			title_e.innerText = title;
			credits_container.appendChild(title_e);

			var credits_e = document.createElement("div");
			credits_container.appendChild(credits_e);

			credits.forEach(contributor => addContributor(credits_e, contributor[0], contributor[1]));
		};

		self.footer = document.createElement("div");
		self.footer.style.backgroundColor = self.theme.background.color.intense;
		self.footer.style.width = '100%';
		self.footer.style.position = "relative";
		self.footer.style.borderTop = '1px solid white';
		self.body.appendChild(self.footer);

		var title = document.createElement("p");
		title.style.position = "relative";
		title.style.marginLeft = "auto";
		title.style.marginRight = "auto";
		title.style.left = 0;
		title.style.right = 0;
		title.style.padding = "20px 0px";
		title.style.fontSize = '1.5em';
		title.style.fontFamily = self.theme.text.title.font;
		title.style.color = self.theme.text.title.color;
		title.style.fontWeight = "bold";
		title.style.textAlign = "center";
		title.innerText = "Credits";
		self.footer.appendChild(title);

		addCreditsBlock(self.footer, "Made by", self.made_by);
		addCreditsBlock(self.footer, "Thanks to", self.thanks_to);

		var copyright = document.createElement("p");
		copyright.style.position = "relative";
		copyright.style.maxWidth = "500px";
		copyright.style.marginLeft = "auto";
		copyright.style.marginRight = "auto";
		copyright.style.left = 0;
		copyright.style.right = 0;
		copyright.style.padding = "20px 20px";
		copyright.style.fontSize = '0.8em';
		copyright.style.fontFamily = self.theme.text.subtitle.font;
		copyright.style.color = self.theme.text.subtitle.color;
		copyright.style.textAlign = "center";
		copyright.innerText = "© 2019-2021 Kim Jong Cracks";
		self.footer.appendChild(copyright);
	};

	self.init = function() {
		self.content = content;
		self.initBody();
		self.initHeader();
		self.initContainer();
		self.initFooter();
	};


	self.init();
	return self;
};
