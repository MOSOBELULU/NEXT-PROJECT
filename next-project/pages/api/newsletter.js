function handler(req, res) {
    if (req.method === 'POST') {
        const userEmail = req.body.userEmail;

        if (!userEmail || !userEmail.includes('@')){
            return;
        }
        console.log(userEmail);
        res.status(201).json({ message: 'Signed Up!'});
        
    }
}

export default handler;