import React from "react";
import Tooltip from "@material-ui/core/Tooltip";

function withToolTip(WrappedComponent) {
  return function WrappedWithToolTip(props) {
    return props.parent.children === undefined ||
      props.parent.children.length === 0
      ? [
          <Tooltip
            // eslint-disable-next-line no-underscore-dangle
            key={props.parent._id}
            title={`${props.parent.name} does not have any children`}
          >
            {WrappedComponent}
          </Tooltip>
        ]
      : [WrappedComponent];
  };
}

export default withToolTip;
