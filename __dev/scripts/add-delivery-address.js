$(document).ready(() => {
    $('body').on('click', '.js-lk-address-add', function(e){
        e.preventDefault();
        var $blank = $('.js-lk-address-item-blank');
        $blank.before($blank.clone(false).removeClass('hidden').addClass('js-lk-address-item-new'));
        var $block = $('.js-lk-address-item-new');
        $block.removeClass('js-lk-address-item-blank');
        $( ".js-combobox" ).combobox();
        $.each($('input[type="text"], input[type="hidden"]:not(".js-service-hidden"), select', $block), function() {
            $(this).prop("disabled", false);
        });
        var $index = $(this).attr('data-next');
        $(this).hide();
        $(this).attr('data-next', parseInt($index) + 1);
        $('.js-address-action-type', $block).val('save');

        $.each($block.find('.js-blank-new-input'), function() {
            var _this = $(this);
            name = _this.attr('name').replace('{index}', $index);
            _this = $(this).attr('name', name);
        });
        $block.find('.js-lk-address-item-title input').focus();
        return true;
    });
});