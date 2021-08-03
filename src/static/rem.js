/*
 * @Date: 2020-05-22 14:12:52
 * @LastEditTime : 2020-07-01 15:52:33
 * @Description: rem 计算
 */

(function () {
  window.J_IS_MOBILE = false;
  var maxWidth = 1920;
  var docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;

      // 限制最大屏宽度为 maxWidth px
      if (clientWidth > maxWidth) {
        clientWidth = maxWidth;
      }
      docEl.style.fontSize = (clientWidth / 10) + 'px';

      window.J_IS_MOBILE = clientWidth <= 750;
    };
  recalc();
  window.addEventListener(resizeEvt, recalc, false);

  var eles = ['header', 'footer', 'section', 'aside', 'article', 'nav', 'hgroup', 'figure', 'figcaption', 'time', 'mark', 'output', 'meter'];
  for (var i = 0, m = eles.length; i < m; i++) {
    document.createElement(eles[i]);
  }
})();
