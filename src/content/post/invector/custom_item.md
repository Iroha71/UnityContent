---
title: 独自のアイテムの定義方法
description: vItemを継承し、独自のプロパティを持つアイテム作成方法
thumbnail: ./imgs/bottle_on_hand.jpg
category: design
directory: invector
---

# 独自のアイテムの定義方法

## vItemの継承

vItemを継承したスクリプトを作成し、独自のプロパティを定義する。

``` csharp
public class BattleArtsItem : vItem
{
    public float CoolDownTime;
    public BattleArtsCoolDown CoolDownControl { get; private set; }
    public UnityAction<float> OnUpdateCoolDown;
    public UnityAction OnAllowedUse;

    public void StartCoolDown()
    {
        if (CoolDownControl == null)
        {
            CoolDownControl = new BattleArtsCoolDown(CoolDownTime, OnUpdateCoolDown, OnAllowedUse);
        }
       CoolDownControl.StartCoolDown();
    }

    public void StopCoolDown()
    {
        if (CoolDownControl != null)
        {
            CoolDownControl.CancelCoolDown();
        }
    }
}
```

## Editorからアイテムを作成できるように変更

`vItemListWindow` > `OnGUI()`のアイテム作成ボタンを定義している箇所に独自アイテム作成用のボタンを追加する。

``` csharp
if (!inDragItens && GUILayout.Button("Add Items"))
{
    inDragItens = true;
}
if (!inAddItem && GUILayout.Button("Create New Item"))
{
    addItem = ScriptableObject.CreateInstance<vItem>();
    addItem.name = "New Item";

    currentItemDrawer = null;
    inAddItem = true;
}
// ↓追加
if (!inAddItem && GUILayout.Button("Create New ArtsItem"))
{
    addItem = ScriptableObject.CreateInstance<BattleArtsItem>();
    addItem.name = "New ArtsItem";
    
    currentItemDrawer = null;
    inAddItem = true;
}
```