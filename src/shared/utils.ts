import jwt_decode from 'jwt-decode';
import moment from 'moment';
import _, { capitalize } from 'lodash';
import * as Yup from 'yup';

import {
  jobStatusAdminSolos as jobStatusAdmin,
  jobStatusClient,
  jobStatusSolosFreelancer as jobStatusFreelancer,
} from 'store/constants/Constants';

import doc from 'ui/assets/DOC.svg';
import gif from 'ui/assets/GIF.svg';
import jpg from 'ui/assets/JPG.svg';
import png from 'ui/assets/PNG.svg';
import pdf from 'ui/assets/PDF.svg';
import ppt from 'ui/assets/PPT.svg';
import rar from 'ui/assets/RAR.svg';
import svg from 'ui/assets/SVG.svg';
import xls from 'ui/assets/XLS.svg';
import zip from 'ui/assets/ZIP.svg';
import other from 'ui/assets/general.svg';
import { Job } from 'store/constants/properties';

export function getJwtExpiryDate(token: string) {
  const decoded: any = jwt_decode(token);

  if (!decoded.exp) return null;

  return new Date(decoded.exp * 1000);
}

export function setCookie(cname: string, cvalue: string, expiration: Date) {
  let expiresAt;
  if (expiration) {
    expiresAt = expiration;
  } else {
    expiresAt = null;
  }

  const domain = () => {
    if (window.location.origin.includes('ravenry')) {
      return 'domain=theravenry.com;';
    }
    return null;
  };
  const expires = expiresAt ? `expires=${expiresAt.toUTCString()};` : '';

  document.cookie = `${cname}=${cvalue};${expires}path=/;${domain()}`;
}


