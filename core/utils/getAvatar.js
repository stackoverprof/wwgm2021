const collection = [
    'https://media.giphy.com/media/l4KihuqeuJEi9qLSM/giphy.gif',
    'https://media.giphy.com/media/fwo7bzEVxbYS4eSNVd/giphy-downsized.gif',
    'https://media.giphy.com/media/3oz8xVqnpF68FXOZt6/giphy.gif',
    'https://media.giphy.com/media/dAWZiSMbMvObDWP3aA/giphy.gif',
    'https://media.giphy.com/media/8w61HSu6xQjoa2NzKN/giphy-downsized.gif',
    'https://media.giphy.com/media/26ufiHpFsdYFZsGBi/giphy.gif',
    'https://media.giphy.com/media/ggtzUsyPKBBTiBm2uB/giphy-downsized.gif',
    'https://media.giphy.com/media/LUxTEh4UHV7DFgvVM3/giphy-downsized.gif'
]

const getAvatar = () => {
    return collection[Math.floor(Math.random() * items.length)]
}

export default getAvatar