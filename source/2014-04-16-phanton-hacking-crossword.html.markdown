---
title: » 幽靈-Rails的駭客填字遊戲
date: 2014-04-16 09:29 UTC
tags: Hacking, SQL Injection, XSS, Rails
---

**小心，幽靈就在你身邊！**

資安問題不可不防！

這篇提到了 XSS 攻擊，回應中也有大大說明 XSS 與 SQL Injection 的差別！


大概是ㄧ年多前，好朋友跟我介紹了《幽靈》這部韓劇，我很少看韓劇，因為對於韓劇內容還停留在婆媳問題、絕症、窮酸女與高富帥的愛情故事...Orz，但好朋友在跟我介紹時說，這部完全沒有任何愛情故事、沒有時光穿梭，而是以網路犯罪為主軸所展開的一部推理劇，她說我一定會喜歡！所以我就看了！雖然肥皂劇一定都會加油添醋，但看了之後還真是大開眼界！至於為什麼叫做幽靈，不是因為劇中有鬼，而是因為網路犯罪是藏在科技的背後，讓人神不知鬼不覺地就達到了犯罪目的，下方為[《幽靈》維基 ](http://zh.wikipedia.org/wiki/%E5%B9%BD%E9%9D%88_(%E9%9F%93%E5%9C%8B%E9%9B%BB%E8%A6%96%E5%8A%87))介紹：

<blockquote>講述在頂級電腦背後隱藏的虛擬搜查隊打擊網路犯罪的過程之中，揭發螢幕背後恐怖的一面和被掩蓋的事實，無時無刻在使用的 Twitter 、 Blog 、電子郵件，不經任何考慮隨便的一下點擊，是如何適得其反甚至奪去某些人的性命。
</blockquote>

停在這裡，想要欣賞駭客攻擊攻防戰的朋友，有空可以去看看這部韓劇哦！這篇文章當然不是在講《幽靈》的觀後心得，而是我在參加[LTRT](http://ltrt.kktix.cc/)學習RoR的過程中，從教練所教的內容中了解的資安問題！

※LTRT：Rails Girls 在為期兩天的工作坊活動過後，會定期舉辦[Let's Try Rails Tuesday (LTRT)](http://ltrt.kktix.cc/)，LTRT 是 Rails Girls 活動的後續版本，可以讓學員們繼續學習 Rails，也有教練在一旁指導。

###駭客的填字遊戲

~~~ruby
def youtube (aaaaa)
  %Q(<iframe width="420" height="315" src="//www.youtube.com/embed/#{aaaaa}" frameborder="0" allowfullscreen></iframe>)
end
~~~

上面利用 helper，在網頁中加入一個 Youtube 影片嵌入方式，看起來非常正常，如果今天提供給使用者一個 form ，讓他可以輸入想看的影片編碼，他只要更改上面`#{aaaaa}`的內容即可，例如：
輸入`_o0oeyCtoFA`，使得 iframe 的內容直接變成：

~~~html
<iframe width="420" height="315" src="//www.youtube.com/embed/_o0oeyCtoFA" frameborder="0" allowfullscreen>
</iframe>
~~~

以上屬於正常的使用者，按照規定，輸入符合要求的內容，就能正常在網頁中看到所嵌入的影片，But！教練模仿駭客，玩填字遊戲，他這麼玩：
輸入`_o0oeyCtoFA"></iframe><script>alert(1)</script><iframe width="420`，使得 iframe 內容變成：

~~~html
<iframe width="420" height="315" src="//www.youtube.com/embed/_o0oeyCtoFA">
  </iframe>
  <script>alert(1)</script>
  <iframe width="420" frameborder="0" allowfullscreen>
</iframe>
~~~

Cooooooooool！加入了`<iframe></iframe>`標籤頭尾，騙程式`<iframe>`已經完成，並在中間插入了一個`<script>alert(1)</script>`，讓程式正常讀取教練(假駭客)所鍵入的其他程式內容，這個程式執行的結果是，影片能正常播放，但是會另外跳出javascript的視窗！

如果今天真駭客輸入的是其他惡意程式，暗地進行，那就會如幽靈一般，在神不知鬼不覺的情況下，被竊取資料或其他惡意破壞了！

上網查了一下，這應該是與[SQL Injection(SQL資料隱碼攻擊)](http://zh.wikipedia.org/wiki/SQL%E8%B3%87%E6%96%99%E9%9A%B1%E7%A2%BC%E6%94%BB%E6%93%8A)的概念相同：

維基百科中以一個簡單的例子來說明，現在有會員功能的網站幾乎都設有輸入帳號與密碼的驗證，例如：

~~~shell
strSQL = "SELECT * FROM users WHERE (name = '" + userName + "') and (pw = '"+ passWord +"');"
~~~

駭客只要在 userName 填入：`1' OR '1'='1`；在passWord填入：`1' OR '1'='1`，
此段程式碼會變成：

~~~shell
strSQL = "SELECT * FROM users WHERE (name = '1' OR '1'='1') and (pw = '1' OR '1'='1');"
~~~

程式會正常執行，駭客可以順利登入網站，因為`name = '1' OR '1'='1'`return的值是`true`，`pw = '1' OR '1'='1'`return的值也是`true`，Amazing！！！

---

當然，為了不要被駭客輕易登入，程式可以設定一些過濾機制，例如不能輸入`'`或`"`，或規定輸入字元的長度等等，這個就等我以後學得更熟再好好的筆記下來了！