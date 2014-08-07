---
title: » 我的第一篇文章！(測試用)
date: 2014-07-31 08:18 UTC
tags: Rails
---

這系列文章打算拿來記錄一些常用，卻又常忘的指令或設定！

  你也會不喜歡rails generate 時幫你多增加一些奇奇怪怪的東西嗎？
  你也想要在一開始新增專案時就設定好要使用的資料庫類型嗎？
  你也會有將某個model刪掉，後來又需要用到時，重新新增卻失敗的情況嗎？

這裡的筆記不一定是最佳解，但是是能夠work的！就是給自己提個醒，會持續更新，有更佳解會來修改！


###我不喜歡在rails generate something 時，產生一堆奇奇怪怪用不到的東西，我可以...

方法一：
在command line下指令時，在後面加上：

```$ rails g controller post --skip-assets```

方法二：
若懶得每次generate都要打上這個，想要在該專案中永久生效，就在`config/application/rb`中加上：

~~~ruby
module Blank
  class Application < Rails::Application
    config.generators.assets = false
    config.generators.helper = false
    config.generators.jbuilder = false
  end
end
~~~


###我想要在新增專案時就設定好我要使用postgres！

在command line直接這樣下指令：

```$ rails new myproject -d postgresql```


###把某個model刪掉後，又要再次用它，發現噴很多錯，因為沒刪乾淨，這時可以進入console把他刪乾淨...

~~~shell
$ rails c
2.1.2 :001 > ActiveRecord::Migration.drop_table(:tablename)
~~~

刪乾淨後再重新新增，就不會噴錯了！
[參考資料](http://stackoverflow.com/questions/4020131/rails-db-migration-how-to-drop-a-table)

<blockquote>「女孩」與「程式」真的這麼格格不入嗎？或者擴大範圍，女性與 STEM（科學、技術、工程、數學）為何相看兩相厭？從事科技產業的女生其實並不罕見，走一趟行銷或財務等部門，可以看到不少幹練女性的身影，然而真正在第一線創造產品的女性，屈指可數。
</blockquote>
<iframe src="//www.facebook.com/plugins/follow?href=https%3A%2F%2Fwww.facebook.com%2FOtiAnn&amp;layout=standard&amp;show_faces=true&amp;colorscheme=light&amp;width=450&amp;height=80" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:450px; height:80px;" allowTransparency="true"></iframe>