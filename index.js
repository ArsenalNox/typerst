//svg
const svgns = "http://www.w3.org/2000/svg";

//Разрещённые клавиши, запрещённые (для вида), функциональные
var allowedKeys = []
var fKeys = [16, 9, 20, 219, 221, 186, 13, 222, 191]
var ndKeys = [8, 16]

//Ввод, переключение на новую строку, кол-во выполненых строк
var output = ''
var complete = false
var completed = 0

//Набор возможных слов
var text = ['Lorem', 'ipsum', 'dolor', 'sit', 'amet',
  'consectetur', 'adipisicing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore',
  'et', 'dolore', 'magna', 'aliqua',
  'Ut', 'enim', 'ad', 'minim', 'veniam,', 'quis', 'nostrud',
  'exercitation', 'ullamco', 'laboris', 'nisi', 'ut',
  'aliquip', 'ex', 'ea', 'commodo', 'consequat',
  'Duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit',
  'in', 'voluptate', 'velit', 'esse', 'cillum', 'dolore',
  'eu', 'fugiat', 'nulla', 'pariatur',
  'Excepteur', 'sint', 'occaecat',
  'cupidatat', 'non', 'proident,',
  'sunt', 'in', 'culpa', 'qui', 'officia',
  'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
]

//Оболочка для отображения статистики букв
var statDispDiv = document.getElementById('swd1')

//Отображаемый текст
var dispText = generateNewDisplayText()

//Буквы и их статистика
var letters = {
	'q':{'tl':'q','typed':0, 'correct':0},
	'w':{'tl':'w','typed':0, 'correct':0},
	'e':{'tl':'e','typed':0, 'correct':0},
	'r':{'tl':'r','typed':0, 'correct':0},
	't':{'tl':'t','typed':0, 'correct':0},
	'y':{'tl':'y','typed':0, 'correct':0},
	'u':{'tl':'u','typed':0, 'correct':0},
	'i':{'tl':'i','typed':0, 'correct':0},
	'o':{'tl':'o','typed':0, 'correct':0},
	'p':{'tl':'p','typed':0, 'correct':0},
	'a':{'tl':'a','typed':0, 'correct':0},
	's':{'tl':'s','typed':0, 'correct':0},
	'd':{'tl':'d','typed':0, 'correct':0},
	'f':{'tl':'f','typed':0, 'correct':0},
	'g':{'tl':'g','typed':0, 'correct':0},
	'h':{'tl':'h','typed':0, 'correct':0},
	'j':{'tl':'j','typed':0, 'correct':0},
	'k':{'tl':'k','typed':0, 'correct':0},
	'l':{'tl':'l','typed':0, 'correct':0},
	'z':{'tl':'z','typed':0, 'correct':0},
	'x':{'tl':'x','typed':0, 'correct':0},
	'c':{'tl':'c','typed':0, 'correct':0},
	'v':{'tl':'v','typed':0, 'correct':0},
	'b':{'tl':'b','typed':0, 'correct':0},
	'n':{'tl':'n','typed':0, 'correct':0},
	'm':{'tl':'m','typed':0, 'correct':0}
}

var keypressStatTimer;
var firstPress = true;
var pressedKeyCountCurrent = 0;
var pressedKeyCountAll = [];
var passedTimeS = 0; 

// TODO: В целом функционал тренажера печати
// TODO: Сбор статистик: скорость печати (слов в минуту, символов), точность печати (процент ошибок из всех символов, просто кол-во ошибок), статистика по буквам (процент правильнх нажатий, частота)
// TODO: Обработка статистики, рисование графиков, тенденций

function keyHandleUp(e) {
  //Обработка нажатий, если клавиша корректная
  if (allowedKeys.includes(e.keyCode)) {
	if(firstPress){
		console.log('FIRST PRESS')
		firstPress = false;
		keypressStatTimer = setInterval(() => {
			passedTimeS+= 0.5
		},500)
	}
    //Подсветка нажатой клавиши
    document.getElementById(e.keyCode).style.fill = '#ffffff'
    if(!(e.keyCode == 8)){
        if (output.length < dispText.length-1) {
        	if(!(e.key == dispText[output.length])){
        		letterStatCompute(dispText[output.length], false)
        	}else{
        		letterStatCompute(dispText[output.length], true)
        	}
    		//Добавляем нажатую клавишу в вывод
       		output += e.key
          } else {
		complete = true;
        	firstPress = true;
		clearInterval(keypressStatTimer);
		computeKeypressStat(passedTimeS, output.length, dispText.split(' ').length)
	}
      } else {
        output=output.slice(0, output.length-1)
        //console.log(output);
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
		computeKeypressStat()
		showStatistics()
		start()
	}
}

function keyHandleDown(e) {
  //Перекрашивает клавишу в неактивный цвет когда происходит отжатие клавишы
  if (allowedKeys.includes(e.keyCode)) {
    document.getElementById(e.keyCode).style.fill = '#E0E0E0'
  }
}

function initialyzeKeyboardNew() {
  //Инициализирует клавиатуру
  svg = document.getElementsByTagName('svg')[0]
  let x = 0
  let y = 0

  for (key of newKeyboard) {

    //Создаём SVG каждой клавише
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
	//Генерирует новый отбражаемый текст
  if (!(completed > text.length - 1)) {
    let rtx =''
    for (var i = 0; i < 12; i++) {
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

function letterStatCompute(letter, correct){
	//Собирирает статистику ввода
	letter = letter.toLowerCase()
	if(letter in letters){
		letters[letter].typed++
		if(correct){
			letters[letter].correct++
		}
	}
}

function showStatistics(){
  //Рисует статистику в диве
	let j = 0;
	for(i in letters){
		var letterDisplayBlock = document.getElementById('l'+j)
		letterDisplayBlock.innerText = letters[i].tl
		if( letters[i].typed == 0 ){
			var corPercent = 0
		}else{
			var corPercent = Math.round( ( letters[i].correct / letters[i].typed )*100 )
		}
		console.log(j, i, corPercent)
		letterDisplayBlock.innerHTML += "<p style='margin-top: 2rem;' >"+corPercent+'% </p>'; 
		if( (corPercent == 100) || corPercent >= 90   ) {
			letterDisplayBlock.parentElement.style.backgroundColor = '#00FF00'
		} else if( (corPercent<90) && (corPercent>=70) ){
			letterDisplayBlock.parentElement.style.backgroundColor = '#00AA00'
		} else if( (corPercent<70) && (corPercent>=50) ) {
			letterDisplayBlock.parentElement.style.backgroundColor = '#999900'
		} else if( letters[i].typed !== 0){
			letterDisplayBlock.parentElement.style.backgroundColor = '#FF0000'
		}	
		j++
	}
}

function computeKeypressStat(time, keysPressed, wordCount){ 
	console.log(time + ' ' + keysPressed + ' ' + wordCount + '\n' + 'WPM:'+(wordCount/time));		
}
