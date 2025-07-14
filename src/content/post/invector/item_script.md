---
title: アイテム処理のスクリプト制御
description: スクリプト経由のアイテム使用・使用制限のかけ方
thumbnail: ./imgs/bottle_tools.jpg
category: tips
directory: invector
---

# スクリプトでアイテム処理を制御

- [アイテムをスクリプトから使用する参考コード](#アイテムをスクリプトから使用する参考コード)
- [HPが満タン時にアイテムを消費しない例](#hpが満タン時にアイテムを消費しない例)
- [回復アニメーションと回復時間を合わせる](#回復アニメーションと回復時間を合わせる)

## アイテムをスクリプトから使用する参考コード

``` csharp
if (changeEquip.display != null && changeEquip.display.item != null && changeEquip.display.item.type == vItemType.Consumable)
{
  if (changeEquip.useItemInput.GetButtonDown() && changeEquip.display.item.amount > 0)
  {
      itemManager.inventory.onUseItem.Invoke(changeEquip.display.item);
  }
}
```

## HPが満タン時にアイテムを消費しない例

- アイテム使用デリゲートにメソッドを登録

``` csharp
itemManager.canUseItemDelegate += CheckUseItem;
// メソッドについて：CheckUseItem(vItem item, ref List<bool> validateResult)
```

- 実装例（MPが不足している場合は魔法を発動しない例）

```csharp
private void Awake()
{
    itemManager.canUseItemDelegate += CheckUseItem;
}

/// <summary>
/// 指定のスロット番号に装備された魔法を発動する
/// </summary>
/// <param name="slotIndex">発動する魔法のスロット番号</param>
public void CastSpell(int slotIndex)
{
    if (artsEquipArea.equipSlots[slotIndex] == null)
        return;
    
    vItem spell = artsEquipArea.equipSlots[slotIndex].item;
    itemManager.inventory.onUseItem.Invoke(spell);
    if (itemManager.CanUseItem(spell))
        spellManager.GenerateSpell(lockon.currentTarget, spell.originalObject.GetComponent<Spell>(), spell.customHandler);
}

/// <summary>
/// CurrentArtsが魔法発動に必要な量あるか確認する
/// </summary>
/// <param name="item">発動する魔法アイテム</param>
/// <param name="validateResult">発動条件を満たしていないアイテム集計用のリスト</param>
private void CheckUseItem(vItem item, ref List<bool> validateResult)
{
    vItemAttribute arts = item.GetItemAttribute(vItemAttributes.Arts);
    if (arts != null)
    {
        bool isValid = spellManager.CurrentArts >= Mathf.Abs(arts.value);
        if (!isValid)
        {
            validateResult.Add(isValid);
            Debug.Log("使用不能");
        }
    }
}
```

- 実装例（↓のスクリプトはInventory > EquipmentDisplayWindow > EquipDisplay_Downにアタッチされている

``` csharp
using System.Collections.Generic;

namespace Invector.vItemManager
{
  using UnityEngine;
  using vCharacterController;

  public class vCheckCanAddHealth : vMonoBehaviour
  {
    public vItemManager itemManager;
    public vThirdPersonController tpController;

    protected bool canUse;
    protected bool firstRun;

    protected virtual void Start()
    {
      itemManager = GetComponentInParent<vItemManager>();

      // if a itemManager is founded, we use this event to call our CanUseItem method 
      if (itemManager)
      {
        itemManager.canUseItemDelegate -= new vItemManager.CanUseItemDelegate(CanUseItem);
        itemManager.canUseItemDelegate += new vItemManager.CanUseItemDelegate(CanUseItem);
      }
    }

    protected virtual void OnDestroy()
    {
      if (itemManager)
        // remove the event when this gameObject is destroyed
        itemManager.canUseItemDelegate -= new vItemManager.CanUseItemDelegate(CanUseItem);
    }

    protected virtual void CanUseItem(vItem item, ref List<bool> validateResult)
    {
      // Health属性があるアイテムはチェックを実行
      if (item.GetItemAttribute(vItemAttributes.Health) != null)
      {
        // 体力が全快か確認（全快→アイテムを使用しないようにする：全快ではない→使用）
        var valid = tpController.currentHealth < tpController.maxHealth;

        /** valid != canUse…既存のcanUseと状態が違うとき（体力が全快ではなくなった or 全快になった）
            !firstRun…アイテムの初回アイテム使用時のみ実行（validの値が空であるため）
          */
        if (valid != canUse || !firstRun)
        {
            canUse = valid;
            firstRun = true;
            // trigger a custom text if there is a HUDController in the scene
            vHUDController.instance.ShowText(valid ? "Increase health" : "Can't use " + item.name + " because your health is full", 4f);
        }
        // アイテム使用不可の時はvalidateResult.Addでアイテムを使用しないようにする
        if (!valid)
            validateResult.Add(valid);
      }
    }
  }
}
```

## 回復アニメーションと回復時間を合わせる

1. 任意のコンポーネントに以下のコードを追加し、アニメーション時間に合わせて体力回復するように変更。
  ``` csharp
  private Tween tween;
  public void AddHealthByTime(int totalValue)
  {
      int healed = 0;
      tween = DOTween.To(() => healed, x =>
          {
              
              int delta = x - healed;
              healed = x;
              AddHealth(delta);
          },
          totalValue, 2.3f // 回復アニメーション時間
      )
      .SetEase(Ease.Linear);
  }
  ```

2. vItemManager > Attribute EventのHealthイベントを`AddHealth`から`AddHealthByTime`に変更する。
3. 回復アニメーションのStateにアニメーションイベントを追加する。
  1. イベント名の例）InterrupHeal
  2. イベントのタイミング： ExitState
4. 手順1で追加したコンポーネントに以下のコードを追加し、回復を中断できるようにする。

  ``` csharp
  void InterrupHeal()
  {
      if (tween != null && tween.IsActive() && !tween.IsComplete())
      {
          tween.Kill();
      }
  }
  ```

5. vAnimatorEventReceiverで以下のイベントを登録する。

  |イベント名|呼び出す処理|
  |---|---|
  |InterrupHeal|InterrupHeal()|