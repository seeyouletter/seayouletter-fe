import { useAtom, useAtomValue } from 'jotai';

import { BlockGroupType, Blocks, Groups, IdType, ImageBlock, ShapeBlock } from 'ui';

import { activedBlockGroupAtom, blocksStateAtom } from '@atoms/index';

interface TypeWithIdInterface<Type = BlockGroupType> {
  type: Type;
  id: Blocks['id'];
}

type NonSubTypeTextBlock = 'shape' | 'image';
type SetStyleParams<State, Type = BlockGroupType> = State & TypeWithIdInterface<Type>;

const typeProperties = {
  group: 'groupsStore',
  block: 'blocksStore',
} as const;

export const useBlockGroupsAtom = () => {
  const activedBlockGroup = useAtomValue(activedBlockGroupAtom);
  const [blockGroupState, setBlockGroupState] = useAtom(blocksStateAtom);

  const setGroupChildrenStore = (id: string, children: string[]) => {
    setBlockGroupState((state) => ({
      ...state,
      groupChildrenStore: {
        ...state.groupChildrenStore,
        [id]: children,
      },
    }));
  };

  /**
   * @description
cksStore 변경과 동시에 groupsStore의 해당 parentGroup의 blocks를 업데이트하기 위한 로직입니다.
   * group의 blocks들은 결국 하위 그룹의 상태가 변화하면 서로의 값이 불일치하게 됩니다.
   * 따라서 이를 해결해주기 위해, 등록한 상위 컴포넌트에서의 blocks에 있는 이전의 자신의 상태를 새롭게 업데이트하는 로직입니다.
   */
  const syncBlockStateWithParentGroupBlocks = ({
    parentId,
    id,
    nextState,
  }: {
    parentId: IdType;
    id: string;
    nextState: Blocks;
  }) => {
    const nextBlocksStoreState = { ...blockGroupState.blocksStore, [id]: nextState };
    const nextGroupsStoreState = { ...blockGroupState.groupsStore };

    if (parentId) {
      nextGroupsStoreState[parentId].blocks = nextGroupsStoreState[parentId].blocks.map((v) =>
        v.id === id ? nextState : v
      );
    }

    setBlockGroupState((state) => ({
      ...state,
      blocksStore: nextBlocksStoreState,
      groupsStore: nextGroupsStoreState,
    }));
  };

  /**
   * @description
   * INFO: 이는 하위 그룹 상태를 업데이트했을 때 하위 그룹 변경과 동시에 groupsStore의 해당 parentGroup의 blocks를 업데이트하기 위한 로직입니다.
   * group의 blocks들은 결국 하위 그룹의 상태가 변화하면 서로의 값이 불일치하게 됩니다.
   * 따라서 이를 해결해주기 위해, 등록한 상위 컴포넌트에서의 blocks에 있는 이전의 자신의 상태를 새롭게 업데이트하는 로직입니다.
   */
  const syncWithParentGroupBlocksState = ({
    parentId,
    id,
    nextState,
  }: {
    parentId: IdType;
    id: string;
    nextState: Groups;
  }) => {
    const nextGroupsStoreState = {
      ...blockGroupState.groupsStore,
      [id]: nextState,
    };

    if (parentId) {
      nextGroupsStoreState[parentId].blocks = nextGroupsStoreState[parentId].blocks.map((v) =>
        v.id === id ? nextState : v
      );
    }

    setGroupsStore(nextGroupsStoreState);
  };

  const setBlocks = (blocks: Record<string, Blocks>) => {
    setBlockGroupState((state) => ({
      ...state,
      blocksStore: blocks,
    }));
  };

  const setGroupsStore = (groups: Record<string, Groups>) => {
    setBlockGroupState((state) => ({
      ...state,
      groupsStore: groups,
    }));
  };

  const setBlockState = (block: Blocks) => {
    setBlockGroupState((state) => ({
      ...state,
      blocksStore: {
        ...state.blocksStore,
        [block.id]: block,
      },
    }));
  };

  const setActiveId = (type: BlockGroupType, id: string) => {
    setBlockGroupState((state) => ({
      ...state,
      activeId: id,
      detail: (type === 'block' ? blockGroupState.blocksStore : blockGroupState.groupsStore)[id],
    }));
  };

  const setTitle = (type: BlockGroupType, id: string, title: string) => {
    const key = typeProperties[type];

    setBlockGroupState((state) => ({
      ...state,
      [key]: {
        ...state[key],
        [id]: {
          ...state[key][id],
          title,
        },
      },
    }));
  };

  const setToggle = (id: string) => {
    const parentId = blockGroupState.groupsStore[id].parent;

    const nextState = {
      ...blockGroupState.groupsStore[id],
      toggled: !blockGroupState.groupsStore[id].toggled,
    };

    syncWithParentGroupBlocksState({ parentId, id, nextState });
  };

  const setOrder = (groups: Groups[]) => {
    const nextGroups: Record<string, Groups> = {};

    groups.forEach((group) => {
      nextGroups[group.id] = {
        ...group,
      };
    });
  };

  const changeBlockStyle = <Value>({
    type,
    id,
    key,
    value,
  }: SetStyleParams<
    {
      key: keyof Blocks['style'];
      value: Value;
    },
    'block'
  >) => {
    if (type !== 'block') {
      /* eslint-disable-next-line no-console */
      console.error('BlockStyleError: Do not call with non-block type.');
      return;
    }

    const nowState = blockGroupState.blocksStore[id];

    const nextState = {
      ...nowState,
      style: {
        ...nowState.style,
        [key]: value,
      },
    };

    syncBlockStateWithParentGroupBlocks({ parentId: nowState.parent, id, nextState });
  };

  const changeImageBlockStyle = <Value>({
    subType,
    id,
    key,
    value,
  }: SetStyleParams<{ subType: 'image'; key: keyof ImageBlock; value: Value }, 'block'>) => {
    if (subType !== 'image') {
      /* eslint-disable-next-line no-console */
      console.error('ImageBlockStyleError: Do not call with non-image-block type.');
      return;
    }

    const nowState = blockGroupState.blocksStore[id] as ImageBlock;

    const nextState = {
      ...nowState,
      imageStyle: {
        ...nowState.imageStyle,
        [key]: value,
      },
    };

    syncBlockStateWithParentGroupBlocks({ parentId: nowState.parent, id, nextState });
  };

  /**
   * NOTE: 아직 group의 position 속성에 대해 명세가 정해지지 않은 상태이다. 추후 확정되면 업데이트한다.
   */
  const setPositionStyle = ({
    type,
    id,
    position,
  }: SetStyleParams<{ position: Blocks['style']['position'] }>) => {
    if (type === 'block') {
      changeBlockStyle({ type, id, key: 'position', value: position });
    }
  };

  const setBorderStyle = ({
    type,
    id,
    border,
  }: SetStyleParams<{ border: Blocks['style']['border'] }, 'block'>) => {
    if (type === 'block') {
      changeBlockStyle({ type, id, key: 'border', value: border });
    }
  };

  const setBorderRadiusStyle = ({
    subType,
    type,
    id,
    borderRadius,
  }: SetStyleParams<
    {
      subType: NonSubTypeTextBlock;
      borderRadius: Blocks['style']['borderRadius'];
    },
    'block'
  >) => {
    if (subType !== 'image' && subType !== 'shape') return;
    changeBlockStyle({ type, id, key: 'borderRadius', value: borderRadius });
  };

  const setFillBgStyle = ({
    subType,
    type,
    id,
    bg,
  }: SetStyleParams<{ subType: NonSubTypeTextBlock; bg: Blocks['style']['bg'] }, 'block'>) => {
    if (subType !== 'shape' && subType !== 'image') return;

    changeBlockStyle({ type, id, key: 'bg', value: bg });
  };

  const setBgOpacity = ({
    subType,
    type,
    id,
    opacity,
  }: SetStyleParams<
    { subType: NonSubTypeTextBlock; opacity: Blocks['style']['opacity'] },
    'block'
  >) => {
    if (subType !== 'shape' && subType !== 'image') return;

    changeBlockStyle({ type, id, key: 'opacity', value: opacity });
  };

  const setTextColorStyle = ({
    subType,
    type,
    id,
    border,
  }: SetStyleParams<{ subType: 'text'; border: Blocks['style']['border'] }>) => {
    if (subType !== 'text') {
      /* eslint-disable-next-line no-console */
      console.error('Do not call with non-text-block.');
      return;
    }

    if (type === 'block') {
      changeBlockStyle({ type, id, key: 'border', value: border });
    }
  };

  const setImageStyle = ({
    subType,
    type,
    id,
    imageStyle,
  }: SetStyleParams<{ subType: 'image'; imageStyle: ImageBlock['imageStyle'] }, 'block'>) => {
    if (subType !== 'image') return;
    changeImageBlockStyle({
      subType,
      type,
      id,
      key: 'imageStyle',
      value: imageStyle,
    });
  };

  const updateImageResource = ({
    type,
    id,
    image,
  }: SetStyleParams<{ image: ImageBlock['image'] }, 'block'>) => {
    if (type !== 'block') return;

    const nextState: ImageBlock = {
      ...blockGroupState.blocksStore[id],
      subType: 'image',
      image,
      imageStyle: {
        opacity: '1',
        objectFit: 'contains',
        position: {
          top: '50%',
          left: '50%',
        },
      },
    };
    setBlockState(nextState);
  };
  const deleteImageResource = ({
    type,
    id,
  }: SetStyleParams<{ image: ImageBlock['image'] }, 'block'>) => {
    if (type !== 'block') return;

    const nextState: ShapeBlock = {
      ...blockGroupState.blocksStore[id],
      subType: 'shape',
    };

    setBlockState(nextState);
  };

  const setSizeStyle = ({ type, id, size }: SetStyleParams<{ size: Blocks['style']['size'] }>) => {
    if (type === 'block') {
      changeBlockStyle({ type, id, key: 'size', value: size });
    }
  };

  return {
    activedBlockGroup,
    activeId: blockGroupState.activeId,

    setGroupChildrenStore,
    setBlocks,
    setActiveId,
    setTitle,
    setToggle,
    setOrder,

    setPositionStyle,
    setSizeStyle,

    setBorderStyle,
    setBorderRadiusStyle,

    setFillBgStyle,
    setBgOpacity,

    setTextColorStyle,

    setImageStyle,
    updateImageResource,
    deleteImageResource,
  };
};
