const collection = [
    'https://media.giphy.com/media/l4KihuqeuJEi9qLSM/giphy.gif',
    'https://media.giphy.com/media/dAWZiSMbMvObDWP3aA/giphy.gif',
    'https://media.giphy.com/media/8w61HSu6xQjoa2NzKN/giphy-downsized.gif',
    'https://media.giphy.com/media/gYneMDemK0W4/giphy.gif',
    'https://media.giphy.com/media/Fdios3hAJJn1eAATdn/giphy-downsized.gif',
    'https://media.giphy.com/media/3gXYfOUVcaJ8tSVCIJ/giphy-downsized.gif',
    'https://media.giphy.com/media/l0HluEQoNGbtXgNos/giphy-downsized.gif',
    'https://media.giphy.com/media/VI2HFrWlOZ8pAz3knb/giphy-downsized.gif',
    'https://media.giphy.com/media/SHzl9Rp6UjlJm9GbSg/giphy-downsized.gif',
    'https://media.giphy.com/media/3oz8xVqnpF68FXOZt6/giphy.gif',
    'https://media.giphy.com/media/26vwcbtjY7cDjuYrqL/giphy-downsized.gif',
    'https://media.giphy.com/media/QLxo890lA6TH0ZlCdC/giphy-downsized.gif',
    'https://media.giphy.com/media/1rN0MKDBKKZdqve43O/giphy-downsized.gif',
    'https://media.giphy.com/media/26ufiHpFsdYFZsGBi/giphy.gif'
]

const getAvatar = () => {
    return collection[Math.floor(Math.random() * collection.length)]
}

export default getAvatar