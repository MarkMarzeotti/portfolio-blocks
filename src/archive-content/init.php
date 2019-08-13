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
	$block_post_type = ( $attributes['postType'] ) ? $attributes['postType'] : 'post';
	$block_post_display = ( $attributes['postDisplay'] ) ? $attributes['postDisplay'] : 'wide';
	$classes = 'wp-block-portfolio-blocks-archive-content';

	if ( isset( $attributes['className'] ) ) :
		$classes .= ' ' . $attributes['className'];
	endif;

	ob_start(); ?>
	<div class="<?php echo esc_attr( $classes ); ?>">
		<div class="archive-content">
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
		'portfolio-blocks/archive-content',
		array(
			'attributes' => array(
				'className' => array(
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
