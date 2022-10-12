import doc from "ui/assets/DOC.svg";
import gif from "ui/assets/GIF.svg";
import jpg from "ui/assets/JPG.svg";
import png from "ui/assets/PNG.svg";
import pdf from "ui/assets/PDF.svg";
import ppt from "ui/assets/PPT.svg";
import rar from "ui/assets/RAR.svg";
import svg from "ui/assets/SVG.svg";
import xls from "ui/assets/XLS.svg";
import zip from "ui/assets/ZIP.svg";
import other from "ui/assets/general.svg";

export function formatFileSize(sizeInBytes: number) {
  const KILO = 1024;
  const MEGA = KILO * 1024;

  if (typeof sizeInBytes !== "number") {
    return "Unknown";
  }

  return sizeInBytes >= MEGA
    ? `${(sizeInBytes / MEGA)?.toFixed(2)} MB`
    : sizeInBytes >= KILO
    ? `${(sizeInBytes / KILO)?.toFixed(2)} KB`
    : `${sizeInBytes?.toFixed(2)} B`;
}

export function getIconByFileType(mimetype: string) {
  if (
    [
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ].includes(mimetype)
  ) {
    return doc;
  }

  if (["image/gif"].includes(mimetype)) {
    return gif;
  }

  if (["image/jpeg"].includes(mimetype)) {
    return jpg;
  }

  if (["image/png"].includes(mimetype)) {
    return png;
  }

  if (["application/pdf"].includes(mimetype)) {
    return pdf;
  }

  if (
    [
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    ].includes(mimetype)
  ) {
    return ppt;
  }

  if (["application/vnd.rar"].includes(mimetype)) {
    return rar;
  }

  if (["image/svg+xml"].includes(mimetype)) {
    return svg;
  }

  if (
    [
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ].includes(mimetype)
  ) {
    return xls;
  }

  if (["application/zip"].includes(mimetype)) {
    return zip;
  }

  return other;
}
