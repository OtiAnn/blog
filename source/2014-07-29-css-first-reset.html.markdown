---
title: » 噢原來CSS要先Reset
date: 2014-07-29 10:14 UTC
tags: CSS
---

各大瀏覽器之間，龍爭虎鬥，勾心鬥角(?)

每個瀏覽器html標籤樣式的預設值都不一樣，

為解決兵家之爭，必先統一！

CSS Tools: Reset CSS


最近上了前端的基礎課程，才發現在自學的過程中，漏了不少觀念呢！
網路上的資源雖然多，但沒有人引導的話，磚牆雖然能蓋起來，但中間的洞很難避免啊！

自己在開發網頁的過程中，都是以Google Chrome為主，偶爾打開Safari瞧瞧，沒太大不同就不管了(囧..)


###CSS Tools: Reset CSS

以後開發網頁的第一件事，就是先CSS Reset！

網路上有許多寫好的reset.css，以下是世界知名的CSS大師[Eric A. Meyer整理出的CSS Reset](http://meyerweb.com/eric/tools/css/reset/)檔：

~~~css
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
~~~

只要在CSS加上這個檔，所有瀏覽器預設值都統一了！

只不過，因為一切都統一了，預設h1,h2,...這些字級也都統一了，
所以接下來得自己給這些h1,h2,...重新定義才行！
雖然有些麻煩，但至少在各家瀏覽器上所看見的Style就會一致囉！