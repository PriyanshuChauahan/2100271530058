
const express = require('express')
const app = express()
const port = 9876


const axios = require('axios');
let num=[];
let windowPrevState=[];
 let windowCurrState=[];
 let avg=0;
  function provideNumbers(cat)
{

    let responsedata;
  axios.get(`http://20.244.56.144/test/${cat}`,{
    
    headers:
    {  Authorization:  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3ODI4NzIyLCJpYXQiOjE3MTc4Mjg0MjIsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjFmMjNlNDc2LTc1MzctNDZkMC04ODUxLWNkZDk2Y2EwNTU0NyIsInN1YiI6InByaXlhbnNodTIxMTUzMDMyQGFrZ2VjLmFjLmluIn0sImNvbXBhbnlOYW1lIjoiQXBuYVl1ZyIsImNsaWVudElEIjoiMWYyM2U0NzYtNzUzNy00NmQwLTg4NTEtY2RkOTZjYTA1NTQ3IiwiY2xpZW50U2VjcmV0IjoiV0xqRkpnYmNNR0RJeXlxcyIsIm93bmVyTmFtZSI6IlByaXlhbnNodSBDaGF1aGFuIiwib3duZXJFbWFpbCI6InByaXlhbnNodTIxMTUzMDMyQGFrZ2VjLmFjLmluIiwicm9sbE5vIjoiMjEwMDI3MTUzMDA1OCJ9.aPihdZzO_-PcSP2Lvn8Kp0sMb-ylYfy8VqkcxHZ5ETM"}
})
  .then(response => {
   
 let responseData= response.data;
 num=responseData.numbers;

 console.log(num);
 let sum=0;
 for(i in num)
    {
        sum+=num[i];
    }
    
    avg=sum/(num.length);
    windowCurrState=num
    if(num.length>10)
        {
            avg=sum/10;
            windowCurrState=num.slice(num.length-10,num.length);
        }
    
    responsedata={
        "windowPrevState":windowPrevState,
        "windowCurrState": windowCurrState,
        "numbers":num,
        "avg":avg
    }
 

  windowPrevState=windowCurrState;

 

 

  })
  .catch(error => {
    console.log(error);
  });

 console.log(responsedata);
  return responsedata;
 
}
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/numbers/e', (req, res) => {
    let data= provideNumbers("even");
    
  let JsonData=JSON.stringify(data);

  res.send(JsonData);
  })
  app.get('/numbers/p', (req, res) => {
    let data= provideNumbers("primes");
  let JsonData=JSON.stringify(data);
  res.send(JsonData);
  })
  app.get('/numbers/r', (req, res) => {
    
    let data= provideNumbers("rand");
  let JsonData=JSON.stringify(data);
  res.send(JsonData);
  })
  app.get('/numbers/f', (req, res) => {
   let data= provideNumbers("fibo");
  let JsonData=JSON.stringify(data);

  res.send(JsonData);
    
  })
app.listen(port, () => {
  console.log(`Calculator app listening on port http://localhost:${port}`)
})