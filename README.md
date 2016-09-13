# MEXP-Resource-Space
WordPress Media Explorer ResourceSpace extension

## Setup

You must define the following settings. It is reccommended that this is added to your `wp-config.php` file.

````php
define( 'PJ_RESOURCE_SPACE_DOMAIN', '' );
define( 'PJ_RESOURCE_SPACE_KEY',    '' );
````

Additionally, if your resourcespace install is behind basic auth, add the following.

````php
define( 'PJ_RESOURCE_SPACE_AUTHL',  '' );
define( 'PJ_RESOURCE_SPACE_AUTHP',  '' );
````

You might have to allow external host to download content. Put the following in the `wp-config.php` file.

````php
/** Enable my local themes and plugins repository */
add_filter( 'http_request_host_is_external', 'rs_allow_my_custom_host', 10, 3 );
function rs_allow_my_custom_host( $allow, $host, $url ) {
	if ( $host == 'your-domain.com' ) {
		$allow = true;
	}

	return $allow;
}
````

Further (optional) settings

````php
// Number of results to fetch for each page. Default is 20.
define( 'PJ_RESOURCE_SPACE_RESULTS_PER_PAGE', 20 );
````

**Grant access by user role**

The plugin uses the `insert_from_resourcespace` capability. This is granted to administrators and editors by default.

