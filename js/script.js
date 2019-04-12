$(function () {
    console.log('linked!');
    $("a").preventDefault;
    //Zoekt de series
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
                $(".serieInfo").append("<h1><a href='#/'>" + data.results[i].name + "</a></h1> <h3>" + data.results[i].first_air_date + "</h3> <p>" + data.results[i].overview + "</p>");
            }
            //Toont de seizoenen
            $("h1").on("click", function () {
                var seriePositie = ($(this).index())/3;
                console.log(seriePositie);
                $(".serieInfo").text("");
                $(".serieInfo").append("<h1><a href='#'>" + data.results[seriePositie].name + "</a></h1>");
                var serieId = data.results[seriePositie].id;
                console.log(serieId);
                $.ajax({
                    url: "https://api.themoviedb.org/3/tv/" + serieId,
                    method: "GET",
                    data: ({
                        api_key: "3fab369827f78498557f8e469f9910fb",
                        tv_id:serieId
                    })
                }).done(function(data){
                    for (var i = 0; i<data.seasons.length; i++){
                        console.log(data)
                        $(".serieInfo").append("<h2 id='"+i+"'><a href='#/'>" + data.seasons[i].name + "</a></h2><p id='overview'>" + data.seasons[i].overview + "</p>");
                    };
                    //Toont de episodes
                    $("h2").on("click", function () {
                        var seizoenPositie = (($(this).index())-1)/2;
                        console.log(seizoenPositie);
                        $("p#overview").hide();
                        $.ajax({
                            url: "https://api.themoviedb.org/3/tv/" + serieId + "/season/" + seizoenPositie,
                            method: "GET",
                            data: ({
                                api_key: "3fab369827f78498557f8e469f9910fb",
                                tv_id: serieId,
                                season_number: seizoenPositie
                            })
                        }).done(function(data){
                            for (var i = 0; i<data.episodes.length; i++){
                                console.log(data)
                                $("#"+seizoenPositie+"").append("<div class'episodeInfo'><h4>"+data.episodes[i].name+"</h4><h5>"+data.episodes[i].air_date+"</h5><p>"+data.episodes[i].overview+"</p></div>");
                            };
                        });
                    });
                }).fail(function (a,b) {

                }).always(function(){
                    console.log("always");
                });
            });
        }).fail(function (a,b) {

        }).always(function(){
            console.log("always");
        }); 
    });
})