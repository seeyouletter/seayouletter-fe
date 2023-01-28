import { useAtom } from 'jotai';

import { EdgeDirectionsContstants, blockBorderStateAtom } from '@atoms/index';

import { useBlockGroupsAtom } from '@hooks/useBlockGroupsAtom';

import {
  BorderName,
  DirectionsContstants,
  concurrentlyActivedSections,
} from './../atoms/blockBorderAtom';

export const useBorderMatrix = () => {
  const [blockBorderState, setBlockBorderState] = useAtom(blockBorderStateAtom);
  const { activedBlockGroup, setBlockAllBorderRadiusStyle } = useBlockGroupsAtom();

  const setBlockBorderRadius = ({ value }: { value: string }) => {
    if (activedBlockGroup === null || activedBlockGroup.subType === 'text') {
      return;
    }

    const id = activedBlockGroup.id;

    const nextBorderRadius = {
      ...activedBlockGroup.style.borderRadius,
    };

    blockBorderState.concurrentlyActivedSection.forEach((concurrentlyActivedDirection) => {
      if (concurrentlyActivedDirection in EdgeDirectionsContstants) {
        nextBorderRadius[concurrentlyActivedDirection as EdgeDirectionsContstants] = value;
      }
    });

    setBlockAllBorderRadiusStyle({
      type: activedBlockGroup.type,
      subType: activedBlockGroup.subType,
      id,
      borderRadius: nextBorderRadius,
    });
  };

  const onClickBorderSection = ({
    key,
  }: {
    key: EdgeDirectionsContstants | DirectionsContstants;
  }) => {
    setBlockBorderState((state) => ({
      ...state,
      activeBorder: key,
      name: BorderName[key],
      concurrentlyActivedSection: concurrentlyActivedSections[key],
    }));
  };

  return {
    blockBorderState,
    setBlockBorderRadius,
    onClickBorderSection,
  };
};
