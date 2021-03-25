const axios = require('axios');

const getConvert = (req, res) => {
  res.render('home.ejs', { name: 'Wonde Shi', age: 30 });
};

const postConvert = async (req, res) => {
  const { reference_date, amount, src_currency, dest_currency } = req.body;

  try {
    const result = await axios(
      `http://localhost:7040/convert?reference_date=${reference_date}&amount=${amount}&src_currency=${src_currency}&dest_currency=${dest_currency}`,
    );
    const convertedCurrency = JSON.stringify(result.data.data);

    console.log('Resquest Data:' + JSON.stringify(req.body));
    console.log('Convert Data: ' + convertedCurrency);
    if (result) {
      return res.render('result.ejs', {
        amountNew: JSON.parse(convertedCurrency),
      });
    }
    return res.redirect('/convert');
  } catch (e) {
    console.log('Error : ', e);
  }
};

module.exports = { getConvert ,postConvert};