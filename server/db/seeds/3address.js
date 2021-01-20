const provincesJSON = '';
const citysJSON = '';

exports.seed = async (knex) => {
  try {
    await knex('country').del();
    await knex('country').insert([
      {
        id: 1,
        name: 'Argentina',
      },
    ]);

    const provinces = require('../data/provinces.json'); //https://infra.datos.gob.ar/catalog/modernizacion/dataset/7/distribution/7.27/download/localidades-censales.json
    const provincesDB = [];
    provinces.forEach((el, index) => {
      provincesDB.push({
        id: el.id * 1,
        name: el.iso_nombre,
        countryId: 1,
        //        centroid: el.centroide,
      });
    });
    await knex('province').del();
    await knex('province').insert(provincesDB);

    const citys = require('../data/citys.json');
    const citysDB = [];
    citys.forEach((el, index) => {
      citysDB.push({
        id: el.id * 1,
        name: el.nombre,
        provinceId: el.provincia.id,
        //        centroid: el.centroide,
      });
    });
    await knex('city').del();
    await knex('city').insert(citysDB);

    await knex('address').del();
    await knex('address').insert([
      {
        id: 1,
        street: 'Pte. Arturo Illia 100',
        cityId: 82070230,
        userId: 1,
        note: 'Casa con columnas',
        //        centroid: el.centroide,
      },
      {
        id: 2,
        street: 'Rivadavia 100',
        cityId: 82070230,
        shopId: 1,
        note: 'Esquina de la plaza, intercepción Rivadavia y Presidente Perón',
        //        centroid: el.centroide,
      },
    ]);
  } catch (error) {
    console.log(error);
  }
};
