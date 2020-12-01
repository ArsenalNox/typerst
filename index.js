var allowedKeys = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
  'z', 'x', 'c', 'v', 'b', 'n', 'm'
]


const svgns = "http://www.w3.org/2000/svg";

var output = ''

var dispText = '   Lorem ipsum dolor sit amet.   '

function keyHandleUp(e) {
  if(e.keyCode=='32'){
      output = output.concat(' ','\xa0');
  }else if (allowedKeys.includes(e.key)) {
      document.getElementById(e.key).style.fill = 'green'
      // output += e.key
      output = output.concat('',e.key);
  }
  console.log(output);
  document.getElementById('keyboard-output').innerText = output
}

function keyHandleDown(e) {
  if (allowedKeys.includes(e.key)) {
    document.getElementById(e.key).style.fill = 'red'
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
    key.setAttribute("fill", 'red');
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
  key.setAttribute("fill", 'red')
  key.setAttribute("width", "200px")
  key.setAttribute("height", "60px")
  svg.append(key)
  allowedKeys.push('')

  console.log(document.getElementById('keyboard-output').style);
  document.getElementById('keyboard-output').style.width = document.getElementById('kw1').style.width;
  console.log(document.getElementById('keyboard-output').style.width);
}
