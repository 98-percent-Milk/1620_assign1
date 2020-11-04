function clearTextArea() {
    /* Clear texts in textarea element */
    document.getElementById('note').value = '';
};

function overlayOn() {
    /* Make note taking element display visible */
    document.querySelector(".overlay").style.display = "grid";
    document.querySelector(".overlay > .note_taking").style.display = 'inherit';
    document.querySelector(".container").style.opacity = "0.2";
    clearTextArea()
}

function overlayClose() {
    /* Make note taking element display invisible */
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".overlay > .note_taking").style.display = 'none';
    document.querySelector(".container").style.opacity = "1";
    clearTextArea();
}

function coolTheme() {
    /* Switch the color pallete of the page into cool colors */
    changeColor("tag", "body", 4)
    changeColor("class", "header", 3)
    changeColor("class", "footer", 2)
    changeColor("class", "sidebar", 1)
    changeColor("class", "content", 0)
    changeButton("onclick", "Warm Theme", "warmTheme()");
    document.querySelector("body").style.color = "rgb" + hexToDec("040F0F");
    document.querySelector(".note_display").style.color = 'white';
};


function warmTheme() {
    /* Switch the color pallete of the page into warm colors */
    changeColor("tag", "body", 4, 'warm')
    changeColor("class", "footer", 3, 'warm')
    changeColor("class", "header", 2, 'warm')
    changeColor("class", "sidebar", 1, 'warm')
    changeColor("class", "content", 0, 'warm')
    changeButton("onclick", "Cool Theme", "coolTheme()");
    document.querySelector("body").style.color = "white";
    document.querySelector(".note_display").style.color = 'black';
}


function changeButton(attr, name, func_Name) {
    /* Change innerText and attribute of button element */
    let button = document.querySelectorAll('.content button')[1];
    button.removeAttribute(attr);
    button.setAttribute(attr, func_Name);
    button.innerHTML = name;
}


function saveNote() {
    /* Save text in textArea to new div element */
    let note = document.querySelector("#note").value;
    if (note !== '') {
        let name = prompt("Save note as: ")
        let new_li = document.createElement("li");
        new_li.innerHTML = name;
        new_li.setAttribute('class', `note_${addNote(note) - 1}`);
        new_li.setAttribute('onclick', 'showNote(this)');
        let unordered = document.querySelectorAll('ul')[0]
        unordered.appendChild(new_li);
        clearTextArea()
    } else {
        alert("No Note found")
    }
};

function addNote(note) {
    /* Add text in textArea element to div element */
    let div = document.querySelector('.notes');
    let newDiv = document.createElement('div');
    let p = document.createElement('p')
    p.innerText = note;
    newDiv.appendChild(p);
    div.appendChild(newDiv);
    return div.childElementCount;
}

function showNote(element) {
    let index = element.attributes[0].value.split('_')[1];
    let p = document.createElement('p');
    p.innerText = document.querySelector('.notes').children[index].children[0].innerText;
    document.querySelector(".overlay > .note_display").appendChild(p);
    document.querySelector(".overlay").style.display = "grid";
    document.querySelector(".overlay > .note_display").style.display = 'inherit';
    document.querySelector(".container").style.opacity = "0.2";
}

function closeNote() {
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".overlay > .note_display").style.display = 'none';
    document.querySelector(".container").style.opacity = "1";
    let div = document.querySelector('.note_display');
    div.removeChild(div.children[0]);
}

function changeColor(type, name, color, palette="cold") {
    let cc = ["C9FBFF", "C2FCF7", "85BDBF", "57737A", "040F0F"]; // cc = cool Colors
    let wc = ["EFD9CE", "CEA2AC", "A675A1", "8F3985", "F0F0F0"];
    names = name.split(" ");
    
    if (type === "tag") {
        for (i in names) {
            document.getElementsByTagName(names[i])[0].style.backgroundColor = 
            "rgb" + hexToDec(palette === 'cold'?cc[color]:wc[color]);
        };
    } else {
        for (i in names) {
            document.getElementsByClassName(names[i])[0].style.backgroundColor = 
            "rgb" + hexToDec(palette === 'cold'?cc[color]:wc[color]);
        };
    }
}


function hexToDec(hex) {
    decimal = '';
    index = 2;
    for (let i = 0; i < 3; i++) {
        decimal += subHexToDec(hex.substr(index - 2, index));
        decimal += (i !== 2?',':'');
        index += 2;        
    }
    return '(' + decimal + ')';
}


function subHexToDec(subHex) {
    letters = {'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15}
    decimal = 0;
    power = 1;
    for (let i = 0; i < 2; i++) {
        if (letters[subHex[i]] !== undefined ) {
            decimal += Number(letters[subHex[i]]) * Math.pow(16, power--);
        } else {
            decimal += Number(subHex[i]) * Math.pow(16, power--);
        }
    }
    return '' + decimal;
}