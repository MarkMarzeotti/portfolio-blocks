/**
 * BLOCK: Hero
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, RichText } = wp.editor;

const Rankings = <svg height="120" width="100%">
	<line x1="0" y1="112" x2="16.666%" y2="71" style={ { stroke: '#383838', strokeWidth: '4' } } />
	<circle cx="0" cy="111" r="7" style={ { stroke: '#383838', strokeWidth: '4' } } fill="#ffffff" />
	<line x1="16.666%" y1="71" x2="33.333%" y2="81" style={ { stroke: '#383838', strokeWidth: '4' } } />
	<circle cx="16.666%" cy="71" r="7" style={ { stroke: '#383838', strokeWidth: '4' } } fill="#ffffff" />
	<line x1="33.333%" y1="81" x2="50%" y2="70" style={ { stroke: '#383838', strokeWidth: '4' } } />
	<circle cx="33.333%" cy="81" r="7" style={ { stroke: '#383838', strokeWidth: '4' } } fill="#ffffff" />
	<line x1="50%" y1="70" x2="66.666%" y2="31" style={ { stroke: '#383838', strokeWidth: '4' } } />
	<circle cx="50%" cy="69" r="7" style={ { stroke: '#383838', strokeWidth: '4' } } fill="#ffffff" />
	<line x1="66.666%" y1="31" x2="83.333%" y2="36" style={ { stroke: '#383838', strokeWidth: '4' } } />
	<circle cx="66.666%" cy="30" r="7" style={ { stroke: '#383838', strokeWidth: '4' } } fill="#ffffff" />
	<line x1="83.333%" y1="36" x2="100%" y2="11" style={ { stroke: '#383838', strokeWidth: '4' } } />
	<circle cx="83.333%" cy="35" r="7" style={ { stroke: '#383838', strokeWidth: '4' } } fill="#ffffff" />
	<circle cx="100%" cy="10" r="7" style={ { stroke: '#383838', strokeWidth: '4' } } fill="#ffffff" />
</svg>;

/**
 * Register: Hero Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'portfolio/hero', {
	title: __( 'Hero' ),
	icon: 'chart-line',
	category: 'common',
	attributes: {
		heading: {
			source: 'children',
			selector: 'h1',
			type: 'array',
		},
		subhead: {
			source: 'children',
			selector: 'p',
			type: 'array',
		},
	},
	keywords: [
		__( 'hero' ),
		__( 'content' ),
		__( 'portfolio' ),
	],
	edit: function( props ) {
		return (
			<div className={ props.className }>
				<div className="hero">
					<div className="hero__content">
						<RichText
							tagName="h1"
							keepPlaceholderOnFocus={ true }
							onChange={ ( newHeading ) => props.setAttributes( { heading: newHeading } ) }
							placeholder={ __( 'Add a heading for this block' ) }
							value={ props.attributes.heading } />
						<RichText
							tagName="p"
							className="h4"
							keepPlaceholderOnFocus={ true }
							onChange={ ( newSubhead ) => props.setAttributes( { subhead: newSubhead } ) }
							placeholder={ __( 'Add a subhead for this block' ) }
							value={ props.attributes.subhead } />
						<InnerBlocks allowedBlocks={ 'core/button' } />
					</div>
				</div>
				<div className="ranking">
					{ Rankings }
				</div>
			</div>
		);
	},
	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="hero">
					<div className="hero__content">
						<RichText.Content tagName="h1" value={ props.attributes.heading } />
						<RichText.Content tagName="p" className="h4" value={ props.attributes.subhead } />
						<InnerBlocks.Content />
					</div>
				</div>
				<div className="ranking">
					{ Rankings }
				</div>
			</div>
		);
	},
} );
