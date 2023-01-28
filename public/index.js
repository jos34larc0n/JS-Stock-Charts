async function main() {
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
// obtain API Key and create fetch request
    const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=f2e28196d77b4ea0a1128781dc44313d`);
    const data = await response.json();
   
    // Destructure the data object to create new variable
    const {GME, MSFT, DIS, BNTX} = data;
    //Create An Array of stocks
    const stocks = [GME, MSFT, DIS, BNTX];
    // Reverse the order of the values for each stock
    stocks.forEach(stock => stock.values.reverse());
// import chart.js create new Chart function
    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map( value => value.datetime),
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor:  'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)'
            }]
        }
    });

}

    

// we changed this for destructured data
   /* let GME = data.GME;
    let MSFT = data.MSFT;
    let DIS = data.DIS;
    let BNTX = data.BNTX;

    const stocks = [GME, MSFT, DIS, BNTX];
    stocks.forEach(stock => stock.values.reverse());*/


