---
title: » Matz為什麼要創造Ruby？
date: 2014-10-02 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
---

[Matz](https://twitter.com/yukihiro_matz)是誰？他是**Ruby的爸爸-Yukihiro Matsumoto(松本行弘)**，也是我要讀的這本【The Ruby Programming Language】的原著作者之一。英語系的Ruby社群，都叫他Matz。

那究竟...**「Matz為什麼要發明Ruby這個程式語言呢？」**

【The Ruby Programming Language】p.3 節錄一段Matz所敘：

> 『發明Ruby之前，我學習過許多程式語言，但是沒有一個可以完全滿足我，他們不是太醜陋，就是太苛刻、太複雜或者太簡單。身為一個程式員，我想要發明一個能夠滿足我自己的語言。......Ruby語言的發展過程中，我將所有精力都用在讓編程更快速以及更容易。......多數程式員都覺得Ruby是一個優雅並且容易使用的語言，使用它來撰寫程式是一件令人愉快的事。』(......有省略一些字句)

確實，某樣東西的發明，一開始可能都只是為了解決個人的困擾，而Ruby的發明，讓許多程式員很喜歡，書中提到Matz的Ruby設計理念，是希望Ruby中的所有功能，都能**按照一般程式員(包含Matz本人)所預期的運作方式而設計**。

第一次看到這句**『都能按照一般程式員(包含Matz本人)所預期的運作方式而設計』**時，還不太能體會他的意境，畢竟自己本身並非本科生，沒有碰過其他語言。但，因緣際會參加了今年日本的Ruby大型研討會-[Ruby Kaigi 2014](http://rubykaigi.org/2014)時，聽到了[Matz的Keynote](http://rubykaigi.org/2014/presentation/S-YukihiroMatzMatsumoto)中一句話，突然間頓悟了XD

Matz在介紹Ruby3.0的構想時說到一句(約在影片33分20秒處)：

**『Computer, You should know me!!!』**

**『Computer, You should know me!!!』**

**『Computer, You should know me!!!』**

(當時Matz是說日文，而且沒有說三遍XD，但因為對我來說太震撼了，所以寫三遍XD！我是從翻譯機裡聽到的，懂日文的朋友可以幫我聽聽翻譯機翻得對不對XD)

<iframe width="640" height="360" src="https://www.youtube.com/embed/zt56zjNf84Q?rel=0&amp;controls=1&amp;showinfo=1" frameborder="0" allowfullscreen></iframe>

對呀，程式語言是我們跟電腦溝通的語言，電腦也是人類發明的，那我們用接近人類自己的語言，讓電腦來理解我，應該很合理才對呀！

說半天，很想趕快體會看看，什麼叫做接近人類的語言？讓我們先來欣賞幾段簡單的Ruby的程式碼：

~~~ruby
3.times {print "Ruby ❤!"}  
  
這行程式執行結果是 => Ruby ❤!Ruby ❤!Ruby ❤!  
~~~

~~~ruby
1.upto(9) {|num| print num}  
  
這行程式執行結果是 => 123456789  
~~~


確實好像讀得懂英文就可以讀懂它在幹嘛了！第一個說要『印出三次(3.times)的Ruby❤!』、第二個說要『從1印到9』，果然有符合用接近人類自己的語言，讓電腦來理解自己！

這本書的第一章是概述，簡略說明Ruby特色，我會在下一篇文章中開始進入Ruby的語彙結構，我想，先了解Ruby這語言怎麼會誕生，再開始深入探討，應該會更有感受，keep going！。

今天是第二天，想對自己說：

> Do a little more of what you want to do every day, until your idea becomes what's real. -Gwen Elliot

一天寫一點程式、看一點書，持續下去，理想會實現的！


延伸閱讀：[關於Ruby](https://www.ruby-lang.org/zh_tw/about/)，這是Ruby中文官方網站，內有提到Matz理念，以及Ruby成長概況等。