import type { Color, Viewer as CesiumViewer } from "cesium";
import {
  BoundingSphere,
  HeadingPitchRange,
  Math as CesiumMath,
  Cartesian3,
  Ellipsoid,
} from "cesium";
import React, { createContext, useContext, useState, useCallback } from "react";

/**
 * 時空間ID型
 * @property z - ズームレベル
 * @property f - 高度レベル
 * @property x - X座標（経度方向）
 * @property y - Y座標（緯度方向）
 */
export type SpaceTimeID = {
  z: number;
  f: number;
  x: number;
  y: number;
};

/**
 * ボクセルのスタイル定義
 * @property color - Cesium Color オブジェクト（RGB色）
 * @property alpha - 透明度（0.0 ~ 1.0）
 * @property outlineColor - 枠線の色
 */
export type VoxelStyle = {
  color: Color;
  alpha: number;
  outlineColor: Color;
};

/**
 * 時空間ID集合
 * 複数のボクセルを同じスタイルでグループ化
 * @property id - 集合を識別するユニークID
 * @property spaceTimeIDs - 時空間IDの配列
 * @property style - ボクセルのスタイル設定
 * @property visible - 表示/非表示フラグ
 */
export type SpaceTimeIDCollection = {
  id: string;
  spaceTimeIDs: SpaceTimeID[];
  style: VoxelStyle;
  visible: boolean;
};

/**
 * SpaceTimeContext の型定義
 */
type SpaceTimeContextType = {
  collections: SpaceTimeIDCollection[];
  addCollection: (collection: SpaceTimeIDCollection) => void;
  removeCollection: (collectionId: string) => void;
  updateCollection: (
    collectionId: string,
    updates: Partial<SpaceTimeIDCollection>
  ) => void;
  toggleCollectionVisibility: (collectionId: string) => void;
  clearAllCollections: () => void;
  getVisibleCollections: () => SpaceTimeIDCollection[];
  focusCameraOnCollection: (viewer: CesiumViewer, collectionId: string) => void;
  getAllSpaceTimeIDs: () => string[]; // ← ここを追加
};

const SpaceTimeContext = createContext<SpaceTimeContextType | undefined>(
  undefined
);

/**
 * 座標変換ヘルパー関数
 */
function longitude(x: number, n: number): number {
  return 360.0 * (x / n) - 180.0;
}

function latitude(y: number, n: number): number {
  const exponent = (1.0 - (2.0 * y) / n) * Math.PI;
  const lat_rad = 2.0 * Math.atan(1.0 - 2.0 / (Math.exp(exponent) + 1.0));
  return CesiumMath.toDegrees(lat_rad);
}

function altitude(f: number, n: number): number {
  return 33_554_432 * (f / n);
}

/**
 * 時空間IDから3D座標範囲を計算
 */
function getCoordinateBounds(spaceTimeIDs: SpaceTimeID[]) {
  if (spaceTimeIDs.length === 0) return null;

  const positions: Cartesian3[] = [];

  for (const stid of spaceTimeIDs) {
    const n = 2 ** stid.z;
    const lonMin = longitude(stid.x, n);
    const lonMax = longitude(stid.x + 1, n);
    const latMin = latitude(stid.y, n);
    const latMax = latitude(stid.y + 1, n);
    const altMin = altitude(stid.f, n);
    const altMax = altitude(stid.f + 1, n);

    const ellipsoid = Ellipsoid.WGS84;

    // 8つのコーナーポイントを計算
    const corners = [
      Cartesian3.fromDegrees(lonMin, latMin),
      Cartesian3.fromDegrees(lonMax, latMin),
      Cartesian3.fromDegrees(lonMax, latMax),
      Cartesian3.fromDegrees(lonMin, latMax),
    ];

    for (const corner of corners) {
      const normal = ellipsoid.geodeticSurfaceNormal(corner);
      // 最小高度
      positions.push(
        Cartesian3.add(
          corner,
          Cartesian3.multiplyByScalar(normal, altMin, new Cartesian3()),
          new Cartesian3()
        )
      );
      // 最大高度
      positions.push(
        Cartesian3.add(
          corner,
          Cartesian3.multiplyByScalar(normal, altMax, new Cartesian3()),
          new Cartesian3()
        )
      );
    }
  }

  return positions;
}

