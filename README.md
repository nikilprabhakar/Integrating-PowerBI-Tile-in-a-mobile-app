<html>
<head></head>
<body>
# Integrating-PowerBI-Tile-in-a-mobile-app
1. Configure  your Azure and Power BI account. HOWTO is beyond the scope of this blog but the link (https://powerbi.microsoft.com/en-us/documentation/powerbi-developer-integrate-a-power-bi-tile-or-report/) gives a good explanation.
2. Create your mobile app – we use ionic in this case. ionic is an incredible front-end SDK for creating hybrid mobile apps that have a very native look and feel. You can learn more about ionic here http://ionicframework.com/
3. For backend I use Angularjs

<h2>Getting Started</h2>
<p>
In order to get started download the code and plugin the client Id and tenant id in the controllers.js file.
</p> 
<pre>
<code>
	.controller('LoginCtrl', function($scope, $state, $cordovaOauth, YourService) {
	    var clientId = 'Enter your client id here';
	  	var tenantId = 'Enter your tenant id here';	
	  	var resourceURI = 'https://analysis.windows.net/powerbi/api';
	  	....
	  	....
	</code>
</pre>

<p>
The app uses simple-oauth2 (https://github.com/lelylan/simple-oauth2) to authenticate with AD. Upon successful authentication you should receive a token which should be passed into the powerbi API to retrieve the dashboard and corresponding tiles.
</p>

<p>You can read more about this in the blog https://codenmobile.wordpress.com/.</p>

</body>
</html>