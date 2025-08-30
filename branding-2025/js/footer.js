import { grey, yellow } from '@material-ui/core/colors'

export default {
  buildFooterStyle: function (theme) {
    return {
      textAlign: 'center',
      padding: theme.spacing(2),
      marginTop: 'auto',
      color: grey[900],
      backgroundColor: yellow['A700']
    }
  },
  linkStyle: {
    color: grey[900],
    fontWeight: 500
  }
}
