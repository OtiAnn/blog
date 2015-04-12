---
title: » 到底字串跟符號什麼時候使用比較好？
date: 2014-10-13 08:58 UTC
tags: 鐵人賽文章
desc: 我是Annie，我參加iThome在2014年舉辦的第七屆iT邦幫忙鐵人賽，連續30天不中斷地記錄自己學習Ruby的歷程，這一系列30篇文章，推薦給跟我一樣初學Ruby約半年的朋友參考。
---

還記得前天，我們在說雜湊(Hash)的時候，有提到雜湊的鍵(key)可以用字串(string)或符號(symbol)來表示，例如：

~~~ruby
hash1 = { "name" => "Annie", "age" => 25 }  
hash2 = { :name => "Ruby", :age => 21 }  
hash2也可以改寫成 = { name: "Ruby", age: 21 }  
~~~

那篇文章一直強調`"string"`與`:symbol`是不一樣的，那到底哪裡不一樣呢？其實有位厲害的鐵人賽選手在[那篇文章下的留言](http://http://ithelp.ithome.com.tw/question/10159329)回答了！講得非常清楚噢！快去看快去看，然後我今天的文章就打完了(大誤)XD

從文章留言以及[Ruby中文官方網站](https://www.ruby-lang.org/zh_tw/documentation/ruby-from-other-languages/)中，我們可以得到以下結論：

**「到底什麼時候使用symbol、什麼時候使用string呢？」**

由於相同名字的symbol在記憶體裡都占同一個位置，也就是指向同一個物件，所以適用於識別物件，就像是身分證字號一樣，是獨一無二的，永遠不會改變。而每一個字串(就算名字一樣)，在記憶體中都是不同位置，適用於可改變的內容，例如綽號、電話...等，就不適合拿來作為識別用途。

總而言之(丸尾上身)：

**如果是物件的識別(例如hash中的key)，用symbol。**

**如果是物件的內容(例如hash中的value)，用string。**

好的，我們還是來看一看書中對於符號的說明(p.74)：

> 『Ruby解譯器的典型石作品會維護一份符號表(symbol table)，把解譯器已經知道的類別、方法和變數之名稱全都存放在此表中。』

路過的阿嬤問：『阿這嘸蝦咪好康呢？』

> 『這讓解譯器得以避免大部份的字串比較工作，例如：解譯器在指稱方法名稱時可透過其在符號表中的位置。這將代價較高的字串運算轉換成了代價較低的整數運算。』

路過的阿嬤問：『工蝦啦？』

我想這段的意思，就是指symbol的效能會比string好，因為symbol表中所有東西都有固定的位置，找得比較快，而字串還得去找他在哪，效能就會比較低了。

另外符號的寫法也不是只有:symbol而已噢！看看以下：

~~~ruby
:symbol  
:"symbol"  
:'symbol'  
~~~

第二和第三行並不是新的寫法，這三行到irb中執行都會得到相同的結果：

~~~ruby
=> :symbol  
~~~

只是有加上引號只是方便於俱有空格的符號：

~~~ruby
:"Hello Kitty"  
=> :"Hello Kitty"  
  
:Hello Kitty  
SyntaxError # 要有空格就一定要加上引號才行，不然會噴錯！  
~~~

如同字串有`%q`與`%Q`、陣列有`%w`與`%W`，symbol也有一個`%s`(沒有%S)的語法，例如：

~~~ruby
%s[Hello]  
=> :Hello  
  
%s[Hello Kitty]  
=> :"Hello Kitty"  
~~~

接下來書中提到symbol常被用在一個很特別的情境下，例如：如果我們要查某個物件是不是有支援`.each`這個方法？我們可以這麼做：

~~~ruby
[].respond_to? :each  
=> true # 陣列有.each這方法  
  
{}.respond_to? :each  
=> true # 雜湊也有.each這方法  
  
"".respond_to? :each  
=> false # 字串就沒有.each這方法  
  
"".respond_to? :succ  
=> true # 不過字串有昨天提到的.succ這方法  
~~~

總之是個很好的檢測方式，書中就給了個例子：

~~~ruby
name = :size  
if xxx.respond_to? name  
  xxx.send(name)  
end  
~~~

上面這例子是會測試某物(xxx)是否會回應所指定的方法(`.size`)，如果答案是true，就調用該方法！書中指出這種能夠觀察並修改行為的程式碼稱作「反射程式碼(reflective code)」。

最後最後，我們來看字串與符號的轉換：
(還記得以前學過`.to_s`、`.to_i`、`.to_a`)

符號改成字串一樣可以使用`.to_s`

~~~ruby
:Ruby.to_s  
=> "Ruby"  
~~~

也可以用`.id2name`達到同樣的效果

~~~ruby
:Ruby.id2name  
=> "Ruby"  
~~~

而字串改符號的話，要使用`.to_sym`或`.intern`

~~~ruby
"Ruby".to_sym  
=> :Ruby  
  
"Ruby".intern  
=> :Ruby  
~~~

路過的阿嬤：『安捏喔！賀啦～哇瞭蓋啊～』

---

第13天~對不起其實根本沒有路過的阿嬤XD

> Always remember that the future comes one day at a time. - Dean Acheson

未來，是一天一天的來！