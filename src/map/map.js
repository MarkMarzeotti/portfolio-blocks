/**
 * BLOCK: portfolio - map
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

// const validAlignments = [ 'full' ];

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
// const { RichText } = wp.editor;

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
registerBlockType( 'portfolio/map', {
	title: __( 'Map' ),
	icon: 'location',
	category: 'common',
	attributes: {
		address: {
			type: 'string',
		},
	},
	keywords: [
		__( 'map' ),
		__( 'google map' ),
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
		const MyMapComponent = withScriptjs( withGoogleMap( () =>
			<GoogleMap
				defaultZoom={ 8 }
				defaultCenter={ { lat: 35.239418, lng: -80.8455486 } }
			>
				{ props.isMarkerShown && <Marker position={ { lat: 35.239418, lng: -80.8455486 } } /> }
			</GoogleMap>
		) );

		return (
			<div className={ props.className }>
				<MyMapComponent
					isMarkerShown
					googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
					loadingElement={ <div style={ { height: '100%' } } /> }
					containerElement={ <div style={ { height: '400px' } } /> }
					mapElement={ <div style={ { height: '100%' } } /> }
				/>
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
				<div className="map"></div>
			</div>
		);
	},
} );
