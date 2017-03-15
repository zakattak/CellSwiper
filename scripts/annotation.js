/*
 jQuery module to get URL parameters.
 Copied from: http://stackoverflow.com/questions/19491336/get-url-parameter-jquery
 Minified.
 */
$.urlParam = function (a) {
    let b = new RegExp("[?&]" + a + "=([^&#]*)").exec(window.location.href);
    if (b == null) {
        return null
    } else {
        return b[1] || 0
    }
};

//Our stuff
$(document).ready( ()=> {
    const structure = $.urlParam('structure');
    let index = $.urlParam('index');
    let name = $.urlParam('name');
    let image_div = $("#image");
    let choice;
    $("#user").text(name);
    $("#structure").text(structure);
    image_div.attr('src', '/images?index=' + index);
  
    document.onkeyup = function (event) {
        let e = (!event) ? window.event : event;
        switch (e.keyCode) {
            //left arrowkey
            case 37:
                // prevImage();
                choice = false;
                add_annotation();
                break;
            //right arrowkey
            case 39:
                // nextImage();
                choice = true;
                add_annotation();
                break;
        }
    };

    let good = $("#good");
    let bad = $("#bad");
    let polaroid = $("#polaroid");

    bad.hover( ()=> {
        polaroid.css("border-color", "red");
        polaroid.css("border-width", "5px");
    }, ()=> {
        polaroid.css("border-color", "black");
        polaroid.css("border-width", "1px");
    });

    good.hover( ()=> {
        polaroid.css("border-color", "green");
        polaroid.css("border-width", "5px");

    }, ()=> {
        polaroid.css("border-color", "black");
        polaroid.css("border-width", "1px");
    });

    bad.click( ()=> {
        choice = false;
        add_annotation()
    });

    good.click( ()=> {
        choice = true;
        add_annotation()
    });

    image_div.click( ()=> {
        // nextImage();
    });
    
    //takes image_div and applies "swipeleft" event 
    //to the image
    image_div.hammer().on("swipeleft", function() {
        choice = false;
        add_annotation()
    });
    
    //Takes image_div and applies "swiperight" event
    //to the image
    image_div.hammer().on("swiperight", function(){
        choice = true;
        add_annotation()
    });

    function add_annotation() {
        $.post("annotate", {imageid : index, user: name, annotation: choice, feature: structure})
            .done( data => {
                index = nextImage(index)
            })
            .fail( err => {
                alert("Something went wrong...\n" + err.responseText);
            })
    }
    
});

function nextImage(index) {
    index++;
    if (index > 12) window.location.href = 'complete';
    else $("#image").attr('src', '/images?index=' + index);
    return index
}

function prevImage() {
    index--;
    if (index < 0) index = 9;
    $("#image").attr('src', '/images?index=' + index);
}

