export interface Asset {
  key: string;
  source: string;
  value: any;
}

export type FutureAsset = (key: string, source: string) => Promise<Asset>;

export type Assets = {
  [key: string]: Asset;
};

export interface AssetManager {
  get(key: string): Asset;
}

function assetManager(assets: Assets): AssetManager {

  function get(key: string): Asset {
    if (!key in assets) throw Error(`No asset available under key ${key}`);
    return assets[key];
  }

  return {
    get
  }
}

export interface AssetLoader {
  futureAssets: Promise<Asset>[];

  add(key: string, source: string): AssetLoader;
  load(): Promise<AssetManager>;
}

export interface ImageAsset extends Asset {
  width: number;
  height: number;
}

const futureImageAsset: FutureAsset = (key: string, source: string): Promise<ImageAsset> => {
  return new Promise<ImageAsset>(resolve => {
    const image = new Image();
    image.addEventListener('load', () => resolve({
      key,
      value: image,
      source: image.src,
      width: image.width,
      height: image.height
    }));
    image.src = source;
  });
};

export class ImageAssetLoader implements AssetLoader {
  private futureAssets: Promise<ImageAsset>[] = [];

  add(key: string, source: string): AssetLoader {
    this.futureAssets.push(futureImageAsset(key, source));
    return this;
  }

  load(): Promise<AssetManager> {
    return Promise
      .all(this.futureAssets)
      .then(as => {
        let assets: Assets = {};
        as.forEach(asset => {
          assets[asset.key] = asset;
        });
        return assetManager(assets);
      })
  }
}


