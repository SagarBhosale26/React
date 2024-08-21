import React, { useState, useEffect, Fragment } from 'react';
import {
  LoadingState,
  ErrorState,
  Card,
  DetailHeading,
  Heading,
} from 'uui_kit';
import { withLayout } from 'layout';

import { fetchCompletionsOverTime, fetchFeedback } from 'network';

import Graph from './Graph';
import Feedback from './Feedback';

const Dashboard = () => {
  const [graph, setGraph] = useState();
  const [feedback, setFeedback] = useState();
  const [totalCompletions, setTotalCompletions] = useState(0);
  const [todayCompletions, setTodayCompletions] = useState(0);
  const [errorMessage, setErrorMessage] = useState();

  const loading = !graph || !feedback;

  useEffect(() => {
    const { promise: chartPromise } = fetchCompletionsOverTime();
    chartPromise.then(response => {
      const { data, error } = response || {};
      if (error) {
        setErrorMessage('Something went wrong.');
        return;
      }
      if (data) {
        setGraph(data.completion_chart);
        setTotalCompletions(data.total_completions);
        setTodayCompletions(data.today_completions);
      }
    });

    const { promise: feedbackPromise } = fetchFeedback();
    feedbackPromise.then(response => {
      const { data, error } = response || {};
      if (error) {
        setErrorMessage('Something went wrong.');
        return;
      }
      if (data) {
        setFeedback(data);
      }
    });
  }, []);

  return (
    <Fragment>
      {!!errorMessage ? (
        <div className="row">
          <div className="col-sm-12">
            <Card className="u-p-5">
              <ErrorState text={errorMessage} />
            </Card>
          </div>
        </div>
      ) : (
        <Fragment>
          {!!loading ? (
            <div className="row">
              <div className="col-sm-12">
                <Card className="u-p-5">
                  <LoadingState />
                </Card>
              </div>
            </div>
          ) : (
            <div className="row">
              <div className="col-sm-12">
                <div className="d-flex u-mb-4">
                  <div className="col u-pr-4 align-self-stretch d-flex">
                    <Card className="u-p-5 u-m-0 d-flex u-width-p-12 align-items-center align-self-stretch">
                      <div className="u-width-p-12">
                        <DetailHeading className="u-mb-3" aria-hidden={true}>
                          COMPLETIONS OVER TIME
                        </DetailHeading>
                        <Graph graph={graph} />
                      </div>
                    </Card>
                  </div>
                  <div className="col-auto d-flex flex-column align-self-stretch">
                    <div className="col u-pb-2">
                      <Card
                        className="u-p-5 u-m-0 d-flex flex-column align-items-center justify-content-center"
                        style={{ minHeight: '100%' }}
                      >
                        <DetailHeading className="u-m-0">TOTAL</DetailHeading>
                        <Heading className="u-m-0" bold={true}>
                          {totalCompletions}
                        </Heading>
                      </Card>
                    </div>
                    <div className="col u-pt-2">
                      <Card
                        className="u-p-5 u-m-0 d-flex flex-column align-items-center justify-content-center"
                        style={{ minHeight: '100%' }}
                      >
                        <DetailHeading className="u-m-0">TODAY</DetailHeading>
                        <Heading className="u-m-0" bold={true}>
                          {todayCompletions}
                        </Heading>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12">
                <Card className="u-p-0">
                  <Feedback feedback={feedback} />
                </Card>
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default withLayout(Dashboard);
