/**
 * Created by zach on 3/31/17.
 */

$.urlParam = function (a) {
    let b = new RegExp("[?&]" + a + "=([^&#]*)").exec(window.location.href);
    if (b == null) {
        return null;
    } else {
        return b[1] || 0;
    }
};

$(document).ready( ()=> {
    const name = $.urlParam("name");
    $("#name").text(name);
    let feature_dropdown = $("#feature-dropdown");
    let info = '/server-info';

    http.get(info, function(res){
        let info_json = '';

        res.on('data', function(chunk){
            info_json += chunk;
        });
        res.on('end', function(){
            let json_response = JSON.parse(body);
            console.log("Got a response: ", fbResponse.picture);
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });

    for (i =0; i < feature_list.length; i++) {
        let item = document.createElement('li');
        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));
        feature_dropdown.appendChild(item);
    }

    post_to_annotation = function() {
        let structure = $.urlParam("structure");
        $.post("insert_name", {name: name})
            .done(() => {
                window.location.href = `annotation?index=1&name=${name}&structure=${structure}`;
            })
            .fail(() => {
                alert(`Name is already in use, continuing as "${name}"`);
                window.location.href = `annotation?index=1&name=${name}&structure=${structure}`;
            });
    };

    post_to_admin = function() {
        $.post("insert_name", {name: name})
            .done(() => {
                window.location.href = `admin?name=${name}`;
            })
            .fail(() => {
                alert(`Name is already in use, continuing as "${name}"`);
                window.location.href = `admin?name=${name}`;
            });
    };

    $(`#new-batch`).click(post_to_annotation);
    $(`#continue-batch`).click(post_to_annotation);
    $(`#account-info`).click(post_to_admin);
});