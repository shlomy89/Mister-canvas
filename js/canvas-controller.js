
var gElCanvas
var gCtx
var gPosOnDown
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function init() {
    gElCanvas = document.querySelector('.my-canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    resizeCanvas()
    renderCanvas()
}

function renderCanvas() {

    gCtx.fillStyle = gCanvasColor
    gCtx.fillRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function drawLine(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.moveTo(gPosOnDown.x, gPosOnDown.y)
    gCtx.lineTo(x, y)
    gCtx.strokeStyle = getStrokeColor()
    gCtx.stroke();
    gCtx.closePath();
}

function drawTriangle(x, y) {

    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.moveTo(gPosOnDown.x, gPosOnDown.y)
    gCtx.lineTo(x, y)
    gCtx.lineTo(x - 100, y - 100)
    gCtx.lineTo(gPosOnDown.x, gPosOnDown.y)
    gCtx.fillStyle = getFillColor()
    gCtx.fill()
    gCtx.strokeStyle = getStrokeColor()
    gCtx.stroke()
    gCtx.closePath()
}

function drawRect(x, y) {

    gCtx.beginPath()
    gCtx.rect(gPosOnDown.x, gPosOnDown.y, x - gPosOnDown.x, y - gPosOnDown.y)
    gCtx.fillStyle = gFillColor
    gCtx.fillRect(gPosOnDown.x, gPosOnDown.y, x - gPosOnDown.x, y - gPosOnDown.y)
    gCtx.strokeStyle = getStrokeColor()
    gCtx.stroke()
    gCtx.closePath()
}

function drawCircle(x, y) {
    gCtx.beginPath()
    gCtx.lineWidth = 2;
    gCtx.arc(x, y, 20, 0, 2 * Math.PI);
    gCtx.fillStyle = getFillColor()
    gCtx.fill();
    gCtx.strokeStyle = getStrokeColor()
    gCtx.stroke();
    gCtx.closePath()
}

// function freeDraw(x, y) {
//     gCtx.lineWidth = 3
//     gCtx.linecap = 'round'
//     gCtx.strokeStyle = getStrokeColor()
//     gCtx.lineTo(x, y)
//     gCtx.stroke()
// }


function addListeners() {

    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()
        renderCanvas()
    })
}

function addMouseListeners() {

    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {

    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}

function onDown(ev) {
    gPosOnDown = getEvPos(ev)
}

function onMove(ev) {
    const pos = getEvPos(ev)
}

function onUp(ev) {
    const pos = getEvPos(ev)
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }

    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft,
            y: ev.pageY - ev.target.offsetTop
        }
    }
    return pos
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''

    var reader = new FileReader()

    reader.onload = (event) => {
        var img = new Image()
        img.src = event.target.result
        img.onload = onImageReady.bind(null, img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function renderImg(img) {
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth - 200
    gElCanvas.height = elContainer.offsetHeight - 200
}