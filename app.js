
let notesArray = [];
function hide_elements() {
    /* Make hidden elements visible */
    document.querySelector('#Note_Area').style.display = 'none';
    document.querySelector('.button_save').style.display = 'none';
    document.querySelector('.button_cancel').style.display = 'none';
}


function show_elements() {
    /* Set specified elements visibility to none */
    let b = document.querySelector(".button_cancel");
    if (b.style.display === 'none') {
        document.querySelector('#Note_Area').style.display = 'block';
        document.querySelector('.button_save').style.display = 'block';
        document.querySelector('.button_cancel').style.display = 'block';
    } else {
        clearTextArea();
    }
}


function show_note(element) {
    /* Display content of saved note in text field area */
    for (note of notesArray) {
        if (note['title'] == element.innerHTML) {
            document.querySelector('#Note_Area').value = note['body'];
        }
    }
}


function clearTextArea() {
    /* Set text field area back to its default(placeholder) value */
    document.getElementById('Note_Area').value = '';
}


function coolTheme() {
    /* Switch color of webpage into cool tone*/
    changeColor("tag", "body", 4)
    changeColor("class", "header", 3)
    changeColor("class", "footer", 2)
    changeColor("class", "sidebar", 1)
    changeColor("class", "content", 0)
    addButton("Light Theme", "warmTheme()");
    document.getElementsByTagName("body")[0].style.color = "rgb" + hexToDec("040F0F");
    document.getElementsByClassName('button_theme')[0].style.backgroundColor = "rgb" + hexToDec("A675A1");
}


function warmTheme() {
    /* Switch color of weboage into warm tone */
    changeColor("tag", "body", 4, 'warm')
    changeColor("class", "footer", 3, 'warm')
    changeColor("class", "header", 2, 'warm')
    changeColor("class", "sidebar", 1, 'warm')
    changeColor("class", "content", 0, 'warm')
    addButton("Cool Theme", "coolTheme()");
    document.getElementsByTagName("body")[0].style.color = "white";
}


function addButton(name, func_Name) {
    /* Add new theme button to the page */
    let button = document.createElement('button');
    button.setAttribute('class', 'button_theme');
    button.setAttribute('type', 'button');
    button.setAttribute('onclick', func_Name);
    button.innerHTML = name;
    let dir = document.getElementsByClassName('above_text')[0];
    dir.replaceChild(button, dir.children[1]);
}

function saveNote() {
    /* Save text in text field area and put it into the note array */
    let text = document.querySelector('#Note_Area').value;
    if (text !== '') {
        let lines = text.split('\n');
        let note = {'title':`${lines[0]}`, 'body':`${lines.slice(1).join('\n')}`};
        notesArray.push(note);
        document.querySelector('ul').insertAdjacentHTML('beforeend', `<li onclick="show_note(this)">${lines[0]}</li>`)
        clearTextArea()
    } else {
        alert("No Note Found")
    }
}

function changeColor(type, name, color, palette="cold") {
    /* Change color design of the page */
    let cc = ["C9FBFF", "C2FCF7", "85BDBF", "57737A", "040F0F"]; // cc = cool Colors
    let wc = ["EFD9CE", "CEA2AC", "A675A1", "8F3985", "F0F0F0"]; // wc = warm Colors
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
    /* Convert full hexadecimal number to decimal number */
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
    /* Convert hexadecimal number to decimal number */
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