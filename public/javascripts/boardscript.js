class App {

    static init() {

        App.box = document.getElementsByClassName('box')[0]

        App.box.addEventListener("dragstart", App.dragstart)
        App.box.addEventListener("dragend", App.dragend)

        const containers = document.getElementsByClassName('holder')

        for(const container of containers) {
            container.addEventListener("dragover", App.dragover)
            container.addEventListener("dragenter", App.dragenter)
            container.addEventListener("dragleave", App.dragleave)
            container.addEventListener("drop", App.drop)
        }
    }

    static dragstart() {
        this.className += " held"

        setTimeout(()=>this.className="invisible", 0)
    }

    static dragend() {
        this.className = "box"
    }

    static dragover(e) {
        e.preventDefault()
    }

    static dragenter(e) {
        e.preventDefault()
        this.className += " hovered"
    }

    static dragleave() {
        this.className = "holder"
    }

    static drop() {
        this.className = "holder"
        this.append(App.box)
    }

}

document.addEventListener("DOMContentLoaded", App.init)
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