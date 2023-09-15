const modal = document.getElementById('myModal')
const awards = document.getElementById('myAwards')
const programBtn = document.querySelectorAll('.program-btn-modal')
const youtubeBtn = document.querySelectorAll('.btn-youtube');
const programAwards = document.querySelectorAll('.program-btn-awards')
const myModalSpeakers = document.getElementById('myModalSpeakers')
const myModalTwo = document.getElementById('myModalTwo')
const myModalTwoShow = document.querySelectorAll('.second-modal')
const myModalYoutube = document.getElementById('myModalVideo');

// New variables
const header = document.getElementById('myHeader');
const mainBlock = document.getElementById('mainBlock');
const headerHeight = header.offsetHeight;

// Get the button that opens the modal
const btn = document.querySelector('.modal-speakers')


// Get the <span> element that closes the modal
const span = document.getElementsByClassName('close')[0]

document.addEventListener('DOMContentLoaded', function () {
  const marquee = document.querySelector('.marquee-items');
  marquee.innerHTML += marquee.innerHTML + marquee.innerHTML;
});

document.addEventListener('DOMContentLoaded', function () {
  const guide = document.querySelector('.guide');
  const headerElement = document.querySelector('header');
  const closeButton = guide.querySelector('.guide__close');


  function adjustHeaderPosition() {
    const guideBottomPosition = guide.getBoundingClientRect().bottom;
    if (guideBottomPosition < 0) {
      headerElement.style.top = '0';
    } else {
      headerElement.style.top = `${guideBottomPosition}px`;
    }
  }

  closeButton.addEventListener('click', function () {
    guide.style.display = 'none';
    adjustHeaderPosition();

    // Если у вас уже есть логика для корректировки положения header, 
    // то вам, возможно, потребуется вызвать ее здесь, чтобы удостовериться, что header правильно отображается после закрытия guide.
  });

  guide.addEventListener('click', function (event) {
    // Проверяем, что источником события не является кнопка closeButton
    if (!closeButton.contains(event.target)) {
      window.location.href = "#mob-app"; // Замените "#yourAnchor" на ваш якорь или URL
    }
  });

  window.addEventListener('scroll', adjustHeaderPosition);
  adjustHeaderPosition();
});

// document.addEventListener('DOMContentLoaded', function () {
//   const guide = document.querySelector('.guide');
//   const closeButton = guide.querySelector('.close__guide');

//   closeButton.addEventListener('click', function () {
//     guide.style.display = 'none';

//     // Если у вас уже есть логика для корректировки положения header, 
//     // то вам, возможно, потребуется вызвать ее здесь, чтобы удостовериться, что header правильно отображается после закрытия guide.
//   });
// });


//var marquee = document.querySelector('.marquee'), 
//list = document.querySelector('.marquee-items'), 
//clone = list.cloneNode(true)

//marquee.append(clone)
// programBtn.onclick = function () {
//   modal.style.display = 'block'
// }
myModalTwoShow.forEach((btn) => {
  btn.onclick = function () {
    myModalTwo.style.display = 'block'
  }
});

// programBtn.forEach((btn) => {
//   btn.onclick = function () {
//     modal.style.display = 'block';
//   }
// });

youtubeBtn.forEach((btn) => {
  btn.onclick = function () {
    myModalYoutube.style.display = 'block'
  }
});

programAwards.forEach((btn) => {
  btn.onclick = function () {
    awards.style.display = 'block';
  }
});

// When the user clicks the button, open the modal
//btn.onclick = function () {
//  myModalSpeakers.style.display = 'block'
//}

// myModalTwoShow.onclick = function () {
//    myModalTwo.style.display = 'block'
// }

window.onscroll = function () {
  // Проверить, прокручена ли страница больше, чем высота header.
  if (window.pageYOffset > headerHeight) {
    header.style.backgroundColor = '#17181F';
  } else {
    header.style.backgroundColor = 'transparent';
  }
};

