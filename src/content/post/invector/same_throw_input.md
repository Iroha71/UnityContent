---
title: エイムと投擲の両立方法
description: 状況に応じて処理を出しわける方法
thumbnail: ./imgs/game_devices.jpg
category: controller
directory: invector
---

# エイムと投擲を同じボタンで行う

- **vThrowManagerBase** > **UpdateThrowInput()** を編集する

  ``` csharp [vThrowManagerBase.cs]
  protected virtual void UpdateThrowInput()
  {
    if (!ThrowConditions)
    {
        return;
    }

    if (aimThrowInput.GetButtonDown() 
      && !inEnterThrowMode 
      && !isThrowing 
      && !isAiming)
    {
        EnterThrowMode();
        return;
    }
    // ↓エイム解除処理をコメントアウト
    //if (aimThrowInput.GetButtonUp() && aimHoldingButton && (isAiming || inEnterThrowMode) && !isThrowing)
    //{
    //    ExitThrowMode();
    //}

    if (isAiming 
      && !isThrowing 
      && !pressThrowInput)
    {
        // throwInput→aimThrowInputへ変更
        if (aimThrowInput.GetButtonDown())
            pressThrowInput = true;
    }

    if (!aimHoldingButton 
      && aimThrowInput.GetButtonDown() 
      && !pressThrowInput 
      && (isAiming || inEnterThrowMode) 
      && !isThrowing)
    {
        ExitThrowMode();
    }
  }
  ```