<?php
function revenueflex_text_render($args) {
    $options = get_option( 'revenueflex_settings'.$args['pageName'] ); ?>
    <?php if($args['text_before']) { ?> 
        <p><?php echo esc_attr($args['text_before']); ?></p>
    <?php } ?>
    <input type='text' 
           name="<?php echo esc_attr($args['name']); ?>"
           id="<?php echo esc_attr($args['id']); ?>" 
           placeholder='<?php echo esc_attr($args['placeholder']); ?>' 
           value='<?php echo esc_attr($options[$args['value']]); ?>'>
	<?php
}
function revenueflex_settings_section_callback($pageRevenueflex) { 
   if($pageRevenueflex['id'] == 'revenueflex_startPage_section') {
        echo '<p>'.esc_html__( 'Auto Ad Inserter manages your ad placements for each page using an AI based approach.', 'revenueflex' ).'</p>';
    }
}