var ncurses = function() {
	self = {};

	self.options = {
		cols: 80,
		rows: 24,
		rightClickSelectsWord: false,
		theme: {
			background: "#2e3436",
			cursor: "#2e3436",
		}
	};

	self.connectionOpen = function() {
		self.setStatus(2);
	};

	self.connectionClose = function() {
		self.setStatus(3);
		self.connection = null;
	};

	self.channelIn = function(message) {
		self.setStatus(0);
		self.term.write(message.data);
	};

	self.channelOut = function(message) {
		if (self.connection != null)
			self.connection.send(message);
	};

	self.initConnection = function() {
		self.setStatus(1);
		self.connection = new WebSocket('ws://' + window.location.host + '/ncurses');
		self.connection.onopen = self.connectionOpen;
		self.connection.onclose = self.connectionClose;
		self.connection.onmessage = self.channelIn;
	};

	self.initTerminal = function() {
		self.term = new Terminal(self.options);
		self.term.open(self.container);
		self.term.onData(self.channelOut);
		self.term.onBinary(self.channelOut);
		self.term.focus();
		self.parent.onclick = () => { self.term.focus(); };
	};

	self.setStatus = function(status) {
		switch (status) {
			case 0:
				self.term.element.style.display = "block";
				self.term.focus();
				self.overlay.style.display = "none";
				self.refresh_container.style.display = "none";
				break;
			case 1:
				self.refresh_container.style.display = "none";
				self.status_label.innerText = "Connecting..";
				self.overlay.style.display = "block";
				self.term.element.style.display = "none";
				break;
			case 2:
				self.refresh_container.style.display = "none";
				self.status_label.innerText = "Connected";
				self.overlay.style.display = "block";
				self.term.element.style.display = "none";
			case 3:
				self.refresh_container.style.display = "flex";
				self.status_label.innerText = "Connection Closed";
				self.overlay.style.display = "block";
				self.term.element.style.display = "none";

		}
	};

	self.initOverlay = function() {
		self.overlay = document.createElement("div");
		self.overlay.style.width = self.container.style.width;
		self.overlay.style.height = self.container.style.height;
		self.overlay.style.maxWidth = self.container.style.width;
		self.overlay.style.maxHeight = self.container.style.height;
		self.overlay.style.backgroundColor = self.parent.style.backgroundColor;
		self.overlay.style.display = "none";
		self.overlay.style.position = "absolute";
		self.overlay.style.top = 0;
		self.overlay.style.left = 0;
		self.overlay.style.verticalAlign = "middle";
		self.overlay.style.alignItems = "center";
		self.overlay.justifyContent = "center";
		self.container.appendChild(self.overlay);


		self.status_label = document.createElement("h");
		self.status_label.style.margin = 0;
		self.status_label.style.marginRight = "-50%";
		self.status_label.style.top = "50%";
		self.status_label.style.left = "50%";
		self.status_label.style.transform = "translate(-50%, -50%)";
		self.status_label.style.minWidth = "100%";
		self.status_label.style.textAlign = "center";
		self.status_label.style.position = "absolute";
		self.status_label.style.color = "gray";
		self.status_label.style.fontFamily = 'sans-serif';
		self.status_label.style.fontSize = "2em";
		self.overlay.appendChild(self.status_label);

		self.refresh_container = document.createElement("div");
		self.refresh_container.style.display = "none";
		self.refresh_container.style.position = "absolute";
		self.refresh_container.style.margin = 0;
		self.refresh_container.style.marginRight = "-50%";
		self.refresh_container.style.top = "70%";
		self.refresh_container.style.left = "50%";
		self.refresh_container.style.transform = "translate(-50%, -30%)";
		self.refresh_container.style.minWidth = self.container.style.width;
		self.overlay.appendChild(self.refresh_container);

		var refresh_link = document.createElement("a");
		refresh_link.style.display = "flex";
		refresh_link.style.margin = 0;
		refresh_link.style.marginLeft = "auto";
		refresh_link.style.marginRight = "auto";
		refresh_link.style.left = 0;
		refresh_link.style.right = 0;
		refresh_link.href = "#";
		self.refresh_container.appendChild(refresh_link);

		var refresh_img = document.createElement("img");
		refresh_img.style.margin = 0;
		refresh_img.style.marginLeft = "auto";
		refresh_img.style.marginRight = "auto";
		refresh_img.style.left = 0;
		refresh_img.style.right = 0;
		refresh_img.width = 100;
		refresh_img.height = 100;
		refresh_img.style.borderRadius = "50%";
		refresh_img.style.border = '4px solid transparent';
		refresh_img.style.position = "relative";
		refresh_img.src = "images/icons/refresh.png";
		refresh_img.onmouseover = function() { refresh_img.style.border = '4px solid white'; };
		refresh_img.onmouseout = function() { refresh_img.style.border = '4px solid transparent'; };
		refresh_img.onclick = self.initConnection;
		refresh_link.appendChild(refresh_img);
	};

	self.load = function() {
		self.parent = self.container.parentElement;
		self.initTerminal();
		self.initOverlay();
		self.initConnection();
	};

	self.initContainer = function() {
		self.container = document.createElement("div");
		self.container.style.width = "720px";
		self.container.style.height = "408px";
	};

	self.init = function() {
		self.initContainer();
		webra1n(self.container, self.load);
	};

	self.init();
	return self;
};

window.onload = ncurses;
