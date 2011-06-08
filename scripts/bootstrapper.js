require(["jquery",
        "metrics",
		"jsExtensions",
		"gameOfLife"], function($, metrics, jsExtensions, gameOfLife) {
	jsExtensions();

    $(document).ready(function() {	
		if (Modernizr.canvastext)
		{
			$("#gameOfLife").append(
				$('<canvas id="gameOfLifeCanvas" width="' + $("#gameOfLife").width() + '" height="' + $("#gameOfLife").height() + '">')
			);
			gameOfLife.begin();
		}
		else
		{
			$("#browserNotSupported").show();
			$("#gameOfLife").hide();
		}
    });
});
