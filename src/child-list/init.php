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
 * Render Child List block on frontend.
 *
 * @since 1.0.0
 *
 * @param array $attributes {
 *     @type string className The class defined in the Child List block
 * }
 */
function portfolio_blocks_render_child_list( $attributes ) {
	$classes = 'wp-blocks-portfolio-blocks-child-list';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	$post_id = get_the_ID();
	$post_type = get_post_type( $post_id );

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div class="child-list">
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
		'portfolio-blocks/child-list',
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
