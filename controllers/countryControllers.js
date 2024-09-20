const { default: axios } = require("axios");
const { NAGER_BASE_URL, COUNTRIES_NOW_BASE_URL } = process.env;

async function getAvailableCountries(req, res, next) {
  try {
    response = await axios.get(
      "https://date.nager.at/api/v3/AvailableCountries"
    );

    return res.status(200).json(response.data);
  } catch (error) {
    next(error, req, res);
  }
}

async function getCountryInfoByCode(req, res, next) {
  try {
    const countryCode = req.params.countryCode?.toUpperCase();

    const [countryInfoRes, populationRes, flagUrlRes] = await Promise.all([
      axios.get(`${NAGER_BASE_URL}/CountryInfo/${countryCode}`),
      axios.get(`${COUNTRIES_NOW_BASE_URL}/countries/population`),
      axios.get(`${COUNTRIES_NOW_BASE_URL}/countries/flag/images`),
    ]);

    if (countryInfoRes.status !== 200) {
      return res
        .status(countryInfoRes.status)
        .send({ message: "There is no country with the given ID" });
    }

    //We will search by name because is more consistent than the code
    const countryName = countryInfoRes.data.commonName;

    //Border countries data
    const borderCountries = countryInfoRes.data.borders;

    //Population Data
    const countryPopulation = populationRes.data.data.find(
      (country) => country.country == countryName
    )?.populationCounts;

    //Flag data
    const flag = flagUrlRes.data.data.find(
      (country) => country.name === countryName
    )?.flag;

    return res.status(200).json({
      name: countryName,
      borders: borderCountries,
      populationData: countryPopulation,
      flag,
    });
  } catch (error) {
    next(error, req, res);
  }
}

module.exports = { getAvailableCountries, getCountryInfoByCode };