/**
 * SpaceTimeProvider コンポーネント
 * 時空間ID集合の状態管理を提供
 */
export const SpaceTimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collections, setCollections] = useState<SpaceTimeIDCollection[]>([]);

  /**
   * 集合を追加または更新
   * @param collection - 追加する集合
   */
  const addCollection = useCallback((collection: SpaceTimeIDCollection) => {
    setCollections((prev) => {
      const existing = prev.findIndex((c) => c.id === collection.id);
      if (existing >= 0) {
        const updated = [...prev];
        updated[existing] = collection;
        return updated;
      }
      return [...prev, collection];
    });
  }, []);

  /**
   * 指定されたIDの集合を削除
   * @param collectionId - 削除する集合のID
   */
  const removeCollection = useCallback((collectionId: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== collectionId));
  }, []);

  /**
   * 指定されたIDの集合を部分的に更新
   * @param collectionId - 更新する集合のID
   * @param updates - 更新内容（部分指定可）
   */
  const updateCollection = useCallback(
    (collectionId: string, updates: Partial<SpaceTimeIDCollection>) => {
      setCollections((prev) =>
        prev.map((c) => (c.id === collectionId ? { ...c, ...updates } : c))
      );
    },
    []
  );

  /**
   * 登録されているすべての SpaceTimeID を文字列化して返す
   * @returns "z/f/x/y" 形式の文字列配列
   */
  const getAllSpaceTimeIDs = useCallback((): string[] => {
    const result: string[] = [];
    collections.forEach((collection) => {
      collection.spaceTimeIDs.forEach((stid) => {
        result.push(`${stid.z}/${stid.f}/${stid.x}/${stid.y}`);
      });
    });
    return result;
  }, [collections]);

  /**
   * 指定されたIDの集合の表示/非表示を切り替え
   * @param collectionId - トグルする集合のID
   */
  const toggleCollectionVisibility = useCallback((collectionId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId ? { ...c, visible: !c.visible } : c
      )
    );
  }, []);

  /**
   * すべての集合をクリア
   */
  const clearAllCollections = useCallback(() => {
    setCollections([]);
  }, []);

  /**
   * 表示中の集合のみを取得
   * @returns 表示状態の集合の配列
   */
  const getVisibleCollections = useCallback(() => {
    return collections.filter((c) => c.visible);
  }, [collections]);

  /**
   * 指定した集合にカメラをフォーカス
   * @param viewer - Cesium Viewer インスタンス
   * @param collectionId - フォーカス対象の集合ID
   */
  const focusCameraOnCollection = useCallback(
    (viewer: CesiumViewer, collectionId: string) => {
      const collection = collections.find((c) => c.id === collectionId);
      if (!collection) return;

      const positions = getCoordinateBounds(collection.spaceTimeIDs);
      if (!positions || positions.length === 0) return;

      const boundingSphere = BoundingSphere.fromPoints(positions);
      viewer.camera.viewBoundingSphere(
        boundingSphere,
        new HeadingPitchRange(
          viewer.camera.heading,
          -CesiumMath.PI_OVER_FOUR,
          0
        )
      );
    },
    [collections]
  );

  const value: SpaceTimeContextType = {
    collections,
    addCollection,
    removeCollection,
    updateCollection,
    toggleCollectionVisibility,
    clearAllCollections,
    getVisibleCollections,
    focusCameraOnCollection,
    getAllSpaceTimeIDs,
  };

  return (
    <SpaceTimeContext.Provider value={value}>
      {children}
    </SpaceTimeContext.Provider>
  );
};

/**
 * SpaceTimeContext を使用するカスタムフック
 * @returns SpaceTimeContext の値
 * @throws エラー：SpaceTimeProvider 外で使用された場合
 * @example
 * ```tsx
 * const { addCollection, getVisibleCollections } = useSpaceTimeID();
 * ```
 */
export const useSpaceTimeID = (): SpaceTimeContextType => {
  const context = useContext(SpaceTimeContext);
  if (context === undefined) {
    throw new Error("useSpaceTimeID must be used within SpaceTimeProvider");
  }
  return context;
};
