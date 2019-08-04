/**
 * BLOCK: Testimonial
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText } = wp.editor;
const { PanelBody, ColorPalette } = wp.components;

/**
 * Register: Testimonial Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'portfolio/testimonial', {
	title: __( 'Testimonial' ),
	icon: 'format-quote',
	category: 'common',
	attributes: {
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
		__( 'testimonial' ),
		__( 'quote' ),
		__( 'portfolio' ),
	],
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
				<div className="testimonial">
					<div className="testimonial__content">
						<RichText
							tagName="h2"
							keepPlaceholderOnFocus={ true }
							onChange={ ( heading ) => props.setAttributes( { heading } ) }
							placeholder={ __( 'Add a title for this block' ) }
							value={ props.attributes.heading } />
						<hr />
						<InnerBlocks allowedBlocks={ [ 'core/quote' ] } />
					</div>
				</div>
			</div>,
		];
	},
	save: function( props ) {
		return (
			<div className={ props.className } style={ { backgroundColor: props.attributes.color } }>
				<div className="testimonial">
					<div className="testimonial__content">
						<RichText.Content tagName="h2" value={ props.attributes.heading } />
						<hr />
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	},
} );
