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
function portfolio_blocks_block_assets() { // phpcs:ignore
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
add_action( 'init', 'portfolio_blocks_block_assets' );

/**
 * Enqueue Gutenberg block assets for frontend.
 *
 * Assets enqueued:
 * 1. Google Maps.
 * 2. Google Maps Loader.
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

/**
 * Render Child List block on frontend.
 *
 * @since 1.0.0
 *
 * @param array $attributes {
 *     @type string className The class defined in the Child List block
 *     @type string headline  The headline displayed in the Child List block
 *     @type string subhead   The subhead displayed in the Child List block
 *     @type string postType  The post type displayed in the Child List block
 * }
 */
function portfolio_blocks_render_child_list( $attributes ) {
	$block_headline = ( $attributes['headline'] ) ? $attributes['headline'] : '';
	$block_subhead = ( $attributes['subhead'] ) ? $attributes['subhead'] : '';
	$block_post_type = ( $attributes['postType'] ) ? $attributes['postType'] : 'post';
	$class = 'child-list';

	if ( isset( $attributes['className'] ) ) :
		$class .= ' ' . $attributes['className'];
	endif;

	$post_id = get_the_ID();
	$post_type = get_post_type( $post_id );

	ob_start(); ?>
	<div class="<?php echo esc_attr( $attributes['className'] ); ?>">
		<div class="<?php echo esc_attr( $class ); ?>">
			<?php if ( $block_headline ) : ?>
				<h2 class="child-list__headline"><?php echo $block_headline; ?></h2>
			<?php endif; ?>
			<?php if ( $block_subhead ) : ?>
				<p class="child-list__subhead"><?php echo $block_subhead; ?></p>
			<?php endif; ?>
			<div class="child-list__posts">
				<?php
				$args = array(
					'post_parent'    => $post_id,
					'post_type'      => array( $post_type ),
					'post_status'    => array( 'publish' ),
					'paged'          => $paged,
					'posts_per_page' => 10,
					'order'          => 'ASC',
					'orderby'        => 'menu_order',
				);

				$query = new WP_Query( $args );

				if ( $query->have_posts() ) :
					while ( $query->have_posts() ) :
						$query->the_post();
						?>

						<div class="child-list__item">
							<div class="child-list__content">
								<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
								<?php the_excerpt(); ?>
							</div>
						</div>

						<?php
					endwhile;
				else :
					?>

					<div class="child-list__item">
						<div class="child-list__content">
							<h3><?php esc_html( 'Sorry, there are no posts to display.' ); ?></h3>
							<p><?php esc_html( 'Maybe try a search?' ); ?></p>
							<?php get_search_form(); ?>
						</div>
					</div>

					<?php
				endif;

				wp_reset_postdata();
				?>
			</div>
		</div>
	</div>
	<?php
	$html = ob_get_clean();

	return $html;
}

/**
 * Register all dynamic Gutenberg blocks.
 *
 * @since 1.0.0
 */
function portfolio_blocks_register_child_list() {
	register_block_type(
		'child-list/child-list',
		array(
			'attributes' => array(
				'className' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'portfolio_blocks_render_child_list',
		)
	);
}
add_action( 'init', 'portfolio_blocks_register_child_list' );

/**
 * Render Archive Content block on frontend.
 *
 * @since 1.0.0
 *
 * @param array $attributes {
 *     @type string className The class defined in the Archive Content block
 *     @type string headline  The headline displayed in the Archive Content block
 *     @type string subhead   The subhead displayed in the Archive Content block
 *     @type string postType  The post type displayed in the Archive Content block
 * }
 */
function portfolio_blocks_render_archive_content( $attributes ) {
	$block_headline = ( $attributes['headline'] ) ? $attributes['headline'] : '';
	$block_subhead = ( $attributes['subhead'] ) ? $attributes['subhead'] : '';
	$block_post_type = ( $attributes['postType'] ) ? $attributes['postType'] : 'post';
	$block_post_display = ( $attributes['postDisplay'] ) ? $attributes['postDisplay'] : 'wide';
	$classes = 'wp-block-archive-content';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div class="archive-content">
			<?php if ( $block_headline ) : ?>
				<h2 class="archive-content__headline"><?php echo $block_headline; ?></h2>
			<?php endif; ?>
			<?php if ( $block_subhead ) : ?>
				<p class="archive-content__subhead"><?php echo $block_subhead; ?></p>
			<?php endif; ?>
			<div class="archive-content__posts <?php echo esc_attr( $block_post_display ); ?>">
				<?php
				$args = array(
					'post_type'              => array( $block_post_type ),
					'post_status'            => array( 'publish' ),
					'paged'                  => $paged,
					'posts_per_page'         => 10,
				);

				$query = new WP_Query( $args );

				if ( $query->have_posts() ) :
					while ( $query->have_posts() ) :
						$query->the_post();

						$post_permalink = get_permalink();

						/**
						 * Filter the post link.
						 *
						 * @since 1.0.0
						 * 
						 * @param @type string $post_permalink This post permalink
						 */
						$post_permalink = apply_filters( 'archive_content_post_link', $post_permalink );

						$target = strpos( $post_permalink, home_url( '/' ) ) !== false ? '' : ' target="_blank"';
						?>

						<div class="archive-content__item">
							<?php if ( has_post_thumbnail() ) : ?>
								<div class="archive-content__image">
									<a href="<?php echo esc_url( $post_permalink ); ?>"<?php echo $target; ?>>
										<?php the_post_thumbnail( 'medium', array( 'alt' => get_the_title() ) ); ?>
									</a>
								</div>
							<?php endif; ?>
							<div class="archive-content__content">
								<h2 class="h3"><a href="<?php echo esc_url( $post_permalink ); ?>"<?php echo $target; ?>><?php the_title(); ?></a></h2>
								<?php 
								/**
								 * Filter to display content after the post title.
								 *
								 * @since 1.0.0
								 * 
								 * @param @type object $post This post object
								 */
								echo apply_filters( 'archive_content_after_title', $post );

								the_excerpt(); 

								$button_text = $attributes['buttonOverride'] ? $attributes['buttonOverride'] : 'View ' . get_the_title();
								$button_text = str_replace( '%title%', get_the_title(), $button_text );
								?>
								<a class="archive-content__button" href="<?php echo esc_url( $post_permalink ); ?>"<?php echo $target; ?>><?php echo esc_html( $button_text ); ?></a>
							</div>
						</div>

						<?php
					endwhile;
				else :
					?>

					<div class="archive-content__item">
						<div class="archive-content__content">
							<h3><?php esc_html( 'Sorry, there are no posts to display.' ); ?></h3>
							<p><?php esc_html( 'Maybe try a search?' ); ?></p>
							<?php get_search_form(); ?>
						</div>
					</div>

					<?php
				endif;

				wp_reset_postdata();
				?>
			</div>
		</div>
	</div>
	<?php
	$html = ob_get_clean();

	return $html;
}

/**
 * Register all dynamic Gutenberg blocks.
 *
 * @since 1.0.0
 */
function portfolio_blocks_register_archive_content() {
	register_block_type(
		'archive-content/archive-content',
		array(
			'attributes' => array(
				'className' => array(
					'type' => 'string',
				),
				'headline' => array(
					'type' => 'string',
				),
				'subhead' => array(
					'type' => 'string',
				),
				'postType' => array(
					'type' => 'string',
				),
				'postDisplay' => array(
					'type' => 'string',
				),
				'buttonOverride' => array(
					'type' => 'string',
				),
			),
			'render_callback' => 'portfolio_blocks_render_archive_content',
		)
	);
}
add_action( 'init', 'portfolio_blocks_register_archive_content' );
