import { FormEvent } from 'react';

import { Border, DirectionsConstants, EdgeDirectionsConstants } from 'ui';

import { useBlockGroupsAtom } from './useBlockGroupsAtom';
import { useBorderMatrix } from './useBorderMatrix';

export const useBorderModifier = () => {
  const { blockBorderState } = useBorderMatrix();

  const {
    activedBlockGroup,
    setBlockAllBorderStyle,
    setBlockAllBorderRadiusStyle,
    setBlockBorderWidth,
    setBlockBorderColor,
    setBlockBorderStyle,
    setBlockBorderOpacity,
  } = useBlockGroupsAtom();

  const checkLineValuesAllEqual = (key: 'width' | 'color' | 'style' | 'opacity') => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return false;

    return Object.values(activedBlockGroup.style.border).every(
      (v) => v[key] === activedBlockGroup.style.border.top[key]
    );
  };

  const checkEdgeValuesAllEqual = (key: 'borderRadius') => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return false;

    return Object.values(activedBlockGroup.style[key]).every(
      (v) => v === activedBlockGroup.style[key].topLeft
    );
  };

  const checkEdgeValuesConditionalEqual = (key: 'borderRadius') => {
    if (!activedBlockGroup || activedBlockGroup.type !== 'block')
      return { success: false, value: 'mixed' };

    const targetObj = activedBlockGroup.style[key];

    const concurrentlyActivedEdges = blockBorderState.concurrentlyActivedSection.filter(
      (v) => v in EdgeDirectionsConstants
    );

    const nowStandardValue = targetObj[concurrentlyActivedEdges[0] as EdgeDirectionsConstants];

    return {
      success: (concurrentlyActivedEdges as EdgeDirectionsConstants[]).every(
        (key) => targetObj[key] === nowStandardValue
      ),
      value: nowStandardValue,
    };
  };

  const activeSectionBorderWidth = () => {
    if (blockBorderState.activeBorder in EdgeDirectionsConstants) return '';
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return '';

    if (blockBorderState.activeBorder === 'all') {
      if (checkLineValuesAllEqual('width')) {
        return activedBlockGroup.style.border.top.width;
      } else {
        return 'mixed';
      }
    } else {
      return activedBlockGroup.style.border[blockBorderState.activeBorder as DirectionsConstants]
        .width;
    }
  };

  const activeSectionBorderColor = () => {
    if (blockBorderState.activeBorder in EdgeDirectionsConstants) return '';
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return '';

    if (blockBorderState.activeBorder === 'all') {
      if (checkLineValuesAllEqual('color')) {
        return activedBlockGroup.style.border.top.color;
      } else {
        return 'mixed';
      }
    } else {
      return activedBlockGroup.style.border[blockBorderState.activeBorder as DirectionsConstants]
        .color;
    }
  };

  const activeSectionBorderStyle = () => {
    if (blockBorderState.activeBorder in EdgeDirectionsConstants) return '';
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return '';

    if (blockBorderState.activeBorder === 'all') {
      if (checkLineValuesAllEqual('style')) {
        return activedBlockGroup.style.border.top.style;
      } else {
        return 'mixed';
      }
    } else {
      return activedBlockGroup.style.border[blockBorderState.activeBorder as DirectionsConstants]
        .style;
    }
  };

  const activeSectionBorderOpacity = () => {
    if (blockBorderState.activeBorder in EdgeDirectionsConstants) return '';
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return '';

    if (blockBorderState.activeBorder === 'all') {
      if (checkLineValuesAllEqual('opacity')) {
        return activedBlockGroup.style.border.top.opacity;
      } else {
        return 'mixed';
      }
    } else {
      return activedBlockGroup.style.border[blockBorderState.activeBorder as DirectionsConstants]
        .opacity;
    }
  };

  const activeSectionBorderRadius = () => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return '';
    const borderRadius = activedBlockGroup.style.borderRadius;

    if (blockBorderState.activeBorder === 'all') {
      if (checkEdgeValuesAllEqual('borderRadius')) {
        return borderRadius.topLeft;
      } else {
        return 'mixed';
      }
    } else if (blockBorderState.activeBorder in DirectionsConstants) {
      const { success, value } = checkEdgeValuesConditionalEqual('borderRadius');

      if (success) {
        return value;
      } else {
        return 'mixed';
      }
    } else {
      return borderRadius[blockBorderState.activeBorder as EdgeDirectionsConstants];
    }
  };

  const setBorderMiddleware = (e: FormEvent, type: keyof Border) => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return '';
    const value = (e.target as HTMLInputElement).value;

    if (value === 'mixed') return;

    if (activedBlockGroup.subType === 'text') return;

    if (blockBorderState.activeBorder === 'all') {
      const nextBorderState = {
        ...activedBlockGroup.style.border,
        top: {
          ...activedBlockGroup.style.border.top,
          [type]: value,
        },
        right: {
          ...activedBlockGroup.style.border.right,
          [type]: value,
        },
        bottom: {
          ...activedBlockGroup.style.border.bottom,
          [type]: value,
        },
        left: {
          ...activedBlockGroup.style.border.left,
          [type]: value,
        },
      };

      setBlockAllBorderStyle({ type: 'block', id: activedBlockGroup.id, border: nextBorderState });
    } else {
      if (type === 'width') {
        if (blockBorderState.activeBorder in DirectionsConstants) {
          setBlockBorderWidth({
            subType: activedBlockGroup.subType,
            type: activedBlockGroup.type,
            id: activedBlockGroup.id,
            key: blockBorderState.activeBorder as DirectionsConstants,
            borderWidth: value,
          });
        }
      }

      if (type === 'color') {
        setBlockBorderColor({
          subType: activedBlockGroup.subType,
          type: activedBlockGroup.type,
          id: activedBlockGroup.id,
          key: blockBorderState.activeBorder as DirectionsConstants,
          borderColor: value,
        });
      }

      if (type === 'style') {
        setBlockBorderStyle({
          subType: activedBlockGroup.subType,
          type: activedBlockGroup.type,
          id: activedBlockGroup.id,
          key: blockBorderState.activeBorder as DirectionsConstants,
          borderStyle: value as Border['style'],
        });
      }

      if (type === 'opacity') {
        setBlockBorderOpacity({
          subType: activedBlockGroup.subType,
          type: activedBlockGroup.type,
          id: activedBlockGroup.id,
          key: blockBorderState.activeBorder as DirectionsConstants,
          borderOpacity: value,
        });
      }
    }
  };

  const setBorderRadiusMiddleWare = (e: FormEvent) => {
    if (activedBlockGroup === null || activedBlockGroup.type !== 'block') return '';
    const value = (e.target as HTMLInputElement).value;

    if (value === 'mixed') return;

    if (activedBlockGroup.subType === 'text') return;

    const nextBorderRadius = {
      ...activedBlockGroup.style.borderRadius,
    };

    if (blockBorderState.activeBorder === 'all') {
      nextBorderRadius.topLeft = value;
      nextBorderRadius.topRight = value;
      nextBorderRadius.bottomLeft = value;
      nextBorderRadius.bottomRight = value;
    } else {
      if (blockBorderState.activeBorder in DirectionsConstants) {
        blockBorderState.concurrentlyActivedSection.forEach((section) => {
          if (section in EdgeDirectionsConstants) {
            nextBorderRadius[section as EdgeDirectionsConstants] = value;
          }
        });
      } else {
        nextBorderRadius[blockBorderState.activeBorder as EdgeDirectionsConstants] = value;
      }
    }

    setBlockAllBorderRadiusStyle({
      subType: activedBlockGroup.subType,
      type: activedBlockGroup.type,
      id: activedBlockGroup.id,
      borderRadius: nextBorderRadius,
    });
  };

  return {
    activeSectionBorderColor,
    activeSectionBorderWidth,
    activeSectionBorderStyle,
    activeSectionBorderOpacity,
    activeSectionBorderRadius,
    setBorderMiddleware,
    setBorderRadiusMiddleWare,
  };
};
