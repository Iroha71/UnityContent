---
title: 弓について
description: 弓を任意のオブジェクトで設定する方法
thumbnail: ./imgs/bow.jpg
category: combat
tags: ["戦闘"]
directory: invector
---

# 弓の分析

## アニメーション用意

- 弓のアニメーションを3種類用意する
  - Idle
  - PullSpring_low
    - Idle→弦を少し引く動作
  - PullSpring_height
    - PullSpring_low→弦を最大まで引く動作
- アニメーションコントローラである**Invector_Bow**を複製する
- **Invector_Bow**にアニメーションを設定する
  
  |ステート|設定値|
  |---|---|
  |vBowRig&#124;Neutral|Idleアニメーション|
  |vBowRig&#124;PullSpring|（ブレンドツリー）|
  |vBowRig&#124;PullSpringLow|PullSpring_low|
  |vBowRig&#124;PullSpringHeight|PullSpring_height|

## オブジェクト設定

- 上部メニュー > Invector > Shooter > Create Shooter Weaponを選択し、対象の弓モデルで武器を作成する

- 弓モデルの調整を行う
  - 画像のようにモデルは親に対して180度反転させる

    ![bow_setup](./imgs/bow_setup_model.png)
  
  - muzzleの位置

    ![muzzle](./imgs/bow_muzzle.png)

  - aimReferenceの位置
    ![aimReference](./imgs/bow_aimReference.png)

- vBowから**vShooterWeapon**をコピーし、対象の弓に新しいコンポーネントとして貼り付ける
- **vShooterWeapon**の以下の設定を調整する
  - Ammo > Ammo ID
  - Projectile > Muzzle
  - Projectile > Aim Reference
  - IK Options > Hand IK Target
    - 右手のIK適用先
    - 弦のTransformなどを設定
- vBowから**vBowControl**をコピーし、対象の弓に新しいコンポーネントとして貼り付ける
- **vShooterWeapon** > Eventsにイベントを設定する

  |イベント|設定内容|
  |---|---|
  |OnShot|vBowControl.Shot()|
  |〃|vShooterWeapon.SetPrecision(0.1)|
  |〃|vBowControl.DisableArrow()|
  |OnInstantiateProjectile|vBowControl.OnInstantiateProjectile()|
  |OnEnableAim|vBowControl.EnableArrow()|
  |〃|vShooterWeapon.SetPrecision(0.1)|
  |OnDisableAim|vBowControl.DisableArrow()|
  |OnFullPower|vShooterWeapon.SetPrecision(1)|
  |OnPowerChargerChanged|vBowControl.OnChangePowerCharger|

### 矢の配置

- 画像のように矢オブジェクトを配置する。
  ![bow_arrow](./imgs/bow_arrow.png)
- **vBowControl** > Eventsにイベントを設定する。

  |イベント|オブジェクト|設定内容|
  |---|---|---|
  |OnEnableArrow|矢|GameObject.SetActive(true)|
  |OnDisableArrow|矢|GameObject.SetActive(false)|

## IKの調整

- Invector > Shooter > Open IK Adjust WindowでIKを調整する。
- 必要に応じて弓側のIKTargetを調整する。
![bow_ik_config](./imgs/bow_ik_config.png)