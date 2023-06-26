export interface Model {
  name: string;
  cost: number;
  index: number;
  path: string;
  colors: Color[];
  options: Option[];
}

export interface Color {
  name: string;
  cost: number;
  color: string;
}

export interface Option {
  img: string;
  cost: number;
  name: string;
  deps: string[];
}

// TODO: move all model-viewer interfaces in separate file
export interface Material {
  name: string;

  // Returns the glTF index of this material.
  readonly index: number;
  readonly normalTexture: TextureInfo | null;
  readonly occlusionTexture: TextureInfo | null;
  readonly emissiveTexture: TextureInfo | null;
  readonly emissiveFactor: RGB;
  readonly pbrMetallicRoughness: PBRMetallicRoughness;

  setEmissiveFactor(rgb: RGB): void;
  setAlphaCutoff(cutoff: number): void;
  getAlphaCutoff(): number;
  setDoubleSided(doubleSided: boolean): void;
  getDoubleSided(): boolean;
  setAlphaMode(alphaMode: AlphaMode): void;
  getAlphaMode(): AlphaMode;
}

export interface PBRMetallicRoughness {
  readonly baseColorFactor: RGBA;
  readonly metallicFactor: number;
  readonly roughnessFactor: number;
  readonly baseColorTexture: TextureInfo | null;
  readonly metallicRoughnessTexture: TextureInfo | null;

  setBaseColorFactor(rgba: RGBA): void;
  setMetallicFactor(value: number): void;
  setRoughnessFactor(value: number): void;
}

interface TextureInfo {
  readonly texture: Texture|null;

  /**
   * Sets the texture, or removes it if argument is null. Note you cannot build
   * your own Texture object, but must either use one from another TextureInfo,
   * or create one with the createTexture method.
   */
  setTexture(texture: Texture|null): void;
}

interface Texture {
  readonly name: string;
  readonly sampler: Sampler;
  readonly source: Image;
}

interface Sampler {
  readonly name: string;
  readonly minFilter: MinFilter;
  readonly magFilter: MaxFilter;
  readonly wrapS: WrapMode;
  readonly wrapT: WrapMode;

  setMinFilter(filter: MinFilter): void;
  setMagFilter(filter: MaxFilter): void;
  setWrapS(mode: WrapMode): void;
  setWrapT(mode: WrapMode): void;
}

interface Image {
  readonly name: string;

  /**
    * The type is 'external' if the image has a configured URI. Otherwise, it is
    * considered to be 'embedded'. Note: this distinction is only implied by the
    * glTF spec, and is made explicit here for convenience.
    */
  readonly type: 'embedded'|'external';

  // The URI of the image, if it is external.
  readonly uri?: string;

  // The bufferView of the image, if it is embedded.
  readonly bufferView?: number

  /**
    * A method to create an object URL of this image at the desired
    * resolution. Especially useful for KTX2 textures which are GPU compressed,
    * and so are unreadable on the CPU without a method like this.
    */
  createThumbnail(width: number, height: number): Promise<string>;
}

type RGBA = [number, number, number, number];
type RGB = [number, number, number];
type AlphaMode = 'OPAQUE'|'MASK'|'BLEND';

enum WrapMode {
  ClampToEdge = 33071,
  MirroredRepeat = 33648,
  Repeat = 10497,
}

enum MinFilter {
  Nearest = 9728,
  Linear = 9729,
  NearestMipmapNearest = 9984,
  LinearMipmapNearest = 9985,
  NearestMipmapLinear = 9986,
  LinearMipmapLinear = 9987,
}

enum MaxFilter {
  Nearest = 9728,
  Linear = 9729,
}
