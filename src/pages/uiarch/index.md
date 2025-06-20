---
title: UIについての資料
description: UIアーキテクチャまとめ・UltimateGUIの情報
thumbnail: display_room

layout: ../../layouts/PostLayout.astro
---

# UIアーキテクチャのまとめ

## 画面遷移

![画面遷移 クラス図](../../assets/imgs/uiarch/page_control_class.png)
![画面遷移 シーケンス図](../../assets/imgs/uiarch/page_control.png)

## MVVMモデル

![MVVM](../../assets/imgs/uiarch/mvvm.png)

### MVVMを使ったUI例

鍛冶屋（武器強化システム）

![鍛冶屋シーケンス図](../../assets/imgs/uiarch/mvvm_blacksmith.png)

## Ultimate Clean GUI

### 通知の実装

- 任意のオブジェクトに`NotificationQueue.cs`を追加
- 通知を出すオブジェクトに`NotificationLauncher.cs`を追加
- `NotificationLauncher.cs` > `LaunchNotification()`を実行
