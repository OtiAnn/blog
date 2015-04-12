---
title: » 在Ruby中，萬事萬物都是物件 => true
date: 2014-10-14 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
---

從Ruby女孩(5)到Ruby女孩(13)，這九篇文章，都在介紹【The Ruby Programming Language】這本書的第三章內容，在這邊說明一下，不然怕大家心裡默默說：我到底看了啥？

**【The Ruby Programming Language】**

第三章：資料型別與物件

3.1 數字 [#Ruby女孩(5)](/2014/10/05/ruby-girl-5-ruby-math-intro/)

3.2 文字 [#Ruby女孩(6~8)](/2014/10/06/ruby-girl-6-ruby-string-intro/)

3.3 陣列 [#Ruby女孩(9~10)](/2014/10/09/ruby-girl-9-ruby-array-life-example/)

3.4 雜湊 [#Ruby女孩(11)](/2014/10/11/ruby-girl-11-ruby-hash-intro/)

3.5 範圍 [#Ruby女孩(12)](/2014/10/12/ruby-girl-12-ruby-range-intro/)

3.6 符號 [#Ruby女孩(13)](/2014/10/13/ruby-girl-13-ruby-string-vs-symbol/)

3.7 true、false與nil #今天

3.8 物件 #今天提一些


是的，其實我們已經進入這章節的尾聲了，然而這本書還有一百章(誤)，照這個進度大概在鐵人賽是寫不完的(遠望)。

好的，尾聲有一個特大主題**『物件』**，在第一次遇到Ruby時，就有前輩跟我說，在Ruby的世界裡，萬事萬物都是物件！哈，這個主題很大，也無敵重要，所以在進入之前我們先來喘口氣，看看3.7的true、false、nil！

##true、false與nil

> 『true、false與nil是Ruby的關鍵字(有些人稱保留字)。true與false是兩個布林值，可用來表示真與假、是與非、開與關。nil是一個特殊值專門用於表示不存在。』(p.75)

true不等於1；false不等於0，在Ruby中，true是一個特殊的class

~~~ruby
true.class => TrueClass  
false.class => FalseClass  
1.class => Fixnum  
0.class => Fixnum  
~~~

看到了嗎？真、假與1、0是不一樣的！你也可以注意到，Ruby當中是沒有Boolean類別的！

~~~ruby
nil.class => NilClass  
~~~

當Ruby需要一個Boolean值時，nil的行為如同false，而nil與false之外的就會是true。`.nil?`是一個查詢一個值是否為nil的方法，例如：

~~~ruby
a = {:name=>"Annie"} => {:name=>"Annie"}  
a[:age].nil? => true  
#因為沒有定義:age這個key，所以查詢這個key是不是不存在，執行結果就是true。  
~~~

好的，看完了真、假與不存在，接下來我們來提一些Ruby中的物件概念。

##物件(Object)

> 『Ruby是一種純物件導向語言：所有的值皆為物件...Ruby中，所有的物件皆繼承自一個名為Object類別，而且共享該類別所定義的方法。』(p.76)

身為一個要追根究底查明真相的初學者，當然不放過這段文字！真的嗎？大家都繼承自Object嗎？我們用`.superclass`這個方法來查查大家的父類別：

![Ruby數字類別的分層結構](http://ithelp.ithome.com.tw/upload/images/20141005/20141005190053543124e558797_resize_600.png)

還記得這個圖嗎？來自[Ruby女孩(5)](/2014/10/05/ruby-girl-5-ruby-math-intro/)。`.superclass`可以幫類別找它爸爸，例如：

~~~ruby
Fixnum.superclass  => Integer  
Integer.superclass  => Numeric  
Numeric.superclass  => Object #喔喔喔祖先有Object  
  
String.superclass  => Object  
Array.superclass  => Object  
Hash.superclass  => Object  
NilClass.superclass  => Object  
TrueClass.superclass  => Object  
~~~

上面這些類別爸爸都是Object，有沒有可以直接查所有祖先的方法呢？有，用`.ancestors`，例如：

~~~ruby
Fixnum.ancestors  
=> [Fixnum, Integer, Numeric, Comparable, Object, Kernel, BasicObject]  
~~~

OK，好吧真的證明在Ruby中，萬事萬物都是物件...

路過的阿嬤：『阿都是物件可以幹嘛？』

對吖！到底可以幹嘛？發現接下來的內容有點深，需要一點時間消化...阿嬤我們明天再來研究，Ruby中所有物件的共同特點吧！

---

14天了，今天參加了Github在臺北辦的[Patchwork Taipei](http://github.kktix.cc/events/patchwork-oct-2014)活動，很振奮，有機會再分享心得，但因此，想到了這句話：

> Whenever you see a successful business, someone once made a courageous decision. - Peter Drucker

我也需要勇氣！