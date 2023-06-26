import '@google/model-viewer';

import { Material, Model, Option } from './interface';
import { paintMarker, metallicMarker } from './const';

/**
 * It takes a hexadecimal color string, converts it to RGB, and then converts it to HSL
 * @param {string} hex - The hexadecimal color value to convert.
 * @returns An array of three numbers, each representing the red, green, and blue values of the hex
 * color.
 */
const hexToHSL = (hex: string): [number, number, number] => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16) / 255,
    parseInt(result[2], 16) / 255,
    parseInt(result[3], 16) / 255,
  ] : [0, 0, 0];
}

/**
 * It takes a model viewer and a color, and then it sets the color of the boat
 * @param {any} modelViewer - the model viewer component
 * @param {string} color - string - the color you want to paint the boat
 */
export const paintBoat = (modelViewer: any, color: string): void => {
  const newColor = hexToHSL(color);

  modelViewer.current && modelViewer?.current?.model?.materials.forEach((material: Material) => {
    if (material.name.includes(paintMarker)) {
      material.pbrMetallicRoughness.setBaseColorFactor([...newColor, 1]);
    };
  });
};

/**
 * We're looping through the materials of the model, and if the material name includes the word
 * "metallic", we're setting the roughness factor to 0.2 and the metallic factor to 1
 * @param {any} modelViewer - any - this is the model viewer component that we imported from the
 * model-viewer library.
 */
const applyMetallic = (modelViewer: any): void => {
  modelViewer?.current?.model?.materials.forEach((material: Material) => {
    if (material.name.includes(metallicMarker)) {
      material.pbrMetallicRoughness.setRoughnessFactor(0.2);
      material.pbrMetallicRoughness.setMetallicFactor(1);
    };
  });
};

/**
 * We loop through all the materials in the model, and if the material name includes the name of an
 * option, we set the alpha mode to mask, the alpha cutoff to 0.5, and the base color factor to the
 * last color
 * @param {any} modelViewer - the model viewer component
 * @param {Model} model - The model object that contains the options that are available for the model.
 */
export const resetBoat = (modelViewer: any, model: Model): void => {
  if (modelViewer.current.model) {
    applyMetallic(modelViewer)
    modelViewer?.current.model.materials.forEach((material: Material) => {
      const normalizedMaterialName = material.name.toLowerCase();

      model.options.forEach(option => {
        const normalizedOptionName = option.name.toLowerCase();
        if (normalizedMaterialName.includes(normalizedOptionName)) {
          const lastColor = material.pbrMetallicRoughness.baseColorFactor;

          lastColor[3] = 0;
          material.setAlphaMode('MASK');
          material.setAlphaCutoff(0.1);
          material.pbrMetallicRoughness.setBaseColorFactor(lastColor);
        };
      });
    });
  };
}

/**
 * It takes a model viewer and a filter array and applies the filter to the model viewer
 * @param {any} modelViewer - the model viewer component
 * @param {string[]} filter - Option[] - An array of Options that will be used to filter the materials.
 */
export const applyFilter = (modelViewer: any, filter: Option[]): void => {
  if (modelViewer.current.model) {
    modelViewer?.current.model.materials.forEach((material: Material) => {
      const normalizedMaterialName = material.name.toLowerCase();

      filter.forEach(f => {
        const normalizedFName = f.name.toLowerCase();

        if (normalizedMaterialName.includes(normalizedFName)) {
          const lastColor = material.pbrMetallicRoughness.baseColorFactor;
          lastColor[3] =  1;
          material.pbrMetallicRoughness.setBaseColorFactor(lastColor);
        };
      });
    });
  };
}

/* It's a function that takes in a min, max, period, and time and returns a number. */
const oscillate = (min: number, max: number, period: number, time: number) => {
  const mag = max - min;
  return Math.cos(Math.PI + 2 * Math.PI * time / period) * (min + mag / 2.0) + mag / 2.0;
}

/**
 * It takes a model viewer and a model, and if the model viewer's exposure is not 1, it sets it to 1 and then animates it
 * back to 0
 * @param {any} modelViewer - the model viewer object
 * @param {Model} model - The model to be drawn
 */
export const drawExposure = (modelViewer: any, model: Model): any => {
  if (modelViewer.current.exposure) {
    const time = performance.now();
    const animate = () => {
      modelViewer.current.exposure = oscillate(0, 1.5, 5000, performance.now() - time);
      if (modelViewer.current.exposure > 1) {
        modelViewer.current.exposure = 1;
      } else {
        requestAnimationFrame(animate);
      }
    }
    resetBoat(modelViewer, model);
    animate();
  }
}
