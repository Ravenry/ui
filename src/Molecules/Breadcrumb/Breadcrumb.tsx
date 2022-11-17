import React, { useState, useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import Breadcrumbs from 'react-router-dynamic-breadcrumbs';
import { isBrowser } from 'react-device-detect';
import { Icon, Row, Spacer, Text } from '@ravenry/ui';

import colors from '../../shared/colors';
import Api from 'helper/api';

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const ActiveItem = styled.div`
  text-decoration: none;
  line-height: 20px;
  font-size: 0.75rem;
  color: ${colors.black};
  font-weight: bold;
  cursor: default;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledText = styled(Text)`
  & > a {
    line-height: 20px;
    font-size: 0.75rem;
    color: ${colors.black50};
    font-weight: 400;
    cursor: pointer;
  }

  & > a:hover {
    color: ${colors.black100};
    text-decoration: underline;
  }
`;

const Bread = styled.div`
  padding: ${({ padding }) => padding || '1rem 0rem 0.75rem 0rem'};
  background-color: ${({ color }) => (color ? colors[color] : colors.white)};
  ${({ sticky, width }) =>
    sticky
      ? `
    position: fixed;
    width: ${width || '100%'};
    z-index: 2;
  `
      : ''}
  ${({ margin }) => (margin ? `margin: ${margin};` : '')}
`;

const BackButton = styled(Row)`
  justify-content: center;
  align-items: center;
  &:hover {
    svg {
      fill: ${colors.black100};
    }
    .p {
      color: ${colors.black100};
    }
  }
`;

/**
 * BreadCrumb
 *
 * @param {Object} props
 * @param {Boolean} [props.stickOnTop] - make the breadcrumb stick on top
 * @param {string} [props.color]
 * @param {string} [props.width]
 * @param {string} [props.margin]
 * @param {Boolean} [props.paddingOff]
 * @param {Boolean} [props.backOnly]
 */
export default function BreadCrumb(props) {
  const { stickOnTop, color, width } = props;
  const api = new Api();

  const location = useLocation();
  const history = useHistory();
  const { jobTypeId } = useParams();
  const [jobType, setJobType] = useState({});

  function getJobTypes() {
    api
      .getJobTypes()
      .then((res) => {
        const jobType = res.data.find((element) => element._id === jobTypeId);

        if (jobType) {
          setJobType(jobType);
        }
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getJobTypes();
  }, [jobTypeId]);

  const routes = {
    '/auth': null,
    '/login': null,
    '/set-password': null,
    'forgot-password': null,
    '/auth/login': null,
    '/auth/register': null,
    '/auth/forgot-password': null,
    '/auth/reset-password': null,
    '/auth/set-password': null,
    '/auth/set-password/:id': null,
    '/profile/:id': 'MY PROFILE',
    '/profile': null,
    '/new': null,
    '/freelancer': null,
    '/freelancer/profile': null,
    '/freelancer/profile/:id': 'PROFILE',
    '/freelancer/dashboard': () => {
      const hasId = location.pathname.replace('/freelancer/dashboard', '');
      return hasId ? 'MY JOBS' : null;
    },
    '/freelancer/jobs': () => {
      const hasId = location.pathname.replace('/freelancer/jobs', '');
      return hasId ? 'MY JOBS' : null;
    },
    '/freelancer/jobs/:id': 'JOB DETAILS',
    '/freelancer/jobs/:id/:clientId': 'CLIENT PROFILE',
    '/freelancer/job-board': 'JOB BOARD',
    '/freelancer/job-board/:id': 'JOB DETAILS',
    '/job': null,
    '/job/new/request-recommendation': null,
    '/freelancer/earnings': null,
    '/freelancer/storefront': null,
    '/freelancer/storefront/jobs/:id': 'JOB DETAILS',
    '/freelancer/settings': 'SETTINGS',

    '/client': null,
    '/client/profile': null,
    '/client/profile/:id': 'PROFILE',
    '/client/dashboard': () => {
      const hasId = location.pathname.replace('/client/dashboard', '');
      return hasId ? 'DASHBOARD' : null;
    },
    '/client/dashboard/new': 'CREATE JOB',
    '/client/dashboard/:id': 'CREATE JOB',
    '/client/dashboard/:id/find-freelancers': 'FIND FREELANCERS',
    '/client/jobs': () => {
      const hasId = location.pathname.replace('/client/jobs', '');
      return hasId ? 'MY JOBS' : null;
    },
    '/client/jobs/:id': () => {
      const isInDraftFindFreelancers = location.pathname
        .split('/')
        .includes('draft-find-freelancers');

      return isInDraftFindFreelancers ? 'NEW JOB' : 'JOB DETAILS';
    },
    '/client/jobs/:id/recommendation': 'RECOMMENDATIONS',
    '/client/jobs/:id/offer': null,
    '/client/jobs/:id/find-freelancers': 'FIND FREELANCERS',
    '/client/jobs/:id/draft-find-freelancers': 'FIND FREELANCERS',
    '/client/jobs/:id/:userId': 'FREELANCER PROFILE',
    '/client/jobs/:id/offer/payment': 'PAYMENT',
    '/client/jobs/:id/recommendation/:freelancerId': 'FREELANCER PROFILE',
    '/client/recommendation': 'RECOMMENDATION',
    '/client/recommendation/:id': 'FREELANCERS PROFILE',
    '/dashboard': null,
    '/dashboard/profile': 'MY PROFILE',
    '/client/payments': null,
    '/client/freelancers': null,
    '/client/freelancers/:id': 'MY FREELANCERS',
    '/client/settings': 'SETTINGS',

    '/god': null,
    '/god/jobs': () => {
      const hasId = location.pathname.replace('/god/jobs', '');
      return hasId ? 'JOBS' : null;
    },
    '/god/jobs/:id': 'JOB DETAILS',
    '/god/jobs/:id/offer': 'OFFER',
    '/god/jobs/:id/freelancers': null,
    '/god/jobs/:id/freelancers/:freelancerId': 'FREELANCER PROFILE',
    '/god/jobs/:id/edit': 'EDIT JOB',
    '/god/jobs/choose-client': 'CREATE JOB',
    '/god/jobs/new': 'CREATE JOB',
    '/god/freelancers': null,
    '/god/freelancers/:id': 'FREELANCER PROFILE',
    '/god/clients': null,
    '/god/clients/:id': 'CLIENT PROFILE',
    '/god/payments': null,
    '/god/settings': 'SETTINGS',
    '/god/settings/job_types': 'JOB TYPE',
    '/god/settings/job_types/:id': () => jobType?.key?.toUpperCase(),
    '/god/settings/job_types/:id/editor': 'QUESTION BUILDER',
    '/god/settings/job_types/:id/service_fee': 'SERVICE FEE',
    '/god/settings/analytics_report': 'REPORT',
    '/god/new': null,
    '/rf': null,
    '/jobs': null,
    '/jobs/:id': null,
  };

  return (
    <Bread sticky={stickOnTop} color={color} width={width} padding={props.padding}>
      <Container>
        {isBrowser && (
          <>
            <BackButton>
              <Icon name="chevron left" fill="black60" hoverFill="black100" />
              <Text
                onClick={() => {
                  /**
                   * The logic below is not perfect
                   *
                   * 1. It will check the state of location object
                   * 2. If it doesn't have a previous state,
                   *    e.g. the user copy and paste a child link directly to browser,
                   *    than it will delete one variable of the pathname
                   *
                   * For this to work:
                   * 1. Every history.push must include a state {from: location}
                   * 2. Do not skip two paths, e.g. for job details,
                   *    instead going from /jobs/:id#freelancers
                   *    to /jobs/:id/freelancers/:id,
                   *    go from /jobs/:id/freelancers
                   *    to /jobs/:id/freelancers/:id,
                   *    and the below algorithm would work perfectly
                   *
                   * TODO: The ideal solution is to:
                   * 1. Match current url with our list of path patterns
                   * 2. Get the previous pattern and create a new url using that pattern
                   */
                  if (location.state) {
                    return history.push(location.state.from);
                  }
                  const paths = location.pathname.split('/');
                  paths.pop();
                  history.push(paths.join('/'));
                }}
                _as="b3"
                color="black60"
                inline
                clickable
                hoverColor="black100"
                bold
              >
                Back
              </Text>
              <Spacer size="16" />
              {props.backOnly ? null : (
                <>
                  <Text size="2" color="black50" bold>
                    |
                  </Text>
                  <Spacer size="16" />
                </>
              )}
            </BackButton>
          </>
        )}
        {props.backOnly ? null : (
          <Breadcrumbs
            mappedRoutes={routes}
            WrapperComponent={(props) => <Container>{props.children}</Container>}
            ActiveLinkComponent={(props) => <ActiveItem>{props.children}</ActiveItem>}
            LinkComponent={(props) => (
              <>
                <StyledText _as="brd" color="black60" uppercase underLineOnHover inline clickable>
                  {props.children}
                </StyledText>
                <Spacer size="8" />
                <Icon name="chevron right" fill="black50" />
                <Spacer size="8" />
              </>
            )}
          />
        )}
      </Container>
    </Bread>
  );
}
