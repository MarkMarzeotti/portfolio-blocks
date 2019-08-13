/**
 * BLOCK: Blurb
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { InspectorControls } = wp.editor;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText } = wp.editor;
const { PanelBody, ColorPalette } = wp.components;

const withSelect = wp.data.withSelect;
const ifCondition = wp.compose.ifCondition;
const compose = wp.compose.compose;
const introHeadingToggle = function( props ) {
	return wp.element.createElement(
		wp.editor.RichTextToolbarButton, {
			icon: 'arrow-up-alt2',
			title: 'Intro heading',
			onClick: function() {
				props.onChange( wp.richText.toggleFormat(
					props.value,
					{ type: 'portfolio-blocks/intro-heading' }
				) );
			},
			isActive: props.isActive,
		}
	);
};

const ConditionalButton = compose(
	withSelect( function( select ) {
		return {
			selectedBlock: select( 'core/editor' ).getSelectedBlock(),
		};
	} ),
	ifCondition( function( props ) {
		return (
			props.selectedBlock &&
			props.selectedBlock.name === 'portfolio-blocks/blurb'
		);
	} )
)( introHeadingToggle );

wp.richText.registerFormatType(
	'portfolio-blocks/intro-heading', {
		title: 'Intro heading',
		tagName: 'span',
		className: 'intro-heading',
		edit: ConditionalButton,
	}
);

/**
 * Register: Blurb Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'portfolio-blocks/blurb', {
	title: __( 'Blurb' ),
	icon: 'align-none',
	category: 'common',
	keywords: [
		__( 'blurb' ),
		__( 'content' ),
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
				<div className="blurb">
					<div className="blurb__content">
						<RichText
							tagName="h2"
							keepPlaceholderOnFocus={ true }
							onChange={ ( heading ) => props.setAttributes( { heading } ) }
							placeholder={ __( 'Add a title for this block' ) }
							value={ props.attributes.heading } />
						<hr />
						<InnerBlocks allowedBlocks={ [ 'core/paragraph', 'core/button', 'core/list', 'core/quote' ] } />
					</div>
				</div>
			</div>,
		];
	},
	save: function() {
		return <InnerBlocks.Content />;
	},
} );
