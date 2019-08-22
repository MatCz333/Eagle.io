import React from 'react'
import { makeStyles } from "@material-ui/styles";

// Styling
const useStyles = makeStyles( theme => ({
    InternalServer:{
        color: "red"
    },
    Wrapper:{
        height: "80%",
        width: "100%",
        top: 48,
        position: "absolute"
    }
}))

/**
 * Component that represents the error when page is not found
 */
function PageNotFound(props) {
    const classes = useStyles(props)
    return (
        <section className={classes.Wrapper}>
        <p className={classes.InternalServer}>404 ERROR, page not found!!</p>
        </section>
    )
}

export default PageNotFound