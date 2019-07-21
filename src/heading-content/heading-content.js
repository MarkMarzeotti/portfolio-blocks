/**
 * BLOCK: portfolio - heading content
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// const validAlignments = [ 'full' ];

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText } = wp.editor;

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'portfolio/heading-content', {
	title: __( 'Heading Content' ),
	icon: 'align-none',
	category: 'common',
	// supports: {
	// 	align: validAlignments,
	// },
	attributes: {
		// align: {
		// 	type: 'string',
		// 	default: 'full',
		// },
		heading: {
			source: 'children',
			selector: 'h2',
			type: 'array',
		},
	},
	keywords: [
		__( 'heading' ),
		__( 'content' ),
		__( 'portfolio' ),
	],

	/*
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		function handleChangeHeading( newHeading ) {
			props.setAttributes( { heading: newHeading } );
		}

		return (
			<div className={ props.className }>
				<div className="medium-inner">
					<div className="heading-content__heading">
						<RichText
							tagName="h2"
							keepPlaceholderOnFocus={ true }
							onChange={ handleChangeHeading }
							placeholder={ __( 'Add a title for this block' ) }
							value={ props.attributes.heading } />
					</div>
					<div className="heading-content__content">
						<InnerBlocks allowedBlocks={ [ 'core/paragraph', 'core/button', 'core/list' ] } />
					</div>
				</div>
			</div>
		);
	},

	/*
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="heading-content-inner">
					<div className="heading-content__heading">
						<RichText.Content tagName="h2" value={ props.attributes.heading } />
					</div>
					<div className="heading-content__content">
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
