( function( wp ) {
    var withSelect = wp.data.withSelect;
    var ifCondition = wp.compose.ifCondition;
    var compose = wp.compose.compose;
    var introHeadingToggle = function( props ) {
        return wp.element.createElement(
            wp.editor.RichTextToolbarButton, {
                icon: 'arrow-up-alt2',
                title: 'Intro heading',
                onClick: function() {
                    props.onChange( wp.richText.toggleFormat(
                        props.value,
                        { type: 'portfolio/intro-heading' }
                    ) );
                },
                isActive: props.isActive,
            }
        );
    }
    var ConditionalButton = compose(
        withSelect( function( select ) {
            return {
                selectedBlock: select( 'core/editor' ).getSelectedBlock()
            }
        } ),
        ifCondition( function( props ) {
            return (
                props.selectedBlock &&
                props.selectedBlock.name === 'portfolio/blurb'
            );
        } )
    )( introHeadingToggle );

    wp.richText.registerFormatType(
        'portfolio/intro-heading', {
            title: 'Intro heading',
            tagName: 'span',
            className: 'intro-heading',
            edit: ConditionalButton,
        }
    );
} )( window.wp );