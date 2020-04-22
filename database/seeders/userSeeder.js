const faker = require('faker/locale/pt_BR');
const User = require('../../models/User');

exports.run = () => {
    console.log('Populando a collection de Usuarios.');
    for (let i = 0; i < 50; i++) {
        User.create({
            name: `${ faker.name.firstName} ${ faker.name.lastName}`,
            email: faker.internet.email,
            password: faker.random.word
        });    
    }
    console.log('Collection de Usuarios populada com sucesso.');
}
