const express = require('express');
const path = require('path');
const shortid = require('shortid');
const router = express.Router();

// #region
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync(path.resolve(__dirname, '../data/db.json'));
const db = low(adapter);
// #endregion

// 记账本列表
router.get('/account', (req, res, next) => {
  const accounts = db.get('accounts').value();
  res.render('list', { accounts: accounts });
});

// 记账本列表
router.get('/account/create', (req, res, next) => {
  res.render('create', { title: '记账本列表' });
});

// 新增记录
router.post('/account', (req, res, next) => {
  const uuid = shortid.generate();
  db.get('accounts')
    .unshift({ ...req.body, id: uuid })
    .write();
  res.render('success', { msg: '添加成功', url: '/account' });
});

// 删除记录
router.get('/account/:id', (req, res, next) => {
  const { id } = req.params;
  db.get('accounts').remove({ id }).write();
  res.render('success', { msg: '删除成功', url: '/account' });
});

module.exports = router;
