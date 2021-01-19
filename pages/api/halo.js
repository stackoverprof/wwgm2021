export default async (req, res) => {
    console.log('haloooo');
    const { name } = req.body
    res.status(200).json({status: 'OK', message: `halo ${name}`})
}