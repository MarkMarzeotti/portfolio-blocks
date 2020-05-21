<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package Portfolio Blocks
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Render Map block on frontend.
 *
 * @since 1.0.0
 *
 * @param array $attributes {
 *     @type string className The class defined in the Map block
 *     @type string address   The address displayed in the Map block
 * }
 */
function portfolio_blocks_render_map( $attributes ) {
	$block_address = ( $attributes['address'] ) ? $attributes['address'] : '';
	$classes = 'wp-block-portfolio-blocks-map';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div id="map" class="map"></div>
	</div>
	<script type="text/javascript">
		function initMap() {
			var charlotte = { lat: 35.239418, lng: -80.8455486 };
			var map = new google.maps.Map( document.getElementById( 'map' ), {
				zoom: 13,
				center: charlotte,
				scrollwheel: false,
				disableDefaultUI: true,
				styles: [
					{
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#f5f5f5"
							}
						]
					},
					{
						"elementType": "labels.icon",
						"stylers": [
							{
								"visibility": "off"
							}
						]
					},
					{
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#616161"
							}
						]
					},
					{
						"elementType": "labels.text.stroke",
						"stylers": [
							{
								"color": "#f5f5f5"
							}
						]
					},
					{
						"featureType": "administrative.land_parcel",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#bdbdbd"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#eeeeee"
							}
						]
					},
					{
						"featureType": "poi",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e5e5e5"
							}
						]
					},
					{
						"featureType": "poi.park",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					},
					{
						"featureType": "road",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#ffffff"
							}
						]
					},
					{
						"featureType": "road.arterial",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#757575"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#dadada"
							}
						]
					},
					{
						"featureType": "road.highway",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#616161"
							}
						]
					},
					{
						"featureType": "road.local",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					},
					{
						"featureType": "transit.line",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#e5e5e5"
							}
						]
					},
					{
						"featureType": "transit.station",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#eeeeee"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "geometry",
						"stylers": [
							{
								"color": "#c9c9c9"
							}
						]
					},
					{
						"featureType": "water",
						"elementType": "labels.text.fill",
						"stylers": [
							{
								"color": "#9e9e9e"
							}
						]
					}
				]
			} );
			var marker = new google.maps.Marker( {
				position: charlotte,
				map: map,
			} );
		}
	</script>
	<?php
	$html = ob_get_clean();

	return $html;
}

/**
 * Register Map Gutenberg block.
 *
 * @since 1.0.0
 */
function portfolio_blocks_register_map() {
	register_block_type(
		'portfolio-blocks/map',
		array(
			'attributes' => array(
				'address' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'portfolio_blocks_render_map',
		)
	);
}
add_action( 'init', 'portfolio_blocks_register_map' );
