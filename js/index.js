
var countChecked = function() {
  var n = $( "input:checkbox:checked" ).length;
  var total = $("input:checkbox").length;
  $("#thingsToDo").text("You have "+ (total-n) + " thing" + ((total-n!=1)?'s':'') + " to do!");
  
  if(!total)
    total = 1;
  
  $(".loading-content").css("width", (n*100/total) + "%");
  $(".porcentagem").text(Math.floor((n*100)/total) + '%')
  if(n===total){
    $(".loading-content").addClass( "rainbow" );
    $(".porcentagem").css("font-weight", "bold");
  }
  else{
    $(".loading-content").removeClass( "rainbow" );
    $(".porcentagem").css("font-weight", "normal");
    
  }
};

countChecked();

$(document).ready(function(){
  $(".warning").toggle();
  $("#btn-adicionar").click(function() {
    var text = $("#input-adicionar").val();
    if(text===""){
      $(".warning").toggle();
    }
    else{
  $(".warning").hide();   
    var num = $(".checkbox").length +1;
    $("#items").append('<div class="item-container" id="item-'+ num + '"> <input class="checkbox" type="checkbox" name="checkitem" id="cb-item-'+num+'">'+'<span class="description" id="txt-item-'+ num + '">'+text+'</span><button class="btn-edit" id="btn-edit-'+ num + '">edit</button> <button class="btn-delete" id="btn-delete-'+ num +'">x</button></div>');
    $("#input-adicionar").val('');
    countChecked();}
  });
  
 

  
});

$(document).on('change', '[type=checkbox]', function() {
  $(this).parent().toggleClass("done" );
 countChecked()
}); 
 $(document).on("click", ".btn-delete", function() {
   var id = this.id.slice(-1);
   $("#item-"+id).remove();
   countChecked();
   
  });
$(document).on("click", ".btn-edit", function() {
  var id = this.id.slice(-1);
  $('#cb-item-'+id).toggle();
  $('#txt-item-'+id).html('<input type="text" id="in-item-'+id+'" value="'+$("#txt-item-"+id).text()+'"></input>')
  this.id = "btn-accept-"+id;
  $("#btn-accept-"+id).text("accept");
  $("#btn-accept-"+id).removeClass("btn-edit");
  $("#btn-accept-"+id).addClass("btn-accept");
});

$(document).on("click", ".btn-accept", function() {
  var id = this.id.slice(-1);
  $('#cb-item-'+id).toggle();
  $("#in-item-"+id).after($('<span class="description" id="txt-item-'+id+'">'+$("#in-item-"+id).val()+'</span>'));
  $("#in-item-"+id).remove();
  this.id = "btn-edit-"+id;
  $("#btn-edit-"+id).text("edit");
  $("#btn-edit-"+id).removeClass("btn-accept");
  $("#btn-edit-"+id).addClass("btn-edit");
});
  

$("#input-adicionar").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#btn-adicionar").click();
    }
});