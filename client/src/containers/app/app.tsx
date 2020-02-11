import React from "react";
import DemoContainer from "@containers/Temp"; //"@containers/DemoContainer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import "./app.scss";
import { WithStyles, createStyles } from '@material-ui/core';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

//https://material-ui.com/guides/typescript/#augmenting-your-props-using-withstyles
const styles = (theme: Theme) => createStyles({
  root: {
    boxShadow: "inset 0 0 10px red"
  }
});

interface Props extends WithStyles<typeof styles> {
  classes: {
    root: string;
  };
}

const App = ({ classes }: Props) => {
  return (
    <div className={`App ${classes.root}`}>
      <DemoContainer />
    </div>
  );
}

const mapStateToProps = (state: any) => ({
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {

    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(App));
