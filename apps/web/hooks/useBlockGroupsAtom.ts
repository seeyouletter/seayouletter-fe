import { useAtom, useAtomValue } from 'jotai';

import { activedBlockGroupAtom, blocksStateAtom } from '@atoms/index';

import {
  BlockGroupPriorities,
  BlockGroupType,
  Blocks,
  Border,
  Directions,
  Groups,
  IdType,
  ImageBlock,
  NonTextBlock,
  NonTextBlockStylesInterface,
  ShapeBlock,
  TextBlock,
} from 'ui';

interface TypeWithIdInterface<Type = BlockGroupType> {
  type: Type;
  id: Blocks['id'];
}

type NonSubTypeTextBlock = 'shape' | 'image';
type SetStyleParams<State = unknown, Type = BlockGroupType> = State & TypeWithIdInterface<Type>;

type SetTextStyleParams<Value> = SetStyleParams<{
  subType: 'text';
  key: keyof TextBlock['textStyle'];
  value: Value;
}>;

const typeProperties = {
  group: 'groupsStore',
  block: 'blocksStore',
} as const;

export const useBlockGroupsAtom = () => {
  const activedBlockGroup = useAtomValue(activedBlockGroupAtom);
  const [blockGroupState, setBlockGroupState] = useAtom(blocksStateAtom);

  /**
   * INFO: 공통 코드
   */
  const setActiveId = (
    type: BlockGroupType,
    id: string,
    depth: BlockGroupPriorities['depth'],
    order: BlockGroupPriorities['order']
  ) => {
    setBlockGroupState((state) => ({
      ...state,
      activeId: id,
      activedBlockGroupDepth: depth,
      activeOrder: order,
      detail: (type === 'block' ? blockGroupState.blocksStore : blockGroupState.groupsStore)[id],
    }));
  };

  const initializeActiveBlockGroup = () => {
    setBlockGroupState((state) => ({
      ...state,
      activeId: null,
      activedBlockGroupDepth: null,
      activeOrder: null,
      detail: null,
    }));
  };

  const setHoverId = ({ id, depth, order }: { id: IdType } & BlockGroupPriorities) => {
    if (id === null) return;

    setBlockGroupState((state) => ({
      ...state,
      hoverId: id,
      hoveredBlockGroupDepth: depth,
      hoverOrder: order,
    }));
  };

  const setNextActivedBlockGroup = ({
    type,
    id,
    depth,
    order,
  }: {
    type: BlockGroupType;
    id: IdType;
  } & BlockGroupPriorities) => {
    if (id === null || activedBlockGroup === null || id === blockGroupState.activeId) {
      return;
    }

    if (activedBlockGroup.type === 'group') {
      if (activedBlockGroup.blocks.map((v) => v.id).includes(id)) {
        if (blockGroupState.activedBlockGroupDepth === null) {
          if (depth === 0) {
            setActiveId(type, id, depth, order);
          }
        } else {
          if (depth === blockGroupState.activedBlockGroupDepth + 1) {
            setActiveId(type, id, depth, order);
          }
        }
      }
    }
  };

  const initializeHoverBlockGroup = () => {
    setBlockGroupState((state) => ({
      ...state,
      hoverId: null,
      hoveredBlockGroupDepth: null,
      hoverOrder: null,
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

  /**
   * INFO: 그룹 관련 코드
   */

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

  const setGroupsStore = (groups: Record<string, Groups>) => {
    setBlockGroupState((state) => ({
      ...state,
      groupsStore: groups,
    }));
  };

  const addGroup = (group: Groups) => {
    setBlockGroupState((state) => ({
      ...state,
      groupsStore: {
        ...state.groupsStore,
        [group.id]: group,
      },
    }));
  };

  const updateGroup = (group: Groups) => {
    setBlockGroupState((state) => ({
      ...state,
      groupsStore: {
        ...state.groupsStore,
        [group.id]: group,
      },
    }));
  };

  const deleteGroup = (group: Groups) => {
    const nextState = { ...blockGroupState.groupsStore };
    delete nextState[group.id];

    setBlockGroupState((state) => ({
      ...state,
      groupsStore: nextState,
    }));
  };

  const setOrder = (groups: Groups[]) => {
    const nextGroups: Record<string, Groups> = {};

    groups.forEach((group) => {
      nextGroups[group.id] = {
        ...group,
      };
    });
  };

  const setToggle = (id: string) => {
    const parentId = blockGroupState.groupsStore[id].parent;

    const nextState = {
      ...blockGroupState.groupsStore[id],
      toggled: !blockGroupState.groupsStore[id].toggled,
    };

    syncWithParentGroupBlocksState({ parentId, id, nextState });
  };

  /**
   * @description
   * 아직 toggleFalse는 만들지 않았다. 유즈케이스를 아직 떠올리지 못한 상황이기 때문이다.
   * 추후 토글을 반드시 제거해야 되는 상황이 있다면 이를 고민해보자.
   *
   * @see: #71 (Block의 변경 로직을 구현한다)
   */
  const setToggleTrue = (id: string) => {
    const parentId = blockGroupState.groupsStore[id].parent;

    const nextState = {
      ...blockGroupState.groupsStore[id],
      toggled: true,
    };

    syncWithParentGroupBlocksState({ parentId, id, nextState });
  };

  /**
   * INFO: 블록 관련 코드
   */

  /**
   * @description
   * INFO: blocksStore 변경과 동시에 groupsStore의 해당 parentGroup의 blocks를 업데이트하기 위한 로직입니다.
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
    setBlockGroupState((state) => ({
      ...state,
      blocksStore: { ...state.blocksStore, [id]: nextState },
      groupsStore: {
        ...state.groupsStore,
        ...(parentId
          ? {
              [parentId]: {
                ...state.groupsStore[parentId],
                blocks: state.groupsStore[parentId].blocks.map((v) =>
                  v.id === id ? nextState : v
                ),
              },
            }
          : {}),
      },
    }));
  };

  const setBlocks = (blocks: Record<string, Blocks>) => {
    setBlockGroupState((state) => ({
      ...state,
      blocksStore: blocks,
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

  const addBlock = (block: Blocks) => {
    setBlockGroupState((state) => ({
      ...state,
      blocksStore: {
        ...state.blocksStore,
        [block.id]: block,
      },
    }));
  };

  const updateBlock = (block: Blocks) => {
    syncBlockStateWithParentGroupBlocks({
      parentId: block.parent,
      id: block.id,
      nextState: block,
    });
  };

  const deleteBlock = (block: Blocks) => {
    const nextState = { ...blockGroupState.blocksStore };
    delete nextState[block.id];

    setBlockGroupState((state) => ({
      ...state,
      blocksStore: nextState,
    }));
  };

  const changeBlockState = (nextState: Blocks) => {
    if (nextState.subType === 'text') {
      syncBlockStateWithParentGroupBlocks({
        parentId: nextState.parent,
        id: nextState.id,
        nextState,
      });
    } else {
      syncBlockStateWithParentGroupBlocks({
        parentId: nextState.parent,
        id: nextState.id,
        nextState,
      });
    }
  };

  const changeBlockStyle = <BlockType, Value>({
    type,
    id,
    key,
    value,
  }: SetStyleParams<
    {
      key: keyof BlockType;
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

    if (nowState.subType === 'text') {
      const nextState: TextBlock = {
        ...nowState,
        style: {
          ...nowState.style,
          [key]: value,
        },
      };

      syncBlockStateWithParentGroupBlocks({ parentId: nowState.parent, id, nextState });
    } else {
      const nextState: NonTextBlock = {
        ...nowState,
        style: {
          ...nowState.style,
          [key]: value,
        },
      };

      syncBlockStateWithParentGroupBlocks({ parentId: nowState.parent, id, nextState });
    }
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

  const setBlockAllBorderStyle = ({
    type,
    id,
    border,
  }: SetStyleParams<{ border: Blocks['style']['border'] }, 'block'>) => {
    if (type === 'block') {
      changeBlockStyle({ type, id, key: 'border', value: border });
    }
  };

  const setBlockBorderWidth = ({
    subType,
    type,
    id,
    key,
    borderWidth,
  }: SetStyleParams<
    {
      subType: NonSubTypeTextBlock;
      key: Directions;
      borderWidth: Border['width'];
    },
    'block'
  >) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      (subType !== 'image' && subType !== 'shape')
    )
      return;

    const nextBorderState: Record<Directions, Border> = {
      ...activedBlockGroup.style.border,
      [key]: {
        ...activedBlockGroup.style.border[key],
        width: borderWidth,
      },
    };

    setBlockAllBorderStyle({ type, id, border: nextBorderState });
  };

  const setBlockBorderColor = ({
    subType,
    type,
    id,
    key,
    borderColor,
  }: SetStyleParams<
    {
      subType: NonSubTypeTextBlock;
      key: Directions;
      borderColor: Border['width'];
    },
    'block'
  >) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      (subType !== 'image' && subType !== 'shape')
    )
      return;

    const nextBorderState: Record<Directions, Border> = {
      ...activedBlockGroup.style.border,
      [key]: {
        ...activedBlockGroup.style.border[key],
        color: borderColor,
      },
    };

    setBlockAllBorderStyle({ type, id, border: nextBorderState });
  };

  const setBlockBorderOpacity = ({
    subType,
    type,
    id,
    key,
    borderOpacity,
  }: SetStyleParams<
    {
      subType: NonSubTypeTextBlock;
      key: Directions;
      borderOpacity: Border['opacity'];
    },
    'block'
  >) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      (subType !== 'image' && subType !== 'shape')
    )
      return;

    const nextBorderState: Record<Directions, Border> = {
      ...activedBlockGroup.style.border,
      [key]: {
        ...activedBlockGroup.style.border[key],
        opacity: borderOpacity,
      },
    };

    setBlockAllBorderStyle({ type, id, border: nextBorderState });
  };

  const setBlockBorderStyle = ({
    subType,
    type,
    id,
    key,
    borderStyle,
  }: SetStyleParams<
    {
      subType: NonSubTypeTextBlock;
      key: Directions;
      borderStyle: Border['style'];
    },
    'block'
  >) => {
    if (
      activedBlockGroup === null ||
      activedBlockGroup.type !== 'block' ||
      (subType !== 'image' && subType !== 'shape')
    )
      return;

    const nextBorderState: Record<Directions, Border> = {
      ...activedBlockGroup.style.border,
      [key]: {
        ...activedBlockGroup.style.border[key],
        style: borderStyle,
      },
    };

    setBlockAllBorderStyle({ type, id, border: nextBorderState });
  };

  const setBlockAllBorderRadiusStyle = ({
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
  }: SetStyleParams<
    { subType: NonSubTypeTextBlock; bg: NonTextBlockStylesInterface['bg'] },
    'block'
  >) => {
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

  /**
   * INFO: 텍스트 블록 관련 코드
   */

  const setTextStyle = <Value>({ subType, type, id, key, value }: SetTextStyleParams<Value>) => {
    if (type !== 'block') {
      /* eslint-disable-next-line no-console */
      console.error('Do not call with non-block.');
      return;
    }
    if (subType !== 'text') {
      /* eslint-disable-next-line no-console */
      console.error('Do not call with non-text-block.');
      return;
    }

    const nowState = blockGroupState.blocksStore[id] as TextBlock;

    const nextState = {
      ...nowState,
      textStyle: {
        ...nowState.textStyle,
        [key]: value,
      },
    };

    syncBlockStateWithParentGroupBlocks({ parentId: nowState.parent, id, nextState });
  };

  const setTextColor = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'color',
      value,
    });
  };

  const setTextFontSize = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'fontSize',
      value,
    });
  };

  const setTextStroke = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'textStroke',
      value,
    });
  };

  const setTextStrokeColor = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'textStrokeColor',
      value,
    });
  };

  const setTextFontStyle = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'fontStyle',
      value,
    });
  };

  const setTextFontFamily = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'fontFamily',
      value,
    });
  };

  const setTextLetterSpacing = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'letterSpacing',
      value,
    });
  };

  const setTextFontWeight = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'fontWeight',
      value,
    });
  };

  const setTextLineHeight = ({
    subType,
    id,
    value,
  }: Omit<SetTextStyleParams<string>, 'key' | 'type'>) => {
    setTextStyle({
      subType,
      type: 'block',
      id,
      key: 'lineHeight',
      value,
    });
  };

  /**
   * INFO: 이미지 블록 관련 코드
   */

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
    if (blockGroupState.blocksStore[id].subType !== 'image') return;

    const nowState = blockGroupState.blocksStore[id] as ImageBlock;

    const nextState: ImageBlock = {
      ...nowState,
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
  const deleteImageResource = ({ type, id }: SetStyleParams) => {
    if (type !== 'block') return;

    const nextState: ShapeBlock = {
      ...(blockGroupState.blocksStore[id] as ImageBlock),
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
    blockGroupState,
    activedBlockGroup,
    activeId: blockGroupState.activeId,
    hoverId: blockGroupState.hoverId,

    changeBlockState,
    changeBlockStyle,

    setGroupChildrenStore,
    setBlocks,
    setActiveId,
    initializeActiveBlockGroup,

    setNextActivedBlockGroup,

    setHoverId,
    initializeHoverBlockGroup,

    setTitle,
    setToggle,
    setToggleTrue,
    setOrder,

    setPositionStyle,
    setSizeStyle,

    setBlockAllBorderStyle,
    setBlockAllBorderRadiusStyle,
    setBlockBorderWidth,
    setBlockBorderColor,
    setBlockBorderOpacity,
    setBlockBorderStyle,

    setFillBgStyle,
    setBgOpacity,

    setTextStyle,

    setImageStyle,
    updateImageResource,
    deleteImageResource,

    setTextColor,
    setTextFontSize,
    setTextFontWeight,
    setTextLetterSpacing,
    setTextLineHeight,
    setTextStroke,
    setTextStrokeColor,
    setTextFontStyle,
    setTextFontFamily,

    addBlock,
    addGroup,
    updateBlock,
    updateGroup,
    deleteBlock,
    deleteGroup,
  };
};
