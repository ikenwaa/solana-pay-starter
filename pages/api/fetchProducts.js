import products from './products.json'

export default function handler(req, res){
    if (req.method === "GET"){
        // Create a copy of products without the hashes and filenames
        const noHashProducts = products.map((product) => {
            const {hash, filename, ...rest} = product;
            return rest;
        });

        res.status(200).json(noHashProducts);
    } else {
        res.status(405).send(`Method ${req.method} not allowed.`)
    }
}