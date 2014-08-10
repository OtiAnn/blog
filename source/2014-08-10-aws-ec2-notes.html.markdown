---
title: » AWS EC2 notes
date: 2014-08-10 18:13 UTC
tags: Ubuntu, AWS, Middleman, Gem
published: false
---

~~~shell
<!-- 進去ubuntu -->
$ ssh -2 -i ~/Desktop/OtiAnnGLRG2.pem ubuntu@ec2-54-183-146-123.us-west-1.compute.amazonaws.com
~~~
~~~shell
<!-- 更新環境 -->
$ sudo apt-get update
~~~
~~~shell
<!-- 環境必要的東西 -->
$ sudo apt-get install build-essential libopenssl-ruby1.9.1 libssl-dev zlib1g-dev libmysqlclient-dev libpcre3-dev libcurl4-openssl-dev mysql-client-core-5.5 openssl libreadline6 libreadline6-dev curl git-core zlib1g zlib1g-dev libssl-dev libyaml-dev libsqlite3-dev sqlite3 libxml2-dev libxslt-dev autoconf libc6-dev ncurses-dev automake libtool bison nodejs subversion
~~~
~~~shell
<!-- rvm前必要的東西 -->
$ sudo apt-get install libgdbm-dev libncurses5-dev automake libtool bison libffi-dev
~~~
~~~shell
<!-- 裝rvm -->
$ curl -L https://get.rvm.io | bash -s stable
$ source ~/.rvm/scripts/rvm
$ echo 'gem: --no-ri --no-rdoc'  >> ~/.gemrc
$ echo "source ~/.rvm/scripts/rvm" >> ~/.bashrc
~~~
~~~shell
<!-- 裝ruby -->
$ rvm install 2.1.2
$ rvm use 2.1.2 --default
~~~
~~~shell
<!-- 檢查有沒有裝好 -->
$ ruby -v
ruby 2.1.2p95 (2014-05-08 revision 45877) [x86_64-linux]
~~~
~~~shell
$ gem install bundler
~~~
~~~shell
<!-- 裝rails -->
$ gem install rails --no-ri --no-rdoc
~~~
~~~shell
<!-- 裝middleman -->
$ gem install middleman
~~~
~~~shell
<!-- 以下二擇一 -->
$ gem install nokogiri -- --use-system-libraries
$ bundle config build.nokogiri --use-system-libraries
~~~
~~~shell
<!-- 查看是否有在背景運行|篩選有middle名稱的 -->
$ ps aux | grep middle

<!-- 讓middleman背景一直執行 -->
$ middleman &
~~~