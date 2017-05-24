class ImageM {
	/*privates:
	data, width, height
	*/
	
	constructor(img) {
		let canvas = document.createElement('canvas');
		[canvas.width, canvas.height] = [img.width, img.height];
		canvas.getContext('2d').drawImage(img, 0, 0);
		this.data = canvas.getContext('2d').getImageData(0, 0, img.width, img.height).data;
		[this.width, this.height] = [img.width, img.height];
	}
	
	setPixel(x, y, rgba) {
		for(let i = 0; i < 4; i++)
			if(rgba[i] != undefined)
				this.data[(x * this.width + y) * 4 + i] = rgba[i];
	}
	
	getPixel(x, y) {
		return this.data.slice((x * this.width + y) * 4, (x * this.width + y) * 4 + 3);
	}
	
	get image() {
		let canvas = document.createElement('canvas'), img, tempData;
		[canvas.width, canvas.height] = [this.width, this.height];
		
		tempData = canvas.getContext('2d').createImageData(this.width, this.height);
		tempData.data.set(this.data);
		canvas.getContext('2d').putImageData(tempData, 0, 0);
		
		return new Promise((resolve, reject) => {
			try {
				img = new Image();
				img.onload = e => { resolve(img); };
				img.onerror = e => { reject(e); };
				img.src = canvas.toDataURL('image/png');
			} catch(e) {
				reject(e);
			}
		});
	}
}