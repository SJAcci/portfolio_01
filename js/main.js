//popup
$(document).ready(function(){
    function setCookie(name, value, expiredays){
        var todayDate = new Date();

        todayDate.setDate(todayDate.getDate() + expiredays);

        document.cookie = name + '=' + escape( value ) + '; path=/; expires=' + todayDate.toGMTString() + ';'
    }

    var popup = '.popup';
    var chkbox = '#chkBox';

    $(popup).find('form a').click(function(){
        var chk = $(chkbox).prop('checked');
        
        if(chk){
            setCookie('exCookie','done',1); 
        }
        
        $(popup).stop().fadeOut(0);
    });
    
    var cookieData = document.cookie;

    if(cookieData.indexOf('exCookie=done') < 0){
        $(popup).fadeIn(0);
    }else{
        $(popup).fadeOut(0);
    }
    
    //스크롤바가 팝업 지나가면 안보이게 처리
    $(window).scroll(function(){
        var top = $(window).scrollTop();
        var pTop = $(popup).offset().top; 
        var pHeight = $(popup).outerHeight();
        
        if(top > pTop + pHeight){ //팝업 지나가면
            $(popup).stop().fadeOut(0);
        }
    }); 
});


//fullpage
$(document).ready(function(){
    var fullpage = '.fullpage';
    var page = '.fullpage > div';
    var nav = '.quick_nav > ul'; 
    var speed = 1000;
    var easing = 'swing';
    var title = '.quick_nav a';
    var arrMembers = ["", "메뉴", "매장", "문의", "공방", "공지사항<br> · <br>이벤트", "동영상", ""];
    
    //2. 퀵네비 li개수 동적생성
    var num = $(page).size(); //페이지 개수를 담는 변수
    
    var list = ''; //li태그를 문자로 담을 변수
    
    //반복문을 통해 li태그 반복
    for(var i=0;i<num;i++){
        list += '<li><a href="#">' + arrMembers[i] + '</a></li>';
        
    }
    
    //퀵네비에 리스트를 담기
    $(nav).html(list); //html() - 문자열의 태그 인식
    
    
    //첫번째 li의 a가 활성화
    $(nav).find('li:first a').addClass('active');
    
    //!처음에 nav가 안보이게 처리!
    $(nav).parent().css({
      opacity: 0,
      zIndex: -1
    });
    
    
    //3. 풀페이지 - resize이벤트
    $(window).resize(function(){
        var h = $(window).height(); //창의 높이를 담는 변수
        
        $(page).not('.footer').outerHeight(h); //요소 + 테두리 + 패딩
        
        
        //리사이즈시 스크롤 위치가 그대로 남아 있는 것을 방지
        var activePage = $(nav).find('a.active').parent().index();
        var pageHeight = $(page).outerHeight(); //마우스휠 내릴때의 페이지의 높이
        
        var fHeight = $(page).last().outerHeight();
        
        var lastNum = num - 1;
        
        
        //!만약 activePage가 0이거나 lastNum과 같으면 보이지 않게처리, 그렇지 않으면 보이게처리!
        if(activePage === 0 || activePage == lastNum){
            $(nav).parent().css({
              opacity: 0,
              zIndex: -1
            });
        }else{
            $(nav).parent().css({
              opacity: 1,
              zIndex: 1000000
            });
        }
        
        if(activePage < lastNum){
            $(fullpage).stop().animate({
                top: activePage * -pageHeight
            },speed,easing);
        }else if(activePage == lastNum){
            $(fullpage).stop().animate({
                top: (activePage * -pageHeight) + fHeight
            },speed,easing);
        }
    });
    
    //4.초기실행
    $(window).trigger('resize');
    
    
    //5. 마우스휠 이벤트 : mousewheel, DOMMouseScroll - on()메서드를 통해서 연결해줘야 함
    //e.originalEvent.wheelDelta; - 마우스 방향을 알수 있는 이벤트 객체
    //음수 : 마우스 휠이 아래 방향
    //양수 : 마우스 휠이 위 방향
    $(window).on('mousewheel DOMMouseScroll',function(e){
        //현재 페이지번호를 담는 변수
        var activePage = $(nav).find('a.active').parent().index();
        
        //마우스휠이 많이 움직이는 것을 방지
        //is() : 매개변수상황이 맞으면 true반환, 그렇지 않으면 false를 반환
        //is의 매개변수 - :hidden, :visible, :animated 등
        if($(fullpage).is(':animated')){
            return false; //아래 코드 반환하지 말것
        }
        
        var wData = e.originalEvent.wheelDelta;
        var pageHeight = $(page).outerHeight(); //마우스휠 내릴때의 페이지의 높이
        var lastNum = num - 1; //인덱스번호는 개수보다 한개 적음
        var fHeight = $(page).last().outerHeight();
        
        if(wData < 0){ //마우스휠을 아래로 내린다면
            if(activePage < lastNum - 1){ //마지막페이지가 아니라면
                $(fullpage).stop().animate({
                    top: '-=' + pageHeight
                },speed,easing,function(){
                    //!activePage가 0과 lastNum과 같으면 안보이게 처리, 그렇지 않으면 보이게 처리!
                    if(activePage == 0 || activePage == lastNum){
                        $(nav).parent().css({
                          opacity: 0,
                          zIndex: -1
                        });
                    }else{
                        $(nav).parent().css({
                          opacity: 1,
                          zIndex: 1000000
                        });
                    }
                });
                
                $(nav).find('a').removeClass('active'); //모든 버튼활성화는 제거 후
                $(nav).find('li').eq(++activePage).find('a').addClass('active');
            }else if(activePage == (lastNum - 1)){
                $(fullpage).stop().animate({
                    top: '-=' + fHeight
                },speed,easing,function(){
                    //!nav가 안보이게 처리!
                    $(nav).parent().css({
                      opacity: 0,
                      zIndex: -1
                    });
                });
                
                $(nav).find('a').removeClass('active'); //모든 버튼활성화는 제거 후
                $(nav).find('li').last().find('a').addClass('active');
            }
        }else{ //마우스휠을 위로 올린다면
            if(activePage > 0 && activePage <= lastNum - 1){ //첫번째 페이지가 아니라면
                $(fullpage).stop().animate({
                    top: '+=' + pageHeight
                },speed,easing,function(){
                    //activePage가 0과 lastNum과 같으면 안보이게 처리, 그렇지 않으면 보이게 처리
                    if(activePage == 0 || activePage == lastNum){
                        $(nav).parent().css({
                          opacity: 0,
                          zIndex: -1
                        });
                    }else{
                        $(nav).parent().css({
                          opacity: 1,
                          zIndex: 1000000
                        });
                    }
        
                });
                
                $(nav).find('a').removeClass('active'); //모든 버튼활성화는 제거 후
                $(nav).find('li').eq(--activePage).find('a').addClass('active');
            }else if(activePage > lastNum - 1){
                
                $(fullpage).stop().animate({
                    top: '+=' + fHeight
                },speed,easing,function(){
                    $(nav).parent().css({
                      opacity: 1,
                      zIndex: 1000000
                    });
                });
                
                $(nav).find('a').removeClass('active'); //모든 버튼활성화는 제거 후
                $(nav).find('li').eq(--activePage).find('a').addClass('active');
            }
        }
        
    });//마우스휠 이벤트 종료
    
    
    //6. 퀵메뉴 버튼을 클릭하면 해당 페이지로 이동, 버튼활성화
    $(nav).find('a').click(function(e){
        
        e.preventDefault(); 
        var activePage = $(this).parent().index();
        
        if($(fullpage).is(':animated')){
            return false; //아래 코드 반환하지 말것
        }
        
        //버튼 활성처리
        $(nav).find('a').removeClass('active');
        $(this).addClass('active');
        
        var pageHeight = $(page).outerHeight(); //클릭할 때의 페이지 높이
        var fHeight = $(page).last().outerHeight();
        
        var lastNum = num - 1;
        
        if(activePage < lastNum){
            $(fullpage).stop().animate({
                top: activePage * -pageHeight
            },speed,easing,function(){
                //!activePage가 0거나 lastNum과 같으면 안보이게 처리, 그렇지 않으면 보이게 처리!
                if(activePage === 0 || activePage == lastNum){
                    $(nav).parent().css({
                      opacity: 0,
                      zIndex: -1
                    });
                }else{
                    $(nav).parent().css({
                      opacity: 1,
                      zIndex: 1000000
                    });
                }
            });
        }else if(activePage == lastNum){
            $(fullpage).stop().animate({
                top: ((activePage - 1) * -pageHeight) - fHeight
            },speed,easing,function(){
                //!nav가 안보이게처리!
                $(nav).parent().css({
                  opacity: 0,
                  zIndex: -1
                });
            });
        }
    });
});


