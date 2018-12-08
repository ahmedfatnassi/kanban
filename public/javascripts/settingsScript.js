function showhide(boardname) {
    //console.log(boardname) ;
    var x = document.getElementById(boardname);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}