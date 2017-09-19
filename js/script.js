document.addEventListener('DOMContentLoaded', function(){

document.querySelector('.hamburger-menu').addEventListener('click', function(){
    document.querySelector('.fullscreen-menu').style.display = 'block';
});

document.querySelector('.fullscreen-menu__close').addEventListener('click', function(){
    document.querySelector('.fullscreen-menu').style.display = 'none';
});

});

//***слайдер****/

var button = $('.slider__arrow'),
    container = button.closest('.slider__block');

button.on('click', function(){
    var $this = $(this),
        items = $('.slider__item', container),
        itemActive = items.filter('.slider__item-active'),
        list = $('.slider__list'),
        itemSib;

        if ($this.hasClass('slider__arrow-right')) {
            itemSib = itemActive.next();
            if (itemSib.length == 0) {
                itemSib = items.first();
            };
        } else {
            itemSib = itemActive.prev();
            if (itemSib.length == 0) {
                itemSib = items.last();
            };
        };
        
    var itemIndex = itemSib.index();

        list.animate({'left': (itemIndex * -100) + '%'}, 500, function(){
            itemActive.removeClass('slider__item-active');
            itemSib.addClass('slider__item-active');
        });

});

//***аккордеон**//

var acco = $('.acco'),
    accoItems = $('.acco__item'),
    contentHeight;

accoItems.on('click', function(){
    var $this = $(this),
        accoTitle = $('.acco__title', this),
        accoContent = $('.acco__content', this);

        if ($this.hasClass('acco__item-active')) { 
            accoContent.slideUp(500);
            $this.removeClass('acco__item-active');
        } else {
            accoItems.removeClass('acco__item-active');
            $this.addClass('acco__item-active');
            accoItems.find('.acco__content').slideUp(500);
            accoContent.slideDown(500)
        }
})

//***вертикальный аккордеон***//

var accoVertical = $('.acco-vertical'),
    accoVerItems = $('.acco-vertical__item');

accoVerItems.on('click', function(){
    var $this = $(this),
        accoVerContent = $this.next();

    if ($this.hasClass('acco-vertical__item-active')) { 
        accoVerContent.css('flex', '0');
        $this.removeClass('acco-vertical__item-active');
    } else {
        $this.addClass('acco-vertical__item-active')
            .siblings().removeClass('acco-vertical__item-active');
        $('.acco-vertical__content').css('flex', '0');
        accoVerContent.css('flex', '1');
    }
})

// **навигация***//

var main = $('.main'),
    sections = $('.section'),
    isScroll = false;

var scrollDirection = function(direction){

    var sectionActive = sections.filter('.section-active'),
    sectionNext = sectionActive.next(),
    sectionPrev = sectionActive.prev(); 

    if (direction == 'down' && sectionNext.length) {
        scrollMain(sectionNext.index());
    }
        
    if (direction == 'up' && sectionPrev.length) {
        scrollMain(sectionPrev.index());
    }
}

var scrollMain = function(sectionEq){
    
            if (isScroll) return
            isScroll = true;
    
            main.css('transform', 'translateY(' + (sectionEq * -100) + '%)');
            sections.eq(sectionEq).addClass('section-active')
                .siblings().removeClass('section-active');
    
            $('.navigation-fixed__item').eq(sectionEq).addClass('active')
               .siblings().removeClass('active');
    
            setTimeout(function(){
                isScroll = false;
            }, 1300);
        }

$('.wrapper').on('wheel', function(event){ 
    
    var direction = event.originalEvent.deltaY > 0 ? 'down' : 'up';

    scrollDirection(direction);
});

$(document).on('keydown', function(event){

    switch (event.keyCode) {
        case 38:
            scrollDirection('up');
            break;
        case 40:  
            scrollDirection('down');
            break;
    };
});

$('[data-scroll]').on('click touchstart', function(){
    scrollMain($(this).attr('data-scroll'));
})

$(window).swipe({
    swipe: function(event, direction){
        scrollDirection(direction);
    }
})

//***карта***//

ymaps.ready(init);
var myMap;

function init(){     
    myMap = new ymaps.Map("map", {
        center: [59.91817154482064,30.30557799999997],
        zoom: 12,
        controls: [],
    });

    myMap.behaviors.disable('scrollZoom');

    var myPlacemark = new ymaps.Placemark([], {}, {
            iconLayout: 'default#image',
            iconImageHref: '../image/icons/map-marker.svg',
            iconImageSize: [50, 72],
            iconImageOffset: [-3, -42]
        });
 
    var coords = [
        [59.94554327989287,30.38935262114668],
        [59.91142323563909,30.50024587065841],
        [59.88693161784606,30.319658102103713],
        [59.97033574821672,30.315194906302924]
    ],
        myCollection = new ymaps.GeoObjectCollection({}, {
            iconLayout: 'default#image',
            iconImageHref: 'image/icons/map-marker.svg',
            iconImageSize: [50, 72],
            iconImageOffset: [-3, -42]
        });
    
    for (var i = 0; i < coords.length; i++) {
        myCollection.add(new ymaps.Placemark(coords[i]));
    }
    
    myMap.geoObjects.add(myCollection);
}

//***фокус на input**//

$('label').on('click', function(){
    $('.form__input', this).focus();
})

//***модальное окно**//

$('[data-fancybox]').fancybox({

})

var linkModal = $('[data-fancybox]');

linkModal.on('click', function(){
    var $this = $(this),
        titleHoverContainer = ($this.siblings('.reviews__title')).text(),
        textHoverContainer = ($this.siblings('.reviews__text')).text(),
        modalTitle = $('.modal__title'),
        modalText = $('.modal__text');

        modalTitle.text(titleHoverContainer);
        modalText.text(textHoverContainer);
});