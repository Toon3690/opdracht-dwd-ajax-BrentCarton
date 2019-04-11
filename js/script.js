$(function () {


    console.log('linked!');

    $("input").on("keyup", function () {
        $(".serieInfo").text("");
        var serieNaam = $(this).val();
        console.log(serieNaam);
        $.ajax({
            url: "https://api.themoviedb.org/3/search/tv",
            method: "GET",
            data: ({
                api_key: "3fab369827f78498557f8e469f9910fb",
                query:serieNaam
            })
        }).done(function (data) {
            console.log(data.results);
            for (var i = 0; i<10; i++){
                $(".serieInfo").append("<h1>" + data.results[i].name + "</h1> <h3>" + data.results[i].first_air_date + "</h3> <p>" + data.results[i].overview + "</p>");
            }
            
        }).fail(function (a,b) {

        }).always(function(){
            console.log("always");
        }) 
    })
});
