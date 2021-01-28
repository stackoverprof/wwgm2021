export default async (req, res) => {
    console.log('/api/public/halo called')
    res.status(200).json({status: 'OK', message: `Halo`})
}