$(document).on("click",".hideshow", function () {

    var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
  //  alert('you clicked on button #' + clickedBtnID);
    console.log(clickedBtnID);
    if($("."+clickedBtnID).is(":visible")){
    $("."+clickedBtnID).fadeOut("slow");}else {
        $("."+clickedBtnID).show("slow");
    }
});
