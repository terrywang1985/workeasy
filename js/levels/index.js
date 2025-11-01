/**
 * 关卡索引文件
 * 自动导入所有关卡，生成关卡列表
 */

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
 * 生成关卡列表（31-60关）
 * @returns {Array} 关卡列表
 */
function generateLevelsList() {
  const levels = [];
  for (let i = 31; i <= 60; i++) {
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
