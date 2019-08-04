/**
 * BLOCK: Page Heading
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InspectorControls } = wp.editor;
const { PanelBody, TextControl } = wp.components;

/**
 * Register: Page Heading Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'portfolio/page-heading', {
	title: __( 'Page Heading' ),
	icon: 'align-none',
	category: 'common',
	attributes: {
		heading: {
			source: 'children',
			selector: 'h1',
			type: 'array',
		},
		headingBackground: {
			type: 'string',
		},
	},
	keywords: [
		__( 'page' ),
		__( 'heading' ),
		__( 'portfolio' ),
	],
	edit: function( props ) {
		return [
			<InspectorControls key="1">
				<PanelBody title={ __( 'Settings' ) }>
					<TextControl
						format="string"
						label={ __( 'Heading Background' ) }
						onChange={ ( headingBackground ) => props.setAttributes( { headingBackground } ) }
						value={ props.attributes.headingBackground }
					/>
				</PanelBody>
			</InspectorControls>,
			<div className={ props.className } key="2">
				<div className="page-heading">
					<div className="page-heading__content">
						<span>{ props.attributes.headingBackground }</span>
						<RichText
							tagName="h1"
							keepPlaceholderOnFocus={ true }
							onChange={ ( heading ) => props.setAttributes( { heading } ) }
							placeholder={ __( 'Add a title for this block' ) }
							value={ props.attributes.heading } />
					</div>
				</div>
			</div>,
		];
	},
	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="page-heading">
					<div className="page-heading__content">
						<span>{ props.attributes.headingBackground }</span>
						<RichText.Content tagName="h1" value={ props.attributes.heading } />
					</div>
				</div>
			</div>
		);
	},
} );
