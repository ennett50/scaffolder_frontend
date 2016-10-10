var $nav = $('<div class="nav"></div>').insertBefore('#content');
Object.keys(doccontents).forEach(function(namespace){
	var $namespace = $('<div class="nav-item-namespace"></div>');

	$('<div class="nav-item __title"><a href="#' + namespace + '" class="nav-item-link">' + namespace + '.js</a></div>').appendTo( $namespace );

	//doccontents[namespace].forEach(function(item){
	//
	//	$('<div class="nav-item"><a href="#' + item.target + '" class="nav-item-link">' + item.name + '</a></div>').appendTo( $namespace );
	//});
	
	$nav.append( $namespace );
});