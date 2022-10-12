const cheerio = require('cheerio');
const request = require('request-promise');
const fs = require('fs-extra')
const writeStream =fs.createWriteStream('news.csv');


async function init(){

    const $ = await request({
        url: 'https://finviz.com/news.ashx',
        transform: body => cheerio.load(body)
    });    

    writeStream.write('date|title|link\n');

    $('tr .nn').each(function (i, el){
        const article = [];
        const trs = $(el).text();
        const date = $(el).find('.nn-date').text();
        const title = $(el).find('a').text();
        const link = $(el).find('a').attr('href');
        article.push(date, title, link)
        console.log(article);

        // writeStream.write(`${date}|${title}|${line}\n`);
        writeStream.write(`${date}|${title}|${link}\n`);

    })        
    };



init();
