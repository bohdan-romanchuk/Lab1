$(".row-container").hide();
$(".pr-label-container").hide();

var LIST = $('.list');
var ITEM_TEMPLATE = $('.row-container').html();

var RIGHT_LIST_REMAIN = $('#remain');
var RIGHT_LIST_BOUGHT = $('#bought');
var RIGHT_ITEM_TEMPLATE = $('.pr-label-container').html();

function addItem(title) {
    var node = $(ITEM_TEMPLATE);
    node.find("#plc").text(title);	

    var node_remain = $(RIGHT_ITEM_TEMPLATE);
    node_remain.find(".pr-title").text(title);

    var node_bought = node_remain.clone();
    node_bought.find(".pr-title").css('textDecoration', 'line-through');
    node_bought.find(".pr-number").css('textDecoration', 'line-through');

    node.find(".bl-delete").click(function(){
        node.remove();
        node_remain.remove();
    });
    var bought = true;
    node.find(".bl-bought").click(function(){
        if (bought) {
            node.find("#plc").css('textDecoration', 'line-through');
            node.find(".bl-minus").hide();
            node.find(".bl-plus").hide();
            node.find(".bl-delete").hide();
            node_remain.hide();
            node_bought.show();
            bought = false;
        } else {
            node.find("#plc").css('textDecoration', 'none');
            node.find(".bl-minus").show();
            node.find(".bl-plus").show();
            node.find(".bl-delete").show();
            node_remain.show();
            node_bought.hide();
            bought = true;
        }
        
    });
    node.find(".bl-minus").click(function(){
        var label = node.find(".bl-label");
        var r_label = node_remain.find(".pr-number");
        var b_label = node_bought.find(".pr-number");
        var num = parseInt($(label).text())-1;
        if (num > 0) {
            label.text(num);
            r_label.text(num);
            b_label.text(num);
            if (num == 1) {
                $(this).parent().find(".bl-minus").fadeTo("slow", 0.5, function() {});
            }
        } else {
            $(this).parent().find(".bl-minus").fadeTo("slow", 0.5, function() {});
        }
    });
    node.find(".bl-plus").click(function(){
        var label = node.find(".bl-label");
        var r_label = node_remain.find(".pr-number");
        var b_label = node_bought.find(".pr-number");

        var num = parseInt($(label).text())+1;
        $(this).parent().find(".bl-minus").fadeTo("slow", 1, function() {});
        label.text(num);
        r_label.text(num);
        b_label.text(num);
    });
    node.find(".bl-product").click(function(){
       
    });
    node.find(".bl-minus").fadeTo("slow", 0.5, function() {});    
    LIST.append(node);	//Add	to	the	end	of	the	list
    RIGHT_LIST_REMAIN.append(node_remain);
    RIGHT_LIST_BOUGHT.append(node_bought);
    node_bought.hide();
    $(".input").focus();
}
$(".add-button").click(function(){
    var txt = $(".input").val();
    if (txt.length != 0) {
        addItem(txt);
        $(".input").val("");
    }
});
document.addEventListener("keyup", function(event) {
	var txt = $(".input").val();
	if (event.code === 'Enter' && $(".input").is(":focus") && txt !== "") {
        addItem(txt);
        $(".input").val("");
    }
});
function editTitle(element) {
    if ($(element).attr('disabled') != true) {
        element.style.display = "none";
        input = document.createElement("input");
        
        text = $(element).text();

        input.type = "text";
        input.value = text;
        input.size = Math.max(text.length / 4 * 3, 4);
        element.parentNode.insertBefore(input, element);
        // Focus it, hook blur to undo
        input.focus();
        $(input).keyup(function() {
            // $("#tomato").text(input.value);
            var product1 = $("span").filter(function() {
                return $(element).text() === $(this).text();
            });
            $(product1).next().prev().text(input.value);
            $(element).text(input.value);
        });
        input.onblur = function() {
            // Remove the input
            element.parentNode.removeChild(input);
            // Update the span
            element.innerHTML = input.value == "" ? "noTitle" : input.value;
            // Show the span again
            element.style.display = "";
        }
    }
}
var products = ["Помідори", "Печиво", "Сир"];
for (var product in products) {
   addItem(products[product]);  
}