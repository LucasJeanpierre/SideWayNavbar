function openNav() {
    document.getElementById("sidebar").style.width = "250px";
    document.getElementById("topheader").style.left = "250px";
    document.getElementById("topheader").style.width = window.innerWidth - 250 + "px";
    document.getElementById("headerlogo").style.opacity = "0";
    document.getElementById("headerlogo").style['pointer-events'] = "none";
}

function closeNav() {
    document.getElementById("sidebar").style.width = "0";
    document.getElementById("topheader").style.left = "0";
    document.getElementById("topheader").style.width = "100%";
    document.getElementById("headerlogo").style.opacity = "1";
    document.getElementById("headerlogo").style['pointer-events'] = "all";
    closeAllChildren(document.getElementById('sidebar'));
}


function closeAllChildren(element) {
    for (let i = 0; i < element.childElementCount; i++) {
        var child = element.children[i];
        if (child.classList.contains('dropdown-container')) {
            closeAllChildren(child);
            child.style['max-height'] = "0px";
        } else if (child.classList.contains('active-sidebar')) child.classList.toggle("active-sidebar");
    }
}

function switchNav() {
    switch (document.getElementById("sidebar").style.width) {
        case "0":
            openNav();
            break;

        case "250px":
            closeNav();
            break;

        default:
            openNav();
            break;
    }
}

/** avoid display bug on resizing */
window.addEventListener("resize", () => {
    switch (document.getElementById("sidebar").style.width) {
        case "250px":
            openNav();
            break;
    }
});



//* Loop through all dropdown buttons to toggle between hiding and showing its dropdown content - This allows the user to have multiple dropdowns without any conflict */
var dropdown = document.getElementsByClassName("dropdown-btn");
var i;

for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function() {
        this.classList.toggle("active-sidebar");
        var dropdownContent = this.nextElementSibling;
        var childCount = 0
        for (var i = 0; i < dropdownContent.childElementCount; i++) {
            if (!dropdownContent.children[i].classList.contains('dropdown-container')) childCount++
        }
        if ((dropdownContent.style['max-height'] === "0px") || (dropdownContent.style['max-height'] === "")) {
            //the following part is only for the dropdown animation
            dropdownContent.style['max-height'] = Math.min(43 * childCount, 250) + "px";
            element = dropdownContent;
            while (element.parentElement.classList.contains('dropdown-container')) {
                element.parentElement.style['max-height'] = parseInt(element.parentElement.style['max-height']) + Math.min(43 * childCount, 250) + "px";
                element = element.parentElement;
            }
            if (Math.min(43 * childCount, 250) < 250) {
                dropdownContent.style['overflow-y'] = 'hidden';
            }
        } else {
            closeAllChildren(dropdownContent);
            dropdownContent.style['max-height'] = "0px";
        }
    });
}

//hide the sidebar when click on the main page
document.addEventListener('mouseup', (event) => {
    if ((!document.getElementById('topheader').contains(event.target)) && (!document.getElementById('sidebar').contains(event.target))) {
        switch (document.getElementById("sidebar").style.width) {
            case "250px":
                closeNav();
                break;
        }
    }
})