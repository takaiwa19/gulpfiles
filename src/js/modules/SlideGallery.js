export default class SlideGallery {
  constructor($elm, direct) {
    this.$elm = $elm;
    this.$wrap = $('.p-box__wrap', this.$elm);
    this.$wrapHtml = this.$wrap.html();
    this.$items = $('.p-box__item', this.$elm);
    this.itemsLength = this.$items.length;
    this.itemWidth = parseInt(this.$items.css('width'));
    this.itemHeight = parseInt(this.$items.css('height'));
    this.index = 0;
    this.direct = direct;
    this.isAnimate = false;
  }
  init() {
    this.$wrap.addClass('no-transition');
    this.$wrap.prepend(this.$wrapHtml);
    this.$wrap.append(this.$wrapHtml);
    if(this.direct == 'v') {
      this.$elm.css('width', this.itemWidth);
      this.$elm.css('height', this.itemHeight * 5 );
      this.$wrap.css('margin-top', -this.itemHeight * this.itemsLength + 'px');
    } else {
      this.$elm.css('width', this.itemWidth * 5 );
      this.$elm.css('height', this.itemHeight);
      this.$wrap.css('margin-top', -this.itemWidth * this.itemsLength + 'px');
    }
  }
  movePrev() {
    if( this.isAnimate ) return;
    this.index -= 1;
    if( this.index <= -1 ) this.index = this.itemsLength -1;
  }
}
