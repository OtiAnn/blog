---
title: » 我的第一篇文章！
date: 2014-07-31 08:18 UTC
tags: Rails
---

這系列文章打算拿來記錄一些常用，卻又常忘的指令或設定！
你也會不喜歡rails generate 時幫你多增加一些奇奇怪怪的東西嗎？
你也想要在一開始新增專案時就設定好要使用的資料庫類型嗎？
你也會有將某個model刪掉，後來又需要用到時，重新新增卻失敗的情況嗎？
明明已經d掉，卻沒d乾淨...
這裡的筆記不一定是最佳解，但是是能夠work的！就是給自己提個醒，
會持續更新，有更佳解會來修改！

---

~~~
  ** 小心，幽靈就在你身邊！ **
  資安問題不可不防！
  這篇提到了 XSS 攻擊，回應中也有大大說明 XSS 與 SQL Injection 的差別！
~~~

讓人神不知鬼不覺地就達到了犯罪目的，下方為[《幽靈》維基](http://zh.wikipedia.org/wiki/%E5%B9%BD%E9%9D%88_(%E9%9F%93%E5%9C%8B%E9%9B%BB%E8%A6%96%E5%8A%87))介紹：

<blockquote>講述在頂級電腦背後隱藏的虛擬搜查隊打擊網路犯罪的過程之中，揭發螢幕背後恐怖的一面和被掩蓋的事實，無時無刻在使用的 Twitter 、 Blog 、電子郵件，不經任何考慮隨便的一下點擊，是如何適得其反甚至奪去某些人的性命。
</blockquote>

##駭客的填字遊戲

~~~ ruby
def youtube (aaaaa)
  %Q(<iframe width="420" height="315" src="//www.youtube.com/embed/#{aaaaa}" frameborder="0" allowfullscreen></iframe>)
end
~~~

以上屬於正常的使用者，按照規定，輸入符合要求的內容，就能正常在網頁中看到所嵌入的影片，But！教練模仿駭客，玩填字遊戲，他這麼玩：
輸入```_o0oeyCtoFA"></iframe><script>alert(1)</script><iframe width="420```，使得 iframe 內容變成：

~~~ html
<iframe width="420" height="315" src="//www.youtube.com/embed/_o0oeyCtoFA">
  </iframe>
  <script>alert(1)</script>
  <iframe width="420" frameborder="0" allowfullscreen>
</iframe>
~~~

Cooooooooool！加入了```<iframe></iframe>```標籤頭尾，騙程式```<iframe>```已經完成，並在中間插入了一個```<script>alert(1)</script>```，讓程式正常讀取教練(假駭客)所鍵入的其他程式內容，這個程式執行的結果是，影片能正常播放，但是會另外跳出javascript的視窗！

如果今天真駭客輸入的是其他惡意程式，暗地進行，那就會如幽靈一般，在神不知鬼不覺的情況下，被竊取資料或其他惡意破壞了！

上網查了一下，這應該是與[SQL Injection(SQL資料隱碼攻擊)](http://zh.wikipedia.org/wiki/SQL%E8%B3%87%E6%96%99%E9%9A%B1%E7%A2%BC%E6%94%BB%E6%93%8A)的概念相同：

~~~
strSQL = "SELECT * FROM users WHERE (name = '1' OR '1'='1') and (pw = '1' OR '1'='1');"
~~~

---
當然，為了不要被駭客輕易登入，程式可以設定一些過濾機制，例如不能輸入`'`或`"`，或規定輸入字元的長度等等，這個就等我以後學得更熟再好好的筆記下來了！
