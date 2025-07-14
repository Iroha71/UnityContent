---
title: シーン作成時の作業
description: 追加すべきオブジェクトを記載
thumbnail: ./imgs/thumbnails/controllers.jpg
category: tips
tags: ['todo']
---

# シーン追加した際に行う事

## 必須オブジェクトの追加

1. マネージャーオブジェクト追加
   - 独自のセーブシステム
   - PixelCrusher使用の場合
     - SaveSystem
     - Json Serializer
     - PlayerPref
   - BGMマネージャー
   - GameStateマネージャー
2. Dialogue System利用
   - Dialogue Manager追加
3. Quest Machine利用
   - Quest Machineプレハブ追加
