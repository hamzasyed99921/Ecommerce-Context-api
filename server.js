const express = require('express');
const cors = require('cors');
const stripe = require('stripe')('sk_test_51KskcfFtVmt0o38AYyh23fpxKWo4JXQc9xySTxR4j7mm6exInUErPWpipHPwdy5KH5Tiupg8Vcjl5yaBB5CRLcdZ00m7B92bQq');
const { v4: uuidv4 } = require('uuid');
const app = express();
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Wellcome to website");
})

app.post('/checkout', async(req, res) => {
    let error;
    let status;

    try {
        const {product, token} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id 
        })
        const key = uuidv4();
        const charge = await stripe.charges.create(
            {
                amount: product.price *100,
                currency: "usd",
                customer:customer.id,
                receipt_email: token.email,
                description: "Purchased the ${product.name}",
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip
                    }
                }
            },
            {idempotencyKey: key})
            status = ("success")
    } catch (error) {
        console.log(error);
        status = ("error");
    }
    res.json({error ,status});
})

app.listen(8080, () => {
    console.log('Your app is runnig on port 8080')
})


