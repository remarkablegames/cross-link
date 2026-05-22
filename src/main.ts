import kaplay from 'kaplay'

kaplay({
  width: 600,
  height: 800,
  stretch: true,
  letterbox: true,
  background: [10, 10, 26],
  scale: 4,
  font: 'Inter',
})

loadFont('Inter', 'fonts/InterVariable.woff2')

const { start } = await import('./scenes')

start()

// press F1
// debug.inspect = true
