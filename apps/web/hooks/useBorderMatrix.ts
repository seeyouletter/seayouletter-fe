import { useAtom } from 'jotai';

import { blockBorderStateAtom, concurrentlyActivedSections } from '@atoms/index';

import { useBlockGroupsAtom } from '@hooks/index';

import { BorderName, DirectionsConstants, EdgeDirectionsConstants } from 'ui';

export const useBorderMatrix = () => {
  const [blockBorderState, setBlockBorderState] = useAtom(blockBorderStateAtom);
  const { activedBlockGroup, setBlockAllBorderRadiusStyle } = useBlockGroupsAtom();

  const setBlockBorderRadius = ({ value }: { value: string }) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      activedBlockGroup.subType === 'text'
    ) {
      return;
    }

    const id = activedBlockGroup.id;

    const nextBorderRadius = {
      ...activedBlockGroup.style.borderRadius,
    };

    blockBorderState.concurrentlyActivedSection.forEach((concurrentlyActivedDirection) => {
      if (concurrentlyActivedDirection in EdgeDirectionsConstants) {
        nextBorderRadius[concurrentlyActivedDirection as EdgeDirectionsConstants] = value;
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
    key: EdgeDirectionsConstants | DirectionsConstants | 'all';
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
