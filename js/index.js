require('../sass/main.scss');

$(document).ready(function () {
    // Set up font page carousel
    $('.main-carousel').slick({
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 2000
    });
    var initProductSlider = function(){
        $('.carousel-inner').not('.slick-initialized').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.productThumbCarousel-list'
        });
    };
    initProductSlider();
    $('.productThumbCarousel-list').slick({
        variableWidth: true,
        slidesToScroll: 1,
        nextArrow: '<button class="btn btn-secondary slick-next"><i class="fa fa-angle-right"></i></button>',
        prevArrow: '<button class="btn btn-secondary slick-prev"><i class="fa fa-angle-left"></i></button>',
        asNavFor: '.carousel-inner',
        dots: false,
        focusOnSelect: true
    });

    // Set up related-products carousels
    var $relatedProductsContainers = $('.related-products');

    $relatedProductsContainers.each(function (i, container) {
        var $container = $(container);
        $container.find('.related-products-list').slick({
            dots: false,
            infinite: false,
            slidesToShow: 6,
            slidesToScroll: 6,
            prevArrow: $container.find('.related-products-prev'),
            nextArrow: $container.find('.related-products-next'),
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3
                    }
                }
            ]
        });
    });
    //
    // Set up sticky product on product page

    var $productHeader = $('.product_header');
    var $productTabs = $('.product-detail-tabs > .navbar');
    var $productScrollPoint = 210;

    $(window).scroll(function () {
        if ($(window).scrollTop() >= $productScrollPoint) {
            $productHeader.addClass('fixed');
            $productTabs.addClass('fixed');
            $('.product-detail-content').css('padding-top', $productScrollPoint);
        }else{
            $productHeader.removeClass('fixed');
            $productTabs.removeClass('fixed');
            $('.product-detail-content').css('padding-top', '0');
        }
        if ($(window).scrollTop() <= $productScrollPoint){
            $('.carousel-inner').slick('reinit');
        }
    });

    // Add scrollspy to <body>
    var offsetVal = 130;
    $('body').scrollspy({target: "#product-detail-info", offset: offsetVal});

    $("#product-detail-info li a").click(function (e) {
        e.preventDefault();
        var hash = this.hash;
        $('html, body').animate({scrollTop: $(hash).offset().top - offsetVal}, 800);
    });

    // Set up sticky footer on cart page

    var $cartFooter = $('.cart-footer');
    var $cartServices = $('.cart-services');

    function checkOffset() {
        var y = $(window).scrollTop();
        var viewportHeight = window.innerHeight;

        if (y + viewportHeight < $cartServices.offset().top) {
            $cartFooter.css('position', 'fixed');

        } else {
            $cartFooter.css('position', 'static');
        }
    }

    // Only enable sticky footer on cart page
    if ($cartFooter.length > 0 && $cartServices.length > 0) {
        $(document).scroll(checkOffset);
        checkOffset();
    }

    // Set up category selector dropdowns
    // $('.category-selector-items').parent().hover(function (e) {
    //     var $target = $(e.type === "mouseenter");
    //
    //     if (!$target.children().hasClass('category-selector-button')) {
    //         return;
    //     }
    //     if ($target.children().hasClass('show')) {
    //         $target.children().removeClass('show');
    //     } else {
    //         $(this).children().each(function (index, item) {
    //             $(item).removeClass('show');
    //         });
    //         $target.children().addClass('show');
    //     }
    // });
    $('.category-selector-items').parent().on("mouseover" , function () {
        $(this).children('.collapse').collapse('show');
    });
    $('.category-selector-items').parent().on("mouseleave" , function () {
        $(this).children('.collapse').collapse('hide');
    });
    $('.header-search-icon').click(function (e) {
        e.preventDefault();
        $('.header-search').addClass('d-flex')
    });
    $('#closeMobileSearch').click(function (e) {
        e.preventDefault();
        $('.header-search').removeClass('d-flex')
    });
    $('#showFilterListing').click(function () {
        $('.filter-box').slideDown( "300");
    });
    $('#closeFilterListing').click(function (e) {
        e.preventDefault();
        $('.filter-box').slideUp( "300");
    });
    $(window).scroll(function(){
        if ($(this).scrollTop() > $(".main-products").height() - 200) {
            $('.main-products > .scrollTop').addClass("show");
        } else {
            $('.main-products > .scrollTop').removeClass("show");
        }
        if ($(this).scrollTop() > $(".accessories-listing-fiters").height()) {
            $('#scrollTop').addClass("show");
        } else {
            $('#scrollTop').removeClass("show");
        }
    });
    $('#scrollTop').click(function(){
        $('html, body').animate({scrollTop : 0});
        return false;
    });
    var max_col_height = 0; // максимальная высота, первоначально 0
    $('.related-products-list > .product-preview').each(function(){ // цикл "для каждой из колонок"
        if ($(this).height() > max_col_height) { // если высота колонки больше значения максимальной высоты,
            max_col_height = $(this).height(); // то она сама становится новой максимальной высотой
        }
    });
    $('.related-products-list > .product-preview').height(max_col_height); // устанавливаем высоту каждой колонки равной значению
    // максимальной высоты


});
