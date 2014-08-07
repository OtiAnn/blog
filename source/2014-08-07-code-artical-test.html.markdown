---
title: » Code Style (Test)
date: 2014-08-07 17:46 UTC
tags:
---

###CSS
~~~css
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
body {
    line-height: 1;
}
blockquote, q {
    quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
    content: '';
    content: none;
}
~~~

###ERB
~~~erb
<ul class="navbar">
  <li><%= link_to 'Members', members_path %></li>
  <li><%= link_to 'Rules', rules_path %></li>
  <li><%= link_to 'Let's Play', play_path %></li>
  <li><%= link_to 'Login', sign_in_path %></li>
</ul>

<div id="search" >
  <%= search_form_for @q do |f| %>
  <!-- search_form_for是ransack自己定義的form helper。 -->
    <%= f.text_field :title_or_body_cont %>
    <!-- cont 就是 contains，所以我設定我的搜尋位置為文章的 title 或 body -->
    <%= f.submit ' ', :class => 'btn-search' %>
  <% end %>
</div>

<iframe width="420" height="315" src="//www.youtube.com/embed/_o0oeyCtoFA" frameborder="0" allowfullscreen>
</iframe>
~~~

###Ruby
~~~ruby
module ApplicationHelper
  def nav_li name, url
    content_tag :li, link_to(name, url)
  end
end

def index
  @posts = Post.paginate(:page => params[:page], :per_page => 4)
  #這是剛剛will_paginate加的
  @posts = @q.result
  #讓posts#index可以顯現搜尋結果，@q 是ransack gem定義的寫法，下方在做說明
end

class ApplicationController < ActionController::Base
    before_action :set_search
    #讓在執行任何動作之前，先呼叫set_search，才能讓view知道 @q 是啥！不然會噴錯，說他找不到ransack！
    protected
    def set_search
        @q = Post.search(params[:q])
    end
end

def youtube (aaaaa)
    %Q(<iframe width="420" height="315" src="//www.youtube.com/embed/#{aaaaa}" frameborder="0" allowfullscreen></iframe>)
end
~~~