document.querySelectorAll('.close').forEach((item) => {
  item.addEventListener('click', (event) => {
    modal.style.display = 'none'
    awards.style.display = 'none'
    myModalSpeakers.style.display = 'none'
    myModalTwo.style.display = 'none'
    myModalYoutube.style.display = 'none'
  })
})

document.querySelectorAll('.modal-btn').forEach((item) => {
  item.addEventListener('click', (event) => {
    modal.style.display = 'block'
  })
})

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = 'none'
  awards.style.display = 'none'
  myModalSpeakers.style.display = 'none'
  myModalTwo.style.display = 'none'
  myModalYoutube.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal || event.target == myModalSpeakers || event.target == awards || event.target == myModalYoutube) {
    modal.style.display = 'none'
    awards.style.display = 'none'
    myModalSpeakers.style.display = 'none'
    myModalTwo.style.display = 'none'
    myModalYoutube.style.display = 'none'
  }
}

const boxes = document.getElementsByClassName('toggle')
const slideDown = (elem) => (elem.style.height = `${elem.scrollHeight}px`)
const slideUp = (elem) => (elem.style.height = `0px`)

for (let i = 0, l = boxes.length; i < l; i++) {
  boxes[i].addEventListener('click', function handleClick(e) {
    if (e.target.classList.contains('opened')) {
      e.target.classList.toggle('opened')
      slideUp(document.getElementsByClassName('content')[i])
    } else {
      e.target.classList.toggle('opened')
      slideDown(document.getElementsByClassName('content')[i])
    }
  })
}

const menu = document.getElementById('burger')
const nav = document.getElementById('MobNav')

menu.addEventListener('click', function (e) {
  e.target.classList.toggle('opened')
  nav.classList.toggle('opened')
})

nav.addEventListener('click', function (e) {
  menu.classList.toggle('opened')
  nav.classList.toggle('opened')
})

class ItcSlider {
  static WRAPPER_SELECTOR = '.slider__wrapper'
  static ITEMS_SELECTOR = '.slider__items'
  static ITEM_SELECTOR = '.slider__item'
  static CONTROL_CLASS = 'slider__control'
  static SELECTOR_PREV = '.slider__control[data-slide="prev"]'
  static SELECTOR_NEXT = '.slider__control[data-slide="next"]'
  static SELECTOR_INDICATOR = '.slider__indicators>li'
  static SLIDER_TRANSITION_OFF = 'slider_disable-transition'
  static CLASS_CONTROL_HIDE = 'slider__control_hide'
  static CLASS_ITEM_ACTIVE = 'slider__item_active'
  static CLASS_INDICATOR_ACTIVE = 'active'

  static contains = []

  static createInstances() {
    document.querySelectorAll('[data-slider="itc-slider"]').forEach((el) => {
      if (this.contains.find((item) => item.el === el)) {
        return
      }
      const dataset = el.dataset
      const params = {}
      Object.keys(dataset).forEach((key) => {
        if (key === 'slider') {
          return
        }
        let value = dataset[key]
        value = value === 'true' ? true : value
        value = value === 'false' ? false : value
        value = Number.isNaN(Number(value)) ? Number(value) : value
        params[key] = value
      })
      this.contains.push({ el, slider: new ItcSlider(el, params) })
      el.dataset.sliderId = this.contains.length
      el.querySelectorAll('.slider__control').forEach((el) => {
        el.dataset.sliderTarget = this.contains.length
      })
    })
  }


