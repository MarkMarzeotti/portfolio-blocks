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

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText } = wp.editor;
const { PanelBody, ColorPalette } = wp.components;

/**
 * Register: aa Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'portfolio/blurb', {
	title: __( 'Blurb' ),
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
		color: {
			type: 'string',
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
		const colors = [
			{ name: 'Transparent', color: 'transparent' },
			{ name: 'Grey', color: '#f4f4f4' },
		];

		let background = '';

		if ( props.attributes.color ) {
			background = <div className="background" style={ { backgroundColor: props.attributes.color } }></div>;
		}

		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Background Color' ) }>
					<ColorPalette
						colors={ colors }
						value={ props.attributes.color }
						onChange={ ( color ) => props.setAttributes( { color } ) }
					/>
				</PanelBody>
			</InspectorControls>,
			<div key="2" className={ props.className }>
				{ background }
				<div className="blurb-inner">
					<div className="blurb__content">
						<RichText
							tagName="h2"
							keepPlaceholderOnFocus={ true }
							onChange={ ( heading ) => props.setAttributes( { heading } ) }
							placeholder={ __( 'Add a title for this block' ) }
							value={ props.attributes.heading } />
						<hr />
						<InnerBlocks allowedBlocks={ [ 'core/paragraph', 'core/button', 'core/list' ] } />
					</div>
				</div>
			</div>,
		];
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
			<div className={ props.className } style={ { backgroundColor: props.attributes.color } }>
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
