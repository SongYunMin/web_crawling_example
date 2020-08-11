// const axios = require("axios");
// const cheerio = require("cheerio");
// const log = console.log;
//
//
// const getHtml = async() => {
//     try {
//         return await axios.get("http://127.0.0.1:2000");
//         //return await axios.get("https://news.naver.com/");
//     } catch (error) {
//         console.error(error);
//     }
// };
//
// // getHtml : axios.get 함수를 이용하여 비동기로 html 파일을 가져옴
// // 그 후 반환되는 Promise 객체에 cheerio 를 이용하여 데이터를 가공함
// getHtml()
//     .then(html => {
//         let ulList = [];
//         const $ = cheerio.load(html.data);
//         const $bodyList = $("div.wrap-container").children("div.container");
//         // const $bodyList = $("div.section_wide ul").children("div.right.ranking_contents");
//         $bodyList.each(function(i, elem) {
//             ulList[i] = {
//                 title: $(this).find('header.mainError p').text(),
//                 url: $(this).find('herder.mainError p').attr('Errorname'),
//                 // image_url: $(this).find('p.poto a img').attr('src'),
//                 // image_alt: $(this).find('p.poto a img').attr('alt'),
//                 // summary: $(this).find('p.lead').text().slice(0, -11),
//                 // date: $(this).find('span.p-time').text()
//             };
//         });
//         const data = ulList.filter(n => n.title);
//         return data;
//     })
//     .then(res => log(res));
//
//
var express = require('express');
var router = express.Router();
const axios = require("axios");
//읽어온 정보를 html로직으로 변환하여 화면작업을 하도록 유도합니다
const cheerio = require('cheerio');

router.get('/', function(req, res, next) {
    let url = 'https://www.yna.co.kr/sports/all';

    axios.get(url).then(html => {
        let ulList = [];
        const $ = cheerio.load(html.data);
        const $bodyList = $("div.headline-list ul").children("li.section02");
        //each : list 마다 함수 실행, forEach와 동일
        $bodyList.each(function(i, elem) {
            ulList[i] = {
                //find : 해당 태그가 있으면 그 요소 반환
                title: $(this).find('strong.news-tl a').text(),
                url: $(this).find('strong.news-tl a').attr('href'),
                image_url: $(this).find('p.poto a img').attr('src'),
                image_alt: $(this).find('p.poto a img').attr('alt'),
                summary: $(this).find('p.lead').text().slice(0, -11),
                date: $(this).find('span.p-time').text()
            };
        });

        const data = ulList.filter(n => n.title);
        //json으로 변환하여 app으로 전송
        return res.json(data);
    })
});

module.exports = router;