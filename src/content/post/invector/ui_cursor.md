---
title: パッドでのUI操作
description: UIカーソルの配置などの準備方法
thumbnail: ./imgs/mouse.jpg
category: { id: ui, name: UI }
directory: 'invector'
---

# UIカーソルのパッド対応

- カーソル用のImageを配置
  - 最前面に配置する
  - RaycastTargetをオフにする
- background等のImageにvJoystickMouseInputをアタッチ
  - cursorに配置したImageを設定する