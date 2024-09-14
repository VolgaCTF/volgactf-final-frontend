import { grey } from '@material-ui/core/colors'

export default {
  buildFooterStyle: function (theme) {
    return {
      textAlign: 'center',
      padding: theme.spacing(2),
      marginTop: 'auto',
      color: grey['300'],
      backgroundColor: grey['800']
    }
  },
  linkStyle: {
    color: grey['200'],
    fontWeight: 500
  }
}
