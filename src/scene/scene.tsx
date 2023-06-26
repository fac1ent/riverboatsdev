import React, { useState, useContext, memo, useEffect, useRef } from 'react';
import '@google/model-viewer';

import { CircularProgress } from '@mui/material';

import { ConfigContext, ModelContext } from '@shared';
import { Menu, ModelColor } from '@components';

import { paintBoat, resetBoat, applyFilter as utilsApplyFilter, drawExposure } from './utils';

import { Controls } from './controls';
import { OrderModal } from './order-modal';

import './scene.scss';

const Component: React.FC = () => {
  const { filter, color, changeColor } = useContext(ConfigContext);
  const { model } = useContext(ModelContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [showBackground, setShowBackground] = useState<boolean>(false);
  const [showOrderModal, setShowOrderModal] = useState<boolean>(false);

  const modelViewer = useRef(null);

  const toggleBackground = () => {
    setShowBackground(prev => !prev);
  }

  const toggleOrderModal = () => {
    setShowOrderModal(prev => !prev);
  }

  useEffect(() => {
    resetBoat(modelViewer, model);
    utilsApplyFilter(modelViewer, filter);
  }, [filter, model]);

  useEffect(() => {
    modelViewer.current?.addEventListener('load', () => {
      resetBoat(modelViewer, model);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
  }, [model])

  useEffect(() => { loading && modelViewer.current.dismissPoster() }, [loading])

  useEffect(() => {
    paintBoat(modelViewer, color.color);
  }, [color, modelViewer, loading]);

  useEffect(() => {
    drawExposure(modelViewer, model);
  }, [model]);

  return (
    <div className="wrapper">
      <model-viewer
        class="viewer"
        alt="boat 3d model"
        exposure="0.9"
        shadow-intensity={ showBackground ? '0' : '1' }
        camera-controls
        auto-rotate
        skybox-image={ showBackground ? 'image/scene-background.jpg' : '' }
        environment-image={ showBackground ? 'image/scene-background.jpg' : '' }
        src={ model.path }
        ref={ modelViewer }
        reveal="manual"
      >
        <div id="lazy-load-poster" className="poster" slot="poster">
          <CircularProgress color="primary" size={ 90 } disableShrink />
        </div>
        <OrderModal open={ showOrderModal } handleClose={ () => setShowOrderModal(false) } />
        <div className="colors-container">
          <ModelColor currentColor={ color } colors={ model.colors } changeColor={ changeColor } />
        </div>
        <Controls
          toggleBackground={ toggleBackground }
          toggleOrderModal={ toggleOrderModal }
        />
      </model-viewer>
      <Menu
        loading={ loading }
        filter={ filter }
        toggleOrderModal={ toggleOrderModal }
      />
    </div>
  );
}

export const Scene = memo(Component);
