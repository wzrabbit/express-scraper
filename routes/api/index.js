const express = require('express');
const fetch = require('node-fetch-commonjs');

const router = express.Router();

const fetchVotedProblemCount = async () => {
  const response = await fetch('https://solved.ac/', (res) => {
    console.log(res.text());
  });

  const html = await response.text();

  const votedProblemCount = Number(
    html.split('현재 <b>')[1].split('</b>')[0].replace(',', '')
  );

  return { votedProblemCount };
};

router.get('/voted-problem-count', async (req, res, next) => {
  const data = await fetchVotedProblemCount();
  res.send(data);
});

module.exports = router;
