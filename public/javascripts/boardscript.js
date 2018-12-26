function dragStart(event) {
    event.dataTransfer.setData("Text", event.target.id);
}

function dragEnter(event) {
    if ( event.target.className == "droptarget" ) {
        document.getElementById("demo").innerHTML = "Entered the dropzone";
        event.target.style.border = "3px dotted red";
    }
}

function dragLeave(event) {
    if ( event.target.className == "droptarget" ) {
        document.getElementById("demo").innerHTML = "Left the dropzone";
        event.target.style.border = "";
    }
}

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
}
// data-* attributes to scan when populating modal values
var ATTRIBUTES = ['val1', 'itemtitle', 'itemdescription', 'itemuser','itemcolor'];

$('[data-toggle="modal"]').on('click', function (e) {
    // convert target (e.g. the button) to jquery object
    var $target = $(e.target);
    // modal targeted by the button
    var modalSelector = $target.data('target');

    // iterate over each possible data-* attribute
    ATTRIBUTES.forEach(function (attributeName) {
        // retrieve the dom element corresponding to current attribute
        var $modalAttribute = $(modalSelector + ' #modal-' + attributeName);
        var dataValue = $target.data(attributeName);

        // if the attribute value is empty, $target.data() will return undefined.
        // In JS boolean expressions return operands and are not coerced into
        // booleans. That way is dataValue is undefined, the left part of the following
        // Boolean expression evaluate to false and the empty string will be returned
        $modalAttribute.text(dataValue || '');
        console.log(dataValue);
        $modalAttribute.val(dataValue);
    });
});
// check  color form item
function validate() {
    var elements = document.getElementById("form1").elements;
    for (var i = 0, element; element = elements[i++];) {

        // When using the `not equal` operator, use it _in the operator_.
        // Putting a `!` in front of a variable will change the variable first
        // before comparing. This can cause unexpected issues!
        // Also added a type check as the button does not have a value of
        // '#000000', so the alert would _always_ show. This prevents that.

        if (element.type === 'color' && element.value !== '#000000') {
            alert("Please enter data for any fields highlighted in red");
            return false;
        }
    }
    // to allow your HTML prevention of submission, make sure to always return a boolean value.
    return true;
}


function spamCheck() {
    // As you want to focus on this element later, store the element
    // NOT the value.
    var color = document.getElementById("color");

    // This is the point where the placement of the `!` is changed
    // Because if you invert the value of a string, you might get
    // unexpected results!
    if (color.value !== "#000000") {

        alert("Please enter the color black to proceed.");

        // Focus is a _method_ of an <input> node,
        // not a property, so call it with ().
        // Also, because you originally set color to the _value_,
        // it is only a string and not the <node>
        color.focus();

        return false;
    }
    // to allow your HTML prevention of submission, make sure to always return a boolean value.
    return true;
}