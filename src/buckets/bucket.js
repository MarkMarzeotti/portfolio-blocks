/**
 * BLOCK: portfolio - buckets
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

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
registerBlockType( 'portfolio/bucket', {
	title: __( 'Bucket' ),
	icon: 'menu-alt',
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
			selector: 'h3',
			type: 'array',
		},
	},
	keywords: [
		__( 'bucket' ),
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
		return (
			<div className="buckets__item">
				<RichText
					tagName="h3"
					keepPlaceholderOnFocus={ true }
					onChange={ ( newHeading ) => props.setAttributes( { heading: newHeading } ) }
					placeholder={ __( 'Add a title for this bucket' ) }
					value={ props.attributes.heading } />
				<InnerBlocks allowedBlocks={ 'core/paragraph' } />
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
			<div className="buckets__item">
				<RichText.Content tagName="h3" value={ props.attributes.heading } />
				<InnerBlocks.Content />
			</div>
		);
	},
} );
