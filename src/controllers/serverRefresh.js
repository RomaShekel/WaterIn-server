export const refreshServerController =  async (req, res, next) => {
    console.log('Server is refreshed')
    req.status(203)
}