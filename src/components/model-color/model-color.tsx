import React, { memo } from 'react';

import { Props } from './interface';
import { setForegroundColor, hexToRgb } from './utils';

import  './model-color.scss'

const Component: React.FC<Props> = ({ colors, currentColor, changeColor }) => {

  return (
    <div className="colors-wrapper">
      {
        colors.map((color, index) => (
          <button
            className="color-preview"
            key={ index }
            style={
              {
                backgroundColor: `#${color.color}`
              }
            }
            onClick={ () => changeColor(color) }
          >
            {
              color.color === currentColor.color && (
                <div
                  className="selected"
                  style={{
                    backgroundColor: `${setForegroundColor(hexToRgb(color.color))}`
                  }}
                />
              )
            }
          </button>
        ))
      }
    </div>
  );
};

export const ModelColor = memo(Component);
