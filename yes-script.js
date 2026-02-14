let musicPlaying = false

window.addEventListener('load', () => {
    launchConfetti()

    // Autoplay music (works since user clicked Yes to get here)
    const music = document.getElementById('bg-music')
    music.volume = 0.3
    music.play().catch(() => {})
    musicPlaying = true
    document.getElementById('music-toggle').textContent = '🔊'
})

function launchConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ff85a2', '#ffb3c1', '#ff0000', '#ff6347', '#fff', '#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Initial big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Continuous side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}

function toggleMusic() {
    const music = document.getElementById('bg-music')
    if (musicPlaying) {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    } else {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    }
}

const photos = [
    'music/1.jpeg',
    'music/2.jpeg',
    'music/3.jpeg',
    'music/4.jpeg',
    'music/5.jpeg',
    'music/6.jpeg',
    'music/7.jpeg',
    'music/8.jpeg',
    'music/9.jpeg'
]

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
}

shuffle(photos)

let currentIndex = 0

function showNextPhoto() {
    const img = document.getElementById('slider-photo')

    img.classList.remove('show')

    setTimeout(() => {
        img.src = photos[currentIndex]

        img.onload = () => {
            img.classList.add('show')
            firePhotoConfetti()
        }

        currentIndex = (currentIndex + 1) % photos.length
    }, 500)
}

function firePhotoConfetti() {
    confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ff69b4', '#ff1493', '#fff', '#ffdf00']
    })
}

window.addEventListener('load', () => {
    showNextPhoto()
    setInterval(showNextPhoto, 3500)
})


