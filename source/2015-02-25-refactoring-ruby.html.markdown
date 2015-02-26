---
title: » 重構Ruby程式碼(學習筆記)
date: 2015-02-25 10:33 UTC
tags: Ruby, Refactoring
desc: 我是OtiAnn，這篇文章是閱讀『Refactoring:RubyEdition』這本書的學習筆記，會記錄在書中看到的觀念，以及書中提供的重構範例。
---

這篇文章是閱讀『Refactoring: Ruby Edition』這本書的學習筆記，會記錄在書中看到的觀念，以及書中提供的重構範例。

#重構初體驗

##起點

影片出租店的客戶請你做一隻程式：

『在影片出租店中，顧客可以選擇不同的影片、不同的租期，而商家會依照影片的租期來計算費用。影片類型分為三種：一般片、兒童片、新片。程式要能夠計算費用、並輸出收據，收據上會有收費明細與顧客的點數，點數計算方法會依據影片是否為新片而有所不同。』

起始例子：

Movie | Rental | Customer
-|-|-
price_code|days_rented|
||statement()


**Movie**

~~~ruby
class Movie
  REGULAR     = 0
  NEW_RELEASE = 1
  CHILDREN    = 2

  attr_reader   :title
  attr_accessor :price_code

  def initialize(title, price_code)
    @title, @price_code = title, price_code
  end
end
~~~

**Rental**

~~~ruby
class Rental
  attr_reader :movie, :days_rented

  def initialize(movie, days_rented)
    @movie, @days_rented = movie, days_rented
  end
end
~~~

**Customer**

~~~ruby
class Customer
  attr_reader :name

  def initialize(name)
    @name = name
    @rentals = []
  end

  def add_rental(arg)
    @rentals << arg
  end

  def statement
    total_amount, frequent_renter_points = 0, 0
    result = "Rental Record for #{@name}\n"
    @rentals.each do |element|
      this_amount = 0

      # determine amounts for each line
      case element.movie.price_code
      when Movie::REGULAR
        this_amount += 2
        this_amount += (element.days_rented - 2) * 1.5 if element.days_rented > 2
      when Movie::NEW_RELEASE
        this_amount += element.days_rented * 3
      when Movie::CHILDREN
        this_amount += 1.5
        this_amount += (element.days_rented - 3) * 1.5 if element.days_rented > 3
      end

      # add frequent renter points
      frequent_renter_points += 1
      # add bonus for a two day new release rental
      if element.movie.price_code == Movie::NEW_RELEASE && element.days_rented > 1
        frequent_renter_points += 1
      end

      #show figures for this rental
      result += element.movie.title + "\t" + this_amount.to_s + "\n"
      total_amount += this_amount
    end
    # add footer lines
    result += "Amount owed is #{total_amount}\n"
    result += "You earned #{frequent_renter_points} frequent renter points"
    result
  end
end
~~~

**對以上程式碼的評語**

- Customer類別裡的statement方法太長！
- statement裡放很多應是其他類別做的事情。
- 對這段醜陋的程式碼來說，『電腦』不關心它美不美，但『人』會關心！
	- 設計糟糕的系統會讓『人』很難維護。
- 當客戶想將收據輸出成html格式時，目前的statement方法完全不能直接搬過去，除了寫一個全新的html_statement方法來複製大多數行為。
	- 如果收費標準改了，得同時去修改statement和html_statement的方法才行！
	- 如果還要做其他修改，就得一直複製貼上、複製貼上...(潛在威脅誕生)
	- 當程式碼越來越複雜，就很難保證修改的地方都是一致的。
- 最可怕的是，當客戶說：『我們想要修改影片分類的方式，但我們還沒想好要怎麼改>_^』
	- 身為一個專業的工程師，雖然什麼都不確定，但能肯定的是六個月內一定會再修改程式碼。
	- 雖然目前程式可以動，程式界的老話：『只要它還沒壞，就別去碰它』。但已經可以預見之後的日子很不好過...此時不重構程式碼，更待何時？

> 小提示：當你需要向一段程式裡添加功能，而程式的結構又不便於動手時，首要之務，就是重構程式碼來降低添加功能的難度，然後再加入需要的功能。

