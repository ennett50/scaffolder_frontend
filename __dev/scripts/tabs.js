/**
 * @description Tabs - default tabs for UI
 * @param parentContainer - default value '.js-tab', editable
 * @constructor Tabs
 */
function Tabs(parentContainer) {
    this.parentContainer = parentContainer || '.js-tabs';
}

var tabs = {
    /**
     * @name init - external method
     * @description init all tabs on the page.
     */
    init: function () {
        var $container = $(this.parentContainer);
        $container.each(function () {
            var $groupTabs = $(this),
                $tabs = $groupTabs.find('.tab-item'),
                nameTab = $groupTabs.data("tab-name"),
                $tabsContainer = $("[data-tab-content='" + nameTab + "'] [data-tab]");


            $tabs.each(function () {
                var $this = $(this);
                var id = "js-" + nameTab + "-" + $this.attr("href").slice(1);
                $this.prop("id", id);
            });
            // set some verification for tabs
            tabs._verification($tabs, $tabsContainer);
            // init handler for click on current tab
            tabs._tabHandlerClick($tabs, nameTab);
        });
    },
    /**
     * @param $tabs - all tabs relative to parent
     * @param $tabsContainer - all tabs container relative to parent
     * @private true
     */
    _verification : function($tabs, $tabsContainer){
        if (!$tabs.length) {
            console.warn('[UI Tab FRODO].length = ' + $tabs.length + ', but container exist for them');
            return;
        }
        if (!$tabs.filter('.__active').length) {
            $tabs.eq(0).addClass('__active');
        }
        if (!$tabsContainer.filter('.__hidden').length) {
            $tabsContainer.not($tabsContainer.eq(0)).addClass('__hidden');
        }
    },
    /**
     * @param $tabs - all tabs relative to parent
     * @param nameTab - name data attribute of parent [data-tab-name]
     * @private true
     */
    _tabHandlerClick : function($tabs, nameTab){
        $tabs.off('click.tab') //protect from double initialization
            .on("click.tab", function (e) {
            e.preventDefault();
            _setTab($(this).attr("href").slice(1));
        });
        var _setTab = function (target) {
            var $tabContainer = $('[data-tab="' + target + '"]'),
                $tabs = $('#js-' + nameTab + "-" + target);
            $tabs.addClass('__active').siblings().removeClass('__active');
            $tabContainer.removeClass('__hidden').addClass('__active').siblings().removeClass('__active').addClass('__hidden');

            tabs._triggersWindow(nameTab, target, $tabs);
        };
    },
    /**
     * @param nameTab - name data attribute of parent [data-tab-name]
     * @param target - current tab
     * @param $tabs - all tabs relative to parent
     * @private true
     */
    _triggersWindow : function(nameTab, target, $tabs){
        // trigger event and execute callback
        $(window).trigger("tabsChange", {
            group: nameTab,
            tab: target,
            tabId: $tabs.attr('id')
        });
    }
};
Tabs.prototype = tabs;

var tabs = new Tabs();
tabs.init();