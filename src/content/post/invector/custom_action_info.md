---
title: 移動はできるが攻撃はさせたくない時
description: 回復アニメーション時などに攻撃モーションを発動させない方法
category: combat
directory: invector
thumbnail: ./imgs/bottle_tools.jpg
---

# 移動はできるが攻撃はさせたくない時

- vShooterMeleeInput > `SetLockMeleeInput` / `SetLockShooterInput`を`true`にする。

- 使用例

  ``` csharp
  void Update()
  {
    tpInput.cc.alwaysWalkByDefault = tpInput.cc.IsAnimatorTag("Walk");
    if (tpInput.cc.IsAnimatorTag("HideWeapon") && !drawHide.weaponsHided)
    {
        ControlWeapon("HideWeapon");
        canAutoDrawWeapon = true;
    }

    if (!tpInput.cc.IsAnimatorTag("HideWeapon") 
        && drawHide.weaponsHided
        && canAutoDrawWeapon)
    {
        ControlWeapon("DrawWeapon");
        canAutoDrawWeapon = false;
    }
  }

  public void ControlWeapon(string animEvent)
  {
      if (animEvent.Equals("HideWeapon"))
      {
          drawHide.HideWeapons(immediate: true);
          tpInput.SetLockMeleeInput(true);
          tpInput.SetLockShooterInput(true);
      }
      else if (animEvent.Equals("DrawWeapon"))
      {
          drawHide.DrawWeapons(immediate: true);
          tpInput.SetLockMeleeInput(false);
          tpInput.SetLockShooterInput(false);
      }
  }
  ```