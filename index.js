var allowedKeys = []
var fKeys = [9,20,219,221,188,186,13,16,222,190,191]
const svgns = "http://www.w3.org/2000/svg";

var output = ''

var dispText = 'lorem_ipsum_dolor_sit_amet'

function keyHandleUp(e) {
  console.log(e.keyCode + ' ' + e.key);
  if (allowedKeys.includes(e.keyCode)) {
    document.getElementById(e.keyCode).style.fill = '#ffffff'
    output += e.key
    // output = output.concat('', e.key);
  }
  document.getElementById('keyboard-output').innerText = output
}

function keyHandleDown(e) {
  if (allowedKeys.includes(e.keyCode)) {
    document.getElementById(e.keyCode).style.fill = '#d0d0d0'
  }
}

function initialyzeKeyboard() {
  //Инициализирует меню
  svg = document.getElementsByTagName('svg')[0]
  let x = 0
  let y = 0
  let currentRow = 0;
  let rowLenghts = [9, 8, 6]
  let cntr = 0
  for (var i = 0; i < allowedKeys.length; i++) {

    let key = document.createElementNS(svgns, "rect");
    key.id = allowedKeys[i];
    key.setAttribute("x", x);
    key.setAttribute("y", y);
    key.setAttribute("fill", '#d0d0d0');
    key.setAttribute("width", "34px");
    key.setAttribute("height", "34px");

    let text = document.createElementNS(svgns, 'text');
    text.id = 't' + i
    text.setAttribute("x", x + 13);
    text.setAttribute("y", y + 21);
    letter = allowedKeys[i]
    text.append(letter)
    svg.append(key, text)
    cntr++
    x += 36
    if (cntr > rowLenghts[currentRow]) {
      currentRow++
      y += 36
      cntr = 0
      x = currentRow * 12
    }
  }
  //Пробел
  let key = document.createElementNS(svgns, "rect");
  key.id = ' '
  key.setAttribute("x", x)
  key.setAttribute("y", y)
  key.setAttribute("fill", '#d0d0d0')
  key.setAttribute("width", "200px")
  key.setAttribute("height", "60px")
  svg.append(key)
  allowedKeys.push('')

  console.log(document.getElementById('keyboard-output').style);
  document.getElementById('keyboard-output').style.width = document.getElementById('kw1').style.width;
  console.log(document.getElementById('keyboard-output').style.width);
}

function initialyzeKeyboardNew() {
  //Инициализирует меню
  svg = document.getElementsByTagName('svg')[0]
  let x = 0
  let y = 0
  let currentRow = 0;
  let rowLenghts = [9, 8, 6]
  let cntr = 0
  for (key of newKeyboard) {
    let svgKey = document.createElementNS(svgns, "rect");
    svgKey.id = key.keyCode
    svgKey.setAttribute("x", x);
    svgKey.setAttribute("y", y);
    if(fKeys.includes(key.keyCode)){
      svgKey.setAttribute("fill", 'grey');
    }else{
      svgKey.setAttribute("fill", '#d0d0d0');
      allowedKeys.push(key.keyCode)
    }
    svgKey.setAttribute("width", key.width + 'px');
    svgKey.setAttribute("height", key.height + 'px');

    let text = document.createElementNS(svgns, 'text');
    text.id = 't' + key.keyCode
    text.setAttribute("x", x + 11);
    text.setAttribute("y", y + 21);
    textLetter = key.letter
    text.append(textLetter)
    svg.append(svgKey, text)

    x += Number(key.width) + 5;
    if (key.lastInRow) {
      x = 0
      y += 40
    }
  }
}


function start() {
  document.getElementById('display-text').innerText = dispText
}
