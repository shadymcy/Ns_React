import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { Layout, Spin } from "antd";
import "./NewsSandBox.css";

import NavMenuBar from "../../components/sandbox/NavMenuBar";
import NewRouter from "../../components/sandbox/NewRouter";
// import nProgress from "nprogress";
// import "nprogress/nprogress.css";

function NewsSandBox(props) {
  //   nProgress.start();
  //   useEffect(() => {
  //     nProgress.done();
  //   });
  return (
    <Spin tip="Loading..." spinning={props.isLoading}>
      <Layout>
        <NavMenuBar />
        <Layout className="site-layout">
          <NewRouter />
        </Layout>
      </Layout>
    </Spin>
  );
}

const mapStateToProps = ({ LoadingReducer: { isLoading } }) => {
  return { isLoading };
};

export default connect(mapStateToProps)(withRouter(NewsSandBox));
