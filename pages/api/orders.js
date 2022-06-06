import orders from './orders.json';
import { writeFile } from "fs/promises";

function get(req, res) {
    const {buyer} = req.query;

    // Check if the address has any order
    const buyersOrders = orders.filter((order) => order.buyer === buyer);
    if(buyersOrders.length === 0){
        res.status(204).send();
    } else {
        res.status(200).json(buyersOrders);
    };
}

async function post(req, res) {
    console.log("Received add order request", req.body);
    // Add new order to orders.json
    try {
        const newOrder = req.body;
        // Add order(s) to orders.json if address has not purchased that item(s).
        if(!orders.find((order) => order.buyer === newOrder.buyer.toString() && order.itemID === newOrder.itemID)){
            orders.push(newOrder);
            await writeFile("./pages/api/orders.json", JSON.stringify(orders, null, 2));
            res.status(200).json(orders);
        } else {
        res.status(400).send("Order already exists");
        }
    } catch (err){
    res.status(400).send(err);
    };
}

export default async function handler(req, res){
    switch (req.method){
        case "GET":
            get(req, res);
            break;
        case "POST":
            await post(req, res);
            break;
        default:
            res.status(405).send(`Method ${req.method} is not allowed.`)
    }
}