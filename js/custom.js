var R = 5.0;
var R1 = 6.;
var pages = [$("#slide1"), $("#slide2"), $("#slide3")];

function clearPageIndicator() {
    $("#pagination li").removeClass("active");
}

function getViewportHeight(doc) {
    doc = doc || document;
    var elem  = doc.compatMode == 'CSS1Compat' ? doc.documentElement : doc.body;
    return elem.clientHeight;
}

$(document).ready(function() {
    $("#downToSlide2").click(function() {
        $('html, body').animate({
                scrollTop: pages[1].offset().top
            }, 500);
    });
    
    for(var i = 0; i < pages.length; i++)
        $("#pagination").append($("<li></li>").click(function() {
            $('html, body').animate({
                scrollTop: pages[$(this).index()].offset().top
            }, 500);
        }));
    
    $(window).bind("load scroll resize", function() {
        var docTop = $(document).scrollTop();
        var slide2Offset = $("#slide2").offset().top;
        var slide2iceblocksOffset = (slide2Offset - docTop) * (R1 - R) / R;
        $("#slide2iceblocks").css("top", slide2iceblocksOffset);
        $("#slide2header").css("top", slide2iceblocksOffset);
        
        for(var i = 0; i < pages.length; i++) {
            if(i === 0) {
                if(docTop < pages[i].height() / 2 + (pages[i].height() + pages[i].offset().top))
                    if(!$("#pagination li").eq(i).hasClass("active")) {
                        clearPageIndicator();
                        $("#pagination li").eq(i).addClass("active");
                    }
            }
            else if(docTop > (pages[i - 1].height() / 2 + pages[i - 1].offset().top) && docTop < (pages[i].height() / 2 + pages[i].offset().top))
                if(!$("#pagination li").eq(i).hasClass("active")) {
                    clearPageIndicator();
                    $("#pagination li").eq(i).addClass("active");
                }
        }
        
        console.log("docTop + getViewportHeight() = " + (docTop + getViewportHeight()) + ", pages[0].height() = " + pages[0].height());
        if(docTop + getViewportHeight() > pages[0].height())
            $("#downToSlide2").hide();
        else
            $("#downToSlide2").show();
    });
    
    var schemasSlider = $("#schemas_slider")
            .jcarousel({
                    animation: {
                    duration: 800,
                    easing:   'linear',
                    complete: function() {
                    }
            },
                    wrap: 'both'
            });
    
    function onSliderControlUpdate(event, ui) {
        var curValue = schemasSlider_control.slider("value");
            
        if(curValue < 33)
            schemasSlider.jcarousel("scroll", 0);
        else if(curValue < 66)
            schemasSlider.jcarousel("scroll", 1);
        else
            schemasSlider.jcarousel("scroll", 2);

        $("#slider_input .progress").css("width", (curValue + 1) + "%");
    }
    
    var schemasSlider_control = $("#slider_input").slider({
        animate: "fast",
        range: "min",
        max: 99,
        min: 0,
        slide: onSliderControlUpdate,
        change: onSliderControlUpdate,  
        create: function(event, ui) {
            //$("#slider_input").append($("<div></div>").addClass("progress"));
        }       
    });
});




