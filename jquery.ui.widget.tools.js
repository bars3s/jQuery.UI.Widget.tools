(function ($) {

    var W = $.Widget;

    /**
     * Shortcut for $.proxy(func,this)
     * @param {Function} func
     * @return {Function}
     */
    W.prototype._proxy = function (func) {
        return $.proxy(func, this);
    };

    /**
     * Wrapper for console.log('log', this, arguments...)
     * @return {jQuery.Widget}
     */
    W.prototype._log = function () {
        var args = [this.widgetName + ':', this.element, this];
        args = args.concat(Array.prototype.slice.call(arguments, 0));
        console.log.apply(console, args);
        return this;
    };

    if (typeof W.prototype['_delay'] == 'undefined') {
        /**
         * Shortcut for setTimeout($.proxy(func,this), delay || 0)
         * @param {Function} func
         * @param {Integer} [delay]
         * @return {Number} timeoutId
         */
        W.prototype._delay = function (func, delay) {
            return setTimeout($.proxy(func, this), delay || 0);
        };
    }

    /********************************************************/
    var buildElemClass = function (prefix, elemName) {
        return prefix + '__' + elemName;
    };

    var buildModClass = function (prefix, modName, modValue) {
        return prefix + '_' + modName + (modValue ? '_' + modValue : '');
    };

    var buildModElemClass = function (prefix, elemName, modName, modValue) {
        return buildModClass(buildElemClass(prefix, elemName), modName, modValue);
    };

    /**
     * Find "element" of "block" in "context"
     * @param {String} elemName
     * @param {jQuery} [ctx]
     * @return {jQuery}
     */
    W.prototype._elem = function (ctx, elemName) {
        if (typeof elemName == 'undefined') {
            elemName = ctx;
            ctx = this.element;
        }

        return ctx.find('.' + buildElemClass(this.widgetName, elemName));
    };

    /**
     * Get class for block modName with modValue
     * @param {String} modName
     * @param {String} [modValue]
     * @return {String}
     */
    W.prototype._getModClass = function (modName, modValue) {
        return buildModClass(this.widgetName, modName, modValue);
    };

    /**
     * Get class for block element modName with modValue
     * @param {String} elemName
     * @param {String} modName
     * @param {String} [modValue]
     * @return {String}
     */
    W.prototype._getModElemClass = function (elemName, modName, modValue) {
        return buildModElemClass(this.widgetName, elemName, modName, modValue);
    }

})(jQuery);
