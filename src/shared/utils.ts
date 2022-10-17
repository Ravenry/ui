import doc from "../assets/DOC.svg";
import gif from "../assets/GIF.svg";
import jpg from "../assets/JPG.svg";
import png from "../assets/PNG.svg";
import pdf from "../assets/PDF.svg";
import ppt from "../assets/PPT.svg";
import rar from "../assets/RAR.svg";
import svg from "../assets/SVG.svg";
import xls from "../assets/XLS.svg";
import zip from "../assets/ZIP.svg";
// import other from "ui/assets/general.svg";
import other from "../assets/general.svg";

export function formatFileSize(sizeInBytes: string | number) {
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
