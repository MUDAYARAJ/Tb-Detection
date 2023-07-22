function onClickedEstimatePrice() {
    console.log("estimeted button clicked");

    var estimted = document.getElementById("result");
    var img = document.getElementById("imageInput");
    formData.append('uploads', img);

    var url = "http://127.0.0.1:5000/upload";


    //          $.post(url, {
    //        image:img
    //
    //    }, function(data, status) {
    //
    //        estimted.innerHTML = "<h2>" + data.result + "</h2>"
    //        //console.log(status);
    //    });
    $.get(url, function(data, status) {
        console.log("got response");
        if (data) {
            estimted.innerHTML = "<h2>" + "data.result +"
            "</h2>"

        }
    });

}

//window.onload = onPageLoad;