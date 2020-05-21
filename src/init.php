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
function portfolio_blocks_admin_block_assets() { // phpcs:ignore
	// Register block editor styles for backend.
	wp_enqueue_style(
		'portfolio_blocks-block-editor-css',
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ),
		array( 'wp-edit-blocks' )
		// null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' )
	);

	// Register block editor script for backend.
	wp_enqueue_script(
		'portfolio_blocks-block-js',
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ),
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' )
		// null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ),
		// true
	);
}
add_action( 'enqueue_block_editor_assets', 'portfolio_blocks_admin_block_assets' );

function portfolio_blocks_block_assets() { // phpcs:ignore
	$deps = is_admin() ? array( 'wp-editor' ) : false;
	// Register block styles for both frontend + backend.
	wp_enqueue_style(
		'portfolio_blocks-style-css',
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ),
		$deps
		// null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' )
	);
}
add_action( 'enqueue_block_assets', 'portfolio_blocks_block_assets' );