//main_slider
$(document).ready(function(){
    $(window).resize(function(){
        var wHeight = $(window).height(); 

        $('.main_slider').outerHeight(wHeight);
    });

    $(window).trigger('resize');

    $('.main_slider .flexslider').flexslider({
        nextText: '',
        slideshowSpeed: 5000,
        /*animation: "slide",*/
        start: function(){ 
            $('.main_slider .text_box').addClass('active');
        },
        after: function(){ 
            $('.main_slider .text_box').addClass('active');
        },
        before: function(){
            $('.main_slider .text_box').removeClass('active');
        },
    });

});

//menu 
$(document).ready(function(){
    var gallery = '.menu .icecream';
    var photo = '.menu .icecream .photo li';
    var pagination = '.menu .icecream .pagination';
    var speed = 'fast'; 
    
    var num = $(photo).size(); 
    var pWidth = $(photo).outerWidth(); 
    
    $(photo).parent().outerWidth(num * pWidth); 
    
    var btnWrap = ''; 
    
    for(var i=1;i<=num;i++){
        btnWrap += '<button></button>';
    }

    $(pagination).html(btnWrap); 
    var btn = '.pagination button';

    $(btn).filter(':first-child').addClass('active');

    $(btn).click(function(){
        var index = $(this).index();

        $(this).parent().prev().stop().animate({
            left: index * -pWidth 
        },speed);

        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
    });
});
$(document).ready(function(){
    var gallery = '.menu .cake';
    var photo = '.menu .cake .photo li';
    var pagination = '.menu .cake .pagination';
    var speed = 'fast'; 
    
    var num = $(photo).size(); 
    var pWidth = $(photo).outerWidth(); 
    
    $(photo).parent().outerWidth(num * pWidth); 
    
    var btnWrap = ''; 
    
    for(var i=1;i<=num;i++){
        btnWrap += '<button></button>';
    }

    $(pagination).html(btnWrap); 
    var btn = '.pagination button';

    $(btn).filter(':first-child').addClass('active');

    $(btn).click(function(){
        var index = $(this).index();

        $(this).parent().prev().stop().animate({
            left: index * -pWidth 
        },speed);

        $(this).parent().children().removeClass('active');
        $(this).addClass('active');
    });
});


//ibanner
$(document).ready(function(){
    $('.ibanner .flexslider').flexslider({
        nextText: '',
        slideshowSpeed: 5000,
        /*animation: "slide",*/
        start: function(){ 
            $('.ibanner .text_box').addClass('active');
        },
        after: function(){ 
            $('.ibanner .text_box').addClass('active');
        },
        before: function(){
            $('.ibanner .text_box').removeClass('active');
        },
    });
});


//video
$(document).ready(function(){
    var video01 = document.getElementById('video01');
    var video02 = document.getElementById('video02');
    var video03 = document.getElementById('video03');
    var video04 = document.getElementById('video04');
    
    var swiper = new Swiper('.swiper-container', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
    });
});