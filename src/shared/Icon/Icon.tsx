import React from 'react';
import { BlockIcon, CommentsIcon, ReportIcon, DropdownMenuBtn, KarmaArrowUpIcon, RoundSaveIcon, RoundShareIcon, SaveIcon, ShareIcon } from '../icons';

export enum EIcons {
  block, comments, report,
  menuBtn, arrowUp, saveRnd,
  shareRnd, save, share,
}

interface IIconProps {
  Name: EIcons
  width: number
}

function getTag(Name: EIcons) {
  if (Name === EIcons.block) return <BlockIcon />;
  if (Name === EIcons.comments) return <CommentsIcon />;
  if (Name === EIcons.report) return <ReportIcon />;
  if (Name === EIcons.menuBtn) return <DropdownMenuBtn />;
  if (Name === EIcons.arrowUp) return <KarmaArrowUpIcon />;
  if (Name === EIcons.saveRnd) return <RoundSaveIcon />;
  if (Name === EIcons.shareRnd) return <RoundShareIcon />;
  if (Name === EIcons.save) return <SaveIcon />;
  if (Name === EIcons.share) return <ShareIcon />;
}

export function Icon({ Name, width }: IIconProps) {
  return (
    <span style={{ width: `${width}px`, fontSize: '0' }}>{getTag(Name)}</span>
  );
}