export const getCookie = (cname: string) => {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export function deleteAllCookies() {
  const cookies = document.cookie.split(';');

  const domain = window.location.origin.includes('ravenry') ? 'domain=theravenry.com;' : null;

  const domainWithSub = window.location.origin.includes('ravenry')
    ? 'domain=app.theravenry.com;'
    : null;

  for (let i = 0; i < cookies.length; i += 1) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf('=');
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;${domain}`;
    document.cookie = `${name}=;path=/;expires=Thu, 01 Jan 1970 00:00:00 GMT;${domainWithSub}`;
  }
}



export function lpad(n: any, width: any, z: any) {
  z = z || '0';
  n += '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function countExpirationCountdown(expiredAt: Date | string) {
  if (!expiredAt) return 0;
  const now = moment(new Date()).format();
  const expired = moment.utc(expiredAt).local().format();
  const diff = moment(now).diff(expired);
  if (diff > 0) {
    return 0;
  }
  return Math.abs(diff);
}

export function getDifferenceOfNowAndTimestampPlus24HoursInEpoch(timestamp: Date | string) {
  if (!timestamp) {
    return 0;
  }

  const now = moment().unix();
  const targetTimestamp = moment(timestamp).add(24, 'hours').unix();

  if (now < targetTimestamp) {
    return (targetTimestamp - now) * 1000;
  }
  return 0;
}

export function formatPseudonym(pseudonym: string) {
  if (!pseudonym) return pseudonym;

  const lastChar = pseudonym.slice(-1).toUpperCase();
  let firstLetter = pseudonym.slice(0, -1);
  firstLetter = firstLetter.charAt(0).toUpperCase() + firstLetter.slice(1);

  return `${firstLetter} ${lastChar}`;
}

export function validateEmail(email: string) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

/**
 * constructNotifURL
 *
 */
export function constructNotifURL(notif: any, domain: 'admin' | 'client' | 'freelancer') {
  let url,
    hash,
    search,
    state = {};

  const page = notif.action === 'job-board' ? notif.action : `${notif.action}s`;

  if (domain === 'client' || domain === 'freelancer') {
    search = '?tab=' + notif.type;

    url = `/${domain}/${page}/${notif._targetId || ''}`;
  } else {
    hash = notif.type;

    const additionalPath = notif.type === 'recommendation' ? '/recommendation' : '';

    // TODO: Some variables are still named 'admin', not 'god'.
    url = `/${domain === 'admin' ? 'god' : domain}/${page}/${
      notif._targetId || ''
    }${additionalPath}`;
  }

  if (notif.type === 'chat') {
    state = {
      ...state,
      freelancerId: notif._fromId,
    };
  }

  return {
    url,
    hash,
    search,
    state,
  };
}

export function constructFirstNameLastInitial(name = '') {
  return name
    .split(' ')
    .map((n, i, { length }) =>
      i === 0 ? _.capitalize(n) : i === length - 1 ? `${n.charAt(0).toUpperCase()}.` : '',
    )
    .filter((n) => n.length)
    .join(' ');
}

export function cleanString(str: any, params: any) {
  if (typeof str !== 'string') {
    return null;
  }
  const string = capitalize(str.replace(/_/g, ' '));

  return string.replace(params, '');
}

export function downloadResource(data: any, filename: string) {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
}

export function convertStringToValidKey(str = '') {
  return str
    .toLowerCase()
    .replace(/[^a-z\d\s]/g, '')
    .split(' ')
    .join('_');
}

export function subscribeNewUser(payload: any) {
  if (typeof window.bento$ !== 'undefined' && process.env.REACT_APP_ENV === 'production') {
    window.bento$(() => {
      window.bento.track('$subscribe', { ...payload });
    });
  }
}

export function formatFileSize(sizeInBytes: number) {
  const KILO = 1024;
  const MEGA = KILO * 1024;

  if (typeof sizeInBytes !== 'number') {
    return 'Unknown';
  }

  return sizeInBytes >= MEGA
    ? `${(sizeInBytes / MEGA)?.toFixed(2)} MB`
    : sizeInBytes >= KILO
    ? `${(sizeInBytes / KILO)?.toFixed(2)} KB`
    : `${sizeInBytes?.toFixed(2)} B`;
}

export function calculateDiscount(amount: any, coupon: any) {
  let discountedAmount = 0;
  if (coupon?.amountOff) {
    discountedAmount = coupon.amountOff;
  } else if (coupon?.percentageOff) {
    discountedAmount = (amount * coupon.percentageOff) / 100;
  }

  if (coupon?.maxOff && discountedAmount > coupon?.maxOff) {
    discountedAmount = coupon?.maxOff;
  }

  return discountedAmount;
}

export function getIconByFileType(mimetype: string) {
  if (
    [
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ].includes(mimetype)
  ) {
    return doc;
  }

  if (['image/gif'].includes(mimetype)) {
    return gif;
  }

  if (['image/jpeg'].includes(mimetype)) {
    return jpg;
  }

  if (['image/png'].includes(mimetype)) {
    return png;
  }

  if (['application/pdf'].includes(mimetype)) {
    return pdf;
  }

  if (
    [
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    ].includes(mimetype)
  ) {
    return ppt;
  }

  if (['application/vnd.rar'].includes(mimetype)) {
    return rar;
  }

  if (['image/svg+xml'].includes(mimetype)) {
    return svg;
  }

  if (
    [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ].includes(mimetype)
  ) {
    return xls;
  }

  if (['application/zip'].includes(mimetype)) {
    return zip;
  }

  return other;
}

export const coachmarkUtil = {
  getCoachmarkSettings() {
    return JSON.parse(localStorage.getItem('COACHMARK_SETTINGS') as string);
  },

  removeCoachmarkSettings() {
    localStorage.removeItem('COACHMARK_SETTINGS');
  },

  updateCoachmarkSettings(payload: any) {
    localStorage.setItem(
      'COACHMARK_SETTINGS',
      JSON.stringify({
        ...this.getCoachmarkSettings(),
        ...payload,
      }),
    );
  },
};

export const draftMessageUtil = {
  getDraftMessages() {
    try {
      const allDraftMessages = JSON.parse(localStorage.getItem('DRAFT_MESSAGES') as string);

      if (Array.isArray(allDraftMessages)) {
        return allDraftMessages;
      }
      return [];
    } catch (err) {
      return [];
    }
  },

  getDraftMessageByJobId(jobId: string) {
    const allDraftMessages = this.getDraftMessages();

    return allDraftMessages.find((draftMessage) => draftMessage.jobId === jobId);
  },

  removeDraftMessages() {
    localStorage.removeItem('DRAFT_MESSAGES');
  },

  updateDraftMessage(jobId: string, chatRoomId: string, payload: any) {
    const allDraftMessages = this.getDraftMessages();

    const draftMessageIndex = allDraftMessages.findIndex(
      (draftMessage) => draftMessage.jobId === jobId,
    );

    if (draftMessageIndex >= 0) {
      const updatedDraftMessages = [...allDraftMessages];

      updatedDraftMessages[draftMessageIndex] = {
        jobId,
        payload: {
          ...updatedDraftMessages[draftMessageIndex].payload,
          [chatRoomId]: payload,
        },
      };

      localStorage.setItem('DRAFT_MESSAGES', JSON.stringify(updatedDraftMessages));
    } else {
      const updatedDraftMessages = [
        ...allDraftMessages,
        {
          jobId,
          payload: {
            [chatRoomId]: payload,
          },
        },
      ];

      localStorage.setItem('DRAFT_MESSAGES', JSON.stringify(updatedDraftMessages));
    }
  },
};

export function maskEmail(email: string) {
  try {
    const isEmail = Yup.string().email().validateSync(email);

    if (!isEmail) {
      return '';
    }

    const [localPart, domain] = email.split('@');
    const lastDotIndex = domain.lastIndexOf('.');

    const [secondLevelDomain, topLevelDomain] = [
      domain.slice(0, lastDotIndex),
      domain.slice(lastDotIndex),
    ];

    let maskedLocalPart = localPart;

    if (localPart.length > 2) {
      maskedLocalPart = localPart
        .split('')
        .map((lp, i, { length }) => (i === 0 || i === length - 1 ? lp : '*'))
        .join('');
    }

    let maskedSecondLevelDomain = secondLevelDomain;

    if (maskedSecondLevelDomain.length > 2) {
      maskedSecondLevelDomain = secondLevelDomain
        .split('')
        .map((sld, i, { length }) => (i === 0 || i === length - 1 ? sld : '*'))
        .join('');
    }

    return `${maskedLocalPart}@${maskedSecondLevelDomain}${topLevelDomain}`;
  } catch (err) {
    console.error(err);

    return '';
  }
}

export function translateFreelancerStatus(matchingStatus: number, jobStatus: number) {
  switch (matchingStatus) {
    // 0: Haven't decided if interested or not
    case 0:
      // Status is job available
      return 0;
    // 2: Picked interested
    case 2:
      // Status is pending match
      return 1;
    // 3: Recommended
    case 3:
      // Status is nominated
      return 2;
    // 4: Offer submitted
    case 4:
      if (jobStatus === 3) {
        return 4;
      }
      if (jobStatus === 4) {
        return 5;
      }
      if (jobStatus === 5) {
        return 6;
      }
      return 3;

    default:
      return 0;
  }
}

export const getStatusColorAndText = (
  userRole: string,
  status: number,
  isCancelled: boolean,
  recommendedBy: string,
  bms: boolean,
) => {
  let color = 'white';
  let text = '';

  if (userRole === 'client') {
    switch (status) {
      case jobStatusClient.DRAFT:
        text = 'Draft';
        color = 'statsYellow';
        break;
      case jobStatusClient.LOOK_FOR_FREELANCERS:
        text = 'Look for freelancers';
        color = 'statsBlue';
        break;
      case jobStatusClient.CHOOSE_YOUR_FREELANCER:
        text = 'Choose your freelancer';
        color = 'statsYellow';
        break;
      case jobStatusClient.MAKE_PAYMENT:
        text = 'Make payment';
        color = 'statsYellow';
        break;
      case jobStatusClient.WORK_IN_PROGRESS:
        text = 'Work in progress';
        color = 'statsBlue';
        break;
      case jobStatusClient.REVIEW_WORK:
        text = 'Review work';
        color = 'statsRed';
        break;
      case jobStatusClient.COMPLETED:
        text = 'Completed';
        color = 'statsGreen';
        break;
      default:
        break;
    }
  } else if (userRole === 'freelancer') {
    switch (status) {
      case jobStatusFreelancer.SEND_A_QUOTE:
        text = 'Send a quote';
        color = 'statsYellow';
        break;
      case jobStatusFreelancer.QUOTE_SENT:
        text = 'Quote submitted';
        color = 'statsBlue';
        break;
      case jobStatusFreelancer.WORK_IN_PROGRESS:
        text = 'Work in progress';
        color = 'statsYellow';
        break;
      case jobStatusFreelancer.COMPLETED:
        text = 'Completed';
        color = 'statsGreen';
        break;
      default:
        break;
    }
  } else if (userRole === 'admin') {
    switch (status) {
      case jobStatusAdmin.DRAFT:
        text = 'Draft';
        color = 'statsYellow';
        break;
      case jobStatusAdmin.WAITING_FOR_QUOTE:
        text = 'Waiting for quote';
        color = 'statsYellow';
        break;
      case jobStatusAdmin.QUOTE_SENT:
        text = 'Quote submitted';
        color = 'statsBlue';
        break;
      case jobStatusAdmin.WORK_IN_PROGRESS:
        text = 'Work in progress';
        color = 'statsYellow';
        break;
      case jobStatusAdmin.COMPLETED:
        text = 'Completed';
        color = 'statsGreen';
        break;
      default:
        break;
    }
  }

  let beforeCancelledStatusText = text;
  if (isCancelled) {
    text = 'Cancelled';
    color = 'statsRed';
  }

  return [text, color, beforeCancelledStatusText];
};

export const translateAdminStatus = (job: Job) => {
  let status = 0;
  switch (job.status) {
    case 0:
      if (
        job.availableFor.length === 0 ||
        (job.recommendationRequestedAt &&
          !job.availableFor.find(
            (x) =>
              x.recommendedBy.role === 'admin' && x.publishedAt > job.recommendationRequestedAt,
          ))
      ) {
        status = 0;
      } else if (job.availableFor.filter((x) => x.status === 2).length > 0) {
        status = 2;
      } else {
        status = 1;
      }
      break;

    case 1:
      // If clients asked for recommendation after they published a job on their own
      if (job.recommendationRequestedAt && job.availableFor.find((x) => x.status === 3)) {
        // If admin already published
        if (
          job.availableFor.find(
            (x: any) =>
              x.recommendedBy.role !== 'client' && x.publishedAt > job.recommendationRequestedAt,
          )
        ) {
          // If any of the freelancers has responsed
          if (
            job.availableFor.find(
              (x) =>
                x.recommendedBy.role !== 'client' &&
                x.status > 0 &&
                x.publishedAt > job.recommendationRequestedAt,
            )
          ) {
            // If any of the freelancers has been recommended
            if (
              job.availableFor.find(
                (x) =>
                  x.recommendedBy.role !== 'client' &&
                  x.status === 3 &&
                  x.recommendedAt > job.recommendationRequestedAt,
              )
            ) {
              status = 3;
            } else {
              status = 2;
            }
          } else {
            status = 1;
          }
        } else {
          status = 0;
        }
      } else {
        status = 3;
      }
      break;

    case 2:
      status = 4;
      break;

    case 3:
      status = 5;
      break;

    case 4:
      status = 6;
      break;

    case 5:
      status = 7;
      break;

    default:
      break;
  }

  return status;
};

export function snakeCaseToSentenceCase(str: string) {
  if (!str) return str;
  const sentence = str.split('_');
  sentence[0] = sentence[0][0].toUpperCase() + sentence[0].slice(1);

  return sentence.join(' ');
}

// TODO: to be deleted
export function convertStatusNumberToText(
  number: number,
  userRole: string,
  isCancelled: boolean,
  recommendedBy: string,
) {
  if (isCancelled) {
    return 'Cancelled';
  }

  let status =
    userRole === 'client'
      ? [
          'Look for freelancers',
          'Choose your freelancer',
          'Make payment',
          'Work in progress',
          'Review work',
          'Completed',
        ][number]
      : userRole === 'freelancer' &&
        ['Send a quote', 'Quote submitted', 'Work in progress', 'Completed'][number];

  if (recommendedBy === 'client' && status === 'Matched') {
    status = 'Invited';
  }

  return status;
}

export function calculateDistanceElementToBottom(el: any) {
  return window.innerHeight - el.offsetTop;
}

export function getSubjectFromLog(log: any, userId: string) {
  let subject;
  if (userId === log.createdBy) {
    subject = ['You', 'have'];
  } else {
    subject = [log.firstName, 'has'];
  }
  return subject;
}

export function convertLogObjectToText(log: any) {
  const logTypeAndText = {
    briefUpdated: 'updated the job brief.',
    revisionRequested: 'requested revision.',
    attachmentUploaded: 'uploaded an attachment.',
    offerUpdated: 'updated the offer.',
    offerSent: 'sent an offer.',
    offerAccepted: 'accepted the offer.',
    workSubmitted: 'submitted work.',
    jobCompleted: 'set this job as complete',
    jobCancelled: 'have cancelled the job.',
  };

  return logTypeAndText[log.type];
}

export function convertLogObjectToChatVariant(log: any) {
  if (log === undefined) return null;
  const logTypeAndText = {
    revisionRequested: 'requestRevision',
    attachmentUploaded: 'attach',
    offerUpdated: 'updateOffer',
    offerSent: 'sendOffer',
    workSubmitted: 'submitWork',
    reviewed: 'reviewed',
  };
  return logTypeAndText[log.type];
}

export const checkFreelancerProfileCompleteness = (user: any = {}, onOpenModal: Function) => {
  let itemsCompleted = 0;
  const totalItems = 8;

  const hasProfilePhoto = !!user?.avatarLink;

  if (hasProfilePhoto) {
    itemsCompleted += 1;
  }

  const hasRate = user?.rate;

  if (hasRate) {
    itemsCompleted += 1;
  }

  const hasServices = user?.services?.length > 0 || 0;
  if (hasServices) {
    itemsCompleted += 1;
  }

  const hasLocation = user?.address?.country && user?.address?.region;

  if (hasLocation) {
    itemsCompleted += 1;
  }

  const hasAboutMe = user?.aboutMe;

  if (hasAboutMe) {
    itemsCompleted += 1;
  }

  const hasExpertise = user?.skills?.length > 0;

  if (hasExpertise) {
    itemsCompleted += 1;
  }

  const hasLanguages = user?.languages?.length > 0;

  if (hasLanguages) {
    itemsCompleted += 1;
  }

  const hasEnoughSampleWorks =
    user?.portfolios?.reduce((prev: any, curr: any) => [...prev, ...curr.works], [])?.length >= 3;

  if (hasEnoughSampleWorks) {
    itemsCompleted += 1;
  }

  const tasks = [
    {
      text: 'Profile picture',
      heading: 'Upload a professional looking profile picture',
      subHeading: 'Make your client feel that there is a real person behind the screen',
      action: 'Add profile picture',
      done: hasProfilePhoto,
      onClick: () => onOpenModal('basic-info'),
    },
    {
      text: 'Rate card',
      done: hasRate,
      onClick: () => onOpenModal('basic-info'),
    },
    {
      text: 'Service offer',
      done: hasServices,
      onClick: () => onOpenModal('basic-info'),
    },
    {
      text: 'Expertise',
      done: hasExpertise,
      onClick: () => onOpenModal('expertise'),
    },
    {
      text: 'Location',
      done: hasLocation,
      onClick: () => onOpenModal('basic-info'),
    },
    {
      text: 'About me',
      heading: 'Tell people a little bit about yourself',
      subHeading: 'Add more personality to your profile',
      action: 'Add about me',
      done: hasAboutMe,
      onClick: () => onOpenModal('about-me'),
    },
    {
      text: 'Sample work (min 3)',
      heading: 'Upload at least 3 past work you have done',
      subHeading: 'Convince your client through some of your best work',
      action: 'Add sample work',
      done: hasEnoughSampleWorks,
      onClick: () => onOpenModal('sample-works'),
    },
    {
      text: 'Language',
      heading: 'Share your language capabilities',
      subHeading: 'Let your client know the extent of your language abilities',
      action: 'Add language',
      done: hasLanguages,
      onClick: () => onOpenModal('languages'),
    },
  ];

  const remainingTasks = tasks.filter((t) => !t.done && t.heading);

  return {
    complete: itemsCompleted === totalItems,
    total: totalItems,
    currentProgress: itemsCompleted,
    tasks,
    remainingTasks,
  };
};

export const getUserRole = () => {
  const isFreelancer = window.location.pathname.includes('freelancer');
  const isAdmin = window.location.pathname.includes('god');
  return isFreelancer ? 'freelancer' : isAdmin ? 'admin' : 'client';
};

// TODO: to be deleted
export const getDashboardStatusColor = (
  status: number,
  isCancelled: boolean = false,
  userRole: string,
) => {
  if (isCancelled) return 'statsRed';
  if (userRole === 'client') {
    if (status === -1 || isCancelled) {
      return 'statsYellow';
    }

    if (status === 5) {
      return 'statsGreen';
    }

    if (status === 0 || status === 3) {
      return 'statsBlue';
    }

    return 'statsYellow';
  } else if (userRole === 'freelancer') {
    if (status === 0 || status === 2) {
      return 'statsYellow';
    }
    if (status === 1) {
      return 'statsBlue';
    }
    if (status === 4) {
      return 'statsGreen';
    }
  }
};

export const displayNumberWithSeparator = (
  number: number,
  options: { decimalDigit?: number } = {},
) => {
  const { decimalDigit = 2 } = options;

  return (+number).toLocaleString(undefined, {
    maximumFractionDigits: decimalDigit,
    minimumFractionDigits: decimalDigit,
  });
};

/**
 * @function formatMoney
 * displays number type to localized number separator with ISO coded currency before the amount
 * @param amount - amount of the money
 * @param currency - currency of the money
 * @param options - options to format the money
 * @param options.decimalDigit - default to 2
 * @param options.lang - default to 'en-US'
 * @returns formatted money in string
 */
export const formatMoney = (
  amount: number,
  currency: string,
  options: { decimalDigit?: number; lang?: string } = {},
) => {
  const { decimalDigit = 2, lang = 'en-US' } = options;

  return amount.toLocaleString(lang, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'code',
    maximumFractionDigits: decimalDigit,
    minimumFractionDigits: decimalDigit,
  });
};

export function groupDocumentsByUser(documents: any) {
  const groupedDocuments = _(documents)
    .groupBy('_uploadedBy._id')
    .map((group) => ({
      user: _.head(group)._uploadedBy,
      attachments: _.map(group, (o) => _.omit(o, 'user')),
    }))
    .value();

  return groupedDocuments;
}

export function groupDocumentsByActive(
  groupedDocuments: any,
  clientId: string,
  assignTo: string,
  activeUserId: string,
) {
  const active: any[] = [];
  const archive: any[] = [];
  let idxActiveUser;

  if (assignTo) {
    groupedDocuments.forEach((doc: any, idx: number) => {
      if (doc.user._id === clientId || doc.user._id === assignTo) {
        if (doc.user._id === activeUserId) {
          idxActiveUser = idx;
        }
        active.push(doc);
      } else {
        archive.push(doc);
      }
    });

    if (groupedDocuments.length > 0 && idxActiveUser && idxActiveUser !== 0) {
      [active[0], active[idxActiveUser]] = [active[idxActiveUser], active[0]];
    }

    return {
      active,
      archive,
    };
  }

  return {
    active: groupedDocuments,
    archive,
  };
}

export function addHttpsToUrl(url: string) {
  return url.includes('http://') || url.includes('https://') ? url : `https://${url}`;
}

export const isValidUrl = (url: string) => {
  try {
    new URL(url);
  } catch (e) {
    console.error(e);
    return false;
  }
  return true;
};

// QB util
export async function updateSubQuestionsWithURLUpload(
  jobId: string,
  questions: any[],
  e: any,
  documents: any,
  uploadJobDocument: any,
  deleteJobDocument: any,
  updateJobDocument: any,
  refetchJob: any,
) {
  let isError = false;
  let answerChanged = true;
  const promise = questions.map(async (s) => {
    if (e.target.name === s.key) {
      // Check if value a valid URL
      if (e.target.value.length > 0 && !isValidUrl(e.target.value)) {
        isError = true;
        return { ...s, error: true, errorMessage: 'Please enter a valid URL' };
      }

      // Check if value changes
      if (e.target.value === s.answer) {
        answerChanged = false;
        return s;
      }

      let updatedAnswer = [...s.answer];
      const textTypeIndex = updatedAnswer.findIndex((ans) => ans.type === 'text');

      const docId = updatedAnswer[textTypeIndex]?.docId;
      const alreadyHasDocument = !!docId && documents.map((doc: any) => doc._id).includes(docId);
      if (alreadyHasDocument) {
        if (e.target.value?.length === 0) {
          await deleteJobDocument(jobId, docId);

          updatedAnswer[textTypeIndex] = {
            type: 'text',
            value: '',
            docId: null,
          };
        } else {
          await updateJobDocument(jobId, docId, {
            url: e.target.value,
            name: e.target.value,
          });

          updatedAnswer[textTypeIndex] = {
            type: 'text',
            value: e.target.value,
            docId,
          };
        }
      } else {
        const formData = new FormData();
        formData.append('title', e.target.value);
        formData.append('url', e.target.value);
        formData.append('documentType', 'brief');

        const { data } = await uploadJobDocument(jobId, formData);
        updatedAnswer[textTypeIndex] = {
          type: 'text',
          value: e.target.value,
          docId: data._id,
        };
      }

      return { ...s, answer: updatedAnswer, error: false };
    }

    return s;
  });

  const updatedSub = await Promise.all(promise);

  if (!isError && answerChanged) {
    refetchJob(true);
  }
  return [updatedSub, isError, answerChanged];
}

export async function handleChangeSubQuestions(
  jobId: string,
  mainQuestions: any[],
  subQuestions: any[],
  e: any,
  isOtherChecked: boolean | undefined,
  setSub: Function,
  uploadJobDocument: any,
  deleteJobDocument: any,
  updateJob: any,
  refetchJob: any,
) {
  let fileTypeAnswers: any;
  if (e.target.type === 'file') {
    // retrieve old answer
    fileTypeAnswers = subQuestions?.find((m) => m.key === e.target.name)?.answer || [];

    // make sure fileTypeAnswers is of array data type
    if (typeof fileTypeAnswers === 'string') {
      fileTypeAnswers = [fileTypeAnswers];
    } else if (!fileTypeAnswers) {
      fileTypeAnswers = [];
    }

    const filesToUpload = e.target.filesToUpload || [];

    // to handle upload new attachment
    if (filesToUpload?.length > 0) {
      for (const fileToUpload of filesToUpload) {
        const formData = new FormData();
        formData.append('title', fileToUpload.name);
        formData.append('url', '');
        formData.append('file', fileToUpload.file);
        formData.append('documentType', 'brief');

        const { data } = await uploadJobDocument(jobId, formData);

        if (data) {
          fileTypeAnswers.push(data._id);
        }
      }

      refetchJob(true);
    }

    // to handle file deletion
    const { fileToDelete } = e.target;

    if (fileToDelete) {
      await deleteJobDocument(jobId, fileToDelete);
      refetchJob(true);
      fileTypeAnswers = fileTypeAnswers.filter((id: any) => id !== fileToDelete);
    }

    const { value } = e.target;

    // to handle text type
    if (typeof value === 'string') {
      const textIndex = fileTypeAnswers.findIndex((ans: any) => ans.type === 'text');

      if (textIndex >= 0) {
        fileTypeAnswers[textIndex] = { ...fileTypeAnswers[textIndex], type: 'text', value };
      } else {
        fileTypeAnswers.push({ ...fileTypeAnswers[textIndex], type: 'text', value });
      }
    }
  }

  const updatedSub = subQuestions.map((s) => {
    return {
      answer:
        s.type === 'file' && s.key === e.target.name
          ? fileTypeAnswers
          : s.key === e.target.name && s.type !== 'file'
          ? e.target.value
          : s.answer,
      isOtherChecked: s.key === e.target.name ? isOtherChecked : s.isOtherChecked,
      key: s.key,
      label: s.label,
      primary: s.primary,
      brancher: s.brancher,
      options: s.options,
      placeholder: s.placeholder,
      required: s.required,
      subtitle: s.subtitle,
      title: s.title,
      type: s.type,
      _id: s._id,
      error:
        s.key === 'budget' && parseInt(e.target.value, 10) > 999999
          ? 'Please enter a maximum value of USD 999,999.99.'
          : s.error,
    };
  });

  const isChoiceType = e.target.type === 'choice' && !!e.target.doneFilling;
  const isMultipleType = e.target.type === 'multiple' && !!e.target.doneFilling;
  const isDropdownType = e.target.type === 'dropdown';
  const isDeadlineType = e.target.type === 'deadline';
  const isTagsType = e.target.type === 'tags';
  // number type is budget question
  const isNumberType = e.target.type === 'number' && !!e.target.doneFilling;

  if (
    isChoiceType ||
    isMultipleType ||
    isDropdownType ||
    isDeadlineType ||
    isTagsType ||
    isNumberType
  ) {
    updateJob(mainQuestions, updatedSub);
  }

  setSub(updatedSub);
}

export function hypheniseString(string: string, everyCharAt: number) {
  return string
    .split(' ')
    .map((s) => {
      if (s.length <= everyCharAt) return s;
      const arr = [s.slice(0, everyCharAt)];
      let i = 0;
      while (i < s.length / everyCharAt - 1) {
        arr.push(String.fromCharCode(173));
        arr.push(
          s.slice((i + 1) * everyCharAt, i === s.length - 1 ? s.length - 1 : (i + 2) * everyCharAt),
        );
        i++;
      }
      return arr.join('');
    })
    .join(' ');
}
