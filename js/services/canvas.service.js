
var gCanvasColor = '#ffffff'
var gSelectedShape = 'Line'
var gStrokeColor = '#ff4d4d'
var gFillColor = '#66ff66'

function setShape(shape) {
    gSelectedShape = shape
}

function setStrokeColor(outLineColor) {
    gStrokeColor = outLineColor
}

function setFillColor(shapeBgColor) {
    gFillColor = shapeBgColor
}
function setCanvasColor(canvasColor) {
    gCanvasColor = canvasColor
    renderCanvas()
}

function getFillColor() {
    return gFillColor
}

function getStrokeColor() {
    return gStrokeColor
}

function getCanvasColor() {
    return
}

function draw(ev) {
    // const offsetX = ev.offsetX
    // const offsetY = ev.offsetY
    const { offsetX, offsetY } = ev
    switch (gSelectedShape) {
        case 'Line':
            drawLine(offsetX, offsetY)
            break
        case 'Triangle':
            drawTriangle(offsetX, offsetY)
            break
        case 'Rect':
            drawRect(offsetX, offsetY)
            break
        case 'Free-draw':
            freeDraw(offsetX, offsetY)
            break
        case 'Circle':
            drawCircle(offsetX, offsetY)
            break
    }
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function downloadCanvas(elLink) {
    const data = gElCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas'
}