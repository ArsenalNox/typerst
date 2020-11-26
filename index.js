var allowedKeys = [
  'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
  'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
  'z', 'x', 'c', 'v', 'b', 'n', 'm'
]
const svgns = "http://www.w3.org/2000/svg";
var output = ''
function keyHandleUp(e) {
  if (allowedKeys.includes(e.key)) {
    if(e.code == 'Space'){
      document.getElementById(e.key).style.fill = 'green'
      output += ' ';
    } else {
      document.getElementById(e.key).style.fill = 'green'
      output += e.key
    }
  }
  if(output.length > 30){
    output = output.slice(1,output.length)
  }
  document.getElementById('keyboard-output').innerText = output
}

function keyHandleDown(e) {
  if (allowedKeys.includes(e.key)) {
    document.getElementById(e.key).style.fill = 'red'
  }
}

function initialyzeKeyboard() {
  svg = document.getElementsByTagName('svg')[0]
  let x = 0
  let y = 0
  let currentRow = 0;
  let rowLenghts = [9, 8, 6]
  let cntr = 0
  for (var i = 0; i < allowedKeys.length; i++) {
    let key = document.createElementNS(svgns, "rect");
    key.id = allowedKeys[i]
    key.setAttribute("x", x)
    key.setAttribute("y", y)
    key.setAttribute("fill", 'red')
    key.setAttribute("width", "34px")
    key.setAttribute("height", "34px")
    svg.append(key)
    cntr++
    x += 36
    if (cntr > rowLenghts[currentRow]) {
      currentRow++
      y += 36
      cntr = 0
      x = currentRow*12
    }
  }
  let key = document.createElementNS(svgns, "rect");
  key.id = ' '
  key.setAttribute("x", x)
  key.setAttribute("y", y)
  key.setAttribute("fill", 'red')
  key.setAttribute("width", "200px")
  key.setAttribute("height", "60px")
  svg.append(key)
  allowedKeys.push(' ')
}
