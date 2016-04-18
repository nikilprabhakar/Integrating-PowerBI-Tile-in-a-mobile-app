# Integrating-PowerBI-Tile-in-a-mobile-app
1. Configure  your Azure and Power BI account. HOWTO is beyond the scope of this blog but the link (https://msdn.microsoft.com/en-us/library/mt450498.aspx.) gives a good explanation.
2. Create your mobile app – we use ionic in this case. ionic is an incredible front-end SDK for creating hybrid mobile apps that have a very native look and feel. You can learn more about ionic here http://ionicframework.com/
3. For backend I use Angularjs

In order to get started download the code and plugin the client Id and tenant id in the controllers.js file. The app uses 
simple-oauth2 (https://github.com/lelylan/simple-oauth2) to authenticate with AD. Upon successful authentication you should receive a token which should be passed into the powerbi API to retrieve the dashboard and corresponding tiles.

You can read more about this in the blog https://codenmobile.wordpress.com/.


