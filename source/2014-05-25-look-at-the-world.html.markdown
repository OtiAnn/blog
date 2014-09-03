---
title: » 看看世界-多看前輩的code
date: 2014-05-25 09:44 UTC
tags: Rails Girls
---

走出自己的 sublime 看看其他人的 code 吧！

不然寫出不營養的 code ，會長歪的 Orz..


自學 Rails 的這兩個月中，不外乎透過網路上的免費資源來加深概念，這些知識節點其實都是片片斷斷的，自學最大的壞處就是需要自己把知識組裝起來，如果沒有完整而結實的培訓，很容易走歪。

我曾經就一個不小心，重心不穩，在讓前輩看 code 時，鬧了笑話XD 因為都在自己的本機中寫自己的 code，自己的 code 自己寫嘛，只注意讓自己通順，就沒去做整理。

關起門來自己寫 code，這樣的習慣如果養成了，未來跟別人協作時一定會出大事！(抖)

鬧什麼笑話呢？
一般人在 `app/views/layouts/application.html.erb`中，會有完整的架構，例如：

~~~erb
<!DOCTYPE html>
<html>
  <head>
    <title><%= full_title(yield(:title)) %></title>
    <%= stylesheet_link_tag "application", media: "all","data-turbolinks-track" => true %>
    <%= javascript_include_tag "application","data-turbolinks-track" => true %>
    <%= csrf_meta_tags %>
    <%= render 'layouts/shim' %>
  </head>
  <body>
    <%= render 'layouts/header' %>
    <div class="container">
      <% flash.each do |key, value| %>
        <div class="alert alert-<%= key %>"><%= value %></div>
      <% end %>
      <%= yield %>
      <%= render 'layouts/footer' %>
      <%= debug(params) if Rails.env.development? %>
    </div>
  </body>
</html>
~~~

上面是來自[Ruby on Rails 教程](http://railstutorial-china.org/)的範例。
而下方是我的`application.html.erb` (#不敢見人#)

~~~erb
<%= render 'partials/header' %>
<%= render 'partials/sidebar' %>
<%= render 'partials/footer' %>
~~~

對，你沒有看錯！就只有三行！想當初自以為精簡，切割乾淨，就這麼自作主張處理了XD

直到上週去了[LTRT](http://ltrt.kktix.cc/)，教練笑著 ~~面有難色~~ 跟我說：「我讓妳看看外面的世界吧！」，就開啟了他的程式碼給我看，並協助我將這段程式碼修正成：

~~~erb
<!DOCTYPE html>
<html>
<head>
  <title>Bloggy</title>
  <%= stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track' => true %>
  <%= javascript_include_tag 'application', 'data-turbolinks-track' => true %>
  <%= csrf_meta_tags %>
</head>
<body>
<div id="wrapper" class="clearfix">
  <div class="header">
    <div id="logo">
      <p>My Second Life</p>
      <h1><%= link_to "Bloggy", root_path %></h1>
    </div>

    <%= render 'partials/navbar' %>
  </div>

  <div class="content">
    <% if notice %>
      <p class="alert alert-success"><%= notice %></p>
    <% end %>
    <% if alert %>
      <p class="alert alert-danger"><%= alert %></p>
    <% end %>

    <%= yield %>
  </div>

  <%= render 'partials/sidebar' %>

  <%= render 'partials/footer' %>
</div>
</body>
</html>
~~~

確實，程式碼寫得工整且架構清楚的話，未來無論是自己看、給人看、給孫子看、跟別人合作...都能一目瞭然！

從這天起，我開始參考強者前輩們的 code 了，每個人的 code 都有自己的一套規範，共通點都是讓人很好讀懂！希望自己在吸收日月精華後，也能訂定一套屬於我自己且友善的 code 規範！

#走出自己的 sublime 看看其他人的 code 吧！

(看看 code 不自閉還能偷學好招，何樂而不為！)