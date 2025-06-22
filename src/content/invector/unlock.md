---
title: ロックオン強制解除の実装
description: スクリプト経由によるロックオン解除方法
thumbnail: ./imgs/lookon.jpg
category: { id: combat, name: 戦闘 }
---

# ロックオンの強制解除

- **vLockOn**に以下を追記

  ``` csharp
  public void UnLockForce()
  {
    isLockingOn = false;
    LockOn(false);
  }
  ```
