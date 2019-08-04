<?php
/**
 * Plugin Name: Portfolio Blocks
 * Plugin URI: https://markmarzeotti.com/
 * Description: Various Gutenberg blocks for a portfolio site.
 * Author: Mark Marzeotti
 * Author URI: https://markmarzeotti.com/
 * Version: 1.0.0
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
