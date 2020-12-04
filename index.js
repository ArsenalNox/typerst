var allowedKeys = []
var fKeys = [16, 9, 20, 219, 221, 186, 13, 222, 191]
var ndKeys = [8, 16]
const svgns = "http://www.w3.org/2000/svg";
var output = ''
var complete = false
var completed = 0

var text = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet',
  'consectetur', 'adipisicing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore',
  'et', 'dolore', 'magna', 'aliqua.',
  'Ut', 'enim', 'ad', 'minim', 'veniam,', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat.',
  'Duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
  'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore',
  'eu', 'fugiat', 'nulla', 'pariatur.',
  'Excepteur', 'sint', 'occaecat',
  'cupidatat', 'non', 'proident,',
  'sunt', 'in', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum.'
]

var dispText = text[completed]



// TODO: В целом функционал тренажера печати


function keyHandleUp(e) {
  console.log(e.keyCode + ' ' + e.key);
  if (allowedKeys.includes(e.keyCode)) {
    document.getElementById(e.keyCode).style.fill = '#ffffff'
    if(!(e.keyCode == 8)){
      if (output.length < dispText.length) {
        output += e.key
      } else {
        complete = true
      }
    } else {
      output=output.slice(0, output.length-1)
      console.log(output);
    }
  }
  document.getElementById('keyboard-output').innerText = ''
  for (var i = 0; i < output.length; i++) {
    if (output[i] == dispText[i]) {
      color = 'green'
    } else {
      color = 'red'
    }
    document.getElementById('keyboard-output').innerHTML += "<span style='color: " + color + "'>" + output[i] + "</span>"
  }
  document.getElementById('keyboard-output').innerHTML += "_"
  if (complete) {
    output = ''
    document.getElementById('keyboard-output').innerHTML = output
    completed++
    dispText = generateNewDisplayText()
    complete = false
    start()
  }
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
    if (fKeys.includes(key.keyCode)) {
      svgKey.setAttribute("fill", '#c0c0c0');
    } else {
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

function generateNewDisplayText() {
  if (!(completed > text.length - 1)) {
    let rtx =''
    for (var i = 0; i < 6; i++) {
      if(i==5){
        rtx += text[Math.floor(Math.random() * text.length)]
      }else {
        rtx += text[Math.floor(Math.random() * text.length)]+' '
      }
    }
    return rtx;
  } else {
    completed = 0
    return text[completed];
  }
}


function start() {
  document.getElementById('display-text').innerText = dispText
}
