const express = require('express');
const fetch = require('node-fetch-commonjs');

const router = express.Router();

const fetchRating = async (user) => {
  if (user === '') {
    return {
      success: false,
      errorMessage: '사용자의 핸들이 지정되지 않았습니다.',
    };
  }

  try {
    const response = await fetch(`https://codeforces.com/profile/${user}`);
    const html = await response.text();

    const rank = html
      .split('<div class="user-rank">')[1]
      .split('</span>')[0]
      .replace('\r\n', '')
      .split('>')[1]
      .trim();

    const rating = Number(
      html
        .split('Contest rating:')[1]
        .split('</span>')[0]
        .split('>')[1]
        .split('<')[0]
    );

    return {
      success: true,
      rank,
      rating,
    };
  } catch (e) {
    return {
      success: false,
      errorMessage:
        '사용자의 레이팅을 불러오는 데 실패하였습니다. 사용자의 핸들명이 일치하는지 다시 확인해 보세요. 그래도 실패한다면, 코드포스 서버가 원활하지 않아 실패한 것일 수도 있습니다. 이 경우 몇 분 후 다시 시도해 주세요.',
    };
  }
};

router.get('/rating', async (req, res, next) => {
  const user = req.query.user ?? '';
  const data = await fetchRating(user);
  res.send(data);
});

module.exports = router;
