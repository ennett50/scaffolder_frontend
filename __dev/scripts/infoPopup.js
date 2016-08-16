
/**
 * @description info popup for filter, menu and etc
 * @param selectorShow - selector that init handler click
 * @param selectorHide - selector that close popup info
 */
function infoPopup(selectorShow, selectorHide) {
    this.selectorShow = selectorShow || '.js-show-info-popup';
    this.selectorHide = selectorHide || '.js-popup-info-close';
}
const popup = {
    init() {
        let btns = $(this.selectorShow);
        btns.each(function () {
            var self = $(this),
                idPopup = self.data('popup-info'),
                currentPopup = $(idPopup);
            popup.__popupHandlerClick(self, currentPopup);
        });
        popup.__hide();
    },
    /**
     * @param self - current button
     * @param currentPopup - current info popup
     * @private true
     */
    __popupHandlerClick(self, currentPopup) {
        self.off('click.infoPopup') //protect from double initialization
            .on('click.infoPopup', function (e) {
                e.preventDefault();
                popup.__show(currentPopup);
            })
    },
    /**
     * @param currentPopup - current info popup
     * @private true
     */
    __show(currentPopup) {
        let padding = popup.__fixBody();
        $('body').css({'padding-right': padding});
        currentPopup.fadeIn();
    },
    /**
     * @description count padding right to body
     * @returns {number}
     * @private true
     */
    __fixBody(){
        var body = $('body');
        body.css({'overflow': 'auto'});
        var beforePadding = body.outerWidth();
        body.css({'overflow': 'hidden'});
        var isPadding = body.outerWidth() - beforePadding;

        return isPadding;
    },
    __hide() {
        $('.js-popup-info-close').on('click', function(){
            $('body').css({'padding-right': '', 'overflow': ''});
            $('.popup-info').hide();
        });
    }
};
infoPopup.prototype = popup;

let infoPopups = new infoPopup();
infoPopups.init();