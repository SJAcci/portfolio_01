//submenu
//?초기실행 문제생김?
$(document).ready(function(){
    var subBg = $('<div class="sub_bg"></div>');
    
    $('header').append(subBg);
    
    var gnb = '.hbottom';
    var main = '.main_nav';
    var sub = '.sub_nav' ;
    var bg = '.sub_bg' ;
    var speed = 'fast';
    
    $(gnb).hover(function(){
        $(sub + ',' + bg).stop().slideDown(speed);
        $(main).removeClass('active');
    },function(){
        $(sub + ',' + bg).stop().slideUp(speed);
        $(main).removeClass('active');
    });
    
    $(main).first().focus(function(){
        $(sub + ',' + bg).stop().slideDown(speed);
        $(this).addClass('active');
    });

    $(main).focus(function(){
        $(main).removeClass('active'); 
        $(this).addClass('active'); 
    });
    
    $(main).first().keydown(function(e){
        if(e.keyCode == 9){ 
            if(e.shiftKey){ 
                $(sub + ', ' + bg).stop().slideUp(speed);
                $(this).removeClass('active');
            }
        }
    });

    $(sub).last().find('li:last a').keydown(function(e){
       if(e.keyCode == 9){
           if(!e.shiftKey){ 
               $(sub + ',' + bg).stop().slideUp(speed);
               $(main).removeClass('active');
           }
       }
    });
    
    $(sub).find('li:last a').focus(function(){
        $(main).removeClass('active');
        $(this).parents(sub).prev().addClass('acitve');
    });
});

//family site
$(document).ready(function(){
    var btn = '.family button'; 
    var icon = '.icon';
    var speed = 'fast';
    var active = 'active';
    
    $(btn).click(function(){
        $(this).next().stop().slideToggle(speed);
        $(this).find(icon).toggleClass(active);
    }); 

    $(btn).parent().mouseleave(function(){
        $(this).find('ul').stop().slideUp(speed);  $(this).find(icon).removeClass(active); 
    }); 

    $(btn).next().find('li:last a').keydown(function(e){
        if(e.keyCode == 9){
            if(!e.shiftKey){
                $(btn).parent().trigger('mouseleave');
            }
        }   
    });
    $(btn).keydown(function(e){
        if(e.keyCode == 9){
            if(e.shiftKey){ $(this).parent().trigger('mouseleave');
            }
        }
    }); 
}); 