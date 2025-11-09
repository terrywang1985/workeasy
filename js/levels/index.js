/**
 * 关卡索引文件
 * 自动导入所有关卡，生成关卡列表
 */

// 找工作主题关卡 (1-5)
const Level01 = require('./Level01.js');
const Level02 = require('./Level02.js');
const Level03 = require('./Level03.js');
const Level04 = require('./Level04.js');
const Level05 = require('./Level05.js');

// 面试主题关卡 (6-15)
const Level06 = require('./Level06.js');
const Level07 = require('./Level07.js');
const Level08 = require('./Level08.js');
const Level09 = require('./Level09.js');
const Level10 = require('./Level10.js');
const Level11 = require('./Level11.js');
const Level12 = require('./Level12.js');
const Level13 = require('./Level13.js');
const Level14 = require('./Level14.js');
const Level15 = require('./Level15.js');

// 入职主题关卡 (16-20)
const Level16 = require('./Level16.js');
const Level17 = require('./Level17.js');
const Level18 = require('./Level18.js');
const Level19 = require('./Level19.js');
const Level20 = require('./Level20.js');

// 职场日常关卡 (21-30)
const Level21 = require('./Level21.js');
const Level22 = require('./Level22.js');
const Level23 = require('./Level23.js');
const Level24 = require('./Level24.js');
const Level25 = require('./Level25.js');
const Level26 = require('./Level26.js');
const Level27 = require('./Level27.js');
const Level28 = require('./Level28.js');
const Level29 = require('./Level29.js');
const Level30 = require('./Level30.js');

const Level31 = require('./Level31.js');
// 在此处导入新关卡
// const Level32 = require('./Level32.js');
// const Level33 = require('./Level33.js');
// ...

/**
 * 关卡注册表
 * 添加新关卡只需在此处注册即可
 */
const levelRegistry = {
  // 找工作主题 (1-5)
  1: Level01,
  2: Level02,
  3: Level03,
  4: Level04,
  5: Level05,
  // 面试主题 (6-15)
  6: Level06,
  7: Level07,
  8: Level08,
  9: Level09,
  10: Level10,
  11: Level11,
  12: Level12,
  13: Level13,
  14: Level14,
  15: Level15,
  // 入职主题 (16-20)
  16: Level16,
  17: Level17,
  18: Level18,
  19: Level19,
  20: Level20,
  // 职场日常 (21-30)
  21: Level21,
  22: Level22,
  23: Level23,
  24: Level24,
  25: Level25,
  26: Level26,
  27: Level27,
  28: Level28,
  29: Level29,
  30: Level30,
  // 其他关卡
  31: Level31,
  // 32: Level32,
  // 33: Level33,
  // ...
};

/**
 * 获取关卡实例
 * @param {number} levelId - 关卡ID
 * @returns {BaseLevel|null} 关卡实例
 */
function getLevelInstance(levelId) {
  const LevelClass = levelRegistry[levelId];
  if (LevelClass) {
    return new LevelClass();
  }
  return null;
}

/**
 * 生成关卡列表（1-60关）
 * @returns {Array} 关卡列表
 */
function generateLevelsList() {
  const levels = [];
  for (let i = 1; i <= 60; i++) {
    const isUnlocked = levelRegistry.hasOwnProperty(i);
    levels.push({
      id: i,
      name: isUnlocked ? new levelRegistry[i]().name : '敬请期待',
      unlocked: isUnlocked
    });
  }
  return levels;
}

/**
 * 检查关卡是否存在
 * @param {number} levelId - 关卡ID
 * @returns {boolean}
 */
function levelExists(levelId) {
  return levelRegistry.hasOwnProperty(levelId);
}

/**
 * 获取所有已解锁关卡ID
 * @returns {Array<number>}
 */
function getUnlockedLevelIds() {
  return Object.keys(levelRegistry).map(id => parseInt(id));
}

module.exports = {
  getLevelInstance,
  generateLevelsList,
  levelExists,
  getUnlockedLevelIds
};