##第一步

- 先寫測試(來源：[Taian's github](https://github.com/taiansu/refactoring-ruby))

~~~ruby
require 'minitest/autorun'
require_relative 'ch1'

describe Customer, "#statement" do
  it "generate statement" do
    movie = Movie.new("Star War", Movie::NEW_RELEASE)
    rental = Rental.new(movie, 3)
    customer = Customer.new("John Doe")

    customer.add_rental(rental)
    customer.statement.must_equal <<-EOS.gsub(/^\s+/, '').gsub(/\n$/,'')
      Rental Record for John Doe
      Star War\t9
      Amount owed is 9
      You earned 2 frequent renter points
    EOS
  end
end
~~~

> 小提示：進行重構之前，要先準備好一段可靠的測試。一步一步地進行修改與測試，犯錯時才好發現bug的位置。

##statement方法的分解和再組合

**目的：將太長的方法分解成小片段，並移到更適合它們的類別中**

- 觀察程式碼片段中所有作用域中的變數(含區域變數與參數)：rental, this_amount
- 先將一部分程式碼抽取出去(如下)，並先給個方法名字為：amount_for

~~~ruby
def statement
  total_amount, frequent_renter_points = 0, 0
  result = "Rental Record for #{@name}\n"
  @rentals.each do |element|
    this_amount = amount_for(element) #這行改變了！

    # add frequent renter points
    frequent_renter_points += 1
    # add bonus for a two day new release rental
    if element.movie.price_code == Movie::NEW_RELEASE && element.days_rented > 1
      frequent_renter_points += 1
    end

    #show figures for this rental
    result += element.movie.title + "\t" + this_amount.to_s + "\n"
    total_amount += this_amount
  end
  # add footer lines
  result += "Amount owed is #{total_amount}\n"
  result += "You earned #{frequent_renter_points} frequent renter points"
  result
end
~~~
~~~ruby
def amount_for(element)
  this_amount = 0
  case element.movie.price_code
  when Movie::REGULAR
    this_amount += 2
    this_amount += (element.days_rented - 2) * 1.5 if element.days_rented > 2
  when Movie::NEW_RELEASE
    this_amount += element.days_rented * 3
  when Movie::CHILDREN
    this_amount += 1.5
    this_amount += (element.days_rented - 3) * 1.5 if element.days_rented > 3
  end
  this_amount
end
~~~

- 切開來後，就可以一一針對片段做修改。
- 先改命名！(閱讀程式碼，在理解程式的同時，把這些理解嵌入程式碼中，以防止將來忘記從中領悟到的東西。)

~~~ruby
def amount_for(rental)
  result = 0
  case element.movie.price_code
  when Movie::REGULAR
    result += 2
    result += (element.days_rented - 2) * 1.5 if element.days_rented > 2
  when Movie::NEW_RELEASE
    result += element.days_rented * 3
  when Movie::CHILDREN
    result += 1.5
    result += (element.days_rented - 3) * 1.5 if element.days_rented > 3
  end
  result
end
~~~

> 小提示：傻瓜寫的程式碼只有電腦才能理解，優秀的工程師寫的程式碼可以讓其他人都能看懂。

- 觀察amount_for，其實它使用的是來自rental的內容，而非customer。
	- amount_for放錯class了，通常，一個方法應該放在它資料來源的對象中，因此要移回rental中。
	- 為了適應新位置，需調整，此處要將參數刪掉，並給了個新名字。

~~~ruby
class Rental
  def charge
    result = 0
    case movie.price_code
    when Movie::REGULAR
      result += 2
      result += (days_rented - 2) * 1.5 if days_rented > 2
    when Movie::NEW_RELEASE
      result += days_rented * 3
    when Movie::CHILDREN
      result += 1.5
      result += (days_rented - 3) * 1.5 if days_rented > 3
    end
    result
  end
end
~~~

- 再把程式中所有引用舊方法的地方改成引用新方法。

~~~ruby
class Customer
  def statement
    ...
    @rentals.each do |element|
      this_amount = element.charge
    ...
  end
end
~~~

目前程式狀態：

Movie | Rental | Customer
-|-|-
price_code|days_rented|
|charge()|statement()

- Rental.charge暫時先放下，先回頭看看Customer.statement

~~~ruby
def statement
  total_amount, frequent_renter_points = 0, 0
  result = "Rental Record for #{@name}\n"
  @rentals.each do |element|
    this_amount = element.charge

    # add frequent renter points
    frequent_renter_points += 1
    # add bonus for a two day new release rental
    if element.movie.price_code == Movie::NEW_RELEASE && element.days_rented > 1
      frequent_renter_points += 1
    end

    #show figures for this rental
    result += element.movie.title + "\t" + this_amount.to_s + "\n"
    total_amount += this_amount
  end
  # add footer lines
  result += "Amount owed is #{total_amount}\n"
  result += "You earned #{frequent_renter_points} frequent renter points"
  result
end
~~~

- 目前，statement方法中的this_amount變數變成多餘了，此時可以用Replace Temp with Query方法來去掉this_amount。

~~~ruby
def statement
  total_amount, frequent_renter_points = 0, 0
  result = "Rental Record for #{@name}\n"
  @rentals.each do |element|

    # add frequent renter points
    frequent_renter_points += 1
    # add bonus for a two day new release rental
    if element.movie.price_code == Movie::NEW_RELEASE && element.days_rented > 1
      frequent_renter_points += 1
    end

    #show figures for this rental #下面這兩行改變了～～
    result += element.movie.title + "\t" + element.charge.to_s + "\n"
    total_amount += element.charge
  end
  # add footer lines
  result += "Amount owed is #{total_amount}\n"
  result += "You earned #{frequent_renter_points} frequent renter points"
  result
end
~~~

- 接下來，處理計算點數規則的部分，想把此段切出去，下方為原本的位置：

~~~ruby
def statement
  ...
  @rentals.each do |element|

    # add frequent renter points
    frequent_renter_points += 1
    # add bonus for a two day new release rental
    if element.movie.price_code == Movie::NEW_RELEASE && element.days_rented > 1
      frequent_renter_points += 1
    end
  ...
  end
  ...
end
~~~

- 一樣，先找區域變數：
	- element：可以被當作參數傳進來。
	- frequent_renter_points：已經在前面附值過，而且沒有讀取的動作，就不需要當參數傳，只需要寫加法動作即可。

~~~ruby
class Customer
  def statement
    total_amount, frequent_renter_points = 0, 0
    result = "Rental Record for #{@name}\n"
    @rentals.each do |element|

      frequent_renter_points += element.frequent_renter_points #改在這裡！！

      #show figures for this rental
      result += element.movie.title + "\t" + element.charge.to_s + "\n"
      total_amount += element.charge
    end
    # add footer lines
    result += "Amount owed is #{total_amount}\n"
    result += "You earned #{frequent_renter_points} frequent renter points"
    result
  end
end
~~~

~~~ruby
class Rental
  def frequent_renter_points
    (movie.price_code == Movie.NEW_RELEASE && days_rented > 1) ? 2 : 1
  end
end
~~~

目前程式狀態：

Movie | Rental | Customer
-|-|-
price_code|days_rented|
|charge()|statement()
|frequent_renter_points()|

- 現在要來移除區域變數
	- 原因：區域變數只有在自己的方法裡才有用，因此很容易寫出很長很複雜的方法。
	- 作法：把Customer類別中的total_amount, frequent_renter_points替換成相對應的查詢方式(Replace Temp with Query)。

~~~ruby
class Customer
  def statement
    frequent_renter_points = 0 #先拿掉total_amount
    result = "Rental Record for #{@name}\n"
    @rentals.each do |element|

      frequent_renter_points += element.frequent_renter_points

      #show figures for this rental
      result += element.movie.title + "\t" + element.charge.to_s + "\n"
    end
    # add footer lines
    result += "Amount owed is #{total_charge}\n" #這裡也改了！
    result += "You earned #{frequent_renter_points} frequent renter points"
    result
  end

  private

  def total_charge
    result = 0
    @rentals.each do |element|
      result += element.charge
    end
    result
  end
end
~~~

- 上面private中的total_charge方法還可再簡化(運用Collection Closure Method)

~~~ruby
def total_charge
  @rentals.inject(0) { |sum, rental| sum + rental.charge }
end
~~~

- 接著對另一個區域變數frequent_renter_points進行相同的操作

~~~ruby
class Customer
  def statement
    result = "Rental Record for #{@name}\n"
    @rentals.each do |element|
      #show figures for this rental
      result += element.movie.title + "\t" + element.charge.to_s + "\n"
    end
    # add footer lines
    result += "Amount owed is #{total_charge}\n"
    result += "You earned #{total_frequent_renter_points} frequent renter points"
     #上面那行改了！
    result
  end

  private

  def total_frequent_renter_points
    @rentals.inject(0){ |sum, rental| sum + rental.frequent_renter_points }
  end
end
~~~

目前程式狀態：

Movie | Rental | Customer
-|-|-
price_code|days_rented|
|charge()|statement()
|frequent_renter_points()|total_charge()
||total_frequent_renter_points()

- 產生效能疑慮
	- 此時很多人可會對效能產生疑慮(把區域變數切開來所做的修改)，但先把程式碼整理清楚比較重要，之後可以再通過Profiler處理效能問題！
	- 而且方法切開後，如果其他部分需要一樣的內容，很容易就能使用。

**接下來，暫時放下重構，加入html_statement方法**

~~~ruby
class Customer
  def html_statement
    result = "<h1>Rentals for <em>#{@name}</em></h1><p>\n"
    @rentals.each do |element|
      # show figures for this rental
      result += element.movie.title + ": " + element.charge.to_s + "<br>\n"
    end
    #add footer lines
    result += "<p>You owe <em>#{total_charge}</em></p>\n"
    result += "On this rental you earned " +
           "<em>#{total_frequent_renter_points}</em> " +
           "frequent renter points</p>"
    result
  end
end
~~~

- 製作這個新方法速度沒花太多時間，是因為共用了statement的方法

##用多態替換價格代碼中的條件邏輯

- Rental.charge的方法中用到了case
	- case所操作的卻是movie的價錢，應該要把charge移到Movie類別中。
	- 下方是原本的程式碼：

~~~ruby
class Rental
  def charge
    result = 0
    case movie.price_code
    when Movie::REGULAR
      result += 2
      result += (days_rented - 2) * 1.5 if days_rented > 2
    when Movie::NEW_RELEASE
      result += days_rented * 3
    when Movie::CHILDREN
      result += 1.5
      result += (days_rented - 3) * 1.5 if days_rented > 3
    end
    result
  end
end
~~~

- 移到Movie後：

~~~ruby
class Rental
  def charge
    movie.charge(days_rented)
  end
end

class Movie
  def charge(days_rented)
    result = 0
    case price_code
    when REGULAR
      result += 2
      result += (days_rented - 2) * 1.5 if days_rented > 2
    when NEW_RELEASE
      result += days_rented * 3
    when CHILDREN
      result += 1.5
      result += (days_rented - 3) * 1.5 if days_rented > 3
    end
    result
  end
end
~~~

- 為什麼要移到Movie然後傳入租期參數，而不是在Rental裡傳入影片類型參數呢？
	- 因為客戶希望修改影片分類的方式，要把之後修改的連鎖反應減至最小。

- 另外再把顧客點數計算一起移到Movie，下方為原本的：

~~~ruby
class Rental
  def frequent_renter_points
    (movie.price_code == Movie.NEW_RELEASE && days_rented > 1) ? 2 : 1
  end
end
~~~

- 移到Movie後：

~~~ruby
class Rental
  def frequent_renter_points
    movie.frequent_renter_points(days_rented)
  end
end

class Movie
  def frequent_renter_points(days_rented)
    (price_code == NEW_RELEASE && days_rented > 1) ? 2 : 1
  end
end
~~~

目前程式狀態：

Movie | Rental | Customer
------|--------|----------
price_code|days_rented|
charge(days_rented)|charge()|statement()
frequent_renter_points(days_rented)|frequent_renter_points()|total_charge()
||total_frequent_renter_points()
||html_statement()

**最後...要來處理繼承！**

- 為了替換掉case語句，利用Replace Type Code with State/Strategy方式。
  - 自定義一個price_code的setter方法(因為再往後要做好玩的事情)
  - 下方是原本的：

~~~ruby
class Movie
  REGULAR     = 0
  NEW_RELEASE = 1
  CHILDREN    = 2

  attr_reader   :title
  attr_accessor :price_code

  def initialize(title, price_code)
    @title, @price_code = title, price_code
  end
end
~~~

- 修改後

~~~ruby
class Movie
  ...
  attr_reader :price_code #改成getter而已

  def price_code= (value) #自己定義了setter
    @price_code = value
  end

  def initialize(title, the_price_code) #這裡也有改
    @title, self.price_code = title, the_price_code
  end
end
~~~

- 接下來添加三個類別：

~~~ruby
class RegularPrice
end

class NewReleasePrice
end

class ChildrensPrice
end
~~~

- 繼續在剛剛自定義的price_code setter中做些好玩的事：

~~~ruby
def price_code= (value)
  @price_code = value
  @price = case price_code
    when REGULAR     : RegularPrice.new
    when NEW_RELEASE : NewReleasePrice.new
    when CHILDRENS   : ChildrensPrice.new
  end
end
~~~

- 作者提到，上方所出現的case將會是重構完成後，唯一一處case語句！
	- 接下來將其他有case的地方改掉，下方是原本的：

~~~ruby
class Movie
  def charge(days_rented)
    result = 0
    case price_code
    when REGULAR
      result += 2
      result += (days_rented - 2) * 1.5 if days_rented > 2
    when NEW_RELEASE
      result += days_rented * 3
    when CHILDREN
      result += 1.5
      result += (days_rented - 3) * 1.5 if days_rented > 3
    end
    result
  end
end
~~~

- 改成：

~~~ruby
class RegularPrice
  def charge(days_rented)
    result = 2
    result += (days_rented - 2) * 1.5 if days_rented > 2
    result
  end
end

class NewReleasePrice
  def charge(days_rented)
    days_rented * 3
  end
end

class ChildrensPrice
  def charge(days_rented)
    result = 1.5
    result += (days_rented - 3) * 1.5 if days_rented > 3
    result
  end
end

class Movie
  def charge(days_rented)
    @price.charge(days_rented)
  end
end
~~~

- 接下來輪到frequent_renter_points，下方為原本的：

~~~ruby
class Movie
  def frequent_renter_points(days_rented)
    (price_code == NEW_RELEASE && days_rented > 1) ? 2 : 1
  end
end
~~~

- 透過Extract Module：

~~~ruby
module DefaultPrice
  def frequent_renter_points(days_rented)
    1
  end
end

class RegularPrice
  include DefaultPrice
  ...
end

class ChildrensPrice
  include DefaultPrice
  ...
end

class NewReleasePrice
  def frequent_renter_points(days_rented)
    days_rented > 1 ? 2 : 1
  end
end

class Movie
  def frequent_renter_points(days_rented)
    @price.frequent_renter_points(days_rented)
  end
end
~~~

- 最後一步，從price_code的setter方法移除case語句，原本要這樣：

~~~ruby
# calling code
movie = Movie.new("模仿遊戲", Movie::NEW_RELEASE)
# and later...
movie.price_code = Movie::REGULAR

class Movie
  ...
  def price_code= (value)
    @price_code = value
    @price = case price_code
      when REGULAR     : RegularPrice.new
      when NEW_RELEASE : NewReleasePrice.new
      when CHILDRENS   : ChildrensPrice.new
    end
  end
end
~~~

- 重構後：

~~~ruby
# calling code
movie = Movie.new("模仿遊戲", NewReleasePrice.new)
# and later...
movie.price = RegularPrice.new

class Movie
  attr_writer :price
end
~~~

##大功告成

最後程式狀態：

Movie                              | Rental               | Customer
-----------------------------------|----------------------|----------
title                              |days_rented           |name
charge(days_rented)                |charge(days_rented)   |statement()
frequent_renter_points(days_rented)|frequent_renter_points|total_charge()
                                   |                      |total_frequent_renter_points()
                                   |                      |html_statement()

New Release Price                  | Regular Price     | Childrens Price   | Default Price
-----------------------------------|-------------------|-------------------|---------------
charge(days_rented)                |charge(days_rented)|charge(days_rented)|frequent_renter_points(days_rented)
frequent_renter_points(days_rented)|

protocol           |
-------------------|
charge(days_rented)|


最終程式碼：

**Movie**

~~~ruby
class Movie
  attr_reader :title
  attr_writer :price

  def initialize(title, price)
    @title, @price = title, price
  end

  def charge(days_rented)
    @price.charge(days_rented)
  end

  def frequent_renter_points(days_rented)
    @price.frequent_renter_points(days_rented)
  end
end
~~~

**Rental**

~~~ruby
class Rental
  attr_reader :movie, :days_rented

  def initialize(movie, days_rented)
    @movie, @days_rented = movie, days_rented
  end

  def charge
    movie.charge(days_rented)
  end
  
  def frequent_renter_points
    movie.frequent_renter_points(days_rented)
  end
end
~~~

**Customer**

~~~ruby
class Customer
  attr_reader :name

  def initialize(name)
    @name = name
    @rentals = []
  end

  def add_rental(arg)
    @rentals << arg
  end
  
  def statement
    result = "Rental Record for #{@name}\n"
    @rentals.each do |element|
      #show figures for this rental
      result += element.movie.title + "\t" + element.charge.to_s + "\n"
    end
    # add footer lines
    result += "Amount owed is #{total_charge}\n"
    result += "You earned #{total_frequent_renter_points} frequent renter points"
    result
  end

  def html_statement
    result = "<h1>Rentals for <em>#{@name}</em></h1><p>\n"
    @rentals.each do |element|
      # show figures for this rental
      result += element.movie.title + ": " + element.charge.to_s + "<br>\n"
    end
    #add footer lines
    result += "<p>You owe <em>#{total_charge}</em></p>\n"
    result += "On this rental you earned " +
           "<em>#{total_frequent_renter_points}</em> " +
           "frequent renter points</p>"
    result
  end

  private

  def total_charge
    @rentals.inject(0) { |sum, rental| sum + rental.charge }
  end

  def total_frequent_renter_points
    @rentals.inject(0) { |sum, rental| sum + rental.frequent_renter_points }
  end
end
~~~

**Default Price**

~~~ruby
module DefaultPrice
  def frequent_renter_points(days_rented)
    1
  end
end
~~~

**Regular Price**

~~~ruby
class RegularPrice
  include DefaultPrice

  def charge(days_rented)
    result = 2
    result += (days_rented - 2) * 1.5 if days_rented > 2
    result
  end
end
~~~

**Childrens Price**

~~~ruby
class ChildrensPrice
  include DefaultPrice

  def charge(days_rented)
    result = 1.5
    result += (days_rented - 3) * 1.5 if days_rented > 3
    result
  end
end
~~~

**New Release Price**

~~~ruby
class NewReleasePrice
  def charge(days_rented)
    days_rented * 3
  end

  def frequent_renter_points(days_rented)
    days_rented > 1 ? 2 : 1
  end
end
~~~


**最終程式碼的Test**

- 因為Movie.new要傳的參數改變了，所以測試也要修改一下：

~~~ruby
require 'minitest/autorun'
require_relative 'ch1'

describe Customer, "#statement" do
  it "generate statement" do
    # movie = Movie.new("Star War", Movie::NEW_RELEASE) # 這行是原本的
    movie = Movie.new("Star War", NewReleasePrice.new) # 改成這行
    rental = Rental.new(movie, 3)
    customer = Customer.new("John Doe")

    customer.add_rental(rental)
    customer.statement.must_equal <<-EOS.gsub(/^\s+/, '').gsub(/\n$/,'')
      Rental Record for John Doe
      Star War\t9
      Amount owed is 9
      You earned 2 frequent renter points
    EOS
  end
end
~~~