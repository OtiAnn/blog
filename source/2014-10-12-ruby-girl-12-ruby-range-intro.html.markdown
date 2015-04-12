---
title: » Range讓我知道..我是草莓族，Ruby不是QQ
date: 2014-10-12 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
---

還記得我們在[Ruby女孩(9)](/2014/10/09/ruby-girl-9-ruby-array-life-example/)的時候寫過一個大樂透的程式：


~~~ruby
(1..49).to_a.sample(6)  
  
=> [37, 8, 32, 1, 48, 49]  
~~~

這行程式中有一個東西都沒有正式介紹過，就是**範圍(Range)**。

Ruby的範圍有兩種寫法：

~~~ruby
(1..5)   #1,2,3,4,5  
(1...5)  #1,2,3,4  
~~~

以前學統計或畫長條圖時，常常有範圍要含下不含上，還是含上不含下之類的規定，很容易搞混！但是Ruby真的很貼心，我非常喜歡第一種(兩個點)的寫法，因為非常直覺，通常我們說：「請從1到5選一個數！」，很直覺的就是有1也有5，就不需要去想到底是要不要寫5之類的。

本來以為範圍一定就是指數字的範圍，看了書才知道，原來英文字也可以有範圍，例如：

~~~ruby
("A".."Z") #就是英文字母大寫A~Z共26個字  
~~~

如果在範圍的端點(起點與終點)的類別有定義`.succ`(後繼者)的方法(String、Integer都有)，就可以使用迭代的方法。先說說什麼是`.succ`：

~~~ruby
1.succ => 2  
'A'.succ => 'B'  
'Annie'.succ => 'Annif'  
5566.succ.succ => 5568  
~~~

從上面例子可以看出，`.succ`就是找到該值的下一個值，但是浮點數(Float)這個類別沒有：

~~~ruby
1.3.succ  
NoMethodError: undefined method `succ' for 1.3:Float  
~~~

書上特別說明，只有在離散(discrete)的類別中才有此方法，浮點數屬於連續(continuous)的類別，它的的下一個數可能1.31也可能1.30001，所以就沒有`.succ`方法。

那該如何迭代呢？我們可以：

~~~ruby
r = 'A'..'E'  
r.each { |char| print char }  
  
=> ABCDE  
~~~

因為離散的字母可以用`.succ`的方式找到下一個，才能夠使用迭代，如果把範圍改成浮點數就會噴錯：

~~~ruby
r = 1.1..1.9  
r.each { |char| print char }  
  
TypeError: can't iterate from Float  
~~~

範圍也提供了`.include?`、`.member?`、`.cover?`這三個同義的方法來判斷某值有沒有被包含在範圍中，例如下面我來定義個草莓族的年代是1980~1989，然後我用昨天說的雜湊hash，來把我和ruby的生日存起來，再來判斷我跟ruby誰是草莓族XD

~~~ruby
strawberry = 1980..1989  
annie_birthday = {:year => 1989, :month => 3, :day => 30}  
ruby_birthday = {:year => 1993, :month => 2, :day => 24}  
  
strawberry.include? annie_birthday[:year] => true  
strawberry.include? ruby_birthday[:year] => false  
  
#由此可知Annie是草莓族，ruby不是XD  
~~~

---

第12天！

> Be kind; everyone you meet is fighting a hard battle.

每個人都正在打一場硬仗，謝謝給我回饋的前輩與朋友們，我會繼續加油！