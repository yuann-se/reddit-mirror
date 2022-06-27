import React from 'react';
import { AnonAvatarIcon, BlockIcon, CommentsIcon, ReportIcon, DropdownMenuBtn, KarmaArrowUpIcon, RoundSaveIcon, RoundShareIcon, SaveIcon, ShareIcon } from '../icons';

export enum EIcons {
  anonAvatar, block, comments, report,
  menuBtn, arrowUp, saveRnd,
  shareRnd, save, share,
}

interface IIconProps {
  Name: EIcons
  width: number
}

function getTag(Name: EIcons, width: number) {
  switch (Name) {
    case EIcons.anonAvatar: return <AnonAvatarIcon iconWidth={width} />;
    case EIcons.block: return <BlockIcon iconWidth={width} />;
    case EIcons.comments: return <CommentsIcon iconWidth={width} />;
    case EIcons.report: return <ReportIcon iconWidth={width} />;
    case EIcons.menuBtn: return <DropdownMenuBtn iconWidth={width} />;
    case EIcons.arrowUp: return <KarmaArrowUpIcon iconWidth={width} />;
    case EIcons.save: return <SaveIcon iconWidth={width} />;
    case EIcons.share: return <ShareIcon iconWidth={width} />;
    case EIcons.saveRnd: return <RoundSaveIcon iconWidth={width} />;
    case EIcons.shareRnd: return <RoundShareIcon iconWidth={width} />;
  }
}

export function Icon({ Name, width }: IIconProps) {
  return (
    getTag(Name, width)
  );
}
