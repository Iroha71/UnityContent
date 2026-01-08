---
title: ステータスをInvectorに適用する
description: 変更手順を記載
thumbnail: ./imgs/source_code.jpg
category: controller
directory: invector
---

# ステータスを Invector に適用する

## 適用方針

- partial で ThirdPersonController で分割する
- ステータスを 2 種類用意する
  - ステータスオブジェクトで管理するもの
  - ゲーム中に変化する加算用ステータス
    - → 装備分の値やバフの値管理に利用する
- ゲーム中は上記２種類の合計値を参照する

## 体力とスタミナ

- vThirdPersonController.cs

```cs
public partial class vThirdPersonController : IStatusOverridable, IStatusReadable
{
    // getではmodifier分を加算する。setはbase分のみ反映する
    public override float maxStamina { get => base.maxStamina + MaxStaminaModifer; set => base.maxStamina = value; }
    // ゲーム中の加算値（装備の値やバフを管理する）
    protected float maxStaminaModifier = 0f;
    public virtual float MaxStaminaModifer { get => maxStaminaModifier; set => maxStaminaModifier = value; }

    public virtual int maxHealth { get { return _maxHealth + MaxHealthModifier; } set { _maxHealth = value; } }
    protected int maxHealthModifier = 0;
    public int MaxHealthModifier { get => maxHealthModifier; set => maxHealthModifier = value; }

    // ステータスファイルへはbase分のみ反映する
    public void GetStatus(ref Status toStatus)
    {
        toStatus.Health = _maxHealth;
        toStatus.Stamina = _maxStamina;
    }

    // ステータスからの反映はbase分のみにする
    public void WriteStatusToProps(Status status)
    {
        _maxHealth = status.Health;
        _maxStamina = status.Stamina;
    }

    public int GetBaseMaxHealth()
    {
        return _maxHealth;
    }
}
```
