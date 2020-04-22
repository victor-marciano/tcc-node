const faker = require('faker/locale/pt_BR');
const Article = require('../../models/Articles');

exports.run = () => {
    console.log('Populando a collection de Artigos.');
    for (let i = 0; i < 100; i++) {
        Article.create({
            title: faker.lorem.words(5),
            description: faker.lorem.words(8),
            content: faker.lorem.words(20),
            urlToImage: faker.random.image()
        });    
    }
    console.log('Collection de artigos populada com sucesso.');
}