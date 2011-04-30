require(["jquery",
        "metrics",
		"jsExtensions",
		"gameOfLife"], function($, metrics, jsExtensions, gameOfLife) {
	if (Modernizr.canvastext)
	{
		jsExtensions();
	
	    $(document).ready(function() {	
			$("#gameOfLife").append(
				$('<canvas id="gameOfLifeCanvas" width="' + $("#gameOfLife").width() + '" height="' + $("#gameOfLife").height() + '">')
			);
			gameOfLife.begin();
	    });
	}
	else
	{
		$("#browserNotSupported").show();
		$("#gameOfLife").hide();
	}
});
