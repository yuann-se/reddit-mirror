import React from 'react';
import { AnonAvatarIcon, BlockIcon, CommentsIcon, ReportIcon, DropdownMenuBtn, KarmaArrowUpIcon, RoundSaveIcon, RoundShareIcon, SaveIcon, ShareIcon, AttachAudioIcon, AttachDocIcon, AttachImgIcon, AttachLinkIcon, AttachPdfIcon, AttachPhotoIcon, ChangeTextIcon, DownloadIcon, EditIcon, InlineCodeIcon, ReverseIcon, SpeechBubbleIcon } from '../icons';
import { ModalCloseIcon } from '../icons/ModalCloseIcon';

export enum EIcons {
  anonAvatar, block, comments, report,
  menuBtn, arrowUp, saveRnd,
  shareRnd, save, share, closeModal,
  attachAudio, attachDoc, attachImg,
  attachLink, attachPdf, attachPhoto,
  changeText, download, edit,
  inlineCode, reverse, speechBubble
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
    case EIcons.closeModal: return <ModalCloseIcon iconWidth={width} />;
    case EIcons.attachAudio: return <AttachAudioIcon iconWidth={width} />;
    case EIcons.attachDoc: return <AttachDocIcon iconWidth={width} />;
    case EIcons.attachImg: return <AttachImgIcon iconWidth={width} />;
    case EIcons.attachLink: return <AttachLinkIcon iconWidth={width} />;
    case EIcons.attachPdf: return <AttachPdfIcon iconWidth={width} />;
    case EIcons.attachPhoto: return <AttachPhotoIcon iconWidth={width} />;
    case EIcons.changeText: return <ChangeTextIcon iconWidth={width} />;
    case EIcons.download: return <DownloadIcon iconWidth={width} />;
    case EIcons.edit: return <EditIcon iconWidth={width} />;
    case EIcons.inlineCode: return <InlineCodeIcon iconWidth={width} />;
    case EIcons.reverse: return <ReverseIcon iconWidth={width} />;
    case EIcons.speechBubble: return <SpeechBubbleIcon iconWidth={width} />;
  }
}

export function Icon({ Name, width }: IIconProps) {
  return (
    getTag(Name, width)
  );
}
