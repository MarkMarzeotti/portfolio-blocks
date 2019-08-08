/**
 * BLOCK: Work
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const iPhone = `<svg version="1.1" viewBox="0 0 1411 2664" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
	<defs>
		<path id="b" d="m224.59 3.4106e-13c152.69 0 651.52 1.4399e-13 780.02 1.4399e-13 128.5 0 228.39 51.283 228.39 224.53v2008.7c0 92.503-4.4536 253.15-216.95 253.15h-822.64c-92.672 0-193.41-55.867-193.41-214.35 4.8125e-15 -158.49 4.9254e-15 -1885.3 0-2047.5 0-184.9 115.54-224.53 224.59-224.53z" />
		<filter id="f" x="-10.9%" y="-5.4%" width="121.9%" height="110.9%">
			<feOffset dx="0" dy="0" in="SourceAlpha" result="shadowOffsetOuter1" />
			<feGaussianBlur in="shadowOffsetOuter1" result="shadowBlurOuter1" stdDeviation="45" />
			<feColorMatrix in="shadowBlurOuter1" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" />
		</filter>
		<path id="a" d="m777.87 88.005c45.186 0.63606 65.023-39.443 65.551-67.423 0-14.841 4.278-19.718 21.002-19.718h96.744c55.36 0 119 25.442 119 123.4v2088.8c0 78.872-42.004 123.4-135.56 123.4h-819.08c-95.45 0-125.36-57.882-125.36-121.49v-2097.7c0-80.144 57.278-117.04 110.74-117.04h107.55c15.274 0 18.456 8.9049 18.456 19.082 0 10.177 5.4903 67.631 68.733 68.059 53.459 0 411.76 0.63606 472.22 0.63606z" />
	</defs>
	<g fill="none" fill-rule="evenodd">
		<g transform="translate(-1443 -285)">
			<g transform="translate(1532 374)">
				<use fill="black" filter="url(#f)" xlink:href="#b" />
				<use fill="#FFFFFF" fill-rule="evenodd" xlink:href="#b" />

				<path d="m428.81 2387.8h374.1c5.622 0 10.18 4.5564 10.18 10.177 0 5.6206-4.5575 10.177-10.18 10.177h-374.1c-5.622 0-10.18-4.5564-10.18-10.177 0-5.6206 4.5575-10.177 10.18-10.177z" fill="#F0F3F5" />
				<g transform="translate(536.97 100.5)" fill="#F0F3F5">
					<path d="m10.816 7.6327h129.79c5.9734 0 10.816 4.8412 10.816 10.813 0 5.9719-4.8424 10.813-10.816 10.813h-129.79c-5.9734 0-10.816-4.8412-10.816-10.813-7.3153e-16 -5.9719 4.8424-10.813 10.816-10.813z" />
					<ellipse cx="208.68" cy="17.81" rx="17.814" ry="17.81" />
				</g>
			</g>
		</g>
	</g>
</svg>`;

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { InnerBlocks, MediaUpload } = wp.editor;
const { IconButton } = wp.components;

const ALLOWED_MEDIA_TYPES = [ 'image' ];

/**
 * Register: Work Gutenberg Block.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}
 */
registerBlockType( 'portfolio/work', {
	title: __( 'Work' ),
	icon: 'align-none',
	category: 'common',
	attributes: {
		screenshotID: {
			type: 'integer',
		},
		screenshot: {
			type: 'string',
		},
		screenshotAlt: {
			type: 'string',
		},
	},
	keywords: [
		__( 'work' ),
		__( 'content' ),
		__( 'portfolio' ),
	],
	edit: function( props ) {
		let screenshot = '';
		let icon = 'upload';
		let label = __( 'Upload Screenshot' );

		if ( props.attributes.screenshotID ) {
			screenshot = <img src={ props.attributes.screenshot } alt={ props.attributes.screenshotAlt } />;
			icon = 'edit';
			label = __( 'Edit Screenshot' );
		}

		return (
			<div className={ props.className }>
				<div className="work">
					<div className="work__content">
						<InnerBlocks allowedBlocks={ [ 'core/heading', 'core/paragraph', 'core/button', 'core/list' ] } />
					</div>
					<div className="work__image">
						<div className="work__iphone" dangerouslySetInnerHTML={ { __html: iPhone } } />
						<div className="work__screenshot">
							{ screenshot }
						</div>
						<MediaUpload
							onSelect={ ( imageObject ) => {
								props.setAttributes( {
									screenshotID: imageObject.id,
									screenshot: imageObject.sizes.full.url,
									screenshotAlt: imageObject.alt,
								} );
							} }
							allowedTypes={ ALLOWED_MEDIA_TYPES }
							value={ props.attributes.screenshotID }
							render={ ( { open } ) => (
								<IconButton
									isDefault
									label={ label }
									icon={ icon }
									onClick={ open }
								>{ label }</IconButton>
							) }
						/>
					</div>
				</div>
			</div>
		);
	},
	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="work">
					<div className="work__content">
						<InnerBlocks.Content />
					</div>
					<div className="work__image">
						<div className="work__iphone" dangerouslySetInnerHTML={ { __html: iPhone } } />
						<div className="work__screenshot">
							<img src={ props.attributes.screenshot } alt={ props.attributes.screenshotAlt } />
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