  constructor(selector, config) {
    // СЌР»РµРјРµРЅС‚С‹ СЃР»Р°Р№РґРµСЂР°
    const $root =
      typeof selector === 'string' ? document.querySelector(selector) : selector
    this._$root = $root
    this._$wrapper = $root.querySelector(ItcSlider.WRAPPER_SELECTOR)
    this._$items = $root.querySelector(ItcSlider.ITEMS_SELECTOR)
    this._$itemList = $root.querySelectorAll(ItcSlider.ITEM_SELECTOR)
    this._$controlPrev = $root.querySelector(ItcSlider.SELECTOR_PREV)
    this._$controlNext = $root.querySelector(ItcSlider.SELECTOR_NEXT)
    this._$indicatorList = $root.querySelectorAll(ItcSlider.SELECTOR_INDICATOR)
    // СЌРєСЃС‚СЂРµРјР°Р»СЊРЅС‹Рµ Р·РЅР°С‡РµРЅРёСЏ СЃР»Р°Р№РґРѕРІ
    this._minOrder = 0
    this._maxOrder = 0
    this._$itemWithMinOrder = null
    this._$itemWithMaxOrder = null
    this._minTranslate = 0
    this._maxTranslate = 0
    // РЅР°РїСЂР°РІР»РµРЅРёРµ СЃРјРµРЅС‹ СЃР»Р°Р№РґРѕРІ (РїРѕ СѓРјРѕР»С‡Р°РЅРёСЋ)
    this._direction = 'next'
    // determines whether the position of item needs to be determined
    this._balancingItemsFlag = false
    this._activeItems = []
    // С‚РµРєСѓС‰РµРµ Р·РЅР°С‡РµРЅРёРµ С‚СЂР°РЅСЃС„РѕСЂРјР°С†РёРё
    this._transform = 0
    // swipe РїР°СЂР°РјРµС‚СЂС‹
    this._hasSwipeState = false
    this.__swipeStartPos = 0
    // slider properties
    this._transform = 0 // С‚РµРєСѓС‰РµРµ Р·РЅР°С‡РµРЅРёРµ С‚СЂР°РЅСЃС„РѕСЂРјР°С†РёРё
    this._intervalId = null
    // configuration of the slider
    this._config = {
      loop: true,
      autoplay: false,
      interval: 3000,
      refresh: true,
      swipe: true,
    }
    this._config = Object.assign(this._config, config)
    // create some constants
    const $itemList = this._$itemList
    const widthItem = $itemList[0].offsetWidth
    // const widthWrapper = this._$wrapper.offsetWidth;
    const widthWrapper = this._$wrapper.getBoundingClientRect().width
    const itemsInVisibleArea = Math.round(widthWrapper / widthItem)
    // initial setting properties
    this._widthItem = widthItem
    this._widthWrapper = widthWrapper
    this._itemsInVisibleArea = itemsInVisibleArea
    this._transformStep = 100 / itemsInVisibleArea

    this._widthStep = $itemList[0].getBoundingClientRect().width

    this._el = $root

    // initial setting order and translate items
    for (let i = 0, length = $itemList.length; i < length; i++) {
      $itemList[i].dataset.index = i
      $itemList[i].dataset.order = i
      $itemList[i].dataset.translate = 0
      if (i < itemsInVisibleArea) {
        this._activeItems.push(i)
      }
    }
    if (this._config.loop) {
      // РїРµСЂРµРјРµС‰Р°РµРј РїРѕСЃР»РµРґРЅРёР№ СЃР»Р°Р№Рґ РїРµСЂРµРґ РїРµСЂРІС‹Рј
      const count = $itemList.length - 1
      // const translate = -$itemList.length * 100;
      const translate = -$itemList.length * this._widthStep
      $itemList[count].dataset.order = -1
      $itemList[count].dataset.translate = translate
      $itemList[count].style.transform = `translateX(${translate}px)`
      this._refreshExtremeValues()
    } else if (this._$controlPrev) {
      this._$controlPrev.classList.add(ItcSlider.CLASS_CONTROL_HIDE)
    }
    this._setActiveClass()
    this._addEventListener()
    this._updateIndicators()
    this._autoplay()
  }
  _addEventListener() {
    const $root = this._$root
    const $items = this._$items
    const config = this._config

    function onClick(e) {
      const $target = e.target
      this._autoplay('stop')
      console.log($target.classList)
      if ($target.classList.contains(ItcSlider.CONTROL_CLASS)) {
        e.preventDefault()
        this._direction = $target.dataset.slide
        this._move()
      } else if ($target.dataset.slideTo) {
        const index = parseInt($target.dataset.slideTo, 10)
        this._moveTo(index)
      }
      if (this._config.loop) {
        this._autoplay()
      }
    }

    function onMouseEnter() {
      this._autoplay('stop')
    }

    function onMouseLeave() {
      this._autoplay()
    }

    function onTransitionStart() {
      if (this._balancingItemsFlag) {
        return
      }
      this._balancingItemsFlag = true
      window.requestAnimationFrame(this._balancingItems.bind(this))
    }

    function onTransitionEnd() {
      this._balancingItemsFlag = false
    }

    function onResize() {
      window.requestAnimationFrame(this._refresh.bind(this))
    }

    function onSwipeStart(e) {
      this._autoplay('stop')
      const event = e.type.search('touch') === 0 ? e.touches[0] : e
      this._swipeStartPos = event.clientX
      this._hasSwipeState = true
    }

    function onSwipeEnd(e) {
      if (!this._hasSwipeState) {
        return
      }
      const event = e.type.search('touch') === 0 ? e.changedTouches[0] : e
      const diffPos = this._swipeStartPos - event.clientX
      if (diffPos > 50) {
        this._direction = 'next'
        this._move()
      } else if (diffPos < -50) {
        this._direction = 'prev'
        this._move()
      }
      this._hasSwipeState = false
      if (this._config.loop) {
        this._autoplay()
      }
    }

    function onDragStart(e) {
      e.preventDefault()
    }

    function onVisibilityChange() {
      if (document.visibilityState === 'hidden') {
        this._autoplay('stop')
      } else if (document.visibilityState === 'visible') {
        if (this._config.loop) {
          this._autoplay()
        }
      }
    }

    $root.addEventListener('click', onClick.bind(this))
    $root.addEventListener('mouseenter', onMouseEnter.bind(this))
    $root.addEventListener('mouseleave', onMouseLeave.bind(this))
    // on resize
    if (config.refresh) {
      window.addEventListener('resize', onResize.bind(this))
    }
    // on transitionstart and transitionend
    if (config.loop) {
      $items.addEventListener('transition-start', onTransitionStart.bind(this))
      $items.addEventListener('transitionend', onTransitionEnd.bind(this))
    }
    // on touchstart and touchend
    if (config.swipe) {
      $root.addEventListener('touchstart', onSwipeStart.bind(this))
      $root.addEventListener('mousedown', onSwipeStart.bind(this))
      document.addEventListener('touchend', onSwipeEnd.bind(this))
      document.addEventListener('mouseup', onSwipeEnd.bind(this))
    }
    $root.addEventListener('dragstart', onDragStart.bind(this))
    // РїСЂРё РёР·РјРµРЅРµРЅРёРё Р°РєС‚РёРІРЅРѕСЃС‚Рё РІРєР»Р°РґРєРё
    document.addEventListener('visibilitychange', onVisibilityChange.bind(this))
  }
  _refreshExtremeValues() {
    const $itemList = this._$itemList
    this._minOrder = +$itemList[0].dataset.order
    this._maxOrder = this._minOrder
    this._$itemByMinOrder = $itemList[0]
    this._$itemByMaxOrder = $itemList[0]
    this._minTranslate = +$itemList[0].dataset.translate
    this._maxTranslate = this._minTranslate
    for (let i = 0, length = $itemList.length; i < length; i++) {
      const $item = $itemList[i]
      const order = +$item.dataset.order
      if (order < this._minOrder) {
        this._minOrder = order
        this._$itemByMinOrder = $item
        this._minTranslate = +$item.dataset.translate
      } else if (order > this._maxOrder) {
        this._maxOrder = order
        this._$itemByMaxOrder = $item
        this._maxTranslate = +$item.dataset.translate
      }
    }
  }
  _balancingItems() {
    if (!this._balancingItemsFlag) {
      return
    }
    const $wrapper = this._$wrapper
    const $wrapperClientRect = $wrapper.getBoundingClientRect()
    const widthHalfItem =
      $wrapperClientRect.width / this._itemsInVisibleArea / 2
    const count = this._$itemList.length
    let translate
    let clientRect
    if (this._direction === 'next') {
      const wrapperLeft = $wrapperClientRect.left
      const $min = this._$itemByMinOrder
      translate = this._minTranslate
      clientRect = $min.getBoundingClientRect()
      if (clientRect.right < wrapperLeft - widthHalfItem) {
        $min.dataset.order = this._minOrder + count
        // translate += count * 100;
        translate += count * this._widthStep
        $min.dataset.translate = translate
        $min.style.transform = `translateX(${translate}px)`
        // update values of extreme properties
        this._refreshExtremeValues()
      }
    } else {
      const wrapperRight = $wrapperClientRect.right
      const $max = this._$itemByMaxOrder
      translate = this._maxTranslate
      clientRect = $max.getBoundingClientRect()
      if (clientRect.left > wrapperRight + widthHalfItem) {
        $max.dataset.order = this._maxOrder - count
        // translate -= count * 100;
        translate -= count * this._widthStep
        $max.dataset.translate = translate
        $max.style.transform = `translateX(${translate}px)`
        // update values of extreme properties
        this._refreshExtremeValues()
      }
    }
    // updating...
    requestAnimationFrame(this._balancingItems.bind(this))
  }
  _setActiveClass() {
    const activeItems = this._activeItems
    const $itemList = this._$itemList
    for (let i = 0, length = $itemList.length; i < length; i++) {
      const $item = $itemList[i]
      const index = +$item.dataset.index
      if (activeItems.indexOf(index) > -1) {
        $item.classList.add(ItcSlider.CLASS_ITEM_ACTIVE)
      } else {
        $item.classList.remove(ItcSlider.CLASS_ITEM_ACTIVE)
      }
    }
  }
  _updateIndicators() {
    const $indicatorList = this._$indicatorList
    const $itemList = this._$itemList
    if (!$indicatorList.length) {
      return
    }
    for (let index = 0, length = $itemList.length; index < length; index++) {
      const $item = $itemList[index]
      if ($item.classList.contains(ItcSlider.CLASS_ITEM_ACTIVE)) {
        $indicatorList[index].classList.add(ItcSlider.CLASS_INDICATOR_ACTIVE)
      } else {
        $indicatorList[index].classList.remove(ItcSlider.CLASS_INDICATOR_ACTIVE)
      }
    }
  }
  _move() {
    // const step = this._direction === 'next' ? -this._transformStep : this._transformStep;
    const step = this._direction === 'next' ? -this._widthStep : this._widthStep
    let transform = this._transform + step
    if (!this._config.loop) {
      // const endTransformValue = this._transformStep * (this._$itemList.length - this._itemsInVisibleArea);
      const endTransformValue =
        this._widthStep * (this._$itemList.length - this._itemsInVisibleArea)
      // transform = Math.round(transform * 10) / 10;
      if (transform < -endTransformValue || transform > 0) {
        return
      }
      if (this._$controlPrev) {
        this._$controlPrev.classList.remove(ItcSlider.CLASS_CONTROL_HIDE)
        this._$controlNext.classList.remove(ItcSlider.CLASS_CONTROL_HIDE)
        if (transform === -endTransformValue) {
          this._$controlNext.classList.add(ItcSlider.CLASS_CONTROL_HIDE)
        } else if (transform === 0) {
          this._$controlPrev.classList.add(ItcSlider.CLASS_CONTROL_HIDE)
        }
      }
    }
    const activeIndex = []
    let i = 0
    let length
    let index
    let newIndex
    if (this._direction === 'next') {
      for (i = 0, length = this._activeItems.length; i < length; i++) {
        index = this._activeItems[i]
        index += 1
        newIndex = index
        if (newIndex > this._$itemList.length - 1) {
          newIndex -= this._$itemList.length
        }
        activeIndex.push(newIndex)
      }
    } else {
      for (i = 0, length = this._activeItems.length; i < length; i++) {
        index = this._activeItems[i]
        index -= 1
        newIndex = index
        if (newIndex < 0) {
          newIndex += this._$itemList.length
        }
        activeIndex.push(newIndex)
      }
    }
    this._activeItems = activeIndex
    this._setActiveClass()
    this._updateIndicators()
    this._transform = transform
    this._$items.style.transform = `translateX(${transform}px)`
    this._$items.dispatchEvent(
      new CustomEvent('transition-start', {
        bubbles: true,
      }),
    )
  }
  _moveToNext() {
    this._direction = 'next'
    this._move()
  }
  _moveToPrev() {
    this._direction = 'prev'
    this._move()
  }
  _moveTo(index) {
    const $indicatorList = this._$indicatorList
    let nearestIndex = null
    let diff = null
    let i
    let length
    for (i = 0, length = $indicatorList.length; i < length; i++) {
      const $indicator = $indicatorList[i]
      if ($indicator.classList.contains(ItcSlider.CLASS_INDICATOR_ACTIVE)) {
        const slideTo = +$indicator.dataset.slideTo
        if (diff === null) {
          nearestIndex = slideTo
          diff = Math.abs(index - nearestIndex)
        } else if (Math.abs(index - slideTo) < diff) {
          nearestIndex = slideTo
          diff = Math.abs(index - nearestIndex)
        }
      }
    }
    diff = index - nearestIndex
    if (diff === 0) {
      return
    }
    this._direction = diff > 0 ? 'next' : 'prev'
    for (i = 1; i <= Math.abs(diff); i++) {
      this._move()
    }
  }
  _autoplay(action) {
    if (!this._config.autoplay) {
      return
    }
    if (action === 'stop') {
      clearInterval(this._intervalId)
      this._intervalId = null
      return
    }
    if (this._intervalId === null) {
      this._intervalId = setInterval(() => {
        this._direction = 'next'
        this._move()
      }, this._config.interval)
    }
  }
  _refresh() {
    // create some constants
    const $itemList = this._$itemList
    const widthItem = $itemList[0].getBoundingClientRect().width
    const widthWrapper = this._$wrapper.getBoundingClientRect().width
    const itemsInVisibleArea = Math.round(widthWrapper / widthItem)

    if (
      widthItem === this._widthStep &&
      itemsInVisibleArea === this._itemsInVisibleArea
    ) {
      return
    }

    this._autoplay('stop')

    this._$items.classList.add(ItcSlider.SLIDER_TRANSITION_OFF)
    this._$items.style.transform = 'translateX(0)'

    // setting properties after reset
    this._widthItem = widthItem
    this._widthWrapper = widthWrapper
    this._itemsInVisibleArea = itemsInVisibleArea
    this._transform = 0
    this._transformStep = 100 / itemsInVisibleArea
    this._widthStep = widthItem
    this._balancingItemsFlag = false
    this._activeItems = []

    // setting order and translate items after reset
    for (let i = 0, length = $itemList.length; i < length; i++) {
      const $item = $itemList[i]
      const position = i
      $item.dataset.index = position
      $item.dataset.order = position
      $item.dataset.translate = 0
      $item.style.transform = 'translateX(0)'
      if (position < itemsInVisibleArea) {
        this._activeItems.push(position)
      }
    }

    this._setActiveClass()
    this._updateIndicators()
    window.requestAnimationFrame(() => {
      this._$items.classList.remove(ItcSlider.SLIDER_TRANSITION_OFF)
    })

    // hide prev arrow for non-infinite slider
    if (!this._config.loop) {
      if (this._$controlPrev) {
        this._$controlPrev.classList.add(ItcSlider.CLASS_CONTROL_HIDE)
      }
      return
    }

    // translate last item before first
    const count = $itemList.length - 1
    // const translate = -$itemList.length * 100;
    const translate = -$itemList.length * this._widthStep
    $itemList[count].dataset.order = -1
    $itemList[count].dataset.translate = translate
    $itemList[count].style.transform = `translateX(${translate}px)`
    // update values of extreme properties
    this._refreshExtremeValues()
    // calling _autoplay
    this._autoplay()
  }
  next() {
    this._moveToNext()
  }
  prev() {
    this._moveToPrev()
  }
  moveTo(index) {
    this._moveTo(index)
  }
  refresh() {
    this._refresh()
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ItcSlider.createInstances()
})