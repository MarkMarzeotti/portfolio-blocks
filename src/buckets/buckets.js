/**
 * BLOCK: portfolio - buckets
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
const { InnerBlocks } = wp.editor;
const { PanelBody, ColorPalette } = wp.components;

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
registerBlockType( 'portfolio/buckets', {
	title: __( 'Buckets' ),
	icon: 'editor-table',
	category: 'common',
	// supports: {
	// 	align: validAlignments,
	// },
	attributes: {
		// align: {
		// 	type: 'string',
		// 	default: 'full',
		// },
	},
	keywords: [
		__( 'buckets' ),
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

		if ( props.attributes.color ) {
			props.className = props.className + ' background-' + props.attributes.color;
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
				<div className="buckets-inner">
					<InnerBlocks allowedBlocks={ 'portfolio/bucket' } />
				</div>
			</div>
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
			<div className={ props.className }>
				<div className="medium-inner">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
