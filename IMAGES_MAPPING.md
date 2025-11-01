# 关卡图片映射表

## 已有图片资源
- `player_sad.png` - 玩家（沮丧表情）
- `colleague_happy.png` - 同事（开心表情）
- `coffee.png` - 咖啡
- `clock_machine.png` - 打卡机
- `broom.png` - 扫帚
- `copier.png` - 复印机
- `lunch_card.png` - 饭卡
- `computer_bluescreen.png` - 蓝屏电脑
- `toilet_door.png` - 厕所门
- `instant_coffee.png` - 速溶咖啡
- `package_box.png` - 快递箱
- `folding_chair.png` - 折叠椅
- `usb_drive.png` - U盘
- `boss.png` - 老板
- `company_door.png` - 公司门（预留）

## 关卡元素映射

### ✅ Level01 - 打卡上班（已完成）
- player → player_sad
- colleague → colleague_happy
- machine → clock_machine
- coffee → coffee

### ✅ Level02 - 复印机卡纸（已完成）
- player → player_sad / colleague_happy
- copier → copier
- manual → 📖（临时Canvas绘制）

### ⏳ Level03 - 午饭时间（需要添加）
- player → player_sad / colleague_happy
- drawer → 🗄️（需要图片或Canvas）
- lunch_card → lunch_card

### ⏳ Level04 - 电脑蓝屏（需要添加）
- player → player_sad
- computer → computer_bluescreen
- it_guy → colleague_happy

### ⏳ Level05 - 厕所遇老板（需要添加）
- player → player_sad
- boss → boss
- toilet → toilet_door
- phone → 📱（需要图片或Canvas）

### ⏳ Level06 - 下午茶时间（需要添加）
- player → player_sad / colleague_happy
- colleague → colleague_happy
- instant_coffee → instant_coffee

### ⏳ Level07 - 快递小哥（需要添加）
- player → player_sad / colleague_happy
- boss → boss
- package → package_box

### ⏳ Level08 - 会议室抢座（需要添加）
- player → player_sad / colleague_happy
- folding_chair → folding_chair
- meeting_room → 🚪（需要图片或Canvas）

### ⏳ Level09 - PPT救场（需要添加）
- player → player_sad / colleague_happy
- usb → usb_drive
- email → 📧（需要图片或Canvas）

### ⏳ Level10 - 下班打卡（需要添加）
- player → player_sad
- boss → boss
- clock → ⏰（需要图片或Canvas）
- computer → computer_bluescreen

### ⏳ Level31 - 上班迟到（需要添加）
- player → player_sad
- broom → broom
- door → company_door

## 下一步计划
1. 为Level03-10和Level31添加customRender方法
2. 为缺少的元素添加临时Canvas绘制或生成新图片
3. 测试所有关卡的显示效果
