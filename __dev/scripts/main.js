$(document).ready(() => {
    /**
     * init slick gallery for main slider in the index page
     * arrow false
     * dots true
     */
    $('.js-main-slider').slick({
        arrows: false,
        dots: true
    });

    /**
     * init slick gallery for popular products
     * arrow false
     * dots true
     */
    $('.js-popular-slider').slick({
        arrows: false,
        dots: true
    });

    $('.js-catalog-slider').slick({
        arrows: false,
        dots: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 620,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    /**
     * switch subscribe block
     */
    $('.js-switch-form').click((event)=> {
        $(event.currentTarget).toggleClass('__active');
    });

    /**
     * default select - wrap for styled
     */
    $('select:not(".__default")').each(function () {
        $(this).addClass('custom-select').wrap('<div class="js-custom-select custom-select-wrap"></div>');
    });

    /**
     * show/hide detail info from click handler
     */
    $('.js-toggle-btn').each(function () {
        var self = $(this), content = self.next();
        $(this).on('click.toggleContent', function (e) {
            e.preventDefault();
            if (self.attr('data-default') != undefined) {
                self.toggleClass('__active')
            } else {
                if (self.hasClass('__active')) {
                    content.stop().slideUp(300);
                    self.removeClass('__active');
                } else {
                    content.stop().slideDown(300);
                    self.addClass('__active');
                }
            }
        })
    });

    /**
     * Toggle main menu with sublevel
     */
    $('.js-menu-sublevel').each(function () {
        $(this).on('click.showMenuSublevel', function (e) {
            e.preventDefault();
            var self = $(this),
                parentNode = self.parent();
            if (parentNode.hasClass('__active')) {
                parentNode.removeClass('__active');
                parentNode.siblings().show()
            } else {
                parentNode.addClass('__active');
                parentNode.siblings().hide()
            }
        });
    });

    /**
     * mask phone, change header type
     */

    $('input[data-mask]').each(function(){
        $(this).mask($(this).attr('data-mask'));
    });
    $('body').on('click', '.js-change-type-login',function(e) {
        e.preventDefault();
        var type = $(this).attr('data-type');
        var form = $(this).closest('form');
        var login = $('input[name="USER_LOGIN"]');

        $('.js-change-type-login').removeClass('__active');
        $(this).addClass('__active');
        if (type=='phone') {
            login.val('');
            login.attr('placeholder', '+7 (___) ___-__-__');
            login.attr('data-mask', '+7 (999) 999-99-99');
            login.mask(login.attr('data-mask'));
        } else {
            login.val('');
            login.attr('placeholder', 'Логин');
            login.val('');
            login.unmask();
        }
    });

    /**
     *
     */
    compareItems();
    function compareItems(){
        var compareItem = $('.js-compare-item');
        var compareWidth = 0;
        var borderWidth = 2;
        compareItem.each(function(){
            compareWidth+= parseInt($(this).outerWidth())
        });
        $('.js-compare-wrapper').css('min-width', compareWidth + borderWidth)
    }

});
