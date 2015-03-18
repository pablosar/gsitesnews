function appendCSS(css) {
	var elem = document.createElement('style');
	elem.type = 'text/css';	
	elem.appendChild(document.createTextNode(css));
	document.getElementsByTagName("head")[0].appendChild(elem);
}

function makeVendors(css) {
	var vendors = ['-webkit-', '-moz-', '-o-', ''];
	var res = '';
	
	for(var i=0; i < vendors.length; i++){
		res += css.replace(/__VENDORS__/g, vendors[i]);
	}
	
	return res;
}

function getIntro(cont) {
  var newLine = cont.replace(/(\n|\r|\n\r|\r\n)/ig, '|n|');
  var endPos = newLine.search(/(<hr\/>|<hr>)/);
  var regex = /(<([^>]+)>)/ig;
    
  if(endPos > 0) {    
    var intro = newLine.slice(0, endPos);    
    var res = intro.replace(regex, ''); 
    res = res.replace('|n|', '<br>');
  } else {
    var res = newLine.replace(regex, ''); 
    res = res.replace('|n|', '<br>');
  }
  
  if(res.length > maxChars) {
  	res = res.substring(0, maxChars);
  	res = res.substring(0, res.lastIndexOf(" ")) + '...';
  }
  
  return res;
}

function getImg(cont) {
  // Retrieve the first image source from the content of the page
  // Use regexp to get the first image tag
  var imgRegexp = /<img.*?\/>/;
  var img1 = imgRegexp.exec(cont);
  
  if(img1 != null) {
	  // Use regexp to get the source of the previously retrieved image tag
	  var srcRegexp = /src=\S+[^>]/;
	  // Re-make the image tag to assure empty style
	  var imgPrev = '<img ' + srcRegexp.exec(img1) + ' class="imgPreview" />';
	  
	  // Return the image
	  return imgPrev;
  } else {
  	return '';
	  }
}
