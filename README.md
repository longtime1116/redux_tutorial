https://egghead.io/courses/getting-started-with-redux
[8/14]
react と jquery で書いたコード比較してみると良い
今は knock out という library をメインで使っている
  vue.js とか色々ある。
演習で質問することになりそう

[8/15]
* map 引数わからん
* 1つめ問題の意味がわからん
  * Move #(1,2) みたいに書くようにすれば良い。
react JSX 条件分岐


[8/16]
* 2つめ、もっと共通化したい。。
* 3つめ、2つのloopということは、3*3?
  * ということは、squares に対して map はしない？




tagをどうにかする
styleを適用


() で JSX
https://facebook.github.io/react/docs/dom-elements.html
style は JSON でかく。camelcasem, value は文字列

babel で JSX の記法も変換してくれる
変換したものハッシュみたいなオブジェクトにして、React がデコードして、それっぽくする。
AST


https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html

2 どっちか選び、メソッド化する。
3 




[8/18]
* 4 はいけた

vim で diw

fluxというアーキテクチャのひとつとして実装されているのがREDUX


[8/21]
* pub sub pattern
  * publish subscribe
* observer pattern

Reducer
Action creator
State

*.map があると、source map on のときに、ビルド前のソースを表示できる。webpack にて生成できる



[8/23]
* 〜11まで終わった。
* state と action 常に設定されなくない？
  * ただ関数を返すだけの関数。
  * 実際にtodoAppを呼び出すときに渡される。
* state[key] は上書きされるのでは。

[8/24]



rails 側の app/asset 配下では、const とか使うと、変換しないので望んだ挙動にならない
frontend 配下は変換しているので問題無し。

分割されていくが、なんで分割しているのかを考えながら。

流れを繰り返し追ってみることで理解を深める



[8/25]
* const store = createStore(todoApp) で、state が初期化。store.dispatchでreducer(todoAppのこと、reducerがcombineされている)を呼び出せるようになったりする。
* render で画面が描画される。クリックできるボタンと、渡されたstateのtodoのtextを描画している。
* ボタンをクリックすると、store.dispatch()が走る。type:’ADD_TODO’なので、todos reducer以外ではstateは変わらない。todos reducer で、state に要素が追加される。
* storeのstateが更新されたので、再び render が走る。

* this.input = node のあたり、undefinedとでてチェックできないなぜ。２回くるし。
  * this がundefined になるが、_this3 でいけた。これはtranscompileされて変数名が変わっているから。
  * input タグの中で ref 書くと、引数としてそのDOM要素を受け取れる。そいつをthis.xxx に入れておくと、他の場所から参照できる。
  * 描画される前に一度通るときはinputのDOMは存在していないので、nullになる。2回目は、renderされたあとなので、ある・
* 同じ書き方だけど、これは自動でこうしてくれるっていう話？


* フィルタリング機能をつけた
* パーツごとに分けた


* http://staging.pixta.jp/tags/mountain
* console 見ると、log が出ている。


[8/28]
* Extracting Presentational Components (AddTodo, Footer, FilterLink)
* footerの部分をcomponentに分割した。
  * filterLinkにdispatchを書いていたが、それはトップレベルに書くようにした。あくまでリンクを作成するだけで、クリック時の挙動はここが知る必要はない。
* todoapp を classからmethodにした

* container component(挙動を書く) <=> presentational component(見た目を書く)

* Extracting Container Components (FilterLink)
  * React.Componentじゃないと動かなかった。
  * AddTodo component だけ store.forceUpdate 不要な理由は？ => dispatch していないから。
  * 取り除いたときにどんな問題が起きるのかわからない。

hoge.js
const { Component } = React;
const { Component } = {Component:1, b:2}

cont a = 1;
export { a }

import { a } from ‘hoge.js’



searchの部分のリファクタリング
検索ページのどこかに修正する要望があれば
(音素材のところとか、)置き換えとか。



[8/29]
* Extracting Container Components (VisibleTodoList, AddTodo)
  * TodoApp のところを綺麗にした。
* Passing the Store Down Explicitly via Props
  * スルー
* Passing the Store Down Implicitly via Context
  * エラーになるし、よくわからん。。。





* component はオブジェクトをひとつ返す。


HTML は勝手に認識もしてくれる
JSX はXHTML的であり、厳密
<TodoApp />
<TodoApp>  </TodoApp>


componentDidMount
getChildContext
とかは、それがあれば勝手に解釈して内部的に使ってくれるもの

store を提供する Redux の I/F がProvider
受け取る側が、次回出てくるやつ。


テーマ
マテリアルUIとか、赤っぽいテーマみたいな全体的な設定をするときは、context 使っても良い。読み込み専用
Redux も内部的には context を使っている
Redux 作者はいまやfacebookに入った
facebook OSS

https://github.com/facebook/react


[8/30]
* mapStateToProps とかは、引数の順番で決まってる？ひとつめはStateを返し、二つ目はdispatchを実行するメソッドをvalueとするオブジェクトを返す。

Haskell
curry化 arrow関数みたいなのが出てこなかったり。


~/develop/pixta-dev-containers/pixta-search/src/pixta-search/frontend/src/tags/viewModels/lightboxList/LightboxListActions/fetch.js


frontend/src/audio/components/AudioGallery/index.js





[8/31]









★tips★
[調べ方]
MDN で調べるべし。
例えば map は以下。
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map


[console]
google のデベロッパーツールの使い方を読むべし。

cmd + opt + i でデベロッパーツール開いた後に、esc を押せば、console が出る。
cmd + opt + j でもいきなり出せる。

console.log でログに出力する。

[1,2,3].map(console.log)
これは、以下と同じものが返る。
[1,2,3].map((a, b, c) => {return console.log(a, b, c)})
と同じ。

function sum(num1, num2){
    return num1 + num2;
}
[1,2,3].map(sum)
は、[1,3,5] が返る。
MDN で仕様をチェック。
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
sum は、以下と同じ。
sum = (num1, num2) => num1 + num2

DOM クリック
console で $0
$0. でその要素がチェックできる

[keyの問題]
map で返す要素に key をつけなきゃ行けないやつ、idx をつけたら実は意味ない。というか害。
本当は、一意な id を渡さなきゃならない。
↓でhogeがmodelだったりすればidが取って来れるので。
xxx.map((hoge, idx) => { hoge.id } )

[オブジェクトのマージ]
hoge = {a:1}
{a: 1}
geho = {b:2}
{b: 2}
Object.assign({}, hoge, geho)
{a: 1, b: 2}
Object.assign(hoge, geho)
{a: 1, b: 2}
geho
{b: 2}
hoge
{a: 1, b: 2}
Object.assign({}, hoge, geho, hoge)
{a: 1, b: 2} <- 最後の hoge が使われている。

hoge = {a:1}
{...hoge, ...geho}



[props 確認方法]
React タブで、props を確認


[整形]
yarn formatで整形してくれる



