var allowedKeys = []
var fKeys = [9,20,219,221,188,186,13,16,222,190,191]
const svgns = "http://www.w3.org/2000/svg";

var output = ''

var dispText = 'lorem_ipsum_dolor_sit_amet'

// TODO: В целом функционал тренажера печати

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
    document.getElementById(e.keyCode).style.fill = '#E0E0E0'
  }
}

function initialyzeKeyboardNew() {
  //Инициализирует меню
  // TODO: Писать сразу капсом
  // TODO: Добавить русскую раскладку

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
      svgKey.setAttribute("fill", '#c0c0c0');
    }else{
      svgKey.setAttribute("fill", '#E0E0E0');
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
