/**
 * Created by prozorov on 14/08/14.
 */
jQuery(function($)
{
    var listContainer = $("#items-list");

    $.showItems = function showItems(template, dataUrl, parentContainer)
    {
        var compiledTemplate = Handlebars.compile(template.html());
        $.getJSON(dataUrl, function(data) {
            var date = new Date();
            $.each(data.items,function(index,value)
            {
                value.time = "Today " + date.toLocaleTimeString().slice(0,5);
            });
            parentContainer.hide();
            parentContainer.html('').append(compiledTemplate(data.items));
            parentContainer.slideDown();
        }).fail(function( jqxhr, textStatus, error ) {
            var err = textStatus + ", " + error;
            console.log( "Request Failed: " + err );
        });
    }

    $.showItems($("#featured-products-list"),"assets/data/featured-products.json",listContainer);

    $('#submitBtn').on("click", function()
    {
        $('#featured-product-carousel').slideUp('slow', function(){});
        listContainer.slideUp('slow', function()
        {
            $.showItems($("#search-results-list"), "assets/data/search-results.json", listContainer);
        });

        return false;
    });
});