import data from '$lib/data/sales.json'

export async function GET() {

    let body = {
        name: "string",
        date: "date",
    }

    const currentDate = new Date()

    const currentYear : number = currentDate.getFullYear()

    const lastYear : number = currentYear - 1

    // add an index signature to the type of the data object
    const salesData = data as {[key: string]: any}
    const oneYearAgo = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate())
    let closestSale = null
    let closestDiff = Infinity
    salesData[lastYear].forEach((sale: any) => {
        const saleDate = new Date(sale.date)
        const diff = Math.abs(saleDate.getTime() - oneYearAgo.getTime())
        if (diff < closestDiff) {
            closestSale = sale
            closestDiff = diff
        }
    })
    if (closestSale) {
        // @ts-ignore
        body.name = closestSale.name
        // @ts-ignore
        body.date = closestSale.date
    }

    // add one year to body.saleDate with setFullYear(currentYear)

    body.date = new Date(body.date).setFullYear(currentYear).toString()

    const init = {
        status: 200,
        headers: {
            'Content-Type': 'application/json'
        }
    }

    return new Response(JSON.stringify(body), init);
}
