<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function portfolio_blocks_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'portfolio_blocks-cgb-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		array( 'wp-editor' ),
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);

	// Register block editor script for backend.
	wp_register_script(
		'portfolio_blocks-cgb-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ),
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		true
	);

	// Register block editor styles for backend.
	wp_register_style(
		'portfolio_blocks-cgb-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' ),
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-portfolio-blocks', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'portfolio_blocks-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'portfolio_blocks-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'portfolio_blocks-cgb-block-editor-css',
		)
	);
}
add_action( 'init', 'portfolio_blocks_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for frontend.
 *
 * Assets enqueued:
 * 1. Google Maps.
 * 
 * @since 1.0.0
 */
function portfolio_block_frontend_assets() {
	wp_register_script(
		'google-maps',
		'https://maps.googleapis.com/maps/api/js?key=AIzaSyCb0NahCEnubhm0zEaBcJKF4nPgrSZ3IQM&callback=initMap',
		array( 'google-maps-loader' ),
		null,
		true
	);
	wp_register_script(
		'google-maps-loader',
		plugins_url( 'src/map/common.js', dirname( __FILE__ ) ),
		array(),
		null,
		true
	);
	wp_enqueue_script( 'google-maps-loader' );
	wp_enqueue_script( 'google-maps' );
}
add_action( 'wp_enqueue_scripts', 'portfolio_block_frontend_assets' );