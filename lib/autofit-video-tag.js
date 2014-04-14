/**
 * @preserve autofit-video-tag.js: Autofit video height based on image defined
 * as poster attribute
 *
 * @version 0.0.1
 * @copyright Masayoshi Sekimura [All Rights Reserved]
 * @license MIT License (see LICENSE)
 */

/*jslint browser:true, node:true*/

(function (window, undefined) {

function AutofitVideoTag(el, options) {
  'use strict';
  options = options || {autofit: true};
  this.el = el;
  this.posterUrl = el.getAttribute('poster');

  if (options.autofit) {
    this.fit();
  }
}

AutofitVideoTag.prototype.fit = function () {
  var self = this, img = new Image();
  img.style.visibility = 'hidden';
  img.style.width = '100%';
  img.onload = function SetVideoHeight() {
    self.el.style.height = this.height + 'px';
    self.el.parentNode.removeChild(img);
  }
  img.src = this.posterUrl;
  this.el.parentNode.insertBefore(img, this.el.nextSibling);
};

AutofitVideoTag.fitAll = function(selector, options) {
  'use strict';
  return [].forEach.call(document.querySelectorAll(selector), function(el) {
    return new AutofitVideoTag(el, options);
  });
};

window.AutofitVideoTag = AutofitVideoTag;

})(window);
