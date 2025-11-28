import type { Color } from "cesium";
import React, { createContext, useContext, useState, useCallback } from "react";

export type SpaceTimeID = {
  z: number;
  f: number;
  x: number;
  y: number;
};

export type VoxelStyle = {
  color: Color;
  alpha: number;
  outlineColor: Color;
};

export type SpaceTimeIDCollection = {
  id: string;
  spaceTimeIDs: SpaceTimeID[];
  style: VoxelStyle;
  visible: boolean;
};

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
};

const SpaceTimeContext = createContext<SpaceTimeContextType | undefined>(
  undefined
);

export const SpaceTimeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [collections, setCollections] = useState<SpaceTimeIDCollection[]>([]);

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

  const removeCollection = useCallback((collectionId: string) => {
    setCollections((prev) => prev.filter((c) => c.id !== collectionId));
  }, []);

  const updateCollection = useCallback(
    (collectionId: string, updates: Partial<SpaceTimeIDCollection>) => {
      setCollections((prev) =>
        prev.map((c) => (c.id === collectionId ? { ...c, ...updates } : c))
      );
    },
    []
  );

  const toggleCollectionVisibility = useCallback((collectionId: string) => {
    setCollections((prev) =>
      prev.map((c) =>
        c.id === collectionId ? { ...c, visible: !c.visible } : c
      )
    );
  }, []);

  const clearAllCollections = useCallback(() => {
    setCollections([]);
  }, []);

  const getVisibleCollections = useCallback(() => {
    return collections.filter((c) => c.visible);
  }, [collections]);

  const value: SpaceTimeContextType = {
    collections,
    addCollection,
    removeCollection,
    updateCollection,
    toggleCollectionVisibility,
    clearAllCollections,
    getVisibleCollections,
  };

  return (
    <SpaceTimeContext.Provider value={value}>
      {children}
    </SpaceTimeContext.Provider>
  );
};

export const useSpaceTimeID = (): SpaceTimeContextType => {
  const context = useContext(SpaceTimeContext);
  if (context === undefined) {
    throw new Error("useSpaceTime must be used within SpaceTimeProvider");
  }
  return context;
};
