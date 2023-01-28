// Define getColor function using a conditional statement to define a color for each stock symbol we get from the backend

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
}
// define avearageNumber and Highest number function outside scoope
function findHighest(values) {
    let highest = 0;
    // looping through values to find highest
    values.forEach(value => {
        if (parseFloat(value.high) > highest) {
            highest = value.high
        }
    })
    return highest // return highest value
}

function calculateAverage(values) {
    let total = 0;
    // looping through values to calculate total
    values.forEach(value => {
        total += parseFloat(value.high)
    })
    return total / values.length // return average value
}



//Define main Function

async function main() {
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
// obtain API Key and create fetch request
   // Fetch the stock data from the API using the provided endpoint and API key
   const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=f2e28196d77b4ea0a1128781dc44313d`);
   const data = await response.json();
   // Destructure the data object to create new variable for each stock
   const {GME, MSFT, DIS, BNTX} = data;
   // Create an array of stocks
   const stocks = [GME, MSFT, DIS, BNTX];
   // Reverse the order of the values for each stock
   stocks.forEach(stock => stock.values.reverse());

   // Time Chart
    new Chart(timeChartCanvas.getContext('2d'), {
              type: 'line',
              data: {
    // Use the datetime of each value as the label
              labels: stocks[0].values.map(value => value.datetime),
    // Create a dataset for each stock with its symbol as the label
              datasets: stocks.map(stock => ({
              label: stock.meta.symbol,
    // Use the high price of each value as the data
              data: stock.values.reverse().map(value => parseFloat(value.high)),
    //Define Background and Border by converting the symbol identifier for each element
              backgroundColor: getColor(stock.meta.symbol),
              borderColor: getColor(stock.meta.symbol)
    }))
    }
    });
    stocks.forEach( stock => stock.values.reverse())
    //add High Chart
    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol), // mapping stock symbols as labels
            datasets: [{
                label: 'Highest',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol) // mapping colors for each stock symbol
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    findHighest(stock.values) // calling function to find highest value for each stock
                ))
            }]
        }
    });

    //add  Average Chart
    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'pie',
        data: {
            labels: stocks.map(stock => stock.meta.symbol), // mapping stock symbols as labels
            datasets: [{
                label: 'Average',
                backgroundColor: stocks.map(stock => (
                    getColor(stock.meta.symbol) // mapping colors for each stock symbol
                )),
                borderColor: stocks.map(stock => (
                    getColor(stock.meta.symbol)
                )),
                data: stocks.map(stock => (
                    calculateAverage(stock.values) // calling function to calculate average value for each stock
                ))
            }]
        }
    });
}

main()


//all intervals in fetching request are = 1day
// we changed this for destructured data
   /* let GME = data.GME;
    let MSFT = data.MSFT;
    let DIS = data.DIS;
    let BNTX = data.BNTX;

    const stocks = [GME, MSFT, DIS, BNTX];
    stocks.forEach(stock => stock.values.reverse());*/


