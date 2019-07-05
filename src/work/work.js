/**
 * BLOCK: portfolio - work
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// import iPhone from './assets/iphone.svg';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, MediaUpload } = wp.editor;
const { IconButton } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

/**
 * Register: a Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}
 */
registerBlockType( 'portfolio/work', {
	title: __( 'Work' ),
	icon: 'align-none',
	category: 'common',
	attributes: {
		screenshotID: {
			type: 'integer',
		},
		screenshot: {
			type: 'string',
		},
		screenshotAlt: {
			type: 'string',
		},
	},
	keywords: [
		__( 'work' ),
		__( 'content' ),
		__( 'portfolio' ),
	],
	edit: function( props ) {
		let screenshot = '';
		let icon = 'upload';
		let label = __( 'Upload Screenshot' );

		if ( props.attributes.screenshotID ) {
			screenshot = <img src={ props.attributes.screenshot } alt={ props.attributes.screenshotAlt } />;
			icon = 'edit';
			label = __( 'Edit Screenshot' );
		}

		return (
			<section className={ props.className }>
				<div className="work-inner">
					<div className="work__content">
						<InnerBlocks allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/button', 'core/list' ] } />
					</div>
					<div className="work__image">
						<img src="/wp-content/plugins/portfolio-blocks/src/work/assets/iphone.svg" alt="iPhone" />
						<div className="work-container">
							{ screenshot }
						</div>
						<MediaUpload
							onSelect={ ( imageObject ) => {
								props.setAttributes( {
									screenshotID: imageObject.id,
									screenshot: imageObject.sizes.full.url,
									screenshotAlt: imageObject.alt,
								} );
							} }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ props.attributes.screenshotID }
							render={ ( { open } ) => (
								<IconButton
									isDefault
									label={ label }
									icon={ icon }
									onClick={ open }
								>{ label }</IconButton>
							) }
						/>
					</div>
				</div>
			</section>
		);
	},
	save: function( props ) {
		return (
			<section className={ props.className }>
				<div className="medium-inner">
					<div className="work__content">
						<InnerBlocks.Content />
					</div>
					<div className="work__image">
						<img src="/wp-content/plugins/portfolio-blocks/src/work/assets/iphone.svg" alt="iPhone" />
						<div className="work-container">
							<img src={ props.attributes.screenshot } alt={ props.attributes.screenshotAlt } />
						</div>
					</div>
				</div>
			</section>
		);
	},
} );
