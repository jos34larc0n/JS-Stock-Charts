async function main() {
    try {
        const timeChartCanvas = document.querySelector('#time-chart');
        const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
        const averagePriceChartCanvas = document.querySelector('#average-price-chart');
        const response = await fetch(`https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=f2e28196d77b4ea0a1128781dc44313d`);
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        const data = await response.json();
        let GME = data.GME;
        let MSFT = data.MSFT;
        let DIS = data.DIS;
        let BNTX = data.BNTX;
        const stocks = [GME, MSFT, DIS, BNTX];
        stocks.forEach(stock => stock.values.reverse());
    } catch (error) {
        console.error(error);
    }
}
main();

// Bonus Note: 
// Another way to write the above lines would to refactor it as:
   // const {GME, MSFT, DIS, BTNX} = result 
// This is an example of "destructuring" an object
// "Destructuring" creates new variables from an object or an array

