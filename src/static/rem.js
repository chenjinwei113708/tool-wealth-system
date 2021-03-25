/*
 * @Date: 2020-05-22 14:12:52
 * @LastEditTime : 2020-07-01 15:52:33
 * @Description: rem 计算
 */

(function () {
  window.J_IS_MOBILE = false;
  var docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;

      // 限制最大屏宽度为 1920px
      if (clientWidth > 1920) {
        clientWidth = 1920;
      }
      docEl.style.fontSize = (clientWidth * 0.1) + 'px';

      window.J_IS_MOBILE = clientWidth <= 750;
    };
  recalc();
  window.addEventListener(resizeEvt, recalc, false);

  var eles = ['header', 'footer', 'section', 'aside', 'article', 'nav', 'hgroup', 'figure', 'figcaption', 'time', 'mark', 'output', 'meter'];
  for (var i = 0, m = eles.length; i < m; i++) {
    document.createElement(eles[i]);
  }
})();
