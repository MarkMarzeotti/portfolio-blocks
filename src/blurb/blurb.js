/**
 * BLOCK: portfolio - blurb
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

// const validAlignments = [ 'full' ];

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
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
registerBlockType( 'portfolio/blurb', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Blurb' ), // Block title.
	icon: 'align-none', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
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
		__( 'blurb' ),
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
				<div className="blurb-inner">
					<div className="blurb__content">
						<RichText
							tagName="h2"
							keepPlaceholderOnFocus={ true }
							onChange={ handleChangeHeading }
							placeholder={ __( 'Add a title for this block' ) }
							value={ props.attributes.heading } />
						<hr />
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
				<div className="medium-inner">
					<div className="blurb__content">
						<RichText.Content tagName="h2" value={ props.attributes.heading } />
						<hr />
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
